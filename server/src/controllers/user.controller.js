import { getUserProfile, changePassword, updateUserProfile, getUserNameById } from '../services/user.service.js';

async function getProfile(req, res, next) {
    // console.log("hello")
    const userId = req.userId;
    console.log(req.userId)
    // const userId = 1;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: User ID not found in token."});
    }

    try {
        const profile = await getUserProfile(userId);
        if (profile) {
            const { password_hash, ...userProfile } = profile;
            res.status(200).json(userProfile);
        } else {
            res.status(404).json({ message: 'User profile not found.' });
        }
    } catch (error) {
        next(error);
    }
}



export async function getUserName(req, res, next) {
    const { userId } = req.params;

    try {
        const name = await getUserNameById(userId);

        if (name) {
            res.status(200).json({ name });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error in getUserName controller:', error);
        next(error);
    }
}


async function updatePassword(req, res, next) {
    const userId = req.userId; 
    const { oldPassword, newPassword } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: User ID not found in token."});
    }
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Old and new passwords are required.' });
    }

    try {
        const result = await changePassword(userId, oldPassword, newPassword);
        if (result.message === 'Password updated successfully.') {
            res.status(200).json({ message: result.message });
        } else {
             let statusCode = 400; 
             if (result.message.includes('Incorrect old password')) statusCode = 401;
             if (result.message.includes('User not found')) statusCode = 404; 
             res.status(statusCode).json({ message: result.message });
        }
    } catch (error) {
        next(error);
    }
}

async function updateProfile(req, res, next) {
    console.log("hiii")
    const userId = req.userId;
    console.log(userId)
    const profileData = req.body;
    console.log(profileData)

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID not found in token.' });
    }

    if (Object.keys(profileData).length === 0) {
        return res.status(400).json({ message: 'Request body cannot be empty. Provide fields to update.' });
    }

    try {
        //service function to update the profile
        const result = await updateUserProfile(userId, profileData);

        // Check the message from the stored procedure
        if (result.message && result.message.toLowerCase().includes('not found')) {
            return res.status(404).json({ message: result.message });
        }

        if (result.message && result.message.toLowerCase().includes('successfully')) {
             res.status(200).json({ message: result.message });
        } else {
             res.status(400).json({ message: result.message || 'Failed to update profile.' });
        }

    } catch (error) {
        next(error);
    }
}



export  {
    getProfile,
    updatePassword,
    updateProfile
};
