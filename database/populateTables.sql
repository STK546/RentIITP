
INSERT INTO Users (username, email, password_hash, first_name, last_name, roll_number, phone_number, hostel_name, hostel_block, room_number, profile_picture_url, account_status) VALUES
('aman_b21', 'aman.kumar_b21@iitp.ac.in', 'hash1', 'Aman', 'Kumar', '2101CS01', '9876543210', 'CV Raman', 'A', '101', 'url/aman.jpg', 'active'),
('priya_b22', 'priya.sharma_b22@iitp.ac.in', 'hash2', 'Priya', 'Sharma', '2201EE15', '9876543211', 'APJ Abdul Kalam', 'B', '202', 'url/priya.jpg', 'active'),
('rahul_m20', 'rahul.verma_m20@iitp.ac.in', 'hash3', 'Rahul', 'Verma', '20M1ME05', '9876543212', 'Aryabhatta', 'C', '303', 'url/rahul.jpg', 'active'),
('sneha_b23', 'sneha.gupta_b23@iitp.ac.in', 'hash4', 'Sneha', 'Gupta', '2301CE22', '9876543213', 'CV Raman', 'A', '105', NULL, 'active'),
('vikas_b21', 'vikas.singh_b21@iitp.ac.in', 'hash5', 'Vikas', 'Singh', '2101ME30', '9876543214', 'APJ Abdul Kalam', 'B', '210', 'url/vikas.jpg', 'active'),
('anisha_m21', 'anisha.patel_m21@iitp.ac.in', 'hash6', 'Anisha', 'Patel', '21M1CS11', '9876543215', 'Aryabhatta', 'C', '315', NULL, 'active'),
('mohit_b22', 'mohit.jain_b22@iitp.ac.in', 'hash7', 'Mohit', 'Jain', '2201CB08', '9876543216', 'CV Raman', 'B', '112', 'url/mohit.jpg', 'active'),
('kavita_b23', 'kavita.reddy_b23@iitp.ac.in', 'hash8', 'Kavita', 'Reddy', '2301EE45', '9876543217', 'APJ Abdul Kalam', 'A', '220', NULL, 'active'),
('sumit_m20', 'sumit.das_m20@iitp.ac.in', 'hash9', 'Sumit', 'Das', '20M1CE19', '9876543218', 'Aryabhatta', 'B', '322', 'url/sumit.jpg', 'active'),
('neha_b21', 'neha.mishra_b21@iitp.ac.in', 'hash10', 'Neha', 'Mishra', '2101EE03', '9876543219', 'CV Raman', 'B', '118', NULL, 'active'),
('arjun_b22', 'arjun.rao_b22@iitp.ac.in', 'hash11', 'Arjun', 'Rao', '2201CS55', '9876543220', 'APJ Abdul Kalam', 'A', '225', 'url/arjun.jpg', 'active'),
('pooja_m21', 'pooja.yadav_m21@iitp.ac.in', 'hash12', 'Pooja', 'Yadav', '21M1EE24', '9876543221', 'Aryabhatta', 'B', '328', NULL, 'active'),
('rohit_b23', 'rohit.shukla_b23@iitp.ac.in', 'hash13', 'Rohit', 'Shukla', '2301ME39', '9876543222', 'CV Raman', 'C', '125', 'url/rohit.jpg', 'active'),
('divya_b21', 'divya.agarwal_b21@iitp.ac.in', 'hash14', 'Divya', 'Agarwal', '2101CS28', '9876543223', 'APJ Abdul Kalam', 'C', '230', NULL, 'active'),
('sanjay_m20', 'sanjay.tiwari_m20@iitp.ac.in', 'hash15', 'Sanjay', 'Tiwari', '20M1CS33', '9876543224', 'Aryabhatta', 'A', '335', 'url/sanjay.jpg', 'active'),
('meera_b22', 'meera.joshi_b22@iitp.ac.in', 'hash16', 'Meera', 'Joshi', '2201CE11', '9876543225', 'CV Raman', 'C', '130', NULL, 'active'),
('ajay_b23', 'ajay.nair_b23@iitp.ac.in', 'hash17', 'Ajay', 'Nair', '2301CB18', '9876543226', 'APJ Abdul Kalam', 'B', '235', 'url/ajay.jpg', 'active'),
('rani_m21', 'rani.malhotra_m21@iitp.ac.in', 'hash18', 'Rani', 'Malhotra', '21M1CE09', '9876543227', 'Aryabhatta', 'A', '340', NULL, 'active'),
('vijay_b21', 'vijay.chandra_b21@iitp.ac.in', 'hash19', 'Vijay', 'Chandra', '2101CE41', '9876543228', 'CV Raman', 'A', '135', 'url/vijay.jpg', 'active'),
('deepa_b22', 'deepa.saxena_b22@iitp.ac.in', 'hash20', 'Deepa', 'Saxena', '2201ME27', '9876543229', 'APJ Abdul Kalam', 'B', '240', NULL, 'active');


