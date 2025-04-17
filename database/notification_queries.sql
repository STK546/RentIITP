--  CreateNotification: (Could be internal, called by other procedures)
-- ---------------------------------------------------------

SET @new_noti_id = NULL;
SET @message = '';

CALL CreateNotification(
    10,                  -- p_user_id (Recipient: Neha Mishra, renter of rental 5)
    5,                   -- p_related_entity_id (The rental_id)
    'rental_confirmed',  -- p_notification_type
    'Your rental request for Casio FX-991ES Plus Calculator has been confirmed.', -- p_message
    @new_noti_id,
    @message
);

-- Check the results
SELECT @new_noti_id, @message;

-- Example: Try creating for non-existent user
CALL CreateNotification(999, 5, 'rental_confirmed', 'Test message', @new_noti_id, @message);
SELECT @new_noti_id, @message; -- 'Error: Recipient User ID not found.'

-- Example: Try creating with missing input
CALL CreateNotification(1, 5, 'rental_confirmed', NULL, @new_noti_id, @message);
SELECT @new_noti_id, @message; --'Error: ... Message are required.'



--             --------------------------------------------------------------------------------------
--  GetUserNotifications:
--   Retrieves notifications for a specific user, possibly ordered by date. Parameterized.


-- Declare output variable
SET @message = '';

-- Get notifications for user_id = 10 (Neha Mishra)
CALL GetUserNotifications(10, @message);
-- The list of notifications will be displayed directly by the client/tool

-- Check the message (should indicate success if user 10 exists)
SELECT @message;

-- Get notifications for user_id = 1 (Aman Kumar)
CALL GetUserNotifications(1, @message);
SELECT @message;

-- Try getting notifications for a non-existent user
CALL GetUserNotifications(999, @message);
SELECT @message; -- Should show 'Error: User ID not found.'

-- Try calling without a user ID
CALL GetUserNotifications(NULL, @message);
SELECT @message; -- Should show 'Error: User ID must be provided.'
