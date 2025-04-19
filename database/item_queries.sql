-- Declare output variable
SET @message = '';

-- Example 1: Update price and condition for item_id = 1 (owned by user 1)
CALL UpdateItemDetails(
    1,          -- p_item_id
    1,          -- p_acting_user_id (MUST be the owner)
    NULL,       -- p_category_id (Not changing)
    NULL,       -- p_name (Not changing)
    NULL,       -- p_description (Not changing)
    12.50,      -- p_rental_price (New price)
    NULL,       -- p_rental_unit (Not changing)
    'fair',     -- p_item_condition (New condition)
    NULL,       -- p_location_description (Not changing)
    NULL,       -- p_max_rental_duration (Not changing)
    @message
);
SELECT @message; -- Should be successful

-- Example 2: Clear location and max duration for item_id = 2 (owned by user 2)
CALL UpdateItemDetails(
    2,          -- p_item_id
    2,          -- p_acting_user_id
    NULL, NULL, NULL, NULL, NULL, NULL,
    '',         -- p_location_description (Pass empty string to set NULL)
    NULL,       -- p_max_rental_duration (Pass NULL to set NULL)
    @message
);
SELECT @message; -- Should be successful

-- Example 3: Attempt update by wrong user (user 3 tries to update item 1)
CALL UpdateItemDetails(
    1,          -- p_item_id
    3,          -- p_acting_user_id (Incorrect owner)
    NULL, 'New Name', NULL, NULL, NULL, NULL, NULL, NULL,
    @message
);
SELECT @message; -- Should show 'Error: Permission denied...'

-- Example 4: Try to update non-existent item
CALL UpdateItemDetails(
    999,        -- p_item_id
    1,          -- p_acting_user_id
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    @message
);
SELECT @message; -- Should show 'Error: Item ID not found.'


-- Declare output variables (initialize for each call or reuse)
SET @new_item_id = NULL;
SET @message = '';

-- Example 1: List an item WITH a primary image
-- Assume user_id=1 and category_id=6 exist
CALL ListItem(
    1,                          -- p_owner_id (Aman Kumar)
    6,                          -- p_category_id (Room Essentials)
    'Used Study Lamp',          -- p_name
    'Working study lamp, adjustable neck. Bulb included.', -- p_description
    10.00,                      -- p_rental_price
    'day',                      -- p_rental_unit
    'good',                     -- p_item_condition
    'CV Raman, Ask Room 101',   -- p_location_description
    14,                         -- p_max_rental_duration (days)
    'url/studylamp_primary.jpg',-- p_primary_image_url
    @new_item_id,               -- OUT variable for new item ID
    @message                    -- OUT variable for status message
);

-- Check results after calling
SELECT @new_item_id AS NewItemID, @message AS ResultMessage;
-- Expected: A new item ID (e.g., 22) and 'Item listed successfully. Primary image added.'

-- ----------------------------------------------------

-- Example 2: List an item WITHOUT providing a primary image
-- Assume user_id=2 and category_id=2 exist
CALL ListItem(
    2,                          -- p_owner_id (Priya Sharma)
    2,                          -- p_category_id (Books)
    'Operating System Concepts',-- p_name
    '8th Edition textbook by Silberschatz, Galvin, Gagne. Good for CSE courses.', -- p_description
    40.00,                      -- p_rental_price
    'week',                     -- p_rental_unit
    'fair',                     -- p_item_condition
    NULL,                       -- p_location_description (No location provided)
    NULL,                       -- p_max_rental_duration (No limit)
    NULL,                       -- p_primary_image_url (No image provided)
    @new_item_id,
    @message
);

-- Check results after calling
SELECT @new_item_id AS NewItemID, @message AS ResultMessage;
-- Expected: A new item ID (e.g., 23) and 'Item listed successfully.'

-- ----------------------------------------------------

-- Example 3: Attempt to list with a non-existent Owner ID
CALL ListItem(
    999,                        -- p_owner_id (Assuming User ID 999 does NOT exist)
    1,                          -- p_category_id
    'Test Item Fail Owner', 'Desc', 5.00, 'day', 'new', NULL, NULL, NULL,
    @new_item_id,
    @message
);

-- Check results after calling
SELECT @new_item_id AS NewItemID, @message AS ResultMessage;
-- Expected: NULL for NewItemID and 'Error: Owner User ID does not exist.'

-- ----------------------------------------------------

-- Example 4: Attempt to list with an invalid (non-positive) price
CALL ListItem(
    3,                          -- p_owner_id (Assuming User ID 3 exists)
    1,                          -- p_category_id
    'Test Item Price Fail', 'Desc', -5.00, 'day', 'new', NULL, NULL, NULL,
    @new_item_id,
    @message
);

-- Check results after calling
SELECT @new_item_id AS NewItemID, @message AS ResultMessage;
-- Expected: NULL for NewItemID and 'Error: Owner ID, Category ID, Name, Description, valid Rental Price, Rental Unit, and Item Condition are required.'

-- ----------------------------------------------------

-- Example 5: Attempt to list without a required field (e.g., name)
CALL ListItem(
    4, 1, NULL, 'Desc', 10.00, 'day', 'new', NULL, NULL, NULL,
    @new_item_id,
    @message
);

-- Check results after calling
SELECT @new_item_id AS NewItemID, @message AS ResultMessage;
-- Expected: NULL for NewItemID and 'Error: Owner ID, Category ID, Name, Description, valid Rental Price, Rental Unit, and Item Condition are required.'

-- Declare output variable
SET @message = '';

