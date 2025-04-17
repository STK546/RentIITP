import pool from '../../config/db.config.js';

async function searchItems(filters) {
    const {
        searchTerms = null, 
        categoryId = null,
        status = null,
        minPrice = null,
        maxPrice = null
    } = filters;

    const catId = Number.isNaN(parseInt(categoryId, 10)) ? null : parseInt(categoryId, 10);
    const minP = Number.isNaN(parseFloat(minPrice)) ? null : parseFloat(minPrice);
    const maxP = Number.isNaN(parseFloat(maxPrice)) ? null : parseFloat(maxPrice);

    const validStatuses = ['available', 'rented', 'unavailable'];
    const validStatus = (status && validStatuses.includes(status.toLowerCase())) ? status.toLowerCase() : null;

    // Prepare the SQL call and parameters
    const sql = `CALL SearchItems(?, ?, ?, ?, ?)`;
    const params = [
        searchTerms || null, 
        catId,
        validStatus,
        minP,
        maxP
    ];

    try {
        const [results] = await pool.execute(sql, params);
        return results[0] || []; 

    } catch (error) {
        console.error('Error in searchItems service:', error);
        throw new Error('Database error during item search.');
    }
}

async function createItem(itemData) {
    const {
        ownerId, categoryId, name, description, rentalPrice, rentalUnit,
        itemCondition, locationDescription, maxRentalDuration, primaryImageUrl
    } = itemData;

    const sql = `CALL ListItem(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @out_item_id, @out_message)`;
    const params = [
        ownerId, categoryId, name, description, rentalPrice, rentalUnit,
        itemCondition, locationDescription || null, maxRentalDuration || null,
        primaryImageUrl || null
    ];

    try {
        await pool.query(sql, params);
        const [outParams] = await pool.query('SELECT @out_item_id AS itemId, @out_message AS message');
        return outParams[0];
    } catch (error) {
        console.error('Error in createItem service:', error);
        throw new Error('Database error creating item listing.');
    }
}

async function getItemDetails(itemId) {
    const sql = `CALL GetItemDetails(?)`;
    try {
        const [results] = await pool.query(sql, [itemId]);
        if (results && results.length > 0 && results[0].length > 0) {
            return results[0][0]; 
        } else {
            return null; 
        }
    } catch (error) {
        console.error('Error in getItemDetails service:', error);
        throw new Error('Database error retrieving item details.');
    }
}


async function updateItemDetails(itemId, actingUserId, updateData) {
    const {
        categoryId, name, description, rentalPrice, rentalUnit,
        itemCondition, locationDescription, maxRentalDuration
    } = updateData;

    const sql = `CALL UpdateItemDetails(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @out_message)`;
    const params = [
        itemId,
        actingUserId,
        categoryId !== undefined ? categoryId : null,
        name !== undefined ? name : null,
        description !== undefined ? description : null,
        rentalPrice !== undefined ? rentalPrice : null,
        rentalUnit !== undefined ? rentalUnit : null,
        itemCondition !== undefined ? itemCondition : null,
        locationDescription !== undefined ? locationDescription : null, 
        maxRentalDuration !== undefined ? maxRentalDuration : null
    ];

    try {
        await pool.query(sql, params);
        const [outParams] = await pool.query('SELECT @out_message AS message');
        return outParams[0];
    } catch (error) {
        console.error('Error in updateItemDetails service:', error);
        throw new Error('Database error updating item details.');
    }
}


async function updateItemAvailability(itemId, newStatus) {
    const validStatuses = ['available', 'rented', 'unavailable'];
    if (!validStatuses.includes(newStatus)) {
        throw new Error("Invalid availability status provided.");
    }

    const sql = `CALL UpdateItemAvailability(?, ?, @out_message)`;
    try {
        await pool.query(sql, [itemId, newStatus]);
        const [outParams] = await pool.query('SELECT @out_message AS message');
        return outParams[0];
    } catch (error) {
        console.error('Error in updateItemAvailability service:', error);
        throw new Error('Database error updating item availability.');
    }
}


async function addItemImage(itemId, imageUrl, isPrimary) {
    const sql = `CALL AddItemImage(?, ?, ?, @out_image_id, @out_message)`;
    const params = [itemId, imageUrl, isPrimary];
    try {
        await pool.query(sql, params);
        const [outParams] = await pool.query('SELECT @out_image_id AS imageId, @out_message AS message');
        return outParams[0];
    } catch (error) {
        console.error('Error in addItemImage service:', error);
        throw new Error('Database error adding item image.');
    }
}


async function deleteItem(itemId, actingUserId) {
    const sql = `CALL DeleteItem(?, ?, @out_message)`;
    try {
        await pool.query(sql, [itemId, actingUserId]);
        const [outParams] = await pool.query('SELECT @out_message AS message');
        return outParams[0];
    } catch (error) {
        console.error('Error in deleteItem service:', error);
        try {
            const [outParams] = await pool.query('SELECT @out_message AS message');
            if (outParams && outParams.length > 0 && outParams[0].message) {
                 return outParams[0]; 
            }
        } catch (selectError) { }

        throw new Error('Database error deleting item.');
    }
}





export {
    searchItems,
    createItem,
    getItemDetails,
    updateItemDetails,
    updateItemAvailability,
    addItemImage,
    deleteItem
};