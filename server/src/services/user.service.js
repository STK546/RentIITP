import pool from '../../config/db.config.js';

async function getUserProfile(userId) {
    const sql = `CALL GetUserProfile(?)`;
    try {
        const [results] = await pool.execute(sql, [userId]);
        if (results && results.length > 0 && results[0].length > 0) {
            return results[0][0]; // Return the first row 
        } else {
            return null; // User not found
        }
    } catch (error) {
        console.error('Error in getUserProfile service:', error);
        throw new Error('Error retrieving user profile.');
    }
}


async function changePassword(userId, oldPassword, newPassword) {
    const sql = `CALL ChangePassword(?, ?, ?, @msg)`;
    const params = [userId, oldPassword, newPassword];

    try {
        await pool.execute(sql, params);
        const [outParams] = await pool.execute('SELECT @msg AS message');

        return outParams[0]; // { message: ? }
    } catch (error) {
        console.error('Error in changePassword service:', error);
        if (error.message.includes('constraint')) {
             throw new Error('Database constraint violation.');
        }
        throw new Error('Error changing password.');
    }
}


async function updateUserProfile(userId, profileData) {
    const {
        phoneNumber,
        hostelName,
        hostelBlock,
        roomNumber,
        profilePictureUrl
    } = profileData;

    const sql = `CALL UpdateUserProfile(?, ?, ?, ?, ?, ?, @out_message)`;

    const params = [
        userId,
        phoneNumber !== undefined ? phoneNumber : null, 
        hostelName !== undefined ? hostelName : null,
        hostelBlock !== undefined ? hostelBlock : null,
        roomNumber !== undefined ? roomNumber : null,
        profilePictureUrl !== undefined ? profilePictureUrl : null
    ];

    try {
        await pool.query(sql, params);

        const [outParams] = await pool.query('SELECT @out_message AS message');

        return outParams[0];
    } catch (error) {
        console.error('Error in updateUserProfile service:', error);
        throw new Error('Error updating user profile in database.');
    }
}




export {
    getUserProfile,
    changePassword,
    updateUserProfile
};
