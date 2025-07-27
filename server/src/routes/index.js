import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import rentalRoutes from './rental.routes.js'
import notificationRoutes from './notification.routes.js'
import itemRoutes from './item.routes.js'
import wishlistRoutes from './wishlist.routes.js'
import browsingRoutes from './browsing.routes.js'
const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Server is healthy',
  });
});

router.use('/auth', authRoutes);

router.use('/users', userRoutes);

router.use('/rentals', rentalRoutes); 

router.use('/notifications', notificationRoutes); 

router.use('/items', itemRoutes);

router.use('/wishlist', wishlistRoutes); 

router.use('/browsing', browsingRoutes); 

export default router;