INSERT INTO Categories (name, description, icon_url) VALUES
('Electronics', 'Gadgets, chargers, accessories', 'url/cat_electronics.png'),
('Books', 'Textbooks, novels, reference books', 'url/cat_books.png'),
('Cycles', 'Bicycles for campus commute', 'url/cat_cycles.png'),
('Sports Equipment', 'Cricket bats, badminton rackets, footballs', 'url/cat_sports.png'),
('Stationery', 'Drafters, calculators, lab coats', 'url/cat_stationery.png'),
('Room Essentials', 'Buckets, kettles, mattresses, coolers', 'url/cat_room.png'),
('Clothing & Accessories', 'Formal wear, party wear, bags', 'url/cat_clothing.png'),
('Musical Instruments', 'Guitars, keyboards, tablas', 'url/cat_music.png'),
('Tools & Hardware', 'Screwdrivers, pliers, toolkits', 'url/cat_tools.png'),
('Gaming', 'Consoles, controllers, game CDs', 'url/cat_gaming.png');


INSERT INTO Items (owner_id, category_id, name, description, rental_price, rental_unit, item_condition, availability_status, location_description, max_rental_duration) VALUES
(1, 5, 'Casio FX-991ES Plus Calculator', 'Scientific calculator, suitable for exams', 10.00, 'day', 'good', 'available', 'CV Raman Room 101', 7),
(2, 3, 'Hero Sprint Cycle', 'Basic cycle, good condition, recently serviced', 25.00, 'day', 'good', 'available', 'APJ Kalam Hostel Parking', 30),
(3, 1, 'Boat Rockerz 450 Headphones', 'Wireless Bluetooth headphones, good bass', 30.00, 'day', 'like new', 'available', 'Aryabhatta Room 303', 5),
(4, 2, 'HC Verma Physics Vol 1 & 2', 'Standard physics textbooks for JEE/Engg', 50.00, 'week', 'fair', 'available', 'CV Raman Room 105', 90),
(5, 6, 'Electric Kettle 1.5L', 'Quick water heating for tea/coffee/noodles', 15.00, 'day', 'good', 'available', 'APJ Kalam Room 210', 14),
(1, 1, 'Raspberry Pi 4 Model B (4GB)', 'Mini computer for projects', 75.00, 'week', 'like new', 'available', 'CV Raman Room 101', 60),
(6, 4, 'Yonex Badminton Racket Set', '2 rackets and shuttlecocks, beginner level', 40.00, 'day', 'good', 'available', 'Aryabhatta Room 315', 7),
(7, 5, 'Mini Drafter', 'Engineering drawing drafter', 20.00, 'week', 'good', 'rented', 'CV Raman Room 112', 30),
(8, 3, 'Hercules Roadeo Cycle', 'Gear cycle, suitable for longer rides', 50.00, 'day', 'good', 'available', 'APJ Kalam Hostel Parking', 30),
(9, 2, 'Concepts of Physics by HC Verma', 'Vol 1 Only', 30.00, 'week', 'good', 'available', 'Aryabhatta Room 322', 90),
(10, 6, 'Plastic Bucket & Mug Set', 'Standard bathroom bucket and mug', 5.00, 'week', 'fair', 'available', 'CV Raman Room 118', 60),
(11, 1, 'Logitech M170 Wireless Mouse', 'Simple wireless mouse', 10.00, 'day', 'like new', 'available', 'APJ Kalam Room 225', 10),
(12, 4, 'SG Cricket Bat (Kashmir Willow)', 'Suitable for tennis ball cricket', 35.00, 'day', 'good', 'available', 'Aryabhatta Room 328', 7),
(13, 5, 'Lab Coat (Medium Size)', 'White lab coat for chemistry/biology labs', 25.00, 'week', 'like new', 'available', 'CV Raman Room 125', 90),
(14, 6, 'Small Room Cooler', 'Personal air cooler, decent condition', 100.00, 'week', 'fair', 'available', 'APJ Kalam Room 230', 30),
(15, 2, 'Introduction to Algorithms by CLRS', 'Standard algorithms textbook', 70.00, 'week', 'good', 'available', 'Aryabhatta Room 335', 90),
(16, 1, 'TP-Link Wi-Fi Router', 'Basic N300 Wi-Fi Router', 20.00, 'day', 'good', 'rented', 'CV Raman Room 130', 15),
(17, 3, 'Skates (Roller Blades)', 'Size 8 Roller Blades', 60.00, 'day', 'good', 'available', 'APJ Kalam Room 235', 3),
(18, 8, 'Acoustic Guitar (Beginner)', 'Juarez Acoustic Guitar with Bag', 80.00, 'week', 'good', 'available', 'Aryabhatta Room 340', 60),
(19, 6, 'Foldable Study Table', 'Small wooden foldable table', 30.00, 'week', 'good', 'available', 'CV Raman Room 135', 90),
(20, 1, 'Sandisk 64GB Pendrive', 'USB 3.0 Pendrive', 15.00, 'week', 'like new', 'available', 'APJ Kalam Room 240', 30),
(1, 10, 'PS4 Controller (DualShock 4)', 'Extra controller for PS4', 50.00, 'day', 'good', 'available', 'CV Raman Room 101', 7),
(5, 7, 'Black Formal Suit (Size M)', 'Complete suit for interviews/events', 150.00, 'day', 'like new', 'available', 'APJ Kalam Room 210', 3);


