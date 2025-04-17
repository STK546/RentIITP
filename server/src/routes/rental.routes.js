import { Router } from 'express';
import { createRentalRequest, changeRentalStatus, fetchUserRentals } from '../controllers/rental.controller.js';
import verifyToken from '../middleware/auth.middleware.js'; 

const router = Router();

router.use(verifyToken);

router.post('/', createRentalRequest);

router.put('/:rentalId/status', changeRentalStatus);

router.get('/', fetchUserRentals);

export default router;
