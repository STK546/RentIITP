import pool from '../../config/db.config.js';

async function addToWishlist(userId, itemId) {
    const sql = `CALL AddToWishlist(?, ?, @out_message)`;
    try {
        await pool.execute(sql, [userId, itemId]);
        const [outParams] = await pool.execute('SELECT @out_message AS message');
        return outParams[0];
    } catch (error) {
        console.error('Error in addToWishlist service:', error);
        try {
            const [outParams] = await pool.execute('SELECT @out_message AS message');
             if (outParams && outParams[0] && outParams[0].message) return outParams[0];
        } catch (selectError) {/* ignore */}
        throw new Error('Database error adding item to wishlist.');
    }
}


async function removeFromWishlist(userId, itemId) {
    const sql = `CALL RemoveFromWishlist(?, ?, @out_message)`;
    try {
        await pool.execute(sql, [userId, itemId]);
        const [outParams] = await pool.execute('SELECT @out_message AS message');
        return outParams[0];
    } catch (error) {
        console.error('Error in removeFromWishlist service:', error);
        throw new Error('Database error removing item from wishlist.');
    }
}


async function getUserWishlist(userId) {
    const sql = `CALL GetUserWishlist(?)`;
    try {
        const [results] = await pool.execute(sql, [userId]);
        return results[0] || [];
    } catch (error) {
        console.error('Error in getUserWishlist service:', error);
        throw new Error('Database error retrieving user wishlist.');
    }
}

export  {
    addToWishlist,
    removeFromWishlist,
    getUserWishlist
};
