import pool from '../../config/db.config.js';


async function requestRental(renterId, itemId, startDate, endDate) {
    const sql = `CALL RequestRental(?, ?, ?, ?, @out_rental_id, @out_message)`;
    const params = [renterId, itemId, startDate, endDate];

    try {
        await pool.execute(sql, params);
        const [outParams] = await pool.execute('SELECT @out_rental_id AS rentalId, @out_message AS message');

        return outParams[0]; 
    } catch (error) {
        console.error('Error in requestRental service:', error);
        throw new Error('Database error during rental request.');
    }
}


async function updateRentalStatus(rentalId, newStatus, actingUserId) {
    const sql = `CALL UpdateRentalStatus(?, ?, ?, @out_message)`;
    const params = [rentalId, newStatus, actingUserId];

    try {
        await pool.execute(sql, params);

        const [outParams] = await pool.execute('SELECT @out_message AS message');

        return outParams[0]; // { message: ? }
    } catch (error) {
        console.error('Error in updateRentalStatus service:', error);
        throw new Error('Database error updating rental status.');
    }
}


async function getUserRentals(userId, role) {
    const normalizedRole = role.toLowerCase();
    const sql = `CALL GetUserRentals(?, ?, @out_message)`;
    const params = [userId, normalizedRole];

    try {
        const [results] = await pool.execute(sql, params);

        const [outParams] = await pool.execute('SELECT @out_message AS message');
        const message = outParams[0].message;

        let rentals = null;
        if (message && message.toLowerCase().startsWith('successfully retrieved')) {
             rentals = results[0] || []; // Assign the array of rentals or empty array
        }

        return {
            rentals: rentals, 
            message: message   
        };

    } catch (error) {
        console.error('Error in getUserRentals service:', error);
        throw new Error('Database error retrieving user rentals.');
    }
}


export {
    requestRental,
    updateRentalStatus,
    getUserRentals
};


