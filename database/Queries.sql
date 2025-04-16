select * from Categories;
select * from ItemImages;
select * from Items;
select * from Notifications;
select * from Rentals;
select * from Users;
select * from WishlistItems;


-- Register User
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


-- Authenticate User
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

