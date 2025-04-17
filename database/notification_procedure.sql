--  CreateNotification: (Could be internal, called by other procedures)

DELIMITER //

DROP PROCEDURE IF EXISTS CreateNotification;

CREATE PROCEDURE CreateNotification(
    IN p_user_id INT,
    IN p_related_entity_id INT,
    IN p_notification_type VARCHAR(50),
    IN p_message TEXT,
    OUT out_notification_id INT,
    OUT out_message VARCHAR(255)
)
BEGIN
    -- Label for the LEAVE statement
    THIS_PROC: BEGIN

        DECLARE v_user_exists INT DEFAULT 0;
        DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            SET out_notification_id = NULL;
            GET DIAGNOSTICS CONDITION 1
                @sqlstate = RETURNED_SQLSTATE,
                @errno = MYSQL_ERRNO,
                @text = MESSAGE_TEXT;
            SET out_message = CONCAT('Error: Database error occurred - ', @errno, ': ', @text);
        END;

        -- Initialize output
        SET out_notification_id = NULL;
        SET out_message = '';

        -- Input validation
        IF p_user_id IS NULL OR
           p_related_entity_id IS NULL OR
           p_notification_type IS NULL OR p_notification_type = '' OR
           p_message IS NULL OR p_message = '' THEN
            SET out_message = 'Error: All input fields are required.';
            LEAVE THIS_PROC;
        END IF;

        -- Check if user exists
        SELECT COUNT(*) INTO v_user_exists
        FROM Users
        WHERE user_id = p_user_id;

        IF v_user_exists = 0 THEN
            SET out_message = 'Error: Recipient User ID not found.';
            LEAVE THIS_PROC;
        END IF;

        -- Insert the notification
        INSERT INTO Notifications (
            user_id,
            related_entity_id,
            notification_type,
            message
        ) VALUES (
            p_user_id,
            p_related_entity_id,
            p_notification_type,
            p_message
        );

        -- Get the inserted ID
        SET out_notification_id = LAST_INSERT_ID();

        IF out_notification_id IS NOT NULL AND out_notification_id > 0 THEN
            SET out_message = 'Notification created successfully.';
        ELSE
            SET out_message = 'Error: Notification insert failed or ID not retrievable.';
        END IF;

    END THIS_PROC;

END //

DELIMITER ;


--               ------------------------------------------------------------------------
--             --------------------------------------------------------------------------------------
--  GetUserNotifications:
--   Retrieves notifications for a specific user, possibly ordered by date. Parameterized.



DELIMITER //

DROP PROCEDURE IF EXISTS GetUserNotifications;

CREATE PROCEDURE GetUserNotifications(
    IN p_user_id INT,                 -- The ID of the user whose notifications are being fetched
    OUT out_message VARCHAR(255)      -- Output feedback message
)
BEGIN
    -- Label for LEAVE statement
    THIS_PROC: BEGIN

        -- Declare variable
        DECLARE v_user_exists INT DEFAULT 0;

        -- Initialize output
        SET out_message = '';

        -- --- 1. Input Validation ---
        IF p_user_id IS NULL THEN
            SET out_message = 'Error: User ID must be provided.';
            LEAVE THIS_PROC;
        END IF;

        -- --- 2. Check if User Exists ---
        SELECT COUNT(*) INTO v_user_exists
        FROM Users
        WHERE user_id = p_user_id;

        IF v_user_exists = 0 THEN
            SET out_message = 'Error: User ID not found.';
            LEAVE THIS_PROC;
        END IF;

        -- --- 3. Fetch Notifications ---
        SELECT
            notification_id,
            related_entity_id,
            notification_type,
            message,
            created_timestamp
        FROM Notifications
        WHERE user_id = p_user_id
        ORDER BY created_timestamp DESC;

        -- Success message
        SET out_message = 'Successfully retrieved notifications.';

    END THIS_PROC;

END //

DELIMITER ;
