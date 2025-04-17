// src/routes/browsing.routes.js
import { Router } from 'express';
import { getItemsByCategory } from '../controllers/browsing.controller.js';

const router = Router();


// e.g., /api/browsing/category/1?status=available&maxPrice=50
router.get('/category/:categoryId', getItemsByCategory);


export default router;
