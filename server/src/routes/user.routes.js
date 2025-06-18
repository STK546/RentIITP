// src/routes/user.routes.js
import { Router } from 'express';
import { getProfile, getUserName, updatePassword, updateProfile } from '../controllers/user.controller.js';
import verifyToken from '../middleware/auth.middleware.js'; 

const router = Router();

router.get(
    '/profile', 
    verifyToken, 
    getProfile
);      
router.put(
    '/password', 
    verifyToken, 
    updatePassword
); 
router.put(
    '/profile', 
    verifyToken, 
    updateProfile
);

router.get(
    '/:userId/name',
     getUserName
);

export default router;
