import { addItemImage, createItem, deleteItem, getAllItems, getItemDetails, getItemsByOwner, searchItems, updateItemAvailability, updateItemDetails } from '../services/item.service.js';


async function searchItemsController(req, res, next) {
    const {
        q, 
        categoryId,
        status,
        minPrice,
        maxPrice
    } = req.query;

    const filters = {
        searchTerms: q, // 'q' is a common query param for search
        categoryId: categoryId,
        status: status,
        minPrice: minPrice,
        maxPrice: maxPrice
    };


    try {
        const items = await searchItems(filters);

        res.status(200).json({ items }); 

    } catch (error) {
        next(error);
    }
}



async function getOwnerItems(req, res) {
    try {
      const ownerId = req.userId;
      const items = await getItemsByOwner(ownerId);
      res.status(200).json(items);
    } catch (err) {
      console.error('Error fetching owner items:', err);
      res.status(500).json({ message: 'Failed to fetch owner items.' });
    }
  }
  


async function createItemController(req, res, next) {
    const ownerId = req.userId; 
    const itemData = req.body;
    console.log(itemData);

    const requiredFields = ['categoryId', 'name', 'description', 'rentalPrice', 'rentalUnit', 'itemCondition'];
    if (!ownerId || requiredFields.some(field => !itemData[field])) {
        return res.status(400).json({ message: 'Missing required fields or authentication.' });
    }
    if (parseFloat(itemData.rentalPrice) <= 0) {
         return res.status(400).json({ message: 'Rental price must be positive.' });
    }

    try {
        const result = await createItem({ ...itemData, ownerId });

        if (result.itemId) {
            res.status(201).json({ itemId: result.itemId, message: result.message }); 
        } else {
            const statusCode = result.message.includes('exist') ? 404 : 400;
            res.status(statusCode).json({ message: result.message });
        }
    } catch (error) {
        next(error);
    }
}


async function getItemController(req, res, next) {
    const itemId = parseInt(req.params.itemId, 10);

    if (isNaN(itemId)) {
        return res.status(400).json({ message: 'Invalid Item ID provided.' });
    }

    try {
        const item = await getItemDetails(itemId);
        if (item) {
            res.status(200).json(item); 
        } else {
            res.status(404).json({ message: 'Item not found.' });
        }
    } catch (error) {
        next(error);
    }
}


export async function getAllItemsController(req, res, next) {
    try {
      const items = await getAllItems();
      console.log(items);
      res.status(200).json({ items });
    } catch (error) {
      next(error);
    }
  }

async function updateItemController(req, res, next) {
    const itemId = parseInt(req.params.itemId, 10);
    const actingUserId = req.userId; 
    const updateData = req.body;

    if (isNaN(itemId)) {
        return res.status(400).json({ message: 'Invalid Item ID provided.' });
    }
    if (!actingUserId) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }
    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'Request body cannot be empty. Provide fields to update.' });
    }
    if (updateData.rentalPrice !== undefined && parseFloat(updateData.rentalPrice) <= 0) {
         return res.status(400).json({ message: 'Rental price, if provided, must be positive.' });
    }


    try {
        const result = await updateItemDetails(itemId, actingUserId, updateData);

        if (result.message.toLowerCase().includes('successfully')) {
            res.status(200).json({ message: result.message });
        } else if (result.message.includes('Permission denied')) {
            res.status(403).json({ message: result.message }); 
        } else if (result.message.includes('not found')) {
            res.status(404).json({ message: result.message }); 
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        next(error);
    }
}


async function updateItemAvailabilityController(req, res, next) {
    const itemId = parseInt(req.params.itemId, 10);
    const actingUserId = req.userId;
    const { newStatus } = req.body;

    if (isNaN(itemId)) {
        return res.status(400).json({ message: 'Invalid Item ID provided.' });
    }
    if (!actingUserId) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }
    if (!newStatus) {
        return res.status(400).json({ message: 'Missing required field: newStatus.' });
    }
    const validStatuses = ['available', 'rented', 'unavailable'];
    if (!validStatuses.includes(newStatus.toLowerCase())) {
         return res.status(400).json({ message: 'Invalid availability status provided.' });
    }

    try {
        const item = await getItemDetails(itemId); 
        if (!item) {
             return res.status(404).json({ message: 'Item not found.' });
        }
        if (item.owner_id !== actingUserId) {
             return res.status(403).json({ message: 'Permission denied. You are not the owner of this item.' });
        }

        // Ownership verified, proceed to update status
        const result = await updateItemAvailability(itemId, newStatus.toLowerCase());

        if (result.message.toLowerCase().includes('successfully')) {
            res.status(200).json({ message: result.message });
        } else if (result.message.toLowerCase().includes('already set')) {
             res.status(200).json({ message: result.message }); 
        } else if (result.message.includes('not found')) {
            res.status(404).json({ message: result.message }); 
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        if (error.message.includes('Invalid availability status')) {
            return res.status(400).json({ message: error.message });
        }
        next(error);
    }
}


async function addImageController(req, res, next) {
    const itemId = parseInt(req.params.itemId, 10);
    const actingUserId = req.userId;
    const { imageUrl, isPrimary } = req.body;

    if (isNaN(itemId)) {
        return res.status(400).json({ message: 'Invalid Item ID provided.' });
    }
    if (!actingUserId) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }
    if (!imageUrl || imageUrl.trim() === '' || isPrimary === undefined) {
        return res.status(400).json({ message: 'Missing required fields: imageUrl and isPrimary.' });
    }

    try {
        const item = await getItemDetails(itemId);
        if (!item) {
             return res.status(404).json({ message: 'Item not found.' });
        }
        if (item.owner_id !== actingUserId) {
             return res.status(403).json({ message: 'Permission denied. You are not the owner of this item.' });
        }

        // Ownership verified, proceed to add image
        const result = await addItemImage(itemId, imageUrl, !!isPrimary); 

        if (result.imageId) {
            res.status(201).json({ imageId: result.imageId, message: result.message });
        } else {
            // Handle errors based on SP message
            const statusCode = result.message.includes('not exist') ? 404 : 400;
            res.status(statusCode).json({ message: result.message });
        }
    } catch (error) {
        next(error);
    }
}


async function deleteItemController(req, res, next) {
    const itemId = parseInt(req.params.itemId, 10);
    const actingUserId = req.userId;

    if (isNaN(itemId)) {
        return res.status(400).json({ message: 'Invalid Item ID provided.' });
    }
    if (!actingUserId) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }

    try {
        const result = await deleteItem(itemId, actingUserId);

        if (result.message.toLowerCase().includes('successfully')) {
            res.status(200).json({ message: result.message }); 
        } else if (result.message.includes('Permission denied')) {
            res.status(403).json({ message: result.message });
        } else if (result.message.includes('not found')) {
            res.status(404).json({ message: result.message }); 
        } else if (result.message.includes('active or confirmed rentals') || result.message.includes('referenced in existing rentals')) {
             res.status(409).json({ message: result.message }); 
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        next(error);
    }
}


export  {
    searchItemsController,
    createItemController,
    getItemController,
    updateItemController,
    updateItemAvailabilityController,
    addImageController,
    deleteItemController,
    getOwnerItems
};
