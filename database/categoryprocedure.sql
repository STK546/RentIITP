DELIMITER //
CREATE PROCEDURE AddCategory(
    IN p_name VARCHAR(50),
    IN p_description TEXT,
    IN p_icon_url VARCHAR(255),
    OUT out_message VARCHAR(255)
)
BEGIN
    DECLARE duplicate_name INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR 1062 -- Duplicate entry error for UNIQUE name
    BEGIN
        SET duplicate_name = 1;
        SET out_message = 'Error: Category name already exists.';
    END;

    -- Validate inputs
    IF p_name IS NULL OR p_name = '' THEN
        SET out_message = 'Error: Category name is required.';
    ELSE
        -- Insert new category
        INSERT INTO Categories (name, description, icon_url)
        VALUES (p_name, p_description, p_icon_url);

        IF duplicate_name = 0 THEN
            SET out_message = 'Category added successfully.';
        END IF;
    END IF;
END //
DELIMITER ;
