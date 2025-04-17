import { requestRental, updateRentalStatus, getUserRentals } from '../services/rental.service.js';

async function createRentalRequest(req, res, next) {
    const renterId = req.userId;
    const { itemId, startDate, endDate } = req.body;

    if (!renterId) {
        return res.status(401).json({ message: 'Unauthorized: User ID missing.' });
    }
    if (!itemId || !startDate || !endDate) {
        return res.status(400).json({ message: 'Missing required fields: itemId, startDate, endDate.' });
    }
    if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
         return res.status(400).json({ message: 'Invalid date format for startDate or endDate.' });
    }
    if (new Date(startDate) >= new Date(endDate)) {
         return res.status(400).json({ message: 'Start date must be before end date.' });
    }


    try {
        const result = await requestRental(renterId, itemId, startDate, endDate);

        // Check the result from the service 
        if (result.rentalId) {
            res.status(201).json({ rentalId: result.rentalId, message: result.message }); // 201 Created
        } else {
            let statusCode = 400; // Bad Request default
            if (result.message.includes('not available') || result.message.includes('already booked')) {
                statusCode = 409; // Conflict
            } else if (result.message.includes('not exist')) {
                statusCode = 404; // Not Found
            } else if (result.message.includes('cannot rent your own')) {
                 statusCode = 403; // Forbidden
            }
            res.status(statusCode).json({ message: result.message });
        }
    } catch (error) {
        next(error); 
    }
}

async function changeRentalStatus(req, res, next) {
    const rentalId = parseInt(req.params.rentalId, 10); 
    const { newStatus } = req.body;                     
    const actingUserId = req.userId;                    

    if (isNaN(rentalId)) {
        return res.status(400).json({ message: 'Invalid Rental ID provided.' });
    }
    if (!newStatus) {
        return res.status(400).json({ message: 'Missing required field: newStatus.' });
    }
    if (!actingUserId) {
        return res.status(401).json({ message: 'Unauthorized: User ID missing.' });
    }

    try {
        const result = await updateRentalStatus(rentalId, newStatus, actingUserId);

        if (result.message.toLowerCase().startsWith('rental status updated successfully')) {
            res.status(200).json({ message: result.message });
        } else {
            let statusCode = 400; // Default Bad Request
            if (result.message.includes('permission denied') || result.message.includes('not allowed')) {
                statusCode = 403; // Forbidden
            } else if (result.message.includes('not found')) {
                statusCode = 404; // Not Found
            } else if (result.message.includes('already set')) {
                 statusCode = 409; // Conflict
            }
            res.status(statusCode).json({ message: result.message });
        }
    } catch (error) {
        next(error);
    }
}


async function fetchUserRentals(req, res, next) {
    const userId = req.userId;
    const role = req.query.role; 

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID missing.' });
    }
    if (!role || (role.toLowerCase() !== 'renter' && role.toLowerCase() !== 'owner')) {
        return res.status(400).json({ message: 'Missing or invalid query parameter: role (must be "renter" or "owner").' });
    }

    try {
        const result = await getUserRentals(userId, role.toLowerCase());

        if (result.rentals !== null) {
            res.status(200).json({ rentals: result.rentals, message: result.message });
        } else {
            let statusCode = 400;
            if (result.message.includes('not found')) {
                statusCode = 404;
            }
            res.status(statusCode).json({ message: result.message });
        }
    } catch (error) {
        next(error);
    }
}

export  {
    createRentalRequest,
    changeRentalStatus,
    fetchUserRentals
};
