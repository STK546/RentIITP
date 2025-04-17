-- procedure for request rental                  
-----------------------------------------------------
DELIMITER //

DROP PROCEDURE IF EXISTS RequestRental;

CREATE PROCEDURE RequestRental(
    IN p_renter_id INT,
    IN p_item_id INT,
    IN p_start_date DATETIME,
    IN p_end_date DATETIME,
    OUT out_rental_id INT,
    OUT out_message VARCHAR(255)
)
BEGIN
    DECLARE v_item_exists INT DEFAULT 0;
    DECLARE v_owner_id INT;
    DECLARE v_availability ENUM('available', 'rented', 'unavailable');
    DECLARE v_rental_price DECIMAL(10, 2);
    DECLARE v_rental_unit ENUM('hour', 'day', 'week', 'month');
    DECLARE v_max_duration INT;
    DECLARE v_overlap_count INT DEFAULT 0;
    DECLARE v_duration_units DECIMAL(10, 2);
    DECLARE v_agreed_price DECIMAL(10, 2);
    DECLARE v_renter_exists INT DEFAULT 0;
    DECLARE v_notification_message TEXT;
    DECLARE v_requested_duration_in_item_unit INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET out_rental_id = NULL;
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SET out_message = CONCAT('Error: Database error occurred - ', @errno, ': ', @text);
    END;

    THIS_PROC: BEGIN

        SET out_rental_id = NULL;
        SET out_message = '';

        IF p_renter_id IS NULL OR p_item_id IS NULL OR p_start_date IS NULL OR p_end_date IS NULL THEN
            SET out_message = 'Error: Renter ID, Item ID, Start Date, and End Date are required.';
            LEAVE THIS_PROC;
        END IF;

        IF p_start_date >= p_end_date THEN
            SET out_message = 'Error: End date must be after start date.';
            LEAVE THIS_PROC;
        END IF;

        SELECT COUNT(*) INTO v_renter_exists FROM Users WHERE user_id = p_renter_id;
        IF v_renter_exists = 0 THEN
            SET out_message = 'Error: Requesting user (renter) does not exist.';
            LEAVE THIS_PROC;
        END IF;

        START TRANSACTION;

        SELECT COUNT(*), owner_id, availability_status, rental_price, rental_unit, max_rental_duration
        INTO v_item_exists, v_owner_id, v_availability, v_rental_price, v_rental_unit, v_max_duration
        FROM Items
        WHERE item_id = p_item_id
        GROUP BY owner_id, availability_status, rental_price, rental_unit, max_rental_duration;

        IF v_item_exists = 0 THEN
            ROLLBACK;
            SET out_message = 'Error: Item does not exist.';
            LEAVE THIS_PROC;
        END IF;

        IF v_owner_id = p_renter_id THEN
            ROLLBACK;
            SET out_message = 'Error: You cannot rent your own item.';
            LEAVE THIS_PROC;
        END IF;

        IF v_availability != 'available' THEN
            ROLLBACK;
            SET out_message = 'Error: Item is currently not available for rent.';
            LEAVE THIS_PROC;
        END IF;

        SELECT COUNT(*)
        INTO v_overlap_count
        FROM Rentals
        WHERE item_id = p_item_id
          AND rental_status IN ('confirmed', 'active')
          AND (p_start_date < end_date AND p_end_date > start_date);

        IF v_overlap_count > 0 THEN
            ROLLBACK;
            SET out_message = 'Error: Item is already booked or rented during the requested dates.';
            LEAVE THIS_PROC;
        END IF;

        SET v_duration_units = 0;
        CASE v_rental_unit
            WHEN 'hour' THEN
                SET v_duration_units = TIMESTAMPDIFF(MINUTE, p_start_date, p_end_date) / 60.0;
            WHEN 'day' THEN
                SET v_duration_units = TIMESTAMPDIFF(HOUR, p_start_date, p_end_date) / 24.0;
            WHEN 'week' THEN
                SET v_duration_units = TIMESTAMPDIFF(DAY, p_start_date, p_end_date) / 7.0;
            WHEN 'month' THEN
                SET v_duration_units = TIMESTAMPDIFF(DAY, p_start_date, p_end_date) / 30.4375;
        END CASE;

        SET v_duration_units = CEIL(v_duration_units);

        IF v_max_duration IS NOT NULL THEN
            CASE v_rental_unit
                WHEN 'hour' THEN SET v_requested_duration_in_item_unit = TIMESTAMPDIFF(HOUR, p_start_date, p_end_date);
                WHEN 'day' THEN SET v_requested_duration_in_item_unit = TIMESTAMPDIFF(DAY, p_start_date, p_end_date);
                WHEN 'week' THEN SET v_requested_duration_in_item_unit = TIMESTAMPDIFF(WEEK, p_start_date, p_end_date);
                WHEN 'month' THEN SET v_requested_duration_in_item_unit = TIMESTAMPDIFF(MONTH, p_start_date, p_end_date);
            END CASE;

            IF v_requested_duration_in_item_unit IS NOT NULL AND v_requested_duration_in_item_unit > v_max_duration THEN
                ROLLBACK;
                SET out_message = CONCAT('Error: Requested duration exceeds the maximum allowed duration of ', v_max_duration, ' ', v_rental_unit, '(s).');
                LEAVE THIS_PROC;
            END IF;
        END IF;

        SET v_agreed_price = v_duration_units * v_rental_price;

        INSERT INTO Rentals (
            item_id,
            renter_id,
            start_date,
            end_date,
            agreed_price,
            rental_status
        ) VALUES (
            p_item_id,
            p_renter_id,
            p_start_date,
            p_end_date,
            v_agreed_price,
            'requested'
        );

        SET out_rental_id = LAST_INSERT_ID();

        SET v_notification_message = CONCAT(
            (SELECT username FROM Users WHERE user_id = p_renter_id),
            ' has requested to rent your item: ',
            (SELECT name FROM Items WHERE item_id = p_item_id),
            ' from ', DATE_FORMAT(p_start_date, '%Y-%m-%d %H:%i'),
            ' to ', DATE_FORMAT(p_end_date, '%Y-%m-%d %H:%i'), '.'
        );

        INSERT INTO Notifications (
            user_id,
            related_entity_id,
            notification_type,
            message
        ) VALUES (
            v_owner_id,
            out_rental_id,
            'rental_requested',
            v_notification_message
        );

        COMMIT;
        SET out_message = 'Rental requested successfully.';

    END THIS_PROC;

