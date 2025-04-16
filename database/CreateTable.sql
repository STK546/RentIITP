CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    roll_number VARCHAR(20) ,
    phone_number VARCHAR(15),
    hostel_name VARCHAR(50),
    hostel_block VARCHAR(5),
    room_number VARCHAR(10),
    profile_picture_url VARCHAR(255),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    account_status ENUM('active', 'inactive', 'suspended') DEFAULT 'active'
);

CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    icon_url VARCHAR(255)
);

CREATE TABLE Items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    rental_price DECIMAL(10, 2) NOT NULL,
    rental_unit ENUM('hour', 'day', 'week', 'month') NOT NULL,
    item_condition ENUM('new', 'like new', 'good', 'fair') NOT NULL,
    availability_status ENUM('available', 'rented', 'unavailable') DEFAULT 'available',
    location_description VARCHAR(255),
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    max_rental_duration INT,
    FOREIGN KEY (owner_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE RESTRICT
);

CREATE TABLE ItemImages (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES Items(item_id) ON DELETE CASCADE
);

CREATE TABLE Rentals (
    rental_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    renter_id INT NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    agreed_price DECIMAL(10, 2) NOT NULL,
    rental_status ENUM('requested', 'confirmed', 'active', 'completed', 'cancelled', 'rejected') DEFAULT 'requested',
    FOREIGN KEY (item_id) REFERENCES Items(item_id) ON DELETE RESTRICT,
    FOREIGN KEY (renter_id) REFERENCES Users(user_id) ON DELETE RESTRICT
);

CREATE TABLE Messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    rental_id INT,
    item_id INT,
    message_text TEXT NOT NULL,
    sent_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (rental_id) REFERENCES Rentals(rental_id) ON DELETE SET NULL,
    FOREIGN KEY (item_id) REFERENCES Items(item_id) ON DELETE SET NULL
);


CREATE TABLE Notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    related_entity_id INT NOT NULL,
    notification_type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