-- Example 1: Mark item_id = 1 as 'rented' (assuming it's currently 'available')
CALL UpdateItemAvailability(1, 'rented', @message);
SELECT @message; -- Expected: 'Item availability status updated successfully to 'rented'.'

-- Example 2: Mark item_id = 1 back to 'available'
CALL UpdateItemAvailability(1, 'available', @message);
SELECT @message; -- Expected: 'Item availability status updated successfully to 'available'.'

-- Example 3: Try setting item_id = 1 to 'available' again (no change)
CALL UpdateItemAvailability(1, 'available', @message);
SELECT @message; -- Expected: 'Item availability status is already set to 'available'. No update performed.'

-- Example 4: Try updating a non-existent item
CALL UpdateItemAvailability(999, 'unavailable', @message);
SELECT @message; -- Expected: 'Error: Item ID not found.'

-- Example 5: Try providing invalid status (Database handles ENUM error usually)
-- This call might raise a direct database error depending on strict modes,
-- or the procedure might not even be created if the ENUM doesn't match.
-- CALL UpdateItemAvailability(1, 'broken', @message);
-- SELECT @message;

-- Example 6: Try providing NULL status
CALL UpdateItemAvailability(1, NULL, @message);
SELECT @message; -- Expected: 'Error: Item ID and New Availability Status are required.'




-- Example 1: Get details for item_id = 1 (Casio Calculator)
CALL GetItemDetails(1);
-- Output: A single row containing all details for item 1, including owner (Aman) and category (Stationery) info.

-- Example 2: Get details for item_id = 9 (Hercules Cycle)
CALL GetItemDetails(9);
-- Output: A single row containing all details for item 9, including owner (Kavita) and category (Cycles) info.

-- Example 3: Get details for a non-existent item_id
CALL GetItemDetails(999);
-- Output: An empty result set (no rows returned).



-- Declare output variables
SET @new_image_id = NULL;
SET @message = '';

-- Example 1: Add a PRIMARY image to item_id = 1
CALL AddItemImage(
    1,                          -- p_item_id
    'url/item1_NEW_primary.jpg', -- p_image_url
    TRUE,                       -- p_is_primary
    @new_image_id,
    @message
);
-- Check results (any previous primary image for item 1 should now be is_primary=FALSE)
SELECT @new_image_id, @message;

-- Example 2: Add a NON-primary image to item_id = 1
CALL AddItemImage(
    1,                          -- p_item_id
    'url/item1_extra.jpg',      -- p_image_url
    FALSE,                      -- p_is_primary
    @new_image_id,
    @message
);
-- Check results
SELECT @new_image_id, @message;

-- Example 3: Add another PRIMARY image to item_id = 1 (this will make the one from Ex1 non-primary)
CALL AddItemImage(
    1,                          -- p_item_id
    'url/item1_LATEST_primary.png',-- p_image_url
    TRUE,                       -- p_is_primary
    @new_image_id,
    @message
);
-- Check results
SELECT @new_image_id, @message;

-- Example 4: Attempt to add image to non-existent item
CALL AddItemImage(
    999,                        -- p_item_id (invalid)
    'url/some_image.jpg',
    FALSE,
    @new_image_id,
    @message
);
-- Check results
SELECT @new_image_id, @message; -- Expected: NULL and 'Error: Item ID does not exist.'

-- Example 5: Attempt to add with empty URL
CALL AddItemImage(
    1,
    '',                         -- p_image_url (empty)
    FALSE,
    @new_image_id,
    @message
);
-- Check results
SELECT @new_image_id, @message; -- Expected: NULL and 'Error: Item ID, Image URL, and Is Primary flag are required.'



-- Declare output variable
SET @message = '';

-- Example 1: Delete item_id = 21 (Pendrive, owned by user 20), assuming no active/confirmed rentals
CALL DeleteItem(21, 20, @message);
SELECT @message; -- Expected: 'Item deleted successfully...'

-- Example 2: Attempt to delete item_id = 2 (Hero Cycle, owned by user 2) which has active/confirmed rentals (e.g., rental_id=1)
CALL DeleteItem(2, 2, @message);
SELECT @message; -- Expected: 'Error: Cannot delete item while it has active or confirmed rentals.'

-- Example 3: Attempt by wrong user (user 1 tries to delete item 2 owned by user 2)
CALL DeleteItem(2, 1, @message);
SELECT @message; -- Expected: 'Error: Permission denied. You are not the owner of this item.'

-- Example 4: Attempt to delete non-existent item
CALL DeleteItem(999, 1, @message);
SELECT @message; -- Expected: 'Error: Item ID not found.'


CALL DeleteItem(2	,2,@message);
CALL DeleteItem(3	,3,@message);
CALL DeleteItem(4	,4,@message);
CALL DeleteItem(5	,5,@message);
CALL DeleteItem(6	,1,@message);
CALL DeleteItem(7	,6,@message);
CALL DeleteItem(8	,7,@message);
CALL DeleteItem(9	,8,@message);
CALL DeleteItem(10,	9,@message);
CALL DeleteItem(11,	10,@message);
CALL DeleteItem(12,	11,@message);
CALL DeleteItem(13,	12,@message);
CALL DeleteItem(14,	13,@message);
CALL DeleteItem(15,	14,@message);
CALL DeleteItem(16,	15,@message);
CALL DeleteItem(17,	16,@message);
CALL DeleteItem(18,	17,@message);
CALL DeleteItem(19,	18,@message);
CALL DeleteItem(20,	19,@message);
CALL DeleteItem(22,	1,@message);
CALL DeleteItem(23,	2,@message);
CALL DeleteItem(24,	1,@message);
CALL DeleteItem(25,	2,@message);
CALL DeleteItem(26,	26,@message);
CALL DeleteItem(27,	29,@message);
CALL DeleteItem(28,	29,@message);
	