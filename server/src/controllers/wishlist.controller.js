import { addToWishlist as _addToWishlist, removeFromWishlist as _removeFromWishlist, getUserWishlist as _getUserWishlist } from '../services/wishlist.service.js';


async function addToWishlist(req, res, next) {
    const userId = req.userId; 
    const { itemId } = req.body; 

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }
    if (!itemId || isNaN(parseInt(itemId))) {
        return res.status(400).json({ message: 'Valid Item ID is required in the request body.' });
    }

    try {
        const result = await _addToWishlist(userId, parseInt(itemId, 10));

        if (result.message.toLowerCase().includes('successfully')) {
            res.status(201).json({ message: result.message }); 
        } else if (result.message.includes('already in your wishlist')) {
            res.status(409).json({ message: result.message }); 
        } else if (result.message.includes('not found')) {
            const statusCode = result.message.includes('User ID') ? 401 : 404; 
            res.status(statusCode).json({ message: result.message });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        next(error); 
    }
}


async function removeFromWishlist(req, res, next) {
    const userId = req.userId; 
    const itemId = parseInt(req.params.itemId, 10); 

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }
    if (isNaN(itemId)) {
        return res.status(400).json({ message: 'Invalid Item ID provided in URL.' });
    }

    try {
        const result = await _removeFromWishlist(userId, itemId);

        // Check message
        if (result.message.toLowerCase().includes('successfully')) {
            res.status(200).json({ message: result.message }); 
            
        } else if (result.message.includes('not found in your wishlist')) {
            res.status(404).json({ message: result.message }); 
        } else {
            // Other potential errors
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        next(error);
    }
}

async function getUserWishlist(req, res, next) {
    const userId = req.userId; 

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    try {
        const wishlistItems = await _getUserWishlist(userId);
        res.status(200).json({ wishlist: wishlistItems }); 
    } catch (error) {
        next(error);
    }
}

export {
    addToWishlist,
    removeFromWishlist,
    getUserWishlist
};
