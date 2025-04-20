
-- Change the delimiter to handle the procedure body
DELIMITER //

-- Drop the procedure if it already exists
DROP PROCEDURE IF EXISTS UpdateItemDetails //

-- Create the stored procedure
CREATE PROCEDURE UpdateItemDetails(
    -- Input parameters
    IN p_item_id INT,
    IN p_acting_user_id INT,
    IN p_category_id INT,
    IN p_name VARCHAR(100),
    IN p_description TEXT,
    IN p_rental_price DECIMAL(10, 2),
    IN p_rental_unit ENUM('hour', 'day', 'week', 'month'),
    IN p_item_condition ENUM('new', 'like new', 'good', 'fair'),
    IN p_location_description VARCHAR(255),
    IN p_max_rental_duration INT,
    
    -- Output parameter
    OUT out_message VARCHAR(255)
)
BEGIN
    -- Begin labeled block for LEAVE
    main_block: BEGIN

        -- Declare variables
        DECLARE v_current_owner_id INT;
        DECLARE v_category_exists INT DEFAULT 0;
        DECLARE v_rows_affected INT DEFAULT 0;

        -- Error handler
        DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            GET DIAGNOSTICS CONDITION 1 
                @sqlstate = RETURNED_SQLSTATE, 
                @errno = MYSQL_ERRNO, 
                @text = MESSAGE_TEXT;
            SET out_message = CONCAT('Error: Database error occurred - ', @errno, ': ', @text);
        END;

        -- Initialize message
        SET out_message = '';

        -- 1. Validate required inputs
        IF p_item_id IS NULL OR p_acting_user_id IS NULL THEN
            SET out_message = 'Error: Item ID and Acting User ID are required.';
            LEAVE main_block;
        END IF;

        -- 2. Validate rental price
        IF p_rental_price IS NOT NULL AND p_rental_price <= 0 THEN
            SET out_message = 'Error: If provided, Rental Price must be positive.';
            LEAVE main_block;
        END IF;

        -- 3. Validate category if provided
        IF p_category_id IS NOT NULL THEN
            SELECT COUNT(*) INTO v_category_exists
            FROM Categories
            WHERE category_id = p_category_id;
            
            IF v_category_exists = 0 THEN
                SET out_message = 'Error: Provided Category ID does not exist.';
                LEAVE main_block;
            END IF;
        END IF;

        -- 4. Check item and ownership
        SELECT owner_id INTO v_current_owner_id
        FROM Items
        WHERE item_id = p_item_id;

        IF v_current_owner_id IS NULL THEN
            SET out_message = 'Error: Item ID not found.';
            LEAVE main_block;
        END IF;

        IF v_current_owner_id != p_acting_user_id THEN
            SET out_message = 'Error: Permission denied. You are not the owner of this item.';
            LEAVE main_block;
        END IF;

        -- 5. Perform the update
        UPDATE Items
        SET
            category_id          = COALESCE(p_category_id, category_id),
            name                 = COALESCE(p_name, name),
            description          = COALESCE(p_description, description),
            rental_price         = COALESCE(p_rental_price, rental_price),
            rental_unit          = COALESCE(p_rental_unit, rental_unit),
            item_condition       = COALESCE(p_item_condition, item_condition),
            location_description = CASE
                                       WHEN p_location_description IS NULL THEN location_description
                                       WHEN p_location_description = '' THEN NULL
                                       ELSE p_location_description
                                   END,
            max_rental_duration  = p_max_rental_duration
        WHERE item_id = p_item_id;

        -- 6. Check and return message
        SET v_rows_affected = ROW_COUNT();

        IF v_rows_affected >= 0 THEN
            SET out_message = 'Item details update processed successfully.';
            IF v_rows_affected = 0 THEN
                SET out_message = CONCAT(out_message, ' (No data fields were changed).');
            END IF;
        ELSE
            SET out_message = 'Error: Failed to process item update.';
        END IF;

    END main_block;
END //

-- Reset the delimiter
DELIMITER ;


-- Change the delimiter to handle the procedure body
DELIMITER //

-- Drop the procedure if it already exists to allow recreation
DROP PROCEDURE IF EXISTS ListItem;

