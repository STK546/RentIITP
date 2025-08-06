import { Router } from 'express';
import { addImageController, createItemController, deleteItemController, getAllItemsController, getItemController, getOwnerItems, searchItemsController, updateItemAvailabilityController, updateItemController } from '../controllers/item.controller.js';
import verifyToken from '../middleware/auth.middleware.js';
import { getItemImagesController } from '../services/item.service.js';

const router = Router();

router.get('/', searchItemsController);


router.get('/all', getAllItemsController); 

// GET ${process.env.REACT_APP_API_URL}/items
// GET ${process.env.REACT_APP_API_URL}/items?q=calculator
// GET ${process.env.REACT_APP_API_URL}/items?categoryId=1 
// GET ${process.env.REACT_APP_API_URL}/items?status=available
// GET ${process.env.REACT_APP_API_URL}/items?minPrice=50&maxPrice=200
// GET ${process.env.REACT_APP_API_URL}/items?q=book&categoryId=2&status=available&maxPrice=150

router.post('/', verifyToken, createItemController);

router.get('/owner', verifyToken,getOwnerItems);

router.get('/:itemId/images', getItemImagesController);
router.get('/:itemId', getItemController);


router.put('/:itemId/status', verifyToken, updateItemAvailabilityController);
router.put('/:itemId', verifyToken, updateItemController);

router.delete('/:itemId', verifyToken, deleteItemController);

router.post('/:itemId/images', verifyToken, addImageController);




export default router;
