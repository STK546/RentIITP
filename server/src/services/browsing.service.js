import pool from '../../config/db.config.js';

async function getItemsByCategory(categoryId, filters) {
    const {
        status = null,
        minPrice = null,
        maxPrice = null
    } = filters;

    // Validate categoryId
    const catId = parseInt(categoryId, 10);
    if (isNaN(catId)) {
        throw new Error("Invalid Category ID provided.");
    }

    // Validate/sanitize filters
    const minP = Number.isNaN(parseFloat(minPrice)) ? null : parseFloat(minPrice);
    const maxP = Number.isNaN(parseFloat(maxPrice)) ? null : parseFloat(maxPrice);
    const validStatuses = ['available', 'rented', 'unavailable'];
    const validStatus = (status && validStatuses.includes(status.toLowerCase())) ? status.toLowerCase() : null;

    const sql = `CALL GetItemsByCategory(?, ?, ?, ?)`;
    const params = [catId, validStatus, minP, maxP];

    try {
        const [results] = await pool.execute(sql, params);
        return results[0] || [];
    } catch (error) {
        console.error('Error in getItemsByCategory service:', error);
        throw new Error('Database error retrieving items by category.');
    }
}

export  {
    getItemsByCategory
};
