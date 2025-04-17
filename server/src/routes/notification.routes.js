import { Router } from 'express';
import { getNotifications } from '../controllers/notification.controller.js';
import verifyToken from '../middleware/auth.middleware.js'; 

const router = Router();

router.use(verifyToken);

router.get('/', getNotifications);


export default router;