-- Create the stored procedure
CREATE PROCEDURE ListItem(
    -- Input parameters for item details
    IN p_owner_id INT,
    IN p_category_id INT,
    IN p_name VARCHAR(100),
    IN p_description TEXT,
    IN p_rental_price DECIMAL(10, 2),
    IN p_rental_unit ENUM('hour', 'day', 'week', 'month'),
    IN p_item_condition ENUM('new', 'like new', 'good', 'fair'),
    IN p_location_description VARCHAR(255),
    IN p_max_rental_duration INT,
    IN p_primary_image_url VARCHAR(255), -- Optional: URL for the primary image

    -- Output parameters for feedback
    OUT out_item_id INT,         -- Will contain the new item_id if successful
    OUT out_message VARCHAR(255) -- Will contain a success or error message
)
BEGIN
    -- Begin labeled block for LEAVE
    main_block: BEGIN

        -- Declare variables
        DECLARE v_owner_exists INT DEFAULT 0;
        DECLARE v_category_exists INT DEFAULT 0;
        DECLARE v_new_item_id INT DEFAULT NULL;

        -- Declare handler for unexpected SQL errors during transaction
        DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            ROLLBACK; -- Rollback transaction on any SQL error
            SET out_item_id = NULL;
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
            SET out_message = CONCAT('Error: Database error occurred - ', @errno, ': ', @text);
        END;

        -- Initialize output params
        SET out_item_id = NULL;
        SET out_message = '';

        -- --- 1. Basic Input Validations ---
        IF p_owner_id IS NULL OR p_category_id IS NULL OR
           p_name IS NULL OR p_name = '' OR
           p_description IS NULL OR p_description = '' OR
           p_rental_price IS NULL OR p_rental_price <= 0 OR -- Price should be positive
           p_rental_unit IS NULL OR
           p_item_condition IS NULL THEN
            SET out_message = 'Error: Owner ID, Category ID, Name, Description, valid Rental Price, Rental Unit, and Item Condition are required.';
            LEAVE main_block;
        END IF;

        -- --- 2. Check Foreign Key Existence ---
        SELECT COUNT(*) INTO v_owner_exists FROM Users WHERE user_id = p_owner_id;
        IF v_owner_exists = 0 THEN
            SET out_message = 'Error: Owner User ID does not exist.';
            LEAVE main_block;
        END IF;

        SELECT COUNT(*) INTO v_category_exists FROM Categories WHERE category_id = p_category_id;
        IF v_category_exists = 0 THEN
            SET out_message = 'Error: Category ID does not exist.';
            LEAVE main_block;
        END IF;

        -- --- Start Transaction ---
        START TRANSACTION;

        -- --- 3. Insert into Items Table ---
        INSERT INTO Items (
            owner_id,
            category_id,
            name,
            description,
            rental_price,
            rental_unit,
            item_condition,
            location_description,
            max_rental_duration
            -- availability_status defaults to 'available'
            -- date_added defaults to CURRENT_TIMESTAMP
        ) VALUES (
            p_owner_id,
            p_category_id,
            p_name,
            p_description,
            p_rental_price,
            p_rental_unit,
            p_item_condition,
            NULLIF(p_location_description, ''), -- Store NULL if empty string provided
            p_max_rental_duration -- Allow NULL if not provided
        );

        -- Get the ID of the newly inserted item
        SET v_new_item_id = LAST_INSERT_ID();

        -- Check if item insert was successful
        IF v_new_item_id IS NULL OR v_new_item_id <= 0 THEN
            -- This case should ideally be caught by the SQLEXCEPTION handler, but added as safety
            ROLLBACK;
            SET out_message = 'Error: Failed to insert item or retrieve item ID.';
            LEAVE main_block;
        END IF;

        -- --- 4. Optionally Insert Primary Image ---
        IF p_primary_image_url IS NOT NULL AND p_primary_image_url != '' THEN
            INSERT INTO ItemImages (
                item_id,
                image_url,
                is_primary
                -- upload_date defaults to CURRENT_TIMESTAMP
            ) VALUES (
                v_new_item_id,
                p_primary_image_url,
                TRUE -- Mark this image as the primary one
            );

             -- Check if image insert was successful (ROW_COUNT = 1)
             IF ROW_COUNT() != 1 THEN
                  -- If image insert fails, rollback the entire transaction
                  ROLLBACK;
                  SET out_item_id = NULL; -- Reset output item ID
                  SET out_message = 'Error: Failed to insert primary image. Item creation rolled back.';
                  LEAVE main_block;
             END IF;
        END IF;

        -- --- 5. Commit Transaction & Set Success Message ---
        COMMIT;
        SET out_item_id = v_new_item_id; -- Return the new item ID
        SET out_message = 'Item listed successfully.';
        IF p_primary_image_url IS NOT NULL AND p_primary_image_url != '' THEN
            SET out_message = CONCAT(out_message, ' Primary image added.');
        END IF;

    END main_block;
