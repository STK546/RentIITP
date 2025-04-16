select * from Categories;
select * from ItemImages;
select * from Items;
select * from Notifications;
select * from Rentals;
select * from Users;
select * from WishlistItems;


-- Register User -------------------------------------------------------
-- variables to hold the output
SET @new_user_id = NULL;
SET @message = '';
CALL RegisterUser(
    'testuser',                      -- p_username
    'test4@iitp.ac.in',               -- p_email
    'StrongPassword123!',           -- p_password (raw)
    'Test',                           -- p_first_name
    'User',                           -- p_last_name
    '2401CS99',                       -- p_roll_number
    '9988776655',                     -- p_phone_number
    'CV Raman',                       -- p_hostel_name
    'D',                              -- p_hostel_block
    '404',                            -- p_room_number
    NULL,                             -- p_profile_picture_url (or a URL string)
    @new_user_id,                     -- OUT out_user_id
    @message                          -- OUT out_message
);

-- Check the results
SELECT @new_user_id, @message;

--


-- Authenticate User ----------------------------------------------------
-- Declare variables to hold the output
SET @user_id = NULL;
SET @fname = '';
SET @lname = '';
SET @email_out = '';
SET @status_out = '';
SET @message_out = '';

-- Call the procedure with username and password
CALL AuthenticateUser('aman_b21', 'IncorrectPassword', @user_id, @fname, @lname, @email_out, @status_out, @message_out);
-- OR
CALL AuthenticateUser('testuser', 'StrongPassword123!', @user_id, @fname, @lname, @email_out, @status_out, @message_out);
-- Check the results
SELECT @user_id, @fname, @lname, @email_out, @status_out, @message_out;


-- Update User----------------------------------------------------

SET @message = '';

-- Example: Update profile for user_id = 5
CALL UpdateUserProfile(
    5,                      -- p_user_id
    '9998887770',           -- p_phone_number
    'APJ Abdul Kalam',      -- p_hostel_name (no change)
    'C',                    -- p_hostel_block
    '215',                  -- p_room_number
    'url/new_vikas.jpg',    -- p_profile_picture_url
    @message
);

-- Check the result message
SELECT @message;

-- Example: Clear phone number and profile picture for user_id = 7
CALL UpdateUserProfile(
    7,                      -- p_user_id
    '',                     -- p_phone_number (will be set to NULL)
    'CV Raman',             -- p_hostel_name
    'B',                    -- p_hostel_block
    '112',                  -- p_room_number
    '',                     -- p_profile_picture_url (will be set to NULL)
    @message
);

-- Check the result message
SELECT @message;

-- Example: Try to update a non-existent user
CALL UpdateUserProfile(999, '111222333', 'HostelX', 'X', 'X01', NULL, @message);
SELECT @message; -- Should indicate 'User ID not found'



-- Change Password----------------------------------------------------
SET @message_out = '';
CALL ChangePassword(
    24,                      -- p_user_id
    'StrongPassword123!',   -- p_old_password (Replace with actual old password)
    '12345678', -- p_new_password
    @message_out
);
SELECT @message_out;


-- GetUserProfile----------------------------------------------------

-- Call the procedure for a specific user ID (e.g., user_id = 1)
CALL GetUserProfile(1);

-- Call the procedure for another user ID (e.g., user_id = 15)
CALL GetUserProfile(15);

-- Call for a non-existent user ID (will return an empty set)
CALL GetUserProfile(999);


