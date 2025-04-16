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

    -- Begin the labeled block here
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