END //

DELIMITER ;


-- Change the delimiter to handle the procedure body---------------------
-- ---------- 

DELIMITER //

-- Drop the procedure if it already exists to allow recreation
DROP PROCEDURE IF EXISTS UpdateRentalStatus;

-- Create the stored procedure
CREATE PROCEDURE UpdateRentalStatus(
    -- Input parameters
    IN p_rental_id INT,
    IN p_new_status VARCHAR(20), -- Valid target statuses as string
    IN p_acting_user_id INT, -- The ID of the user performing the action

    -- Output parameter for feedback
    OUT out_message VARCHAR(255)
)
BEGIN
    THIS_PROC: BEGIN

        -- Declare variables
        DECLARE v_current_status ENUM('requested', 'confirmed', 'active', 'completed', 'cancelled', 'rejected');
        DECLARE v_item_id INT;
        DECLARE v_renter_id INT;
        DECLARE v_owner_id INT;
        DECLARE v_can_update BOOLEAN DEFAULT FALSE;
        DECLARE v_notification_user_id INT;
        DECLARE v_notification_message TEXT;
        DECLARE v_item_update_needed BOOLEAN DEFAULT FALSE;
        DECLARE v_new_item_status ENUM('available', 'rented', 'unavailable') DEFAULT 'available';
        DECLARE v_other_active_rentals INT DEFAULT 0;

        -- Declare handler for unexpected SQL errors
        DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            ROLLBACK;
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
            SET out_message = CONCAT('Error: Database error occurred - ', @errno, ': ', @text);
        END;

        -- Initialize output message
        SET out_message = '';

        -- 1. Basic Input Validations
        IF p_rental_id IS NULL OR p_new_status IS NULL OR p_acting_user_id IS NULL THEN
            SET out_message = 'Error: Rental ID, New Status, and Acting User ID are required.';
            LEAVE THIS_PROC;
        END IF;

        -- 2. Start Transaction
        START TRANSACTION;

        -- 3. Fetch Current Rental and Item Owner Info
        SELECT
            r.rental_status, r.item_id, r.renter_id, i.owner_id
        INTO
            v_current_status, v_item_id, v_renter_id, v_owner_id
        FROM Rentals r
        JOIN Items i ON r.item_id = i.item_id
        WHERE r.rental_id = p_rental_id;

        IF v_current_status IS NULL THEN
            ROLLBACK;
            SET out_message = 'Error: Rental ID not found.';
            LEAVE THIS_PROC;
        END IF;

        IF v_current_status = p_new_status THEN
            ROLLBACK;
            SET out_message = 'Status is already set to the requested value.';
            LEAVE THIS_PROC;
        END IF;

        -- 4. Permission Checks and Transition Logic
        SET v_can_update = FALSE;

        CASE v_current_status
            WHEN 'requested' THEN
                IF p_new_status = 'confirmed' AND p_acting_user_id = v_owner_id THEN
                    SET v_can_update = TRUE;
                    SET v_notification_user_id = v_renter_id;
                    SET v_notification_message = CONCAT('Your rental request for item #', v_item_id, ' has been confirmed by the owner.');
                ELSEIF p_new_status = 'rejected' AND p_acting_user_id = v_owner_id THEN
                    SET v_can_update = TRUE;
                    SET v_item_update_needed = TRUE;
                    SET v_new_item_status = 'available';
                    SET v_notification_user_id = v_renter_id;
                    SET v_notification_message = CONCAT('Your rental request for item #', v_item_id, ' has been rejected by the owner.');
                ELSEIF p_new_status = 'cancelled' AND p_acting_user_id = v_renter_id THEN
                    SET v_can_update = TRUE;
                    SET v_item_update_needed = TRUE;
                    SET v_new_item_status = 'available';
                    SET v_notification_user_id = v_owner_id;
                    SET v_notification_message = CONCAT('Rental request #', p_rental_id, ' for your item #', v_item_id, ' has been cancelled by the renter.');
                ELSE
                    SET out_message = CONCAT('Error: Invalid status change from ''requested'' to ''', p_new_status, ''' or permission denied.');
                END IF;

            WHEN 'confirmed' THEN
                IF p_new_status = 'active' AND p_acting_user_id = v_renter_id THEN
                    SET v_can_update = TRUE;
                    SET v_item_update_needed = TRUE;
                    SET v_new_item_status = 'rented';
                    SET v_notification_user_id = v_owner_id;
                    SET v_notification_message = CONCAT('Item #', v_item_id, ' pickup confirmed by renter for rental #', p_rental_id, '. Rental is now active.');
                ELSEIF p_new_status = 'cancelled' THEN
                    IF p_acting_user_id = v_renter_id THEN
                        SET v_can_update = TRUE;
                        SET v_item_update_needed = TRUE;
                        SET v_new_item_status = 'available';
                        SET v_notification_user_id = v_owner_id;
                        SET v_notification_message = CONCAT('Confirmed rental #', p_rental_id, ' for your item #', v_item_id, ' has been cancelled by the renter.');
                    ELSEIF p_acting_user_id = v_owner_id THEN
                        SET v_can_update = TRUE;
                        SET v_item_update_needed = TRUE;
                        SET v_new_item_status = 'available';
                        SET v_notification_user_id = v_renter_id;
                        SET v_notification_message = CONCAT('Confirmed rental #', p_rental_id, ' for item #', v_item_id, ' has been cancelled by the owner.');
                    ELSE
                        SET out_message = 'Error: Permission denied to cancel confirmed rental.';
                    END IF;
                ELSE
                    SET out_message = CONCAT('Error: Invalid status change from ''confirmed'' to ''', p_new_status, ''' or permission denied.');
                END IF;

            WHEN 'active' THEN
                IF p_new_status = 'completed' AND p_acting_user_id = v_owner_id THEN
                    SET v_can_update = TRUE;
                    SET v_item_update_needed = TRUE;
                    SET v_new_item_status = 'available';
                    SET v_notification_user_id = v_renter_id;
                    SET v_notification_message = CONCAT('Rental #', p_rental_id, ' for item #', v_item_id, ' has been marked as completed by the owner.');
                ELSE
                    SET out_message = CONCAT('Error: Invalid status change from ''active'' to ''', p_new_status, ''' or permission denied.');
                END IF;

            WHEN 'completed' THEN
                SET out_message = 'Error: Cannot change status from ''completed''.';
            WHEN 'cancelled' THEN
                SET out_message = 'Error: Cannot change status from ''cancelled''.';
            WHEN 'rejected' THEN
                SET out_message = 'Error: Cannot change status from ''rejected''.';
            ELSE
                SET out_message = 'Error: Unknown current rental status.';
        END CASE;

        -- 5. Perform Updates
        IF v_can_update THEN
            UPDATE Rentals
            SET rental_status = p_new_status
            WHERE rental_id = p_rental_id;

            IF ROW_COUNT() = 1 THEN
                IF v_item_update_needed THEN
                    IF v_new_item_status = 'available' THEN
                        SELECT COUNT(*) INTO v_other_active_rentals
                        FROM Rentals
                        WHERE item_id = v_item_id
                            AND rental_id != p_rental_id
                            AND rental_status IN ('confirmed', 'active');

                        IF v_other_active_rentals = 0 THEN
                            UPDATE Items SET availability_status = 'available' WHERE item_id = v_item_id;
                        END IF;
                    ELSE
                        UPDATE Items SET availability_status = 'rented' WHERE item_id = v_item_id;
                    END IF;
                END IF;

                INSERT INTO Notifications (
                    user_id,
                    related_entity_id,
                    notification_type,
                    message
                ) VALUES (
                    v_notification_user_id,
                    p_rental_id,
                    CONCAT('rental_', p_new_status),
                    v_notification_message
                );

                COMMIT;
                SET out_message = CONCAT('Rental status updated successfully to ''', p_new_status, '''.');
            ELSE
                ROLLBACK;
                SET out_message = 'Error: Failed to update rental status. No changes made.';
            END IF;
        ELSE
            ROLLBACK;
            IF out_message = '' THEN
                SET out_message = 'Error: Status update not allowed or failed permission checks.';
            END IF;
        END IF;

    END THIS_PROC;
END //

-- Reset the delimiter
DELIMITER ;


DELIMITER //

DROP PROCEDURE IF EXISTS GetUserRentals;

CREATE PROCEDURE GetUserRentals(
    IN p_user_id INT,
    IN p_role VARCHAR(10), -- 'renter' or 'owner'
    OUT out_message VARCHAR(255)
)
BEGIN
    -- Wrapper block for structured LEAVE
    THIS_PROC: BEGIN

        -- Declare variables
        DECLARE v_user_exists INT DEFAULT 0;
        DECLARE v_role_normalized VARCHAR(10);

        -- Initialize output message
        SET out_message = '';

        -- --- 1. Input Validations ---
        IF p_user_id IS NULL OR p_role IS NULL OR p_role = '' THEN
            SET out_message = 'Error: User ID and Role (''renter'' or ''owner'') are required.';
            LEAVE THIS_PROC;
        END IF;

        -- Normalize role input
        SET v_role_normalized = LOWER(p_role);

        IF v_role_normalized NOT IN ('renter', 'owner') THEN
            SET out_message = 'Error: Invalid role specified. Use ''renter'' or ''owner''.';
            LEAVE THIS_PROC;
        END IF;

        -- Check if user exists
        SELECT COUNT(*) INTO v_user_exists FROM Users WHERE user_id = p_user_id;
        IF v_user_exists = 0 THEN
            SET out_message = 'Error: User ID not found.';
            LEAVE THIS_PROC;
        END IF;

        -- --- 2. Query Based on Role ---
        IF v_role_normalized = 'renter' THEN
            SELECT
                r.rental_id,
                r.item_id,
                i.name AS item_name,
                i.owner_id,
                own.username AS owner_username,
                r.start_date,
                r.end_date,
                r.agreed_price,
                r.rental_status
            FROM Rentals r
            JOIN Items i ON r.item_id = i.item_id
            JOIN Users own ON i.owner_id = own.user_id
            WHERE r.renter_id = p_user_id
            ORDER BY r.start_date DESC;

            SET out_message = 'Successfully retrieved rentals as renter.';

        ELSEIF v_role_normalized = 'owner' THEN
            SELECT
                r.rental_id,
                r.item_id,
                i.name AS item_name,
                r.renter_id,
                rnt.username AS renter_username,
                r.start_date,
                r.end_date,
                r.agreed_price,
                r.rental_status
            FROM Rentals r
            JOIN Items i ON r.item_id = i.item_id
            JOIN Users rnt ON r.renter_id = rnt.user_id
            WHERE i.owner_id = p_user_id
            ORDER BY r.start_date DESC;

            SET out_message = 'Successfully retrieved rentals as owner.';
        END IF;

    END THIS_PROC;
END //

DELIMITER ;
