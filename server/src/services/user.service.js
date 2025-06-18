import pool from '../../config/db.config.js';

async function getUserProfile(userId) {
    const sql = `CALL GetUserProfile(?)`;
    try {
        const [results] = await pool.execute(sql, [userId]);
        console.log(results)
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


export async function getUserNameById(userId) {

    const sql = `SELECT username FROM Users WHERE user_id = ?`;

    try {
        const [rows] = await pool.execute(sql, [userId]);
        if (rows.length > 0) {
            return rows[0].username;
        }
        return null;
    } catch (error) {
        console.error('Error in getUserNameById service:', error);
        throw new Error('Error retrieving user name');
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
        phone_number,
        hostel_name,
        hostel_block,
        room_number,
        profile_picture_url,
    } = profileData;

    console.log(profileData)

    const sql = `CALL UpdateUserProfile(?, ?, ?, ?, ?, ?, @out_message)`;

    const params = [
        userId,
        phone_number !== undefined ? phone_number : null, 
        hostel_name !== undefined ? hostel_name : null,
        hostel_block !== undefined ? hostel_block : null,
        room_number !== undefined ? room_number : null,
        profile_picture_url !== undefined ? profile_picture_url : null
    ];

    try {
        await pool.query(sql, params);

        const [outParams] = await pool.query('SELECT @out_message AS message');
        console.log(outParams)

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
