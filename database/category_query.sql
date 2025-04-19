SET @msg = '';

-- Call the procedure
CALL AddCategory('Laptops', 'Portable computers', 'url/cat_laptops.png', @msg);

-- Get the result message
SELECT @msg;