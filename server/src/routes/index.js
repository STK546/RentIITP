import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import rentalRoutes from './rental.routes.js'
import notificationRoutes from './notification.routes.js'

const router = Router();

router.use('/auth', authRoutes);

router.use('/users', userRoutes);

router.use('/rentals', rentalRoutes); 

router.use('/notifications', notificationRoutes); 



export default router;
