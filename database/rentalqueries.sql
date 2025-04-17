-- Output variables
SET @rental_id = NULL;
SET @message_out = '';

CALL RequestRental(
    21, 1, '2025-05-10 10:00:00', '2025-05-12 17:00:00',
    @rental_id, @message_out
);
SELECT @rental_id, @message_out;

CALL RequestRental(
    1, 2, '2025-04-18 09:00:00', '2025-04-19 12:00:00',
    @rental_id, @message_out
);
SELECT @rental_id, @message_out;

CALL RequestRental(
    1, 1, '2025-05-20 10:00:00', '2025-05-21 10:00:00',
    @rental_id, @message_out
);
SELECT @rental_id, @message_out;


-- -------------------------------------------------------------------------
 

SET @message_out = '';

-- Example: Owner (user_id=1) confirms rental request (rental_id=5)
CALL UpdateRentalStatus(21, 'confirmed', 32, @message_out);
SELECT @message_out;

-- Example: Renter (user_id=7) confirms pickup for rental (rental_id=2, currently 'confirmed')
CALL UpdateRentalStatus(2, 'active', 7, @message_out);
SELECT @message_out;
-- Check item status: SELECT availability_status FROM Items WHERE item_id = 5; -- Should be 'rented'

-- Example: Owner (user_id=7) marks rental (rental_id=3, currently 'active') as completed
CALL UpdateRentalStatus(3, 'completed', 7, @message_out);
SELECT @message_out;

CALL UpdateRentalStatus(4, 'cancelled', 14, @message_out);
SELECT @message_out; -- Shows error message



--  --------------------------------------------------------------------

SET @message = '';

-- Get rentals for user_id=11 where they are the RENTER
CALL GetUserRentals(11, 'renter', @message);

SELECT @message; 


CALL GetUserRentals(1, 'owner', @message);

SELECT @message;


CALL GetUserRentals(1, 'OWNER', @message);
SELECT @message;

-- Example of invalid role
CALL GetUserRentals(1, 'admin', @message);
SELECT @message; -- Shows 'Error: Invalid role specified...'

-- Example of non-existent user
CALL GetUserRentals(999, 'renter', @message);
SELECT @message; -- Shows 'Error: User ID not found.'
