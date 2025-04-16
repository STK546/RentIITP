-- Register User--------------------------------------

-- Change the delimiter to handle the procedure body
DELIMITER //

-- Drop the procedure if it already exists to allow recreation
DROP PROCEDURE IF EXISTS RegisterUser;

-- Create the stored procedure
CREATE PROCEDURE RegisterUser(
    -- Input parameters matching user data
    IN p_username VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255), -- Raw password from user input
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_roll_number VARCHAR(20),
    IN p_phone_number VARCHAR(15),
    IN p_hostel_name VARCHAR(50),
    IN p_hostel_block VARCHAR(5),
    IN p_room_number VARCHAR(10),
    IN p_profile_picture_url VARCHAR(255),

    -- Output parameters for feedback
    OUT out_user_id INT,         -- Will contain the new user_id if successful
    OUT out_message VARCHAR(255) -- Will contain a success or error message
)
BEGIN
    -- Declare variables
    DECLARE v_hashed_password VARCHAR(255);
    DECLARE duplicate_key INT DEFAULT 0;

    -- Declare a handler for unique key constraint violations (username or email)
    -- SQLSTATE '23000' is for integrity constraint violation, error 1062 is ER_DUP_ENTRY
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        IF @errno = 1062 THEN -- Duplicate entry error code
            SET duplicate_key = 1;
            IF @text LIKE '%username%' THEN
                SET out_message = 'Error: Username already exists.';
            ELSEIF @text LIKE '%email%' THEN
                SET out_message = 'Error: Email address already exists.';
            ELSE
                SET out_message = CONCAT('Error: Duplicate entry violation - ', @text); -- More generic duplicate message
            END IF;
        ELSE
            SET out_message = CONCAT('Error: An SQL error occurred - ', @errno, ': ', @text); -- General SQL error
        END IF;
        SET out_user_id = NULL; -- Indicate failure
    END;

    -- --- Input Validation (Basic) ---
    -- You might add more checks here (e.g., password complexity) in application logic preferably
    IF p_username IS NULL OR p_username = '' OR
       p_email IS NULL OR p_email = '' OR
       p_password IS NULL OR p_password = '' OR
       p_first_name IS NULL OR p_first_name = '' OR
       p_last_name IS NULL OR p_last_name = '' THEN

        SET out_message = 'Error: Username, Email, Password, First Name, and Last Name are required.';
        SET out_user_id = NULL;

    ELSE
        -- --- Hash the Password ---
        -- Using SHA2 with a 256-bit hash length. Ensure your password_hash column is long enough (VARCHAR(64) for hex representation).
        -- If password_hash is VARCHAR(255) as in the schema, this is fine.
        SET v_hashed_password = SHA2(p_password, 256);

        -- --- Insert the New User ---
        INSERT INTO Users (
            username,
            email,
            password_hash,
            first_name,
            last_name,
            roll_number,
            phone_number,
            hostel_name,
            hostel_block,
            room_number,
            profile_picture_url
            -- registration_date defaults to CURRENT_TIMESTAMP
            -- account_status defaults to 'active'
        ) VALUES (
            p_username,
            p_email,
            v_hashed_password,
            p_first_name,
            p_last_name,
            NULLIF(p_roll_number, ''), -- Insert NULL if optional field is empty
            NULLIF(p_phone_number, ''),
            NULLIF(p_hostel_name, ''),
            NULLIF(p_hostel_block, ''),
            NULLIF(p_room_number, ''),
            NULLIF(p_profile_picture_url, '')
        );

        -- --- Check if Insertion was Successful (Handler didn't set a duplicate message) ---
        IF duplicate_key = 0 THEN
            -- Get the user_id of the newly inserted row
            SET out_user_id = LAST_INSERT_ID();
            SET out_message = 'User registered successfully.';
        END IF;
        -- If duplicate_key = 1, the handler already set the error message and out_user_id

    END IF; -- End of input validation check

END //

DELIMITER ;


-- Authenticate User--------------------------------------

-- Change the delimiter to handle the procedure body
DELIMITER //

-- Drop the procedure if it already exists to allow recreation
DROP PROCEDURE IF EXISTS AuthenticateUser;

-- Create the stored procedure
CREATE PROCEDURE AuthenticateUser(
    -- Input parameters
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(255), -- Raw password from user input

    -- Output parameters for feedback
    OUT out_user_id INT,
    OUT out_first_name VARCHAR(50),
    OUT out_last_name VARCHAR(50),
    OUT out_email VARCHAR(100),
    OUT out_account_status ENUM('active', 'inactive', 'suspended'),
    OUT out_message VARCHAR(255)
)
BEGIN
    -- Declare variables to store data fetched from the database
    DECLARE v_user_id INT;
    DECLARE v_stored_hash VARCHAR(255);
    DECLARE v_first_name VARCHAR(50);
    DECLARE v_last_name VARCHAR(50);
    DECLARE v_email VARCHAR(100);
    DECLARE v_account_status ENUM('active', 'inactive', 'suspended');
    DECLARE v_input_hash VARCHAR(255);

    -- Initialize output parameters to NULL/empty
    SET out_user_id = NULL;
    SET out_first_name = NULL;
    SET out_last_name = NULL;
    SET out_email = NULL;
    SET out_account_status = NULL;
    SET out_message = '';

    -- Attempt to find the user by username
    SELECT
        user_id,
        password_hash,
        first_name,
        last_name,
        email,
        account_status
    INTO
        v_user_id,
        v_stored_hash,
        v_first_name,
        v_last_name,
        v_email,
        v_account_status
    FROM
        Users
    WHERE
        username = p_username;

    -- Check if a user was found
    IF v_user_id IS NULL THEN
        -- User not found
        SET out_message = 'Invalid username or password.';
    ELSE
        -- User found, now hash the input password and compare
        SET v_input_hash = SHA2(p_password, 256); -- Use the SAME hashing algorithm (SHA2, 256) as registration

        IF v_stored_hash = v_input_hash THEN
            -- Password matches, now check account status
            IF v_account_status = 'active' THEN
                -- Authentication successful
                SET out_user_id = v_user_id;
                SET out_first_name = v_first_name;
                SET out_last_name = v_last_name;
                SET out_email = v_email;
                SET out_account_status = v_account_status;
                SET out_message = 'Authentication successful.';
            ELSE
                -- Account exists but is not active
                SET out_message = CONCAT('Account is not active (Status: ', v_account_status, '). Please contact support.');
            END IF;
        ELSE
            -- Password does not match
            SET out_message = 'Invalid username or password.';
        END IF;
    END IF;

END //

-- Reset the delimiter back to semicolon
DELIMITER ;




-- ChangePassword --------------------------------------
DELIMITER //

DROP PROCEDURE IF EXISTS ChangePassword//

CREATE PROCEDURE ChangePassword(
    IN p_user_id INT,
    IN p_old_password VARCHAR(255),
    IN p_new_password VARCHAR(255),
    OUT out_message VARCHAR(255)
)
THIS_PROC: BEGIN
    DECLARE v_stored_hash VARCHAR(255);
    DECLARE v_old_input_hash VARCHAR(255);
    DECLARE v_new_input_hash VARCHAR(255);
    DECLARE v_user_exists INT DEFAULT 0;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET out_message = 'Error: An unexpected error occurred.';
    END;

    -- Input validation
    IF p_user_id IS NULL OR p_old_password IS NULL OR p_old_password = '' OR p_new_password IS NULL OR p_new_password = '' THEN
        SET out_message = 'Error: All fields are required.';
        LEAVE THIS_PROC;
    END IF;

    IF p_old_password = p_new_password THEN
        SET out_message = 'Error: New password must be different.';
        LEAVE THIS_PROC;
    END IF;

    START TRANSACTION;

    -- Check user existence and get current hash
    SELECT password_hash INTO v_stored_hash
    FROM Users
    WHERE user_id = p_user_id;

    IF v_stored_hash IS NULL THEN
        ROLLBACK;
        SET out_message = 'Error: User not found.';
        LEAVE THIS_PROC;
    END IF;

    -- Verify old password
    SET v_old_input_hash = SHA2(p_old_password, 256);
    IF v_stored_hash != v_old_input_hash THEN
        ROLLBACK;
        SET out_message = 'Error: Incorrect old password.';
        LEAVE THIS_PROC;
    END IF;

    -- Set new password
    SET v_new_input_hash = SHA2(p_new_password, 256);
    UPDATE Users
    SET password_hash = v_new_input_hash
    WHERE user_id = p_user_id;

    IF ROW_COUNT() = 1 THEN
        COMMIT;
        SET out_message = 'Password updated successfully.';
    ELSE
        ROLLBACK;
        SET out_message = 'Error: Update failed.';
    END IF;

END //

DELIMITER ;


-- GetUserProfile --------------------------------------
-- Change the delimiter to handle the procedure body
DELIMITER //

-- Drop the procedure if it already exists to allow recreation
DROP PROCEDURE IF EXISTS GetUserProfile; //

-- Create the stored procedure
CREATE PROCEDURE GetUserProfile(
    -- Input parameter
    IN p_user_id INT -- The ID of the user whose profile is requested
)
BEGIN
    -- Select the relevant profile details for the specified user
    -- This procedure directly outputs the result set of the SELECT query
    SELECT
        user_id,
        username,
        email,
        first_name,
        last_name,
        roll_number,
        phone_number,
        hostel_name,
        hostel_block,
        room_number,
        profile_picture_url,
        registration_date,
        account_status
    FROM
        Users
    WHERE
        user_id = p_user_id;

    -- No explicit output parameters needed here; the result set is the output.
    -- If p_user_id does not exist, an empty result set will be returned.

END //

-- Reset the delimiter back to semicolon
DELIMITER ; //
