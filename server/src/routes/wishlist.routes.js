import { Router } from 'express';
import { addToWishlist, removeFromWishlist, getUserWishlist } from '../controllers/wishlist.controller.js';
import verifyToken from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyToken);

router.post('/', addToWishlist);

router.delete('/:itemId', removeFromWishlist);

router.get('/', getUserWishlist);

export default router;
