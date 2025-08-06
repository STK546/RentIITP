1. Project Overview
The Campus Rental Platform (RentIITP) is a web-based application designed for students of IIT Patna to rent, 
lend, and borrow items within the campus community. It streamlines the sharing economy by providing secure user management, item listings, 
rental workflows, notifications, and wishlist features, all through a clean and intuitive interface.

2. Key Features

User Registration & Authentication: Secure sign-up, login, and profile management.

Item Listing & Management: Add, update, and manage items with images, categories, and availability.

Item Browsing & Filtering: Search and filter items by name, category, price, and availability.

Wishlist: Add items to a personal wishlist for future reference.

Rental Workflow: Request, approve, track, and complete rentals with real-time status updates.

Notifications: Automated alerts for rental requests, confirmations, reminders, and completions.

Responsive UI: Modern, accessible, and mobile-friendly design.

3. Database Design
Main Tables
Table	Description

Users	User credentials and profile information
Categories	Item categories (Electronics, Books, etc.)
Items	Item listings with owner, category, price, and status
ItemImages	Multiple images per item, with primary image support
Rentals	Rental transactions with status, dates, and pricing
Notifications	User notifications for rental events
WishlistItems	Links users to their wishlisted items
Sample Table Definitions:
(See [CreateTable2.sql] for full schema)

sql

CREATE TABLE Users (
  userid INT AUTOINCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  passwordhash VARCHAR(255) NOT NULL,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  rollnumber VARCHAR(20),
  phonenumber VARCHAR(15),
  hostelname VARCHAR(50),
  hostelblock VARCHAR(5),
  roomnumber VARCHAR(10),
  profilepictureurl VARCHAR(255),
  registrationdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  accountstatus ENUM('active', 'inactive', 'suspended') DEFAULT 'active'
);

CREATE TABLE Items (
  itemid INT AUTOINCREMENT PRIMARY KEY,
  ownerid INT NOT NULL,
  categoryid INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  rentalprice DECIMAL(10,2) NOT NULL,
  rentalunit ENUM('hour', 'day', 'week', 'month') NOT NULL,
  itemcondition ENUM('new', 'like new', 'good', 'fair') NOT NULL,
  availabilitystatus ENUM('available', 'rented', 'unavailable') DEFAULT 'available',
  locationdescription VARCHAR(255),
  dateadded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  maxrentalduration INT,
  FOREIGN KEY (ownerid) REFERENCES Users(userid) ON DELETE CASCADE,
  FOREIGN KEY (categoryid) REFERENCES Categories(categoryid) ON DELETE RESTRICT
);
Other tables (ItemImages, Rentals, Notifications, WishlistItems) are similarly normalized and use foreign keys for data integrity.

4. Core Backend Procedures
The backend uses parameterized stored procedures for all critical workflows:

User Management

RegisterUser, AuthenticateUser, UpdateUserProfile, ChangePassword, GetUserProfile

Item Management

ListItem, UpdateItemDetails, UpdateItemAvailability, AddItemImage, DeleteItem, GetItemDetails

Browsing & Wishlist

GetItemsByCategory, SearchItems, AddToWishlist, RemoveFromWishlist, GetUserWishlist

Rental Management

RequestRental, UpdateRentalStatus, GetUserRentals

Notification Management

CreateNotification, GetUserNotifications

All procedures are designed for security, transactional consistency, and error handling.

5. Sample Data
The platform is pre-populated with realistic data for testing and demonstration:

Users: 20+ users with campus-specific details (name, roll, hostel, etc.)

Categories: 20+ categories (Electronics, Books, Cycles, etc.)

Items: 20+ items (calculators, cycles, headphones, textbooks, etc.), each with owner, category, images, and detailed descriptions.

Rentals: Multiple rental records across all statuses (requested, confirmed, active, completed, cancelled, rejected).

Notifications: For rental confirmations, reminders, completions, cancellations, and requests.

Wishlist: Users have wishlisted a variety of items, with uniqueness enforced per user-item pair.

6. Frontend User Interface
The frontend is designed to be intuitive, modern, and responsive. Below are the main interfaces with explanations and visual references.

A. Home Page
![Home Page]

Header Navigation:

Logo (RentIITP), links to Home, Browse, List Item, My Rentals, Wishlist.

Icons for theme toggle and notifications.

Main Section:

Large heading: Rent Items at IIT Patna.

Subtext: Encourages students to find and rent items affordably.

“Browse Items” button for quick access.

IIT Patna campus image for local context.

B. Browse Items Page
![Browse Items]

Search and Filters:

Search bar for quick item lookup.

Filters dropdown for advanced sorting.

Item Listings:

Card-based layout showing item image, name, price, and brief description.

Condition badge (e.g., new, fair) and availability status.

Owner info (displayed as anonymous for privacy).

“View Details” link for more information and rental actions.

C. Wishlist Page
![Wishlist Page]

Wishlist Overview:

List of items the user has added to their wishlist.

Each item shows image, name, price, description, location, and availability.

“View Details” button and option to remove from wishlist.

“Browse More Items” button for easy navigation.

D. Navigation and User Experience
Persistent Header:

Always accessible navigation bar with theme toggle (dark/light), notifications, and search.

Consistency:

All pages share a clean, minimal design with ample whitespace.

7. System Flow
User registers and logs in.

User lists an item with details and images.

Other users browse/search for items and add them to their wishlist.

User requests to rent an item, specifying dates.

Owner receives notification and confirms or rejects the request.

Rental status and item availability are updated accordingly.

Automated notifications remind users of rental start/end, confirmations, and completions.

**Users can view their rental history, notifications, and manage wishlists.

8. Future Enhancements

Add admin dashboard for monitoring and analytics.

Integrate payment gateway for secure transactions.

Implement overdue reminders and more granular notification settings.

9. Getting Started
Database Setup:for .env file in server

{# Database Configuration
DB_HOST=localhost
DB_USER=root 
DB_PASSWORD=enter_your_password
DB_DATABASE=your_database_name
DB_CONNECTION_LIMIT=10

# JWT Configuration
JWT_SECRET=zdgx21xqriuny8@jfniauh@gaelgrjm&amaw9$mf@iefa
JWT_EXPIRES_IN=1h 

# Server Configuration
PORT=3000}

Run the table creation scripts.

Populate with sample data using the provided scripts.

Backend Integration:

Implement all stored procedures as described.

Frontend Deployment:

Connect UI components to backend APIs.

Test all user flows: registration, item listing, browsing, wishlist, rentals, and notifications.

10. Conclusion
The Campus Rental Platform is a robust, scalable solution for facilitating peer-to-peer item rentals within IIT Patna. 
Its normalized database design, secure workflows, comprehensive UI, and realistic sample data make it production-ready, 
.