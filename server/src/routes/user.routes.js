// src/routes/user.routes.js
import { Router } from 'express';
import { getProfile, updatePassword, updateProfile } from '../controllers/user.controller.js';
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

export default router;
