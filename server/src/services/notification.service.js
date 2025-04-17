import pool from '../../config/db.config.js';

async function createNotification(userId, relatedEntityId, notificationType, message) {
    const sql = `CALL CreateNotification(?, ?, ?, ?, @out_notification_id, @out_message)`;
    const params = [userId, relatedEntityId, notificationType, message];

    try {
        await pool.execute(sql, params);

        const [outParams] = await pool.execute('SELECT @out_notification_id AS notificationId, @out_message AS message');

        return outParams[0]; 
    } catch (error) {
        console.error('Error in createNotification service:', error);
        throw new Error(`Database error creating notification for user ${userId}. Type: ${notificationType}`);
    }
}


async function getUserNotifications(userId) {
    const sql = `CALL GetUserNotifications(?, @out_message)`;
    const params = [userId];

    try {
        const [results] = await pool.execute(sql, params);
        const [outParams] = await pool.execute('SELECT @out_message AS message');
        const message = outParams[0].message;

        let notifications = null;
        if (message && message.toLowerCase().startsWith('successfully retrieved')) {
            notifications = results[0] || []; // Assign the array or empty array
        }

        return {
            notifications: notifications, // Array of notification objects or null
            message: message           
        };

    } catch (error) {
        console.error('Error in getUserNotifications service:', error);
        throw new Error('Database error retrieving user notifications.');
    }
}

export {
    createNotification,
    getUserNotifications
};