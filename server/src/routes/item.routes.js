import { Router } from 'express';
import { addImageController, createItemController, deleteItemController, getAllItemsController, getItemController, searchItemsController, updateItemAvailabilityController, updateItemController } from '../controllers/item.controller.js';
import verifyToken from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', searchItemsController);


router.get('/all', getAllItemsController); // GET /api/items/all

// GET http://localhost:3000/api/items
// GET http://localhost:3000/api/items?q=calculator
// GET http://localhost:3000/api/items?categoryId=1 (Assuming category ID 1 exists)
// GET http://localhost:3000/api/items?status=available
// GET http://localhost:3000/api/items?minPrice=50&maxPrice=200
// GET http://localhost:3000/api/items?q=book&categoryId=2&status=available&maxPrice=150

router.post('/', verifyToken, createItemController);

router.get('/:itemId', getItemController);

router.put('/:itemId', verifyToken, updateItemController);

router.delete('/:itemId', verifyToken, deleteItemController);

router.post('/:itemId/images', verifyToken, addImageController);

router.put('/:itemId/status', verifyToken, updateItemAvailabilityController);



export default router;
