DELIMITER //

DROP PROCEDURE IF EXISTS GetItemsByCategory; //

CREATE PROCEDURE GetItemsByCategory(
    IN p_category_id INT,                                         -- Mandatory category ID
    IN p_availability_status ENUM('available', 'rented', 'unavailable'), -- Optional filter
    IN p_min_price DECIMAL(10,2),                                 -- Optional filter
    IN p_max_price DECIMAL(10,2)                                  -- Optional filter
)
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
    WHERE
        -- Filter by the mandatory category ID
        category_id = p_category_id
        -- Optional: Filter by availability status if provided (if NULL, this condition is ignored)
      AND (p_availability_status IS NULL OR availability_status = p_availability_status)
        -- Optional: Filter by minimum price if provided (if NULL, this condition is ignored)
      AND (p_min_price IS NULL OR rental_price >= p_min_price)
        -- Optional: Filter by maximum price if provided (if NULL, this condition is ignored)
      AND (p_max_price IS NULL OR rental_price <= p_max_price)
    -- Order results, e.g., by price or date added
    ORDER BY
        date_added DESC, rental_price ASC; -- Example ordering: newest first, then cheapest

END //

-- Reset the delimiter back to semicolon
DELIMITER ; //



------------------------------------------
------------------------------------------

-- Make sure the FULLTEXT index exists:
-- CREATE FULLTEXT INDEX ft_item_search ON Items(name, description);

DELIMITER //

DROP PROCEDURE IF EXISTS SearchItems; //

CREATE PROCEDURE SearchItems(
    -- Input: Search terms for name/description (optional).
    IN p_search_terms VARCHAR(255),
    -- Input: Optional category filter. NULL ignores this filter.
    IN p_category_id INT,
    -- Input: Optional availability filter. NULL ignores this filter.
    IN p_availability_status ENUM('available', 'rented', 'unavailable'),
    -- Input: Optional minimum price filter. NULL ignores this filter.
    IN p_min_price DECIMAL(10,2),
    -- Input: Optional maximum price filter. NULL ignores this filter.
    IN p_max_price DECIMAL(10,2)
)
BEGIN
    DECLARE error_occurred BOOLEAN DEFAULT FALSE;

    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        SET error_occurred = TRUE;
    END;

    SELECT
        i.item_id,
        i.owner_id,
        i.category_id,
        c.name AS category_name,
        u.username AS owner_username, 
        i.name,
        i.description,
        i.rental_price,
        i.rental_unit,
        i.item_condition,
        i.availability_status,
        i.location_description,
        i.date_added,
        i.max_rental_duration
        -- Optionally include relevance score
        -- , MATCH(i.name, i.description) AGAINST(p_search_terms IN BOOLEAN MODE) AS relevance
    FROM
        Items AS i
    LEFT JOIN Categories c ON i.category_id = c.category_id -- Join to get category name
    LEFT JOIN Users u ON i.owner_id = u.user_id -- Join to get owner username
    WHERE
        -- Optional: FULLTEXT search condition
        ( (p_search_terms IS NULL OR p_search_terms = '') OR MATCH(i.name, i.description) AGAINST(p_search_terms IN BOOLEAN MODE) )

        -- Optional: Filter by category ID
        AND (p_category_id IS NULL OR i.category_id = p_category_id)

        -- Optional: Filter by availability status
        AND (p_availability_status IS NULL OR i.availability_status = p_availability_status)

        -- Optional: Filter by minimum price
        AND (p_min_price IS NULL OR i.rental_price >= p_min_price)

        -- Optional: Filter by maximum price
        AND (p_max_price IS NULL OR i.rental_price <= p_max_price);

END //

DELIMITER ; //


----------------------------------
------------AddToWishlist----------
----------------------------------

-- Change the delimiter
DELIMITER //

-- Drop existing procedure if it exists
DROP PROCEDURE IF EXISTS AddToWishlist; //

