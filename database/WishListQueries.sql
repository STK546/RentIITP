-- Get all items in Category 1 (Electronics), no other filters
CALL GetItemsByCategory(1, NULL, NULL, NULL);

-- Get only 'available' items in Category 3 (Cycles)
CALL GetItemsByCategory(3, 'available', NULL, NULL);

-- Get available items in Category 1 (Electronics) between 10.00 and 50.00 price
CALL GetItemsByCategory(1, 'available', 10.00, 50.00);

-- Get all items (any status) in Category 2 (Books) cheaper than or equal to 40.00
CALL GetItemsByCategory(2, NULL, NULL, 40.00);

-- Get all items (any status) in Category 6 (Room Essentials) more expensive than or equal to 50.00
CALL GetItemsByCategory(6, NULL, 50.00, NULL);


---------------------------

--------------------------

-- Search for 'cycle' in name/description, any category/status/price
CALL SearchItems('cycle', NULL, NULL, NULL, NULL);

-- Search for 'calculator' only in Category 5 (Stationery)
CALL SearchItems('calculator', 5, NULL, NULL, NULL);

-- Search for 'book' that are 'available' and cost 50.00 or less
CALL SearchItems('book', NULL, 'available', NULL, 50.00);

-- Find available 'headphones'
CALL SearchItems('headphones', NULL, 'available', NULL, NULL);

-- Find items (no text search) in category 6 (Room Essentials) >= 50.00
CALL SearchItems(NULL, 6, NULL, 50.00, NULL);

-- Find all available items (no text search, no category filter)
CALL SearchItems(NULL, NULL, 'available', NULL, NULL);



-------------------------------
----------AddToWishlist--------
--------------------------------
-- Declare output variable
SET @message_out = '';

-- Try adding Item 5 to User 1's wishlist
CALL AddToWishlist(1, 5, @message_out);
SELECT @message_out;

-- Try adding Item 5 to User 1's wishlist AGAIN (should trigger duplicate error)
CALL AddToWishlist(1, 5, @message_out);
SELECT @message_out; -- Expected: 'Item is already in your wishlist.'

-- Try adding a non-existent Item 999 to User 1's wishlist
CALL AddToWishlist(1, 999, @message_out);
SELECT @message_out; -- Expected: 'Error: Item ID not found.'

-- Try adding Item 1 to a non-existent User 999's wishlist
CALL AddToWishlist(999, 1, @message_out);
SELECT @message_out; -- Expected: 'Error: User ID not found.'



-------------------------------
-----RemoveFromWishlist--------
--------------------------------

-- Declare output variable
SET @message_out = '';

-- Try removing Item 5 from User 1's wishlist (assuming it was added)
CALL RemoveFromWishlist(1, 5, @message_out);
SELECT @message_out;

-- Try removing Item 5 from User 1's wishlist AGAIN (should report not found)
CALL RemoveFromWishlist(1, 5, @message_out);
SELECT @message_out; -- Expected: 'Item was not found in your wishlist.'

-- Try removing Item 999 (non-existent) from User 1's wishlist
CALL RemoveFromWishlist(1, 999, @message_out);
SELECT @message_out; -- Expected: 'Item was not found in your wishlist.'

-- Try removing Item 1 from User 999's (non-existent) wishlist
CALL RemoveFromWishlist(999, 1, @message_out);
SELECT @message_out; -- Expected: 'Item was not found in your wishlist.'



-------------------------------
-----GetUserWishlist--------
--------------------------------

-- Get the wishlist for user ID 1
CALL GetUserWishlist(1);

-- Get the wishlist for user ID 5
CALL GetUserWishlist(5);

-- Get the wishlist for a user with an empty wishlist (will return empty set)
CALL GetUserWishlist(19); -- Assuming user 19 has no items wishlisted

-- Get the wishlist for a non-existent user ID (will return empty set)
CALL GetUserWishlist(999);
