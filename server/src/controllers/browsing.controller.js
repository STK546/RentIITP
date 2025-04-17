import { getItemsByCategory as _getItemsByCategory } from '../services/browsing.service.js';

async function getItemsByCategory(req, res, next) {
    const categoryId = req.params.categoryId; 
    const { status, minPrice, maxPrice } = req.query;

    if (categoryId === undefined || categoryId === null || isNaN(parseInt(categoryId))) {
        return res.status(400).json({ message: 'Valid Category ID is required in the URL path.' });
    }

    const filters = { status, minPrice, maxPrice };

    try {
        const items = await _getItemsByCategory(categoryId, filters);
        res.status(200).json({ items }); 
    } catch (error) {
        if (error.message.includes("Invalid Category ID")) {
            return res.status(400).json({ message: error.message });
        }
        next(error); 
    }
}


export {
    getItemsByCategory
};