-- Images for Item 1 (Calculator)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(1, 'url/item1_1.jpg', TRUE),
(1, 'url/item1_2.jpg', FALSE);
-- Images for Item 2 (Cycle)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(2, 'url/item2_1.jpg', TRUE),
(2, 'url/item2_2.jpg', FALSE),
(2, 'url/item2_3.jpg', FALSE);
-- Images for Item 3 (Headphones)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(3, 'url/item3_1.jpg', TRUE);
-- Images for Item 4 (Books)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(4, 'url/item4_1.jpg', TRUE);
-- Images for Item 5 (Kettle)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(5, 'url/item5_1.jpg', TRUE),
(5, 'url/item5_2.jpg', FALSE);
-- Images for Item 6 (Raspberry Pi)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(6, 'url/item6_1.jpg', TRUE),
(6, 'url/item6_2.jpg', FALSE);
-- Images for Item 7 (Badminton Set)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(7, 'url/item7_1.jpg', TRUE);
-- Images for Item 8 (Drafter)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(8, 'url/item8_1.jpg', TRUE);
-- Images for Item 9 (Gear Cycle)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(9, 'url/item9_1.jpg', TRUE),
(9, 'url/item9_2.jpg', FALSE);
-- Images for Item 10 (HC Verma Vol 1)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(10, 'url/item10_1.jpg', TRUE);
-- Images for Item 11 (Bucket)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(11, 'url/item11_1.jpg', TRUE);
-- Images for Item 12 (Mouse)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(12, 'url/item12_1.jpg', TRUE);
-- Images for Item 13 (Cricket Bat)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(13, 'url/item13_1.jpg', TRUE);
-- Images for Item 14 (Lab Coat)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(14, 'url/item14_1.jpg', TRUE);
-- Images for Item 15 (Cooler)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(15, 'url/item15_1.jpg', TRUE),
(15, 'url/item15_2.jpg', FALSE);
-- Images for Item 16 (CLRS Book)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(16, 'url/item16_1.jpg', TRUE);
-- Images for Item 17 (Router)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(17, 'url/item17_1.jpg', TRUE);
-- Images for Item 18 (Skates)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(18, 'url/item18_1.jpg', TRUE);
-- Images for Item 19 (Guitar)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(19, 'url/item19_1.jpg', TRUE),
(19, 'url/item19_2.jpg', FALSE);
-- Images for Item 20 (Table)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(20, 'url/item20_1.jpg', TRUE);
-- Images for Item 21 (Pendrive)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(21, 'url/item21_1.jpg', TRUE);
-- Images for Item 22 (PS4 Controller)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(22, 'url/item22_1.jpg', TRUE);
-- Images for Item 23 (Suit)
INSERT INTO ItemImages (item_id, image_url, is_primary) VALUES
(23, 'url/item23_1.jpg', TRUE),
(23, 'url/item23_2.jpg', FALSE);