END //

-- Reset the delimiter back to semicolon
DELIMITER ;





-- Change the delimiter to handle the procedure body
DELIMITER //

-- Drop the procedure if it already exists to allow recreation
DROP PROCEDURE IF EXISTS UpdateItemAvailability;

-- Create the stored procedure
CREATE PROCEDURE UpdateItemAvailability(
    -- Input parameters
    IN p_item_id INT,
    IN p_new_status ENUM('available', 'rented', 'unavailable'),

    -- Output parameter for feedback
    OUT out_message VARCHAR(255)
)
BEGIN
    -- Begin labeled block for LEAVE
    main_block: BEGIN

        -- Declare variables
        DECLARE v_item_exists INT DEFAULT 0;
        DECLARE v_current_status ENUM('available', 'rented', 'unavailable');
        DECLARE v_rows_affected INT DEFAULT 0;

        -- Error handler for unexpected SQL errors
        DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
            SET out_message = CONCAT('Error: Database error occurred - ', @errno, ': ', @text);
        END;

        -- Initialize output message
        SET out_message = '';

        -- --- 1. Input Validations ---
        IF p_item_id IS NULL OR p_new_status IS NULL THEN
            SET out_message = 'Error: Item ID and New Availability Status are required.';
            LEAVE main_block;
        END IF;

        -- --- 2. Check if Item Exists and get current status ---
        SELECT COUNT(*), availability_status INTO v_item_exists, v_current_status
        FROM Items
        WHERE item_id = p_item_id
        GROUP BY availability_status; -- Required for using INTO with aggregate COUNT

        IF v_item_exists = 0 THEN
            SET out_message = 'Error: Item ID not found.';
            LEAVE main_block;
        END IF;

        -- --- 3. Check if Status is Already Set ---
        IF v_current_status = p_new_status THEN
            SET out_message = CONCAT('Item availability status is already set to ''', p_new_status, '''. No update performed.');
            LEAVE main_block;
        END IF;

        -- --- 4. Update the Item Availability Status ---
        UPDATE Items
        SET
            availability_status = p_new_status
        WHERE
            item_id = p_item_id;

        -- --- 5. Set Feedback Message ---
        SET v_rows_affected = ROW_COUNT();

        IF v_rows_affected = 1 THEN
            SET out_message = CONCAT('Item availability status updated successfully to ''', p_new_status, '''.');
        ELSEIF v_rows_affected = 0 THEN
            -- This case should be caught by step 3 if status was same,
            -- or step 2 if item didn't exist, but added as safety.
             SET out_message = 'Warning: Item status update did not affect any rows. Status might already be set or item ID invalid.';
        ELSE
            -- Should not happen with primary key match
            SET out_message = 'Error: Update affected multiple rows unexpectedly. Check data integrity.';
        END IF;

    END main_block;
END //

-- Reset the delimiter back to semicolon
DELIMITER ;



-- Change the delimiter to handle the procedure body
DELIMITER //

-- Drop the procedure if it already exists to allow recreation
DROP PROCEDURE IF EXISTS GetItemDetails;//

-- Create the stored procedure
CREATE PROCEDURE GetItemDetails(
    -- Input parameter
    IN p_item_id INT -- The ID of the item to fetch details for
)
BEGIN
    -- Select detailed information joining Items, Users (owner), and Categories
    SELECT
        i.item_id,
        i.name AS item_name,
        i.description,
        i.rental_price,
        i.rental_unit,
        i.item_condition,
        i.availability_status,
        i.location_description,
        i.date_added,
        i.max_rental_duration,
        u.user_id AS owner_id,
        u.username AS owner_username,
        u.first_name AS owner_first_name,
        u.last_name AS owner_last_name,
        u.email AS owner_email, -- Added owner email as potentially useful contact info
        c.category_id,
        c.name AS category_name,
        c.description AS category_description
    FROM Items i
    JOIN Users u ON i.owner_id = u.user_id         -- Join with Users to get owner details
    JOIN Categories c ON i.category_id = c.category_id -- Join with Categories to get category details
    WHERE i.item_id = p_item_id;                   -- Filter by the provided item ID

    -- If no item matches p_item_id, this SELECT will return an empty result set.
    -- No explicit OUT parameters are needed; the result set IS the output.

END;//

-- Reset the delimiter back to semicolon
DELIMITER ;




-- Change the delimiter to handle the procedure body
DELIMITER //

-- Drop the procedure if it already exists to allow recreation
DROP PROCEDURE IF EXISTS AddItemImage;

-- Create the stored procedure
CREATE PROCEDURE AddItemImage(
    -- Input parameters
    IN p_item_id INT,                 -- The ID of the item the image belongs to
    IN p_image_url VARCHAR(255),      -- The URL of the new image
    IN p_is_primary BOOLEAN,          -- Whether this image should be the primary one

    -- Output parameters for feedback
    OUT out_image_id INT,             -- The ID of the newly inserted image
    OUT out_message VARCHAR(255)      -- Will contain a success or error message
)
BEGIN
    -- Begin labeled block for LEAVE
    main_block: BEGIN

        -- Declare variables
        DECLARE v_item_exists INT DEFAULT 0;
        DECLARE v_new_image_id INT DEFAULT NULL;

        -- Declare handler for unexpected SQL errors during transaction
        DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            ROLLBACK; -- Rollback transaction on any SQL error
            SET out_image_id = NULL;
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
            SET out_message = CONCAT('Error: Database error occurred - ', @errno, ': ', @text);
        END;

        -- Initialize output params
        SET out_image_id = NULL;
        SET out_message = '';

        -- --- 1. Input Validations ---
        IF p_item_id IS NULL OR p_image_url IS NULL OR p_image_url = '' OR p_is_primary IS NULL THEN
            SET out_message = 'Error: Item ID, Image URL, and Is Primary flag are required.';
            LEAVE main_block;
        END IF;

        -- --- 2. Check Foreign Key Existence ---
        SELECT COUNT(*) INTO v_item_exists FROM Items WHERE item_id = p_item_id;
        IF v_item_exists = 0 THEN
            SET out_message = 'Error: Item ID does not exist.';
            LEAVE main_block;
        END IF;

        -- --- Start Transaction ---
        -- Transaction needed especially if handling the 'is_primary' flag atomically
        START TRANSACTION;

        -- --- 3. Handle 'is_primary' Flag ---
        -- If the new image is intended to be primary, first unset any other primary image for this item
        IF p_is_primary = TRUE THEN
            UPDATE ItemImages
            SET is_primary = FALSE
            WHERE item_id = p_item_id AND is_primary = TRUE;
            -- It's okay if this affects 0 rows (no previous primary image existed)
        END IF;

        -- --- 4. Insert the New Image Record ---
        INSERT INTO ItemImages (
            item_id,
            image_url,
            is_primary
            -- upload_date defaults to CURRENT_TIMESTAMP
        ) VALUES (
            p_item_id,
            p_image_url,
            p_is_primary
        );

        -- Get the ID of the newly inserted image
        SET v_new_image_id = LAST_INSERT_ID();

        -- Check if image insert was successful
        IF v_new_image_id IS NULL OR v_new_image_id <= 0 THEN
            ROLLBACK;
            SET out_message = 'Error: Failed to insert image or retrieve image ID.';
            LEAVE main_block;
        ELSE
            -- --- 5. Commit Transaction & Set Success Message ---
            COMMIT;
            SET out_image_id = v_new_image_id; -- Return the new image ID
            SET out_message = 'Image added successfully.';
            IF p_is_primary = TRUE THEN
                 SET out_message = CONCAT(out_message, ' Marked as primary.');
            END IF;
        END IF;

    END main_block;
END //

-- Reset the delimiter back to semicolon
DELIMITER ;




-- Change the delimiter to handle the procedure body
DELIMITER //

-- Drop the procedure if it already exists to allow recreation
DROP PROCEDURE IF EXISTS DeleteItem;

-- Create the stored procedure
CREATE PROCEDURE DeleteItem(
    -- Input parameters
    IN p_item_id INT,                 -- The ID of the item to delete
    IN p_acting_user_id INT,          -- The ID of the user attempting the deletion

    -- Output parameter for feedback
    OUT out_message VARCHAR(255)     -- Will contain a success or error message
)
BEGIN
    -- Begin labeled block for LEAVE
    main_block: BEGIN

        -- Declare variables
        DECLARE v_owner_id INT;
        DECLARE v_active_rental_count INT DEFAULT 0;
        DECLARE v_rows_affected INT DEFAULT 0;

        -- Declare handler for FK constraint errors (like ON DELETE RESTRICT)
        -- and other unexpected SQL errors
        DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            GET DIAGNOSTICS CONDITION 1
                @sqlstate = RETURNED_SQLSTATE,
                @errno = MYSQL_ERRNO,
                @text = MESSAGE_TEXT;

            -- Check if it's specifically the foreign key restriction from Rentals
            IF @errno = 1451 AND @text LIKE '%CONSTRAINT `Rentals_ibfk_1`%' THEN -- Adjust constraint name if different
                SET out_message = 'Error: Cannot delete item. It is referenced in existing rentals. Please ensure all rentals are completed or cancelled.';
            ELSE
                SET out_message = CONCAT('Error: Database error occurred - ', @errno, ': ', @text);
            END IF;
        END;

        -- Initialize output message
        SET out_message = '';

        -- --- 1. Input Validations ---
        IF p_item_id IS NULL OR p_acting_user_id IS NULL THEN
            SET out_message = 'Error: Item ID and Acting User ID are required.';
            LEAVE main_block;
        END IF;

        -- --- 2. Fetch Current Owner & Check Item Existence ---
        SELECT owner_id INTO v_owner_id
        FROM Items
        WHERE item_id = p_item_id;

        IF v_owner_id IS NULL THEN
            SET out_message = 'Error: Item ID not found.';
            LEAVE main_block;
        END IF;

        -- --- 3. Permission Check ---
        IF v_owner_id != p_acting_user_id THEN
            SET out_message = 'Error: Permission denied. You are not the owner of this item.';
            LEAVE main_block;
        END IF;

        -- --- 4. Check for Active or Confirmed Rentals (Proactive Check) ---
        -- This check is good practice before attempting the DELETE,
        -- even though the FK constraint provides the ultimate protection.
        SELECT COUNT(*) INTO v_active_rental_count
        FROM Rentals
        WHERE item_id = p_item_id
          AND rental_status IN ('confirmed', 'active'); -- Check statuses that prevent deletion

        IF v_active_rental_count > 0 THEN
            SET out_message = 'Error: Cannot delete item while it has active or confirmed rentals.';
            LEAVE main_block;
        END IF;

        -- --- 5. Attempt to Delete the Item ---
        -- ON DELETE CASCADE on ItemImages and WishlistItems will handle those.
        -- ON DELETE RESTRICT on Rentals should prevent deletion if any rentals still exist
        -- (our check above should prevent hitting this, but it's the final safeguard).
        -- ON DELETE SET NULL on Messages will handle messages.
        DELETE FROM Items
        WHERE item_id = p_item_id;

        -- --- 6. Set Feedback Message based on ROW_COUNT ---
        SET v_rows_affected = ROW_COUNT();

        IF v_rows_affected = 1 THEN
            SET out_message = 'Item deleted successfully. Associated images and wishlist entries also removed.';
        ELSEIF v_rows_affected = 0 THEN
            -- This means the item was not found *at the time of delete*,
            -- even though it was found in step 2. Could be a race condition,
            -- or the FK constraint blocked it silently (less likely).
            -- The EXIT HANDLER is more likely to catch FK errors.
            SET out_message = 'Error: Item not found during delete operation or deletion was blocked. No item deleted.';
        ELSE
             -- Should not happen with primary key match
             SET out_message = 'Error: Delete affected multiple rows unexpectedly. Check data integrity.';
        END IF;

    END main_block;
END //

-- Reset the delimiter back to semicolon
DELIMITER ;


DELIMITER //

DROP PROCEDURE IF EXISTS GetAllItems; //

CREATE PROCEDURE GetAllItems()
BEGIN
    SELECT
        item_id,
        owner_id,
        category_id,
        name,
        description,
        rental_price,
        rental_unit,
        item_condition,
        availability_status,
        location_description,
        date_added,
        max_rental_duration
    FROM Items
    ORDER BY date_added DESC;
END //

DELIMITER ;

call GetAllItems();



DELIMITER //

DROP PROCEDURE IF EXISTS GetItemsByOwner;//

CREATE PROCEDURE GetItemsByOwner(
    IN p_owner_id INT
)
BEGIN
    SELECT
        item_id,
        category_id,
        name,
        description,
        rental_price,
        rental_unit,
        item_condition,
        availability_status,
        location_description,
        date_added,
        max_rental_duration
    FROM Items
    WHERE owner_id = p_owner_id
    ORDER BY date_added DESC;
END;//

DELIMITER ;
