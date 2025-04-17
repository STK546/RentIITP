import pool from '../../config/db.config.js';
import * as notificationService from './notification.service.js';



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
    let resultMessage = '';

    try {
        const [updateResults] = await pool.query(sql, params);
        const [outParamsUpdate] = await pool.query('SELECT @out_message AS message');
        resultMessage = outParamsUpdate[0].message;

        if (resultMessage.toLowerCase().startsWith('rental status updated successfully')) {
            const [rentalDetails] = await pool.query(
                `SELECT r.renter_id, i.owner_id, i.name AS item_name
                 FROM Rentals r JOIN Items i ON r.item_id = i.item_id
                 WHERE r.rental_id = ?`, [rentalId]
            );

            if (rentalDetails.length > 0) {
                const { renter_id, owner_id, item_name } = rentalDetails[0];
                let notificationUserId = null;
                let notificationMessage = '';

                switch (newStatus.toLowerCase()) {
                    case 'confirmed':
                        notificationUserId = renter_id;
                        notificationMessage = `Your rental request for "${item_name}" has been confirmed by the owner.`;
                        break;
                    case 'rejected':
                        notificationUserId = renter_id;
                        notificationMessage = `Your rental request for "${item_name}" was rejected by the owner.`;
                        break;
                    case 'cancelled':
                        notificationUserId = (actingUserId === renter_id) ? owner_id : renter_id;
                        const cancellerRole = (actingUserId === renter_id) ? 'renter' : 'owner';
                        notificationMessage = `The rental for "${item_name}" was cancelled by the ${cancellerRole}.`;
                        break;
                    case 'active':
                        notificationUserId = renter_id;
                        notificationMessage = `Your rental period for "${item_name}" has started.`;
                        break;
                    case 'completed':
                        await notificationService.createNotification(renter_id, rentalId, 'rental_completed', `Your rental of "${item_name}" is now complete.`);
                        await notificationService.createNotification(owner_id, rentalId, 'rental_completed_owner', `The rental of your item "${item_name}" by user ${renter_id} is complete.`);
                        notificationUserId = null;
                        break;
                }

                if (notificationUserId && notificationMessage) {
                    try {
                        await notificationService.createNotification(
                            notificationUserId,
                            rentalId,
                            `rental_${newStatus}`,
                            notificationMessage
                        );
                        console.log(`Notification created for user ${notificationUserId} regarding rental ${rentalId} status update to ${newStatus}`);
                    } catch (notiError) {
                        console.error(`Failed to create notification for rental ${rentalId} status update:`, notiError.message);
                    }
                }
            } else {
                console.error(`Could not retrieve details for rental ${rentalId} to create notification.`);
            }
        }

        return { message: resultMessage };

    } catch (error) {
        console.error('Error in updateRentalStatus service:', error);
        if (resultMessage) {
            return { message: `Update may have failed. ${resultMessage}. Error: ${error.message}` };
        } else {
            throw new Error('Database error updating rental status.');
        }
    }
}



// async function updateRentalStatus(rentalId, newStatus, actingUserId) {
//     const sql = `CALL UpdateRentalStatus(?, ?, ?, @out_message)`;
//     const params = [rentalId, newStatus, actingUserId];

//     try {
//         await pool.execute(sql, params);

//         const [outParams] = await pool.execute('SELECT @out_message AS message');

//         return outParams[0]; // { message: ? }
//     } catch (error) {
//         console.error('Error in updateRentalStatus service:', error);
//         throw new Error('Database error updating rental status.');
//     }
// }


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