INSERT INTO Rentals (item_id, renter_id, start_date, end_date, agreed_price, rental_status, booking_date, pickup_time, return_time) VALUES
(2, 4, '2025-04-17 10:00:00', '2025-04-19 10:00:00', 50.00, 'confirmed', '2025-04-16 14:00:00', NULL, NULL),
(5, 7, '2025-04-10 12:00:00', '2025-04-17 12:00:00', 105.00, 'active', '2025-04-09 09:30:00', '2025-04-10 12:15:00', NULL),
(8, 1, '2025-04-01 09:00:00', '2025-04-15 09:00:00', 40.00, 'completed', '2025-03-31 11:00:00', '2025-04-01 09:10:00', '2025-04-15 08:55:00'), -- Item 8 was previously rented
(17, 3, '2025-04-12 18:00:00', '2025-04-19 18:00:00', 140.00, 'active', '2025-04-11 20:00:00', '2025-04-12 18:05:00', NULL), -- Item 17 is currently rented
(1, 10, '2025-04-18 09:00:00', '2025-04-20 09:00:00', 20.00, 'requested', '2025-04-16 18:00:00', NULL, NULL),
(9, 11, '2025-04-17 15:00:00', '2025-04-24 15:00:00', 350.00, 'requested', '2025-04-16 19:00:00', NULL, NULL),
(4, 15, '2025-03-01 10:00:00', '2025-04-01 10:00:00', 200.00, 'completed', '2025-02-28 16:00:00', '2025-03-01 10:05:00', '2025-04-01 09:45:00'),
(13, 5, '2025-04-19 11:00:00', '2025-04-21 11:00:00', 70.00, 'requested', '2025-04-16 20:15:00', NULL, NULL),
(20, 2, '2025-04-18 17:00:00', '2025-05-02 17:00:00', 60.00, 'confirmed', '2025-04-16 10:00:00', NULL, NULL),
(6, 12, '2025-04-20 10:00:00', '2025-05-04 10:00:00', 150.00, 'requested', '2025-04-16 22:00:00', NULL, NULL),
(3, 14, '2025-04-15 13:00:00', '2025-04-16 13:00:00', 30.00, 'cancelled', '2025-04-14 19:00:00', NULL, NULL),
(11, 9, '2025-04-10 08:00:00', '2025-04-12 08:00:00', 10.00, 'completed', '2025-04-09 21:00:00', '2025-04-10 08:10:00', '2025-04-12 07:50:00'),
(19, 13, '2025-04-17 12:00:00', '2025-05-15 12:00:00', 120.00, 'confirmed', '2025-04-15 15:30:00', NULL, NULL),
(22, 18, '2025-04-18 19:00:00', '2025-04-20 19:00:00', 100.00, 'requested', '2025-04-16 23:10:00', NULL, NULL),
(15, 1, '2025-04-05 14:00:00', '2025-04-12 14:00:00', 100.00, 'completed', '2025-04-04 18:20:00', '2025-04-05 14:05:00', '2025-04-12 13:55:00'),
(7, 19, '2025-04-19 16:00:00', '2025-04-19 20:00:00', 40.00, 'requested', '2025-04-16 11:30:00', NULL, NULL),
(12, 20, '2025-04-17 09:00:00', '2025-04-18 09:00:00', 10.00, 'rejected', '2025-04-16 08:00:00', NULL, NULL),
(18, 6, '2025-04-21 10:00:00', '2025-05-05 10:00:00', 160.00, 'confirmed', '2025-04-16 17:45:00', NULL, NULL),
(14, 11, '2025-04-18 13:00:00', '2025-04-25 13:00:00', 100.00, 'requested', '2025-04-16 12:25:00', NULL, NULL),
(21, 8, '2025-04-17 11:00:00', '2025-04-24 11:00:00', 15.00, 'confirmed', '2025-04-16 09:15:00', NULL, NULL),
(23, 16, '2025-04-19 09:00:00', '2025-04-19 21:00:00', 150.00, 'requested', '2025-04-16 21:05:00', NULL, NULL);


