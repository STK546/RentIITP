-- Output variables
SET @rental_id = NULL;
SET @message_out = '';

CALL RequestRental(
    11, 9, '2025-05-10 10:00:00', '2025-05-12 17:00:00',
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
