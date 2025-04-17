select * from Categories;
select * from ItemImages;
select * from Items;
select * from Notifications;
select * from Rentals;
select * from Users;
select * from WishlistItems;


--Register User
--Authenticate User
--Update User
--Change Password
--GetUserProfile


-- Register User -------------------------------------------------------
SET @new_user_id = NULL;
SET @message = '';
CALL RegisterUser(
    'testuser2',                      -- p_username
    'test3@iitp.ac.in',               -- p_email
    'StrongPassword123!',             -- p_password
    'Test',                           -- p_first_name
    'User',                           -- p_last_name
    '2401CS99',                       -- p_roll_number
    '9988776655',                     -- p_phone_number
    'CV Raman',                       -- p_hostel_name
    'D',                              -- p_hostel_block
    '404',                            -- p_room_number
    NULL,                             -- p_profile_picture_url 
    @new_user_id,                     -- OUT out_user_id
    @message                          -- OUT out_message
);

-- Check the results
SELECT @new_user_id, @message;

--


-- Authenticate User ----------------------------------------------------
SET @user_id = NULL;
SET @fname = '';
SET @lname = '';
SET @email_out = '';
SET @status_out = '';
SET @message_out = '';

CALL AuthenticateUser('aman_b21', 'IncorrectPassword', @user_id, @fname, @lname, @email_out, @status_out, @message_out);
CALL AuthenticateUser('testuser', 'StrongPassword123!', @user_id, @fname, @lname, @email_out, @status_out, @message_out);
SELECT @user_id, @fname, @lname, @email_out, @status_out, @message_out;


-- Update User----------------------------------------------------

SET @message = '';
CALL UpdateUserProfile(
    5,                      -- p_user_id
    '9998887770',           -- p_phone_number
    'APJ Abdul Kalam',      -- p_hostel_name 
    'C',                    -- p_hostel_block
    '215',                  -- p_room_number
    'url/new_vikas.jpg',    -- p_profile_picture_url
    @message
);

SELECT @message;

CALL UpdateUserProfile(
    7,                      -- p_user_id
    '',                     -- p_phone_number 
    'CV Raman',             -- p_hostel_name
    'B',                    -- p_hostel_block
    '112',                  -- p_room_number
    '',                     -- p_profile_picture_url 
    @message
);

SELECT @message;

-- update a non-existent user
CALL UpdateUserProfile(999, '111222333', 'HostelX', 'X', 'X01', NULL, @message);
SELECT @message;



-- Change Password----------------------------------------------------
SET @message_out = '';
CALL ChangePassword(
    24,                      -- p_user_id
    'StrongPassword123!',   -- p_old_password
    '12345678', -- p_new_password
    @message_out
);
SELECT @message_out;


-- GetUserProfile----------------------------------------------------

-- Call the procedure for a specific user ID
CALL GetUserProfile(1);

-- Call the procedure for another user ID
CALL GetUserProfile(15);

-- Call for a non-existent user ID 
CALL GetUserProfile(999);


