CREATE TABLE WishlistItems (
    wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    item_id INT NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES Items(item_id) ON DELETE CASCADE,
    UNIQUE (user_id, item_id)
);

CREATE TABLE ItemOwners (
    ownership_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    owner_id INT NOT NULL,
    ownership_start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_current_owner BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (item_id) REFERENCES Items(item_id) ON DELETE CASCADE,
    FOREIGN KEY (owner_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    UNIQUE (item_id, owner_id, is_current_owner)
);


CREATE TABLE UserCategoryPreferences (
    preference_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    preference_level INT DEFAULT 1,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE CASCADE,
    UNIQUE (user_id, category_id)
);


CREATE TABLE Tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE ItemTags (
    item_tag_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    tag_id INT NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES Items(item_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES Tags(tag_id) ON DELETE CASCADE,
    UNIQUE (item_id, tag_id)
);

CREATE TABLE UserConnections (
    connection_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id1 INT NOT NULL,
    user_id2 INT NOT NULL,
    connection_status ENUM('pending', 'accepted', 'blocked') DEFAULT 'pending',
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    acceptance_date TIMESTAMP,
    FOREIGN KEY (user_id1) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id2) REFERENCES Users(user_id) ON DELETE CASCADE,
    UNIQUE (user_id1, user_id2),
    CHECK (user_id1 < user_id2)  -- Ensures no duplicate connections
);

CREATE TABLE RentalStatusHistory (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    rental_id INT NOT NULL,
    previous_status ENUM('requested', 'confirmed', 'active', 'completed', 'cancelled', 'rejected'),
    new_status ENUM('requested', 'confirmed', 'active', 'completed', 'cancelled', 'rejected') NOT NULL,
    change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    changed_by_user_id INT NOT NULL,
    notes TEXT,
    FOREIGN KEY (rental_id) REFERENCES Rentals(rental_id) ON DELETE CASCADE,
    FOREIGN KEY (changed_by_user_id) REFERENCES Users(user_id) ON DELETE RESTRICT
);