INSERT INTO Messages (sender_id, receiver_id, rental_id, item_id, message_text, sent_timestamp) VALUES
(4, 2, 1, 2, 'Hey, confirming the cycle rental for tomorrow. Where exactly can I pick it up?', '2025-04-16 14:05:00'),
(2, 4, 1, 2, 'Hi Priya, sure. It''s parked near the APJ Kalam hostel main gate, lock code is 1234.', '2025-04-16 14:10:00'),
(7, 5, 2, 5, 'Hi Vikas, kettle is working fine. Just wanted to let you know.', '2025-04-11 10:00:00'),
(5, 7, 2, 5, 'Great, thanks for the update Mohit!', '2025-04-11 10:05:00'),
(1, 7, NULL, 8, 'Hi Mohit, I returned the drafter yesterday. Hope it was okay.', '2025-04-16 09:00:00'),
(7, 1, NULL, 8, 'Yes Aman, got it back. Thanks!', '2025-04-16 09:05:00'),
(3, 17, 4, 17, 'Hi Ajay, reminder about the router rental starting tomorrow.', '2025-04-11 20:10:00'),
(10, 1, 5, 1, 'Hi Aman, I need the calculator for my exam on 18th and 19th. Is it available?', '2025-04-16 18:02:00'),
(1, 10, 5, 1, 'Yes Neha, it''s available. I have accepted your request.', '2025-04-16 18:05:00'),
(11, 9, 6, 9, 'Can I rent the gear cycle for a week starting tomorrow?', '2025-04-16 19:01:00'),
(9, 11, 6, 9, 'Sure Arjun, request accepted.', '2025-04-16 19:05:00'),
(15, 4, NULL, 4, 'Is the HC Verma book set still available?', '2025-04-16 10:30:00'),
(4, 15, NULL, 4, 'Yes Sanjay, it is.', '2025-04-16 10:35:00'),
(5, 13, 8, 13, 'Hi Rohit, interested in the cricket bat for the weekend.', '2025-04-16 20:16:00'),
(2, 20, 9, 20, 'Requesting the study table for two weeks.', '2025-04-16 10:01:00'),
(12, 6, 10, 6, 'Can I rent the Raspberry Pi for my project?', '2025-04-16 22:02:00'),
(14, 3, 11, 3, 'Sorry, need to cancel the headphone rental.', '2025-04-15 10:00:00'),
(3, 14, 11, 3, 'Okay Divya, cancellation confirmed.', '2025-04-15 10:05:00'),
(9, 11, NULL, 11, 'Thanks for returning the bucket set.', '2025-04-12 08:00:00'),
(13, 19, 13, 19, 'Need the foldable table for my room.', '2025-04-15 15:31:00'),
(18, 1, 14, 22, 'Is the PS4 controller available for this weekend?', '2025-04-16 23:11:00'),
(1, 15, NULL, 15, 'Thanks for renting the cooler!', '2025-04-12 14:00:00'),
(19, 7, 16, 7, 'Need the badminton set for Saturday evening.', '2025-04-16 11:31:00'),
(20, 12, 17, 12, 'Can I rent the wireless mouse for a day?', '2025-04-16 08:01:00'),
(12, 20, 17, 12, 'Sorry Deepa, it''s booked for that day.', '2025-04-16 08:05:00');


