import { getUserNotifications } from '../services/notification.service.js';

async function getNotifications(req, res, next) {
    const userId = req.userId; 

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID missing.' });
    }

    try {
        const result = await getUserNotifications(userId);

        if (result.notifications !== null) {
            res.status(200).json({
                notifications: result.notifications,
                message: result.message
            });
        } else {
            let statusCode = 400;
            if (result.message.includes('not found')) {
                statusCode = 404;
            }
            res.status(statusCode).json({ message: result.message });
        }
    } catch (error) {
        next(error); 
    }
}

export  {
    getNotifications
};
