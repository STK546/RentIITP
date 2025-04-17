import { query } from '../../config/db.config';

async function getUserProfile(userId) {
    const sql = `CALL GetUserProfile(?)`;
    try {
        const [results] = await query(sql, [userId]);
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
        await query(sql, params);
        const [outParams] = await query('SELECT @msg AS message');

        return outParams[0]; // { message: ? }
    } catch (error) {
        console.error('Error in changePassword service:', error);
        if (error.message.includes('constraint')) {
             throw new Error('Database constraint violation.');
        }
        throw new Error('Error changing password.');
    }
}

export default {
    getUserProfile,
    changePassword
};
