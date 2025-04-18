import pool from '../../config/db.config.js';
async function registerUser(userData) {
    const {
        username, email, password, firstName, lastName,
        rollNumber, phoneNumber, hostelName, hostelBlock,
        roomNumber, profilePictureUrl
    } = userData;

    console.log(username, email, password, firstName, lastName,
        rollNumber, phoneNumber, hostelName, hostelBlock,
        roomNumber, profilePictureUrl)



    const sql = `CALL RegisterUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @out_user_id, @out_message)`;
    const params = [
        username, email, password, firstName||'firstName', lastName||'lastName',
        rollNumber || null, phoneNumber || null, hostelName || null,
        hostelBlock || null, roomNumber || null, profilePictureUrl || null
    ];

    try {
        // Execute the CALL statement
        await pool.execute(sql, params);
        const [outParams] = await pool.execute('SELECT @out_user_id AS userId, @out_message AS message');
        return outParams[0];

    } catch (error) {
        console.error('Error in registerUser service:', error);
        if (error.message.includes('Duplicate entry')) {
            throw new Error('Username or Email already exists.'); 
        }
        throw new Error('Error registering user.'); 
    }
}


async function authenticateUser(username, password) {
    const sql = `CALL AuthenticateUser(?, ?, @uid, @fname, @lname, @email, @status, @msg)`;
    const params = [username, password];

    try {
        await pool.execute(sql, params);
        const [outParams] = await pool.execute(
            'SELECT @uid AS userId, @fname AS firstName, @lname AS lastName, @email AS email, @status AS accountStatus, @msg AS message'
        );
        return outParams[0];
    } catch (error) {
        console.error('Error in authenticateUser service:', error);
        throw new Error('Error authenticating user.');
    }
}

export {
    registerUser,
    authenticateUser
};