INSERT INTO Notifications (user_id, related_entity_type, related_entity_id, notification_type, message) VALUES
(2, 'rental', 1, 'rental_confirmed', 'Your rental request for Hero Sprint Cycle has been confirmed by Priya Sharma.'),
(5, 'rental', 2, 'rental_reminder_start', 'Your rental for Electric Kettle 1.5L starts today.'),
(7, 'rental', 2, 'rental_reminder_end', 'Your rental for Electric Kettle 1.5L ends today.'),
(1, 'rental', 3, 'rental_completed', 'Your rental of Mini Drafter to Aman Kumar is complete.'),
(7, 'rental', 3, 'rental_completed', 'Your rental of Mini Drafter from Mohit Jain is complete.'),
(17, 'rental', 4, 'rental_reminder_start', 'Your rental for TP-Link Wi-Fi Router starts today.'),
(1, 'rental', 5, 'rental_requested', 'Neha Mishra has requested to rent your Casio FX-991ES Plus Calculator.'),
(10, 'rental', 5, 'rental_confirmed', 'Your rental request for Casio FX-991ES Plus Calculator has been confirmed.'),
(9, 'rental', 6, 'rental_requested', 'Arjun Rao has requested to rent your Hercules Roadeo Cycle.'),
(11, 'rental', 6, 'rental_confirmed', 'Your rental request for Hercules Roadeo Cycle has been confirmed.'),
(4, 'rental', 7, 'rental_completed', 'Your rental of HC Verma Physics Vol 1 & 2 to Sanjay Tiwari is complete.'),
(15, 'rental', 7, 'rental_completed', 'Your rental of HC Verma Physics Vol 1 & 2 from Sneha Gupta is complete.'),
(13, 'rental', 8, 'rental_requested', 'Vikas Singh has requested to rent your SG Cricket Bat (Kashmir Willow).'),
(20, 'rental', 9, 'rental_confirmed', 'Your rental request for Foldable Study Table has been confirmed.'),
(6, 'rental', 10, 'rental_requested', 'Pooja Yadav has requested to rent your Raspberry Pi 4 Model B (4GB).'),
(3, 'rental', 11, 'rental_cancelled', 'Divya Agarwal has cancelled the rental request for your Boat Rockerz 450 Headphones.'),
(14, 'rental', 11, 'rental_cancelled', 'Your rental request for Boat Rockerz 450 Headphones was cancelled.'),
(19, 'rental', 13, 'rental_confirmed', 'Your rental request for Foldable Study Table has been confirmed.'),
(1, 'rental', 14, 'rental_requested', 'Rani Malhotra has requested to rent your PS4 Controller (DualShock 4).'),
(11, 'rental', 19, 'rental_requested', 'Ajay Nair has requested to rent your Small Room Cooler.'),
(8, 'rental', 20, 'rental_confirmed', 'Your rental request for Sandisk 64GB Pendrive has been confirmed.'),
(16, 'rental', 21, 'rental_requested', 'Meera Joshi has requested to rent your Black Formal Suit (Size M).'),
(4, 'message', 1, 'message_received', 'You have a new message from Aman Kumar regarding rental #1.'),
(2, 'message', 2, 'message_received', 'You have a new message from Priya Sharma regarding rental #1.'),
(15, 'message', 12, 'message_received', 'You have a new message from Sneha Gupta regarding item #4.');