-- Create the procedure
CREATE PROCEDURE AddToWishlist(
    IN p_user_id INT,
    IN p_item_id INT,
    OUT out_message VARCHAR(255)
)
BEGIN
    -- Declare variables
    DECLARE duplicate_entry INT DEFAULT 0;
    DECLARE foreign_key_user_error INT DEFAULT 0;
    DECLARE foreign_key_item_error INT DEFAULT 0;

    -- Handler for Duplicate Key errors (UNIQUE constraint violation)
    DECLARE CONTINUE HANDLER FOR 1062
    BEGIN
        SET duplicate_entry = 1;
        SET out_message = 'Item is already in your wishlist.';
    END;

    -- Handler for Foreign Key constraint failures
    DECLARE CONTINUE HANDLER FOR 1452
    BEGIN
        IF (SELECT COUNT(*) FROM Users WHERE user_id = p_user_id) = 0 THEN
            SET foreign_key_user_error = 1;
            SET out_message = 'Error: User ID not found.';
        ELSEIF (SELECT COUNT(*) FROM Items WHERE item_id = p_item_id) = 0 THEN
            SET foreign_key_item_error = 1;
            SET out_message = 'Error: Item ID not found.';
        ELSE
             SET out_message = 'Error: User or Item reference invalid.';
        END IF;
    END;

    -- Generic handler for any other SQL exceptions
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        IF duplicate_entry = 0 AND foreign_key_user_error = 0 AND foreign_key_item_error = 0 THEN
            GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
            SET out_message = CONCAT('Error: Database operation failed (', @errno, ': ', @text, ').');
        END IF;
    END;

    -- Input Validation Check
    IF p_user_id IS NULL OR p_item_id IS NULL THEN
        SET out_message = 'Error: User ID and Item ID are required.';
    ELSE
        -- Proceed only if basic validation passes
        -- Optional: Add check to prevent users from wishlisting their own items here if needed

        -- Attempt to insert the record
        INSERT INTO WishlistItems (user_id, item_id)
        VALUES (p_user_id, p_item_id);

        -- Check if the insert succeeded without triggering known handlers
        IF duplicate_entry = 0 AND foreign_key_user_error = 0 AND foreign_key_item_error = 0 THEN
            IF ROW_COUNT() = 1 THEN
                 SET out_message = 'Item added to wishlist successfully.';
            ELSEIF out_message IS NULL OR out_message = '' THEN
                 -- If no error message was set by handlers and row count isn't 1, unexpected issue
                 SET out_message = 'Error: Failed to add item to wishlist for an unknown reason.';
            END IF;
            -- If a handler WAS triggered, its message (duplicate, FK error) is kept.
        END IF; -- end success check

    END IF; -- end validation check

END //

-- Reset the delimiter
DELIMITER ;



----------------------------------
----RemoveFromWishlist----------
----------------------------------



-- Change the delimiter
DELIMITER //

-- Drop existing procedure if it exists
DROP PROCEDURE IF EXISTS RemoveFromWishlist; //

-- Create the procedure
CREATE PROCEDURE RemoveFromWishlist(
    IN p_user_id INT,             -- The ID of the user removing the item
    IN p_item_id INT,             -- The ID of the item being removed
    OUT out_message VARCHAR(255) -- Feedback message
)
BEGIN
    -- Declare variable for row count
    DECLARE v_rows_affected INT DEFAULT 0;

    -- Generic handler for any SQL exceptions during DELETE
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET out_message = 'Error: Database operation failed during removal.';
    END;

    -- Input Validation
    IF p_user_id IS NULL OR p_item_id IS NULL THEN
        SET out_message = 'Error: User ID and Item ID are required.';
    ELSE
        -- Proceed only if validation passes

        -- Attempt to delete the record
        DELETE FROM WishlistItems
        WHERE user_id = p_user_id AND item_id = p_item_id;

        -- Check how many rows were deleted
        SET v_rows_affected = ROW_COUNT();

        -- Set the output message based on whether the delete happened
        IF v_rows_affected = 1 THEN
            SET out_message = 'Item removed from wishlist successfully.';
        ELSEIF v_rows_affected = 0 THEN
            -- No rows deleted - either user/item ID invalid or item wasn't in wishlist
            SET out_message = 'Item was not found in your wishlist.';
        ELSE
            -- Should not happen if constraint UNIQUE(user_id, item_id) exists
            SET out_message = 'Warning: Multiple items removed from wishlist. Check data integrity.';
        END IF;

    END IF; -- end validation check

END //

-- Reset the delimiter
DELIMITER ;




----------------------------------
----RemoveFromWishlist----------
----------------------------------


-- Change the delimiter
DELIMITER //

-- Drop existing procedure if it exists
DROP PROCEDURE IF EXISTS GetUserWishlist; //

-- Create the procedure
CREATE PROCEDURE GetUserWishlist(
    IN p_user_id INT -- The ID of the user whose wishlist is requested
)
BEGIN
    -- Select details for items in the user's wishlist
    -- Joins WishlistItems with Items table
    SELECT
        i.item_id,
        i.owner_id,       -- Included for context, consider joining Users if owner name needed
        i.category_id,    -- Included for context, consider joining Categories if name needed
        i.name,
        i.description,
        i.rental_price,
        i.rental_unit,
        i.item_condition,
        i.availability_status,
        i.location_description,
        i.date_added AS item_listing_date, -- Date the item was originally listed
        i.max_rental_duration,
        wl.date_added AS date_wishlisted    -- Date the item was added to this user's wishlist
        -- Select additional ItemImages (e.g., primary image URL) via subquery or LEFT JOIN if needed
        -- (SELECT image_url FROM ItemImages WHERE item_id = i.item_id AND is_primary = TRUE LIMIT 1) AS primary_image_url
    FROM
        WishlistItems AS wl
    INNER JOIN
        Items AS i ON wl.item_id = i.item_id
    WHERE
        wl.user_id = p_user_id
    ORDER BY
        wl.date_added DESC; -- Order by when the item was added to the wishlist (most recent first)

    -- If the user ID is invalid or the wishlist is empty, an empty result set will be returned.

END //

-- Reset the delimiter
DELIMITER ; //
