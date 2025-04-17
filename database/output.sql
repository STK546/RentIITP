
mysql> show tables;
+--------------------+
| Tables_in_RentIITP |
+--------------------+
| Categories         |
| ItemImages         |
| Items              |
| Notifications      |
| Rentals            |
| Users              |
| WishlistItems      |
+--------------------+
7 rows in set (0.00 sec)

mysql> select * from Categories;
om ItemImages;+-------------+-------------------------+--------------------------------------------+-----------------------------+
| category_id | name                    | description                                | icon_url                    |
+-------------+-------------------------+--------------------------------------------+-----------------------------+
|           1 | Electronics             | Gadgets, chargers, accessories             | url/cat_electronics.png     |
|           2 | Books                   | Textbooks, novels, reference books         | url/cat_books.png           |
|           3 | Cycles                  | Bicycles for campus commute                | url/cat_cycles.png          |
|           4 | Sports Equipment        | Cricket bats, badminton rackets, footballs | url/cat_sports.png          |
|           5 | Stationery              | Drafters, calculators, lab coats           | url/cat_stationery.png      |
|           6 | Room Essentials         | Buckets, kettles, mattresses, coolers      | url/cat_room.png            |
|           7 | Clothing & Accessories  | Formal wear, party wear, bags              | url/cat_clothing.png        |
|           8 | Musical Instruments     | Guitars, keyboards, tablas                 | url/cat_music.png           |
|           9 | Tools & Hardware        | Screwdrivers, pliers, toolkits             | url/cat_tools.png           |
|          10 | Gaming                  | Consoles, controllers, game CDs            | url/cat_gaming.png          |
|          11 | Furniture               | Chairs, tables, shelves                    | url/cat_furniture.png       |
|          12 | Kitchen Appliances      | Microwaves, toasters, kettles              | url/cat_kitchen.png         |
|          13 | Outdoor Gear            | Tents, backpacks, camping equipment        | url/cat_outdoor.png         |
|          14 | Photography             | Cameras, tripods, lighting                 | url/cat_photography.png     |
|          15 | Vehicles                | Scooters, bikes, cars                      | url/cat_vehicles.png        |
|          16 | Health & Fitness        | Yoga mats, dumbbells, fitness trackers     | url/cat_fitness.png         |
|          17 | Toys & Games            | Board games, puzzles, toys                 | url/cat_toys.png            |
|          18 | Art Supplies            | Paints, brushes, canvases                  | url/cat_art.png             |
|          19 | Electronics Accessories | Chargers, cables, adapters                 | url/cat_electronics_acc.png |
|          20 | Books - Fiction         | Novels and fiction books                   | url/cat_books_fiction.png   |
+-------------+-------------------------+--------------------------------------------+-----------------------------+
20 rows in set (0.00 sec)


select mysql> select * from ItemImages;
+----------+---------+------------------+------------+---------------------+
| image_id | item_id | image_url        | is_primary | upload_date         |
+----------+---------+------------------+------------+---------------------+
|        1 |       1 | url/item1_1.jpg  |          1 | 2025-04-17 01:08:07 |
|        2 |       1 | url/item1_2.jpg  |          0 | 2025-04-17 01:08:07 |
|        3 |       2 | url/item2_1.jpg  |          1 | 2025-04-17 01:08:07 |
|        4 |       2 | url/item2_2.jpg  |          0 | 2025-04-17 01:08:07 |
|        5 |       2 | url/item2_3.jpg  |          0 | 2025-04-17 01:08:07 |
|        6 |       3 | url/item3_1.jpg  |          1 | 2025-04-17 01:08:07 |
|        7 |       4 | url/item4_1.jpg  |          1 | 2025-04-17 01:08:07 |
|        8 |       5 | url/item5_1.jpg  |          1 | 2025-04-17 01:08:07 |
|        9 |       5 | url/item5_2.jpg  |          0 | 2025-04-17 01:08:07 |
|       10 |       6 | url/item6_1.jpg  |          1 | 2025-04-17 01:08:07 |
|       11 |       6 | url/item6_2.jpg  |          0 | 2025-04-17 01:08:07 |
|       12 |       7 | url/item7_1.jpg  |          1 | 2025-04-17 01:08:07 |
|       13 |       8 | url/item8_1.jpg  |          1 | 2025-04-17 01:08:07 |
|       14 |       9 | url/item9_1.jpg  |          1 | 2025-04-17 01:08:07 |
|       15 |       9 | url/item9_2.jpg  |          0 | 2025-04-17 01:08:07 |
|       16 |      10 | url/item10_1.jpg |          1 | 2025-04-17 01:08:07 |
|       17 |      11 | url/item11_1.jpg |          1 | 2025-04-17 01:08:07 |
|       18 |      12 | url/item12_1.jpg |          1 | 2025-04-17 01:08:07 |
|       19 |      13 | url/item13_1.jpg |          1 | 2025-04-17 01:08:07 |
|       20 |      14 | url/item14_1.jpg |          1 | 2025-04-17 01:08:07 |
|       21 |      15 | url/item15_1.jpg |          1 | 2025-04-17 01:08:07 |
|       22 |      15 | url/item15_2.jpg |          0 | 2025-04-17 01:08:07 |
|       23 |      16 | url/item16_1.jpg |          1 | 2025-04-17 01:08:07 |
|       24 |      17 | url/item17_1.jpg |          1 | 2025-04-17 01:08:07 |
|       25 |      18 | url/item18_1.jpg |          1 | 2025-04-17 01:08:07 |
|       26 |      19 | url/item19_1.jpg |          1 | 2025-04-17 01:08:07 |
|       27 |      19 | url/item19_2.jpg |          0 | 2025-04-17 01:08:07 |
|       28 |      21 | url/item20_1.jpg |          1 | 2025-04-17 01:08:07 |
+----------+---------+------------------+------------+---------------------+
28 rows in set (0.00 sec)

mysql> select * from Items;
select * from Notifications;
select * from Rentals;
select * from Users;
select * from WishlistItems;+---------+----------+-------------+------------------------------------+------------------------------------------------+--------------+-------------+----------------+---------------------+--------------------------+---------------------+---------------------+
| item_id | owner_id | category_id | name                               | description                                    | rental_price | rental_unit | item_condition | availability_status | location_description     | date_added          | max_rental_duration |
+---------+----------+-------------+------------------------------------+------------------------------------------------+--------------+-------------+----------------+---------------------+--------------------------+---------------------+---------------------+
|       1 |        1 |           5 | Casio FX-991ES Plus Calculator     | Scientific calculator, suitable for exams      |        10.00 | day         | good           | available           | CV Raman Room 101        | 2025-04-17 01:08:03 |                   7 |
|       2 |        2 |           3 | Hero Sprint Cycle                  | Basic cycle, good condition, recently serviced |        25.00 | day         | good           | available           | APJ Kalam Hostel Parking | 2025-04-17 01:08:03 |                  30 |
|       3 |        3 |           1 | Boat Rockerz 450 Headphones        | Wireless Bluetooth headphones, good bass       |        30.00 | day         | like new       | available           | Aryabhatta Room 303      | 2025-04-17 01:08:03 |                   5 |
|       4 |        4 |           2 | HC Verma Physics Vol 1 & 2         | Standard physics textbooks for JEE/Engg        |        50.00 | week        | fair           | available           | CV Raman Room 105        | 2025-04-17 01:08:03 |                  90 |
|       5 |        5 |           6 | Electric Kettle 1.5L               | Quick water heating for tea/coffee/noodles     |        15.00 | day         | good           | available           | APJ Kalam Room 210       | 2025-04-17 01:08:03 |                  14 |
|       6 |        1 |           1 | Raspberry Pi 4 Model B (4GB)       | Mini computer for projects                     |        75.00 | week        | like new       | available           | CV Raman Room 101        | 2025-04-17 01:08:03 |                  60 |
|       7 |        6 |           4 | Yonex Badminton Racket Set         | 2 rackets and shuttlecocks, beginner level     |        40.00 | day         | good           | available           | Aryabhatta Room 315      | 2025-04-17 01:08:03 |                   7 |
|       8 |        7 |           5 | Mini Drafter                       | Engineering drawing drafter                    |        20.00 | week        | good           | rented              | CV Raman Room 112        | 2025-04-17 01:08:03 |                  30 |
|       9 |        8 |           3 | Hercules Roadeo Cycle              | Gear cycle, suitable for longer rides          |        50.00 | day         | good           | available           | APJ Kalam Hostel Parking | 2025-04-17 01:08:03 |                  30 |
|      10 |        9 |           2 | Concepts of Physics by HC Verma    | Vol 1 Only                                     |        30.00 | week        | good           | available           | Aryabhatta Room 322      | 2025-04-17 01:08:03 |                  90 |
|      11 |       10 |           6 | Plastic Bucket & Mug Set           | Standard bathroom bucket and mug               |         5.00 | week        | fair           | available           | CV Raman Room 118        | 2025-04-17 01:08:03 |                  60 |
|      12 |       11 |           1 | Logitech M170 Wireless Mouse       | Simple wireless mouse                          |        10.00 | day         | like new       | available           | APJ Kalam Room 225       | 2025-04-17 01:08:03 |                  10 |
|      13 |       12 |           4 | SG Cricket Bat (Kashmir Willow)    | Suitable for tennis ball cricket               |        35.00 | day         | good           | available           | Aryabhatta Room 328      | 2025-04-17 01:08:03 |                   7 |
|      14 |       13 |           5 | Lab Coat (Medium Size)             | White lab coat for chemistry/biology labs      |        25.00 | week        | like new       | available           | CV Raman Room 125        | 2025-04-17 01:08:03 |                  90 |
|      15 |       14 |           6 | Small Room Cooler                  | Personal air cooler, decent condition          |       100.00 | week        | fair           | available           | APJ Kalam Room 230       | 2025-04-17 01:08:03 |                  30 |
|      16 |       15 |           2 | Introduction to Algorithms by CLRS | Standard algorithms textbook                   |        70.00 | week        | good           | available           | Aryabhatta Room 335      | 2025-04-17 01:08:03 |                  90 |
|      17 |       16 |           1 | TP-Link Wi-Fi Router               | Basic N300 Wi-Fi Router                        |        20.00 | day         | good           | rented              | CV Raman Room 130        | 2025-04-17 01:08:03 |                  15 |
|      18 |       17 |           3 | Skates (Roller Blades)             | Size 8 Roller Blades                           |        60.00 | day         | good           | available           | APJ Kalam Room 235       | 2025-04-17 01:08:03 |                   3 |
|      19 |       18 |           8 | Acoustic Guitar (Beginner)         | Juarez Acoustic Guitar with Bag                |        80.00 | week        | good           | available           | Aryabhatta Room 340      | 2025-04-17 01:08:03 |                  60 |
|      20 |       19 |           6 | Foldable Study Table               | Small wooden foldable table                    |        30.00 | week        | good           | available           | CV Raman Room 135        | 2025-04-17 01:08:03 |                  90 |
|      21 |       20 |           1 | Sandisk 64GB Pendrive              | USB 3.0 Pendrive                               |        15.00 | week        | like new       | available           | APJ Kalam Room 240       | 2025-04-17 01:08:03 |                  30 |
+---------+----------+-------------+------------------------------------+------------------------------------------------+--------------+-------------+----------------+---------------------+--------------------------+---------------------+---------------------+
21 rows in set (0.01 sec)

mysql> select * from Notifications;
+-----------------+---------+-------------------+-----------------------+--------------------------------------------------------------------------------------+---------------------+
| notification_id | user_id | related_entity_id | notification_type     | message                                                                              | created_timestamp   |
+-----------------+---------+-------------------+-----------------------+--------------------------------------------------------------------------------------+---------------------+
|               1 |       4 |                 1 | rental_confirmed      | Your rental request for Hero Sprint Cycle has been confirmed by Priya Sharma.        | 2025-04-17 01:08:14 |
|               2 |       7 |                 2 | rental_reminder_start | Your rental for Electric Kettle 1.5L starts today.                                   | 2025-04-17 01:08:14 |
|               3 |       7 |                 2 | rental_reminder_end   | Your rental for Electric Kettle 1.5L ends today.                                     | 2025-04-17 01:08:14 |
|               4 |       1 |                 3 | rental_completed      | Your rental of Mini Drafter to Aman Kumar is complete.                               | 2025-04-17 01:08:14 |
|               5 |       7 |                 3 | rental_completed      | Your rental of Mini Drafter from Mohit Jain is complete.                             | 2025-04-17 01:08:14 |
|               6 |       3 |                 4 | rental_reminder_start | Your rental for TP-Link Wi-Fi Router starts today.                                   | 2025-04-17 01:08:14 |
|               7 |       1 |                 5 | rental_requested      | Neha Mishra has requested to rent your Casio FX-991ES Plus Calculator.               | 2025-04-17 01:08:14 |
|               8 |      10 |                 5 | rental_confirmed      | Your rental request for Casio FX-991ES Plus Calculator has been confirmed.           | 2025-04-17 01:08:14 |
|               9 |       8 |                 6 | rental_requested      | Arjun Rao has requested to rent your Hercules Roadeo Cycle.                          | 2025-04-17 01:08:14 |
|              10 |      11 |                 6 | rental_confirmed      | Your rental request for Hercules Roadeo Cycle has been confirmed.                    | 2025-04-17 01:08:14 |
|              11 |       4 |                 7 | rental_completed      | Your rental of HC Verma Physics Vol 1 & 2 to Sanjay Tiwari is complete.              | 2025-04-17 01:08:14 |
|              12 |      15 |                 7 | rental_completed      | Your rental of HC Verma Physics Vol 1 & 2 from Sneha Gupta is complete.              | 2025-04-17 01:08:14 |
|              13 |      13 |                 8 | rental_requested      | Vikas Singh has requested to rent your SG Cricket Bat (Kashmir Willow).              | 2025-04-17 01:08:14 |
|              14 |       2 |                 9 | rental_confirmed      | Your rental request for Sandisk 64GB Pendrive has been confirmed.                    | 2025-04-17 01:08:14 |
|              15 |       1 |                10 | rental_requested      | Pooja Yadav has requested to rent your Raspberry Pi 4 Model B (4GB).                 | 2025-04-17 01:08:14 |
|              16 |       3 |                11 | rental_cancelled      | Divya Agarwal has cancelled the rental request for your Boat Rockerz 450 Headphones. | 2025-04-17 01:08:14 |
|              17 |      14 |                11 | rental_cancelled      | Your rental request for Boat Rockerz 450 Headphones was cancelled.                   | 2025-04-17 01:08:14 |
|              18 |      13 |                13 | rental_confirmed      | Your rental request for Foldable Study Table has been confirmed.                     | 2025-04-17 01:08:14 |
+-----------------+---------+-------------------+-----------------------+--------------------------------------------------------------------------------------+---------------------+
18 rows in set (0.00 sec)

mysql> select * from Rentals;
+-----------+---------+-----------+---------------------+---------------------+--------------+---------------+
| rental_id | item_id | renter_id | start_date          | end_date            | agreed_price | rental_status |
+-----------+---------+-----------+---------------------+---------------------+--------------+---------------+
|         1 |       2 |         4 | 2025-04-17 10:00:00 | 2025-04-19 10:00:00 |        50.00 | confirmed     |
|         2 |       5 |         7 | 2025-04-10 12:00:00 | 2025-04-17 12:00:00 |       105.00 | active        |
|         3 |       8 |         1 | 2025-04-01 09:00:00 | 2025-04-15 09:00:00 |        40.00 | completed     |
|         4 |      17 |         3 | 2025-04-12 18:00:00 | 2025-04-19 18:00:00 |       140.00 | active        |
|         5 |       1 |        10 | 2025-04-18 09:00:00 | 2025-04-20 09:00:00 |        20.00 | requested     |
|         6 |       9 |        11 | 2025-04-17 15:00:00 | 2025-04-24 15:00:00 |       350.00 | requested     |
|         7 |       4 |        15 | 2025-03-01 10:00:00 | 2025-04-01 10:00:00 |       200.00 | completed     |
|         8 |      13 |         5 | 2025-04-19 11:00:00 | 2025-04-21 11:00:00 |        70.00 | requested     |
|         9 |      21 |         2 | 2025-04-18 17:00:00 | 2025-05-02 17:00:00 |        60.00 | confirmed     |
|        10 |       6 |        12 | 2025-04-20 10:00:00 | 2025-05-04 10:00:00 |       150.00 | requested     |
|        11 |       3 |        14 | 2025-04-15 13:00:00 | 2025-04-16 13:00:00 |        30.00 | cancelled     |
|        12 |      11 |         9 | 2025-04-10 08:00:00 | 2025-04-12 08:00:00 |        10.00 | completed     |
|        13 |      19 |        13 | 2025-04-17 12:00:00 | 2025-05-15 12:00:00 |       120.00 | confirmed     |
|        14 |      15 |         1 | 2025-04-05 14:00:00 | 2025-04-12 14:00:00 |       100.00 | completed     |
|        15 |       7 |        19 | 2025-04-19 16:00:00 | 2025-04-19 20:00:00 |        40.00 | requested     |
|        16 |      12 |        20 | 2025-04-17 09:00:00 | 2025-04-18 09:00:00 |        10.00 | rejected      |
|        17 |      18 |         6 | 2025-04-21 10:00:00 | 2025-05-05 10:00:00 |       160.00 | confirmed     |
|        18 |      14 |        11 | 2025-04-18 13:00:00 | 2025-04-25 13:00:00 |       100.00 | requested     |
|        19 |      21 |         8 | 2025-04-17 11:00:00 | 2025-04-24 11:00:00 |        15.00 | confirmed     |
+-----------+---------+-----------+---------------------+---------------------+--------------+---------------+
19 rows in set (0.00 sec)

mysql> select * from Users;
+---------+------------+------------------------------+---------------+------------+-----------+-------------+--------------+-----------------+--------------+-------------+---------------------+---------------------+----------------+
| user_id | username   | email                        | password_hash | first_name | last_name | roll_number | phone_number | hostel_name     | hostel_block | room_number | profile_picture_url | registration_date   | account_status |
+---------+------------+------------------------------+---------------+------------+-----------+-------------+--------------+-----------------+--------------+-------------+---------------------+---------------------+----------------+
|       1 | aman_b21   | aman.kumar_b21@iitp.ac.in    | hash1         | Aman       | Kumar     | 2101CS01    | 9876543210   | CV Raman        | A            | 101         | url/aman.jpg        | 2025-04-17 01:07:53 | active         |
|       2 | priya_b22  | priya.sharma_b22@iitp.ac.in  | hash2         | Priya      | Sharma    | 2201EE15    | 9876543211   | APJ Abdul Kalam | B            | 202         | url/priya.jpg       | 2025-04-17 01:07:53 | active         |
|       3 | rahul_m20  | rahul.verma_m20@iitp.ac.in   | hash3         | Rahul      | Verma     | 20M1ME05    | 9876543212   | Aryabhatta      | C            | 303         | url/rahul.jpg       | 2025-04-17 01:07:53 | active         |
|       4 | sneha_b23  | sneha.gupta_b23@iitp.ac.in   | hash4         | Sneha      | Gupta     | 2301CE22    | 9876543213   | CV Raman        | A            | 105         | NULL                | 2025-04-17 01:07:53 | active         |
|       5 | vikas_b21  | vikas.singh_b21@iitp.ac.in   | hash5         | Vikas      | Singh     | 2101ME30    | 9876543214   | APJ Abdul Kalam | B            | 210         | url/vikas.jpg       | 2025-04-17 01:07:53 | active         |
|       6 | anisha_m21 | anisha.patel_m21@iitp.ac.in  | hash6         | Anisha     | Patel     | 21M1CS11    | 9876543215   | Aryabhatta      | C            | 315         | NULL                | 2025-04-17 01:07:53 | active         |
|       7 | mohit_b22  | mohit.jain_b22@iitp.ac.in    | hash7         | Mohit      | Jain      | 2201CB08    | 9876543216   | CV Raman        | B            | 112         | url/mohit.jpg       | 2025-04-17 01:07:53 | active         |
|       8 | kavita_b23 | kavita.reddy_b23@iitp.ac.in  | hash8         | Kavita     | Reddy     | 2301EE45    | 9876543217   | APJ Abdul Kalam | A            | 220         | NULL                | 2025-04-17 01:07:53 | active         |
|       9 | sumit_m20  | sumit.das_m20@iitp.ac.in     | hash9         | Sumit      | Das       | 20M1CE19    | 9876543218   | Aryabhatta      | B            | 322         | url/sumit.jpg       | 2025-04-17 01:07:53 | active         |
|      10 | neha_b21   | neha.mishra_b21@iitp.ac.in   | hash10        | Neha       | Mishra    | 2101EE03    | 9876543219   | CV Raman        | B            | 118         | NULL                | 2025-04-17 01:07:53 | active         |
|      11 | arjun_b22  | arjun.rao_b22@iitp.ac.in     | hash11        | Arjun      | Rao       | 2201CS55    | 9876543220   | APJ Abdul Kalam | A            | 225         | url/arjun.jpg       | 2025-04-17 01:07:53 | active         |
|      12 | pooja_m21  | pooja.yadav_m21@iitp.ac.in   | hash12        | Pooja      | Yadav     | 21M1EE24    | 9876543221   | Aryabhatta      | B            | 328         | NULL                | 2025-04-17 01:07:53 | active         |
|      13 | rohit_b23  | rohit.shukla_b23@iitp.ac.in  | hash13        | Rohit      | Shukla    | 2301ME39    | 9876543222   | CV Raman        | C            | 125         | url/rohit.jpg       | 2025-04-17 01:07:53 | active         |
|      14 | divya_b21  | divya.agarwal_b21@iitp.ac.in | hash14        | Divya      | Agarwal   | 2101CS28    | 9876543223   | APJ Abdul Kalam | C            | 230         | NULL                | 2025-04-17 01:07:53 | active         |
|      15 | sanjay_m20 | sanjay.tiwari_m20@iitp.ac.in | hash15        | Sanjay     | Tiwari    | 20M1CS33    | 9876543224   | Aryabhatta      | A            | 335         | url/sanjay.jpg      | 2025-04-17 01:07:53 | active         |
|      16 | meera_b22  | meera.joshi_b22@iitp.ac.in   | hash16        | Meera      | Joshi     | 2201CE11    | 9876543225   | CV Raman        | C            | 130         | NULL                | 2025-04-17 01:07:53 | active         |
|      17 | ajay_b23   | ajay.nair_b23@iitp.ac.in     | hash17        | Ajay       | Nair      | 2301CB18    | 9876543226   | APJ Abdul Kalam | B            | 235         | url/ajay.jpg        | 2025-04-17 01:07:53 | active         |
|      18 | rani_m21   | rani.malhotra_m21@iitp.ac.in | hash18        | Rani       | Malhotra  | 21M1CE09    | 9876543227   | Aryabhatta      | A            | 340         | NULL                | 2025-04-17 01:07:53 | active         |
|      19 | vijay_b21  | vijay.chandra_b21@iitp.ac.in | hash19        | Vijay      | Chandra   | 2101CE41    | 9876543228   | CV Raman        | A            | 135         | url/vijay.jpg       | 2025-04-17 01:07:53 | active         |
|      20 | deepa_b22  | deepa.saxena_b22@iitp.ac.in  | hash20        | Deepa      | Saxena    | 2201ME27    | 9876543229   | APJ Abdul Kalam | B            | 240         | NULL                | 2025-04-17 01:07:53 | active         |
+---------+------------+------------------------------+---------------+------------+-----------+-------------+--------------+-----------------+--------------+-------------+---------------------+---------------------+----------------+
20 rows in set (0.00 sec)


mysql> select * from WishlistItems;
+-------------+---------+---------+---------------------+
| wishlist_id | user_id | item_id | date_added          |
+-------------+---------+---------+---------------------+
|           1 |       1 |       9 | 2025-04-17 01:09:09 |
|           2 |       1 |      15 | 2025-04-17 01:09:09 |
|           3 |       1 |      18 | 2025-04-17 01:09:09 |
|           4 |       2 |       1 | 2025-04-17 01:09:09 |
|           5 |       2 |       6 | 2025-04-17 01:09:09 |
|           6 |       2 |      12 | 2025-04-17 01:09:09 |
|           7 |       3 |       2 | 2025-04-17 01:09:09 |
|           8 |       3 |       8 | 2025-04-17 01:09:09 |
|           9 |       3 |      17 | 2025-04-17 01:09:09 |
|          10 |       4 |       5 | 2025-04-17 01:09:09 |
|          11 |       4 |      11 | 2025-04-17 01:09:09 |
|          12 |       4 |      20 | 2025-04-17 01:09:09 |
|          13 |       5 |       4 | 2025-04-17 01:09:09 |
|          14 |       5 |      10 | 2025-04-17 01:09:09 |
|          15 |       5 |      16 | 2025-04-17 01:09:09 |
|          16 |       6 |       7 | 2025-04-17 01:09:09 |
|          17 |       6 |      13 | 2025-04-17 01:09:09 |
|          18 |       7 |      14 | 2025-04-17 01:09:09 |
|          19 |       7 |      19 | 2025-04-17 01:09:09 |
|          20 |       8 |       3 | 2025-04-17 01:09:09 |
|          21 |       8 |      21 | 2025-04-17 01:09:09 |
|          22 |       9 |       1 | 2025-04-17 01:09:09 |
|          23 |       9 |       6 | 2025-04-17 01:09:09 |
|          24 |      10 |       2 | 2025-04-17 01:09:09 |
|          25 |      10 |      18 | 2025-04-17 01:09:09 |
+-------------+---------+---------+---------------------+
25 rows in set (0.00 sec)

mysql>

mysql>
mysql> -- Call the procedure with the user's details
mysql> CALL RegisterUser(
    ->     'testuser3',                      -- p_username
    ->     'test3@iitp.ac.in',               -- p_email
trongP    ->     'StrongPassword123!',           -- p_password (raw)
    ->     'Test',                           -- p_first_name
    ->     'User',                           -- p_last_name
    ->     '2401CS99',                       -- p_roll_number
    ->     '9988776655',                     -- p_phone_number
    ->     'CV Raman',                       -- p_hostel_name
    ->     'D',                              -- p_hostel_block
    ->     '404',                            -- p_room_number
    ->     NULL,                             -- p_profile_picture_url (or a URL string)
    ->     @new_user_id,                     -- OUT out_user_id
@messag    ->     @message                          -- OUT out_message
    -> );
- Check the results
SELECT @new_user_id, @message;Query OK, 0 rows affected (0.01 sec)

mysql>
mysql> -- Check the results
mysql> SELECT @new_user_id, @message;
+--------------+---------------------------------+
| @new_user_id | @message                        |
+--------------+---------------------------------+
|         NULL | Error: Username already exists. |
+--------------+---------------------------------+
1 row in set (0.00 sec)

mysql> CALL RegisterUser(
    ->     'testuser4',                      -- p_username
    ->     'test3@iitp.ac.in',               -- p_email
trongP    ->     'StrongPassword123!',           -- p_password (raw)
    ->     'Test',                           -- p_first_name
    ->     'User',                           -- p_last_name
    ->     '2401CS99',                       -- p_roll_number
'9988776    ->     '9988776655',                     -- p_phone_number
  'CV     ->     'CV Raman',                       -- p_hostel_name
    ->     'D',                              -- p_hostel_block
            ->     '404',                            -- p_room_number
    ->     NULL,                             -- p_profile_picture_url (or a URL string)
    ->     @new_user_id,                     -- OUT out_user_id
    ->     @message                          -- OUT out_message
    -> );
- Check the results
SELECT @new_user_id, @message;Query OK, 0 rows affected (0.01 sec)

mysql>
mysql> -- Check the results
mysql> SELECT @new_user_id, @message;
+--------------+--------------------------------------+
| @new_user_id | @message                             |
+--------------+--------------------------------------+
|         NULL | Error: Email address already exists. |
+--------------+--------------------------------------+
1 row in set (0.00 sec)

mysql> CALL RegisterUser(
estuser',                   ->     'testuser',                      -- p_username
    ->     'test4@iitp.ac.in',               -- p_email
    ->     'StrongPassword123!',           -- p_password (raw)
    ->     'Test',                           -- p_first_name
    ->     'User',                           -- p_last_name
    '240    ->     '2401CS99',                       -- p_roll_number
    ->     '9988776655',                     -- p_phone_number
    ->     'CV Raman',                       -- p_hostel_name
    ->     'D',                              -- p_hostel_block
    ->     '404',                            -- p_room_number
    ->     NULL,                             -- p_profile_picture_url (or a URL string)
    ->     @new_user_id,                     -- OUT out_user_id
    ->     @message                          -- OUT out_message
    -> );
the results
SELECT @new_user_id, @message;Query OK, 1 row affected (0.01 sec)

mysql>
mysql> -- Check the results
mysql> SELECT @new_user_id, @message;
+--------------+-------------------------------+
| @new_user_id | @message                      |
+--------------+-------------------------------+
|           24 | User registered successfully. |
+--------------+-------------------------------+
1 row in set (0.01 sec)

mysql> CALL RegisterUser(
    ->     'testuser3',                      -- p_username
    ->     'test5@iitp.ac.in',               -- p_email
    -> trongP    'StrongPassword123!',           -- p_password (raw)
    ->     'Test',                           -- p_first_name
    -> ser',       'User',                           -- p_last_name
01CS99    ->     '2401CS99',                       -- p_roll_number
    ->     '9988776655',                     -- p_phone_number
    ->     'CV Raman',                       -- p_hostel_name
    ->     'D',                              -- p_hostel_block
    ->     '404',                            -- p_room_number
    ->     NULL,                             -- p_profile_picture_url (or a URL string)
    ->     @new_user_id,                     -- OUT out_user_id
    ->     @message                          -- OUT out_message
    -> );

    '
Query OK, 0 rows affected (0.01 sec)

mysql> -- Check the results
ELECmysql> SELECT @new_user_id, @message;
+--------------+---------------------------------+
| @new_user_id | @message                        |
+--------------+---------------------------------+
|         NULL | Error: Username already exists. |
+--------------+---------------------------------+
1 row in set (0.00 sec)






-- Call the procedure with the user's details
CALL RegisterUser(
    'testuser3',                      -- p_username
    'test5@iitp.ac.in',               -- p_email
    'StrongPassword123!',           -- p_password (raw)
    'Test',                           -- p_first_name
    'User',                           -- p_last_name
    '2401CS99',                       -- p_roll_number
    '9988776655',                     -- p_phone_number
    'CV Raman',                       -- p_hostel_name
    'D',                              -- p_hostel_block
    '404',                            -- p_room_number
    NULL,                             -- p_profile_picture_url (or a URL string)
    @new_user_id,                     -- OUT out_user_id
    @message                          -- OUT out_message
);

-- Check the results
SELECT @new_user_id, @message;


mysql> -- Declare variables to hold the output
mysql> SET @new_user_id = NULL;
T @mesQuery OK, 0 rows affected (0.00 sec)

mysql> SET @message = '';
all theQuery OK, 0 rows affected (0.00 sec)

mysql>
mysql> -- Call the procedure with the user's details
mysql> CALL RegisterUser(
    ->     'testuser3',                      -- p_username
    ->     'test3@iitp.ac.in',               -- p_email
    ->     'StrongPassword123!',           -- p_password (raw)
    ->     'Test',                           -- p_first_name
    ->     'User',                           -- p_last_name
    ->     '2401CS99',                       -- p_roll_number
    ->     '9988776655',                     -- p_phone_number
    ->     'CV Raman',                       -- p_hostel_name
    ->     'D',                              -- p_hostel_block
    ->     '404',                            -- p_room_number
    ->     NULL,                             -- p_profile_picture_url (or a URL string)
    ->     @new_user_id,                     -- OUT out_user_id
    ->     @message                          -- OUT out_message
    -> );
eck the results
SELECT @new_user_id, @message;
Query OK, 1 row affected (0.01 sec)

mysql>
mysql> -- Check the results
mysql> SELECT @new_user_id, @message;
+--------------+-------------------------------+
| @new_user_id | @message                      |
+--------------+-------------------------------+
|           21 | User registered successfully. |
+--------------+-------------------------------+
1 row in set (0.00 sec)



mysql> CALL AuthenticateUser('aman_b21', 'IncorrectPassword', @user_id, @fname, @lname, @email_out, @status_out, @message_out);
Query OK, 1 row affected (0.00 sec)

mysql> SELECT @user_id, @fname, @lname, @email_out, @status_out, @message_out;
+----------+--------+--------+------------+-------------+-------------------------------+
| @user_id | @fname | @lname | @email_out | @status_out | @message_out                  |
+----------+--------+--------+------------+-------------+-------------------------------+
|     NULL | NULL   | NULL   | NULL       | NULL        | Invalid username or password. |
+----------+--------+--------+------------+-------------+-------------------------------+
1 row in set (0.00 sec)

mysql>

mysql> CALL AuthenticateUser('testuser', 'StrongPassword123!', @user_id, @fname, @lname, @email_out, @status_out, @message_out);
Query OK, 1 row affected (0.00 sec)

mysql> SELECT @user_id, @fname, @lname, @email_out, @status_out, @message_out;
+----------+--------+--------+------------------+-------------+----------------------------+
| @user_id | @fname | @lname | @email_out       | @status_out | @message_out               |
+----------+--------+--------+------------------+-------------+----------------------------+
|       24 | Test   | User   | test4@iitp.ac.in | active      | Authentication successful. |
+----------+--------+--------+------------------+-------------+----------------------------+
1 row in set (0.00 sec)

--


mysql>
mysql> -- Reset the delimiter back to semicolon
mysql> DELIMITER ;
mysql> SET @message = '';
-- Example: UQuery OK, 0 rows affected (0.00 sec)

mysql>
mysql> -- Example: Update profile for user_id = 5
mysql> CALL UpdateUserProfile(
    ->     5,                      -- p_user_id
    ->     '9998887770',           -- p_phone_number
    ->     'APJ Abdul Kalam',      -- p_hostel_name (no change)
    ->     'C',                    -- p_hostel_block
    ->     '215',                  -- p_room_number
    ->     'url/new_vikas.jpg',    -- p_profile_picture_url
    -> ge
);    @message
    -> );
Query OK, 1 row affected (0.02 sec)

mysql> SELECT @message;
+------------------------------------+
| @message                           |
+------------------------------------+
| User profile updated successfully. |
+------------------------------------+
1 row in set (0.00 sec)

mysql> CALL UpdateUserProfile(
    7,      ->     7,                      -- p_user_id
    ->     '',                     -- p_phone_number (will be set to NULL)
    ->     'CV Raman',             -- p_hostel_name
    ->     'B',                    -- p_hostel_block
    ->     '112',                  -- p_room_number
    ->     '',                     -- p_profile_picture_url (will be set to NULL)
    ->     @message
    -> );
-- Check the result message
SELECT @message;Query OK, 1 row affected (0.01 sec)

mysql>
mysql> -- Check the result message
mysql> SELECT @message;
+------------------------------------+
| @message                           |
+------------------------------------+
| User profile updated successfully. |
+------------------------------------+
1 row in set (0.00 sec)

mysql> CALL UpdateUserProfile(999, '111222333', 'HostelX', 'X', 'X01', NULL, @message);
ECT @message; -- Should indicate 'User ID not found'Query OK, 0 rows affected (0.00 sec)

mysql> SELECT @message; -- Should indicate 'User ID not found'
+---------------------------+
| @message                  |
+---------------------------+
| Error: User ID not found. |
+---------------------------+
1 row in set (0.00 sec)

mysql>




mysql> SET @message_out = '';
angePasQuery OK, 0 rows affected (0.00 sec)

mysql> CALL ChangePassword(
            ->     24,                      -- p_user_id
    ->     'StrongPassword123!',   -- p_old_password (Replace with actual old password)
    ->     '12345678', -- p_new_password
    ->     @message_out
SELE    -> );
CT @message_out;Query OK, 0 rows affected (0.02 sec)

mysql> SELECT @message_out;
+--------------------------------+
| @message_out                   |
+--------------------------------+
| Password updated successfully. |
+--------------------------------+
1 row in set (0.00 sec)

mysql>


mysql> SET @message_out = '';
Query OK, 0 rows affected (0.00 sec)

mysql> CALL ChangePassword(1, 'CorrectOldPassword', 'NewSecurePass123!', @message_out);
ELECQuery OK, 0 rows affected (0.00 sec)

mysql> SELECT @message_out;
+--------------------------------+
| @message_out                   |
+--------------------------------+
| Error: Incorrect old password. |
+--------------------------------+
1 row in set (0.00 sec)

mysql>
mysql> CALL ChangePassword(999, 'AnyPassword', 'AnyPassword', @message_out);
 @messaQuery OK, 0 rows affected (0.00 sec)

mysql> SELECT @message_out; -- Should show 'Error: User ID not found.'
+----------------------------------------+
| @message_out                           |
+----------------------------------------+
| Error: New password must be different. |
+----------------------------------------+
1 row in set (0.01 sec)

mysql>
mysql> CALL ChangePassword(999, 'AnyPassword', 'AnyPassword2', @message_out);
ELECT @message_out; -- SQuery OK, 0 rows affected (0.00 sec)

mysql> SELECT @message_out; -- Should show 'Error: User ID not found.'
+------------------------+
| @message_out           |
+------------------------+
| Error: User not found. |
+------------------------+
1 row in set (0.01 sec)

mysql>


mysql>
mysql> CALL GetUserProfile(1);
+---------+----------+---------------------------+------------+-----------+-------------+--------------+-------------+--------------+-------------+---------------------+---------------------+----------------+
| user_id | username | email                     | first_name | last_name | roll_number | phone_number | hostel_name | hostel_block | room_number | profile_picture_url | registration_date   | account_status |
+---------+----------+---------------------------+------------+-----------+-------------+--------------+-------------+--------------+-------------+---------------------+---------------------+----------------+
|       1 | aman_b21 | aman.kumar_b21@iitp.ac.in | Aman       | Kumar     | 2101CS01    | 9876543210   | CV Raman    | A            | 101         | url/aman.jpg        | 2025-04-17 01:07:53 | active         |
+---------+----------+---------------------------+------------+-----------+-------------+--------------+-------------+--------------+-------------+---------------------+---------------------+----------------+
1 row in set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

mysql> -- Call the procedure for another user ID (e.g., user_id = 15)
mysql> CALL GetUserProfile(15);
+---------+------------+------------------------------+------------+-----------+-------------+--------------+-------------+--------------+-------------+---------------------+---------------------+----------------+
| user_id | username   | email                        | first_name | last_name | roll_number | phone_number | hostel_name | hostel_block | room_number | profile_picture_url | registration_date   | account_status |
+---------+------------+------------------------------+------------+-----------+-------------+--------------+-------------+--------------+-------------+---------------------+---------------------+----------------+
|      15 | sanjay_m20 | sanjay.tiwari_m20@iitp.ac.in | Sanjay     | Tiwari    | 20M1CS33    | 9876543224   | Aryabhatta  | A            | 335         | url/sanjay.jpg      | 2025-04-17 01:07:53 | active         |
+---------+------------+------------------------------+------------+-----------+-------------+--------------+-------------+--------------+-------------+---------------------+---------------------+----------------+
1 row in set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

mysql> -- Call for a non-existent user ID (will return an empty set)
mysql> CALL GetUserProfile(999);
Empty set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

mysql>





mysql>
mysql> -- Get rentals for user_id=11 where they are the RENTER
CALLmysql> CALL GetUserRentals(11, 'renter', @message);
SELECT @message;
+-----------+---------+------------------------+----------+----------------+---------------------+---------------------+--------------+---------------+
| rental_id | item_id | item_name              | owner_id | owner_username | start_date          | end_date            | agreed_price | rental_status |
+-----------+---------+------------------------+----------+----------------+---------------------+---------------------+--------------+---------------+
|        20 |       9 | Hercules Roadeo Cycle  |        8 | kavita_b23     | 2025-05-10 10:00:00 | 2025-05-12 17:00:00 |       150.00 | requested     |
|        18 |      14 | Lab Coat (Medium Size) |       13 | rohit_b23      | 2025-04-18 13:00:00 | 2025-04-25 13:00:00 |       100.00 | requested     |
|         6 |       9 | Hercules Roadeo Cycle  |        8 | kavita_b23     | 2025-04-17 15:00:00 | 2025-04-24 15:00:00 |       350.00 | requested     |
+-----------+---------+------------------------+----------+----------------+---------------------+---------------------+--------------+---------------+
3 rows in set (0.01 sec)

Query OK, 0 rows affected (0.01 sec)

mysql>
mysql> SELECT @message;
+-------------------------------------------+
| @message                                  |
+-------------------------------------------+
| Successfully retrieved rentals as renter. |
+-------------------------------------------+
1 row in set (0.00 sec)

mysql> CALL GetUserRentals(1, 'owner', @message);
T @message;

+-----------+---------+--------------------------------+-----------+-----------------+---------------------+---------------------+--------------+---------------+
| rental_id | item_id | item_name                      | renter_id | renter_username | start_date          | end_date            | agreed_price | rental_status |
+-----------+---------+--------------------------------+-----------+-----------------+---------------------+---------------------+--------------+---------------+
|        21 |       1 | Casio FX-991ES Plus Calculator |        32 | sarthak         | 2025-06-01 10:00:00 | 2025-06-03 17:00:00 |        30.00 | requested     |
|        10 |       6 | Raspberry Pi 4 Model B (4GB)   |        12 | pooja_m21       | 2025-04-20 10:00:00 | 2025-05-04 10:00:00 |       150.00 | requested     |
|         5 |       1 | Casio FX-991ES Plus Calculator |        10 | neha_b21        | 2025-04-18 09:00:00 | 2025-04-20 09:00:00 |        20.00 | requested     |
+-----------+---------+--------------------------------+-----------+-----------------+---------------------+---------------------+--------------+---------------+
3 rows in set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

mysql>
mysql> SELECT @message;
+------------------------------------------+
| @message                                 |
+------------------------------------------+
| Successfully retrieved rentals as owner. |
+------------------------------------------+
1 row in set (0.00 sec)

mysql>
mysql> CALL GetUserRentals(1, 'OWNER', @message);
ECT @message;+-----------+---------+--------------------------------+-----------+-----------------+---------------------+---------------------+--------------+---------------+
| rental_id | item_id | item_name                      | renter_id | renter_username | start_date          | end_date            | agreed_price | rental_status |
+-----------+---------+--------------------------------+-----------+-----------------+---------------------+---------------------+--------------+---------------+
|        21 |       1 | Casio FX-991ES Plus Calculator |        32 | sarthak         | 2025-06-01 10:00:00 | 2025-06-03 17:00:00 |        30.00 | requested     |
|        10 |       6 | Raspberry Pi 4 Model B (4GB)   |        12 | pooja_m21       | 2025-04-20 10:00:00 | 2025-05-04 10:00:00 |       150.00 | requested     |
|         5 |       1 | Casio FX-991ES Plus Calculator |        10 | neha_b21        | 2025-04-18 09:00:00 | 2025-04-20 09:00:00 |        20.00 | requested     |
+-----------+---------+--------------------------------+-----------+-----------------+---------------------+---------------------+--------------+---------------+
3 rows in set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

mysql> SELECT @message;CALL GetUserRentals(1, 'admin', @message);
LECT @mess+------------------------------------------+
| @message                                 |
+------------------------------------------+
| Successfully retrieved rentals as owner. |
+------------------------------------------+
1 row in set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

mysql> SELECT @message; -- Shows 'Error: Invalid role specified...'
+---------------------------------------------------------+
| @message                                                |
+---------------------------------------------------------+
| Error: Invalid role specified. Use 'renter' or 'owner'. |
+---------------------------------------------------------+
1 row in set (0.00 sec)

mysql> -- Example of non-existent user
mysql> CALL GetUserRentals(999, 'renter', @message);
CT @message; -- Shows 'Error: UsQuery OK, 1 row affected (0.01 sec)

mysql> SELECT @message; -- Shows 'Error: User ID not found.'
+---------------------------+
| @message                  |
+---------------------------+
| Error: User ID not found. |
+---------------------------+
1 row in set (0.00 sec)

mysql>



1 row in set (0.00 sec)

mysql> CALL UpdateRentalStatus(3, 'completed', 7, @message_out);
age_out;

CALL UpdateRentalStatus(4, 'cQuery OK, 0 rows affected (0.01 sec)

mysql> SELECT @message_out;
ancelled', 14, @message+-----------------------------------------------+
| @message_out                                  |
+-----------------------------------------------+
| Status is already set to the requested value. |
+-----------------------------------------------+
1 row in set (0.00 sec)

mysql>
mysql> CALL UpdateRentalStatus(4, 'cancelled', 14, @message_out);
CT @message_out; --Query OK, 0 rows affected (0.00 sec)

mysql> SELECT @message_out; -- Shows error message
+---------------------------------------------------------------------------------+
| @message_out                                                                    |
+---------------------------------------------------------------------------------+
| Error: Invalid status change from 'active' to 'cancelled' or permission denied. |
+---------------------------------------------------------------------------------+
1 row in set (0.00 sec)

mysql>
mysql>
mysql> CALL UpdateRentalStatus(2, 'active', 7, @message_out);
ECT @message_out;Query OK, 0 rows affected (0.00 sec)

mysql> SELECT @message_out;
+-----------------------------------------------+
| @message_out                                  |
+-----------------------------------------------+
| Status is already set to the requested value. |
+-----------------------------------------------+
1 row in set (0.00 sec)

mysql> CALL UpdateRentalStatus(21, 'confirmed', 32, @message_out);
T @message_out;Query OK, 0 rows affected (0.00 sec)

mysql> SELECT @message_out;
+------------------------------------------------------------------------------------+
| @message_out                                                                       |
+------------------------------------------------------------------------------------+
| Error: Invalid status change from 'requested' to 'confirmed' or permission denied. |
+------------------------------------------------------------------------------------+
1 row in set (0.00 sec)




mysql> SET @rental_id = NULL;
message_out = Query OK, 0 rows affected (0.00 sec)

mysql> SET @message_out = '';
LL RQuery OK, 0 rows affected (0.00 sec)

mysql>
mysql> CALL RequestRental(
    ->     11, 9, '2025-05-10 10:00:00', '2025-05-12 17:00:00',
    ->     @rental_id, @message_out
    -> );
rental_id, @message_out;
Query OK, 0 rows affected (0.02 sec)

mysql> SELECT @rental_id, @message_out;
+------------+--------------------------------+
| @rental_id | @message_out                   |
+------------+--------------------------------+
|         22 | Rental requested successfully. |
+------------+--------------------------------+
1 row in set (0.00 sec)

mysql>

mysql> SET @rental_id = NULL;
SET @messageQuery OK, 0 rows affected (0.00 sec)

mysql> SET @message_out = '';
LL RQuery OK, 0 rows affected (0.00 sec)

mysql>
mysql> CALL RequestRental(
    ->     21, 1, '2025-05-10 10:00:00', '2025-05-12 17:00:00',
    ->     @rental_id, @message_out
;
SELECT @rental_id, @m    -> );
essage_out;
Query OK, 0 rows affected (0.02 sec)

mysql> SELECT @rental_id, @message_out;
+------------+--------------------------------+
| @rental_id | @message_out                   |
+------------+--------------------------------+
|         23 | Rental requested successfully. |
+------------+--------------------------------+
1 row in set (0.00 sec)

mysql>



mysql>
mysql> CALL CreateNotification(
10,         ->     10,                  -- p_user_id (Recipient: Neha Mishra, renter of rental 5)
    ->     5,                   -- p_related_entity_id (The rental_id)
    ->   'renta    'rental_confirmed',  -- p_notification_type
our rent    ->     'Your rental request for Casio FX-991ES Plus Calculator has been confirmed.', -- p_message
    ->     @new_noti_id,
    ->     @message
    -> );'

-- Check the results
SELECT @new_noti_id, @message;Query OK, 1 row affected (0.01 sec)

mysql>
mysql> -- Check the results
mysql> SELECT @new_noti_id, @message;
+--------------+------------------------------------+
| @new_noti_id | @message                           |
+--------------+------------------------------------+
|           23 | Notification created successfully. |
+--------------+------------------------------------+
1 row in set (0.00 sec)

mysql>

mysql>
put varimysql> -- Declare output variable
mysql> SET @message = '';
Get notQuery OK, 0 rows affected (0.01 sec)

mysql>
mysql> -- Get notifications for user_id = 10 (Neha Mishra)
mysql> CALL GetUserNotifications(10, @message);
e list of notifications will be displayed directly by the client/tool

-+-----------------+-------------------+-------------------+----------------------------------------------------------------------------+---------------------+
- Check| notification_id | related_entity_id | notification_type | message                                                                    | created_timestamp   |
+-----------------+-------------------+-------------------+----------------------------------------------------------------------------+---------------------+
|              23 |                 5 | rental_confirmed  | Your rental request for Casio FX-991ES Plus Calculator has been confirmed. | 2025-04-17 19:28:06 |
|               8 |                 5 | rental_confirmed  | Your rental request for Casio FX-991ES Plus Calculator has been confirmed. | 2025-04-17 01:08:14 |
+-----------------+-------------------+-------------------+----------------------------------------------------------------------------+---------------------+
2 rows in set (0.01 sec)

Query OK, 0 rows affected (0.01 sec)

mysql> -- The list of notifications will be displayed directly by the client/tool
mysql>
mysql> -- Check the message (should indicate success if user 10 exists)
@messagmysql> SELECT @message;
+---------------------------------------+
| @message                              |
+---------------------------------------+
| Successfully retrieved notifications. |
+---------------------------------------+
1 row in set (0.00 sec)

mysql>

mysql>
mysql> -- Reset the delimiter back to semicolon
mysql> DELIMITER ; //
mysql> CALL GetItemsByCategory(1, NULL, NULL, NULL);
+---------+----------+-------------+------------------------------+------------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+
| item_id | owner_id | category_id | name                         | description                              | rental_price | rental_unit | item_condition | availability_status | location_description | date_added          | max_rental_duration |
+---------+----------+-------------+------------------------------+------------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+
|      12 |       11 |           1 | Logitech M170 Wireless Mouse | Simple wireless mouse                    |        10.00 | day         | like new       | available           | APJ Kalam Room 225   | 2025-04-17 01:08:03 |                  10 |
|      21 |       20 |           1 | Sandisk 64GB Pendrive        | USB 3.0 Pendrive                         |        15.00 | week        | like new       | available           | APJ Kalam Room 240   | 2025-04-17 01:08:03 |                  30 |
|      17 |       16 |           1 | TP-Link Wi-Fi Router         | Basic N300 Wi-Fi Router                  |        20.00 | day         | good           | rented              | CV Raman Room 130    | 2025-04-17 01:08:03 |                  15 |
|       3 |        3 |           1 | Boat Rockerz 450 Headphones  | Wireless Bluetooth headphones, good bass |        30.00 | day         | like new       | available           | Aryabhatta Room 303  | 2025-04-17 01:08:03 |                   5 |
|       6 |        1 |           1 | Raspberry Pi 4 Model B (4GB) | Mini computer for projects               |        75.00 | week        | like new       | available           | CV Raman Room 101    | 2025-04-17 01:08:03 |                  60 |
+---------+----------+-------------+------------------------------+------------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+
5 rows in set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

mysql> CALL GetItemsByCategory(3, 'available', NULL, NULL);
+---------+----------+-------------+------------------------+------------------------------------------------+--------------+-------------+----------------+---------------------+--------------------------+---------------------+---------------------+
| item_id | owner_id | category_id | name                   | description                                    | rental_price | rental_unit | item_condition | availability_status | location_description     | date_added          | max_rental_duration |
+---------+----------+-------------+------------------------+------------------------------------------------+--------------+-------------+----------------+---------------------+--------------------------+---------------------+---------------------+
|       2 |        2 |           3 | Hero Sprint Cycle      | Basic cycle, good condition, recently serviced |        25.00 | day         | good           | available           | APJ Kalam Hostel Parking | 2025-04-17 01:08:03 |                  30 |
|       9 |        8 |           3 | Hercules Roadeo Cycle  | Gear cycle, suitable for longer rides          |        50.00 | day         | good           | available           | APJ Kalam Hostel Parking | 2025-04-17 01:08:03 |                  30 |
|      18 |       17 |           3 | Skates (Roller Blades) | Size 8 Roller Blades                           |        60.00 | day         | good           | available           | APJ Kalam Room 235       | 2025-04-17 01:08:03 |                   3 |
+---------+----------+-------------+------------------------+------------------------------------------------+--------------+-------------+----------------+---------------------+--------------------------+---------------------+---------------------+
3 rows in set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

mysql> CALL GetItemsByCategory(2, NULL, NULL, 40.00);
+---------+----------+-------------+---------------------------------+-------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+
| item_id | owner_id | category_id | name                            | description | rental_price | rental_unit | item_condition | availability_status | location_description | date_added          | max_rental_duration |
+---------+----------+-------------+---------------------------------+-------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+
|      10 |        9 |           2 | Concepts of Physics by HC Verma | Vol 1 Only  |        30.00 | week        | good           | available           | Aryabhatta Room 322  | 2025-04-17 01:08:03 |                  90 |
+---------+----------+-------------+---------------------------------+-------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+
1 row in set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

mysql> CALL GetItemsByCategory(6, NULL, 50.00, NULL);
+---------+----------+-------------+-------------------+---------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+
| item_id | owner_id | category_id | name              | description                           | rental_price | rental_unit | item_condition | availability_status | location_description | date_added          | max_rental_duration |
+---------+----------+-------------+-------------------+---------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+
|      15 |       14 |           6 | Small Room Cooler | Personal air cooler, decent condition |       100.00 | week        | fair           | available           | APJ Kalam Room 230   | 2025-04-17 01:08:03 |                  30 |
+---------+----------+-------------+-------------------+---------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+
1 row in set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

mysql>




mysql> DELIMITER ; //
mysql> CALL SearchItems('cycle', NULL, NULL, NULL, NULL);
+---------+----------+-------------+---------------+----------------+-----------------------+------------------------------------------------+--------------+-------------+----------------+---------------------+--------------------------+---------------------+---------------------+
| item_id | owner_id | category_id | category_name | owner_username | name                  | description                                    | rental_price | rental_unit | item_condition | availability_status | location_description     | date_added          | max_rental_duration |
+---------+----------+-------------+---------------+----------------+-----------------------+------------------------------------------------+--------------+-------------+----------------+---------------------+--------------------------+---------------------+---------------------+
|       2 |        2 |           3 | Cycles        | priya_b22      | Hero Sprint Cycle     | Basic cycle, good condition, recently serviced |        25.00 | day         | good           | available           | APJ Kalam Hostel Parking | 2025-04-17 01:08:03 |                  30 |
|       9 |        8 |           3 | Cycles        | kavita_b23     | Hercules Roadeo Cycle | Gear cycle, suitable for longer rides          |        50.00 | day         | good           | available           | APJ Kalam Hostel Parking | 2025-04-17 01:08:03 |                  30 |
+---------+----------+-------------+---------------+----------------+-----------------------+------------------------------------------------+--------------+-------------+----------------+---------------------+--------------------------+---------------------+---------------------+
2 rows in set (0.02 sec)

Query OK, 0 rows affected (0.02 sec)

mysql> CALL SearchItems('calculator', 5, NULL, NULL, NULL);
+---------+----------+-------------+---------------+----------------+--------------------------------+-------------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+
| item_id | owner_id | category_id | category_name | owner_username | name                           | description                               | rental_price | rental_unit | item_condition | availability_status | location_description | date_added          | max_rental_duration |
+---------+----------+-------------+---------------+----------------+--------------------------------+-------------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+
|       1 |        1 |           5 | Stationery    | aman_b21       | Casio FX-991ES Plus Calculator | Scientific calculator, suitable for exams |        10.00 | day         | good           | available           | CV Raman Room 101    | 2025-04-17 01:08:03 |                   7 |
+---------+----------+-------------+---------------+----------------+--------------------------------+-------------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+
1 row in set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

mysql> CALL SearchItems('book', NULL, 'available', NULL, 50.00);
Empty set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

mysql> CALL SearchItems('headphones', NULL, 'available', NULL, NULL);
+---------+----------+-------------+---------------+----------------+-----------------------------+------------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+
| item_id | owner_id | category_id | category_name | owner_username | name                        | description                              | rental_price | rental_unit | item_condition | availability_status | location_description | date_added          | max_rental_duration |
+---------+----------+-------------+---------------+----------------+-----------------------------+------------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+
|       3 |        3 |           1 | Electronics   | rahul_m20      | Boat Rockerz 450 Headphones | Wireless Bluetooth headphones, good bass |        30.00 | day         | like new       | available           | Aryabhatta Room 303  | 2025-04-17 01:08:03 |                   5 |
+---------+----------+-------------+---------------+----------------+-----------------------------+------------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+
1 row in set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

mysql> CALL SearchItems(NULL, 6, NULL, 50.00, NULL);
+---------+----------+-------------+-----------------+----------------+-------------------+---------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+
| item_id | owner_id | category_id | category_name   | owner_username | name              | description                           | rental_price | rental_unit | item_condition | availability_status | location_description | date_added          | max_rental_duration |
+---------+----------+-------------+-----------------+----------------+-------------------+---------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+
|      15 |       14 |           6 | Room Essentials | divya_b21      | Small Room Cooler | Personal air cooler, decent condition |       100.00 | week        | fair           | available           | APJ Kalam Room 230   | 2025-04-17 01:08:03 |                  30 |
+---------+----------+-------------+-----------------+----------------+-------------------+---------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+
1 row in set (0.01 sec)

Query OK, 0 rows affected (0.01 sec)

mysql> CALL SearchItems(NULL, NULL, 'available', NULL, NULL);
+---------+----------+-------------+---------------------+----------------+------------------------------------+------------------------------------------------+--------------+-------------+----------------+---------------------+--------------------------+---------------------+---------------------+
| item_id | owner_id | category_id | category_name       | owner_username | name                               | description                                    | rental_price | rental_unit | item_condition | availability_status | location_description     | date_added          | max_rental_duration |
+---------+----------+-------------+---------------------+----------------+------------------------------------+------------------------------------------------+--------------+-------------+----------------+---------------------+--------------------------+---------------------+---------------------+
|       1 |        1 |           5 | Stationery          | aman_b21       | Casio FX-991ES Plus Calculator     | Scientific calculator, suitable for exams      |        10.00 | day         | good           | available           | CV Raman Room 101        | 2025-04-17 01:08:03 |
         7 |
|       2 |        2 |           3 | Cycles              | priya_b22      | Hero Sprint Cycle                  | Basic cycle, good condition, recently serviced |        25.00 | day         | good           | available           | APJ Kalam Hostel Parking | 2025-04-17 01:08:03 |
        30 |
|       3 |        3 |           1 | Electronics         | rahul_m20      | Boat Rockerz 450 Headphones        | Wireless Bluetooth headphones, good bass       |        30.00 | day         | like new       | available           | Aryabhatta Room 303      | 2025-04-17 01:08:03 |
         5 |
|       4 |        4 |           2 | Books               | sneha_b23      | HC Verma Physics Vol 1 & 2         | Standard physics textbooks for JEE/Engg        |        50.00 | week        | fair           | available           | CV Raman Room 105        | 2025-04-17 01:08:03 |
        90 |
|       5 |        5 |           6 | Room Essentials     | vikas_b21      | Electric Kettle 1.5L               | Quick water heating for tea/coffee/noodles     |        15.00 | day         | good           | available           | APJ Kalam Room 210       | 2025-04-17 01:08:03 |
        14 |
|       6 |        1 |           1 | Electronics         | aman_b21       | Raspberry Pi 4 Model B (4GB)       | Mini computer for projects                     |        75.00 | week        | like new       | available           | CV Raman Room 101        | 2025-04-17 01:08:03 |
        60 |
|       7 |        6 |           4 | Sports Equipment    | anisha_m21     | Yonex Badminton Racket Set         | 2 rackets and shuttlecocks, beginner level     |        40.00 | day         | good           | available           | Aryabhatta Room 315      | 2025-04-17 01:08:03 |
         7 |
|       9 |        8 |           3 | Cycles              | kavita_b23     | Hercules Roadeo Cycle              | Gear cycle, suitable for longer rides          |        50.00 | day         | good           | available           | APJ Kalam Hostel Parking | 2025-04-17 01:08:03 |
        30 |
|      10 |        9 |           2 | Books               | sumit_m20      | Concepts of Physics by HC Verma    | Vol 1 Only                                     |        30.00 | week        | good           | available           | Aryabhatta Room 322      | 2025-04-17 01:08:03 |
        90 |
|      11 |       10 |           6 | Room Essentials     | neha_b21       | Plastic Bucket & Mug Set           | Standard bathroom bucket and mug               |         5.00 | week        | fair           | available           | CV Raman Room 118        | 2025-04-17 01:08:03 |
        60 |
|      12 |       11 |           1 | Electronics         | arjun_b22      | Logitech M170 Wireless Mouse       | Simple wireless mouse                          |        10.00 | day         | like new       | available           | APJ Kalam Room 225       | 2025-04-17 01:08:03 |
        10 |
|      13 |       12 |           4 | Sports Equipment    | pooja_m21      | SG Cricket Bat (Kashmir Willow)    | Suitable for tennis ball cricket               |        35.00 | day         | good           | available           | Aryabhatta Room 328      | 2025-04-17 01:08:03 |
         7 |
|      14 |       13 |           5 | Stationery          | rohit_b23      | Lab Coat (Medium Size)             | White lab coat for chemistry/biology labs      |        25.00 | week        | like new       | available           | CV Raman Room 125        | 2025-04-17 01:08:03 |
        90 |
|      15 |       14 |           6 | Room Essentials     | divya_b21      | Small Room Cooler                  | Personal air cooler, decent condition          |       100.00 | week        | fair           | available           | APJ Kalam Room 230       | 2025-04-17 01:08:03 |
        30 |
|      16 |       15 |           2 | Books               | sanjay_m20     | Introduction to Algorithms by CLRS | Standard algorithms textbook                   |        70.00 | week        | good           | available           | Aryabhatta Room 335      | 2025-04-17 01:08:03 |
        90 |
|      18 |       17 |           3 | Cycles              | ajay_b23       | Skates (Roller Blades)             | Size 8 Roller Blades                           |        60.00 | day         | good           | available           | APJ Kalam Room 235       | 2025-04-17 01:08:03 |
         3 |
|      19 |       18 |           8 | Musical Instruments | rani_m21       | Acoustic Guitar (Beginner)         | Juarez Acoustic Guitar with Bag                |        80.00 | week        | good           | available           | Aryabhatta Room 340      | 2025-04-17 01:08:03 |
        60 |
|      20 |       19 |           6 | Room Essentials     | vijay_b21      | Foldable Study Table               | Small wooden foldable table                    |        30.00 | week        | good           | available           | CV Raman Room 135        | 2025-04-17 01:08:03 |
        90 |
|      21 |       20 |           1 | Electronics         | deepa_b22      | Sandisk 64GB Pendrive              | USB 3.0 Pendrive                               |        15.00 | week        | like new       | available           | APJ Kalam Room 240       | 2025-04-17 01:08:03 |
        30 |
+---------+----------+-------------+---------------------+----------------+------------------------------------+------------------------------------------------+--------------+-------------+----------------+---------------------+--------------------------+---------------------+---------------------+
19 rows in set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)





mysql>
mysql> -- Declare output variable
T @mesmysql> SET @message_out = '';

-- Try adding Item 5 to User 1's wishlist
CALL AddToWishlist(1, 5, Query OK, 0 rows affected (0.00 sec)

mysql>
mysql> -- Try adding Item 5 to User 1's wishlist
mysql> CALL AddToWishlist(1, 5, @message_out);
ECT @message_out;

-- Try adding Item 5 to User 1's wishlist AGAIN (should trigger duplicate error)
CALL AddToWishlist(1, 5, @message_out);
SELECT @message_out; -- Expected: 'Item is already in your wishlist.'

-- Try adding a non-existent Item 999 to User 1's wishlist
CALL AddToWishlist(1, 999, @message_out);
SELECT @message_out; -- Expected: 'Error: Item ID not found.'

-- Try adding Item 1 to a non-existent User 999's wishlist
CALL AddToWishlist(999, 1, @message_out);
SELECT @message_out; -- Expected: 'Error: User ID not found.'
Query OK, 1 row affected (0.03 sec)

mysql> SELECT @message_out;
+--------------------------------------+
| @message_out                         |
+--------------------------------------+
| Item added to wishlist successfully. |
+--------------------------------------+
1 row in set (0.00 sec)

mysql>
mysql> -- Try adding Item 5 to User 1's wishlist AGAIN (should trigger duplicate error)
mysql> CALL AddToWishlist(1, 5, @message_out);
Query OK, 0 rows affected (0.00 sec)

mysql> SELECT @message_out; -- Expected: 'Item is already in your wishlist.'
+-----------------------------------+
| @message_out                      |
+-----------------------------------+
| Item is already in your wishlist. |
+-----------------------------------+
1 row in set (0.00 sec)

mysql>
mysql> -- Try adding a non-existent Item 999 to User 1's wishlist
mysql> CALL AddToWishlist(1, 999, @message_out);
Query OK, 0 rows affected (0.00 sec)

mysql> SELECT @message_out; -- Expected: 'Error: Item ID not found.'
+---------------------------+
| @message_out              |
+---------------------------+
| Error: Item ID not found. |
+---------------------------+
1 row in set (0.00 sec)

mysql>
mysql> -- Try adding Item 1 to a non-existent User 999's wishlist
mysql> CALL AddToWishlist(999, 1, @message_out);
Query OK, 0 rows affected (0.00 sec)

mysql> SELECT @message_out; -- Expected: 'Error: User ID not found.'
+---------------------------+
| @message_out              |
+---------------------------+
| Error: User ID not found. |
+---------------------------+
1 row in set (0.00 sec)



mysql> -- Declare output variable
T @mesmysql> SET @message_out = '';

-- TryQuery OK, 0 rows affected (0.00 sec)

mysql>
mysql> -- Try removing Item 5 from User 1's wishlist (assuming it was added)
mysql> CALL RemoveFromWishlist(1, 5, @message_out);
LECT @message_out;

-- Try removing Item 5 from User 1's wishlist AGAIN (should report not found)
CALL RemoveFromWishlist(1, 5, @message_out);
SELECT @message_out; -- Expected: 'Item was not found in your wishlist.'

-- Try removing Item 999 (non-existent) from User 1's wishlist
CALL RemoveFromWishlist(1, 999, @message_out);
SELECT @message_out; -- Expected:Query OK, 1 row affected (0.02 sec)

mysql> SELECT @message_out;
was not found in your wi+------------------------------------------+
| @message_out                             |
+------------------------------------------+
| Item removed from wishlist successfully. |
+------------------------------------------+
1 row in set (0.00 sec)

mysql>
mysql> -- Try removing Item 5 from User 1's wishlist AGAIN (should report not found)
mysql> CALL RemoveFromWishlist(1, 5, @message_out);
y removing Item 1 from User 999's (non-existent) wishlist
CQuery OK, 0 rows affected (0.00 sec)

mysql> SELECT @message_out; -- Expected: 'Item was not found in your wishlist.'
ALL RemoveFromWishlist(99+--------------------------------------+
| @message_out                         |
+--------------------------------------+
| Item was not found in your wishlist. |
+--------------------------------------+
1 row in set (0.00 sec)

mysql>
mysql> -- Try removing Item 999 (non-existent) from User 1's wishlist
messagemysql> CALL RemoveFromWishlist(1, 999, @message_out);
_out);
SELECT @mQuery OK, 0 rows affected (0.00 sec)

mysql> SELECT @message_out; -- Expected: 'Item was not found in your wishlist.'
essage_out; -- +--------------------------------------+
| @message_out                         |
+--------------------------------------+
| Item was not found in your wishlist. |
+--------------------------------------+
1 row in set (0.00 sec)

mysql>
mysql> -- Try removing Item 1 from User 999's (non-existent) wishlist
ot foundmysql> CALL RemoveFromWishlist(999, 1, @message_out);
t.'
Query OK, 0 rows affected (0.00 sec)

mysql> SELECT @message_out; -- Expected: 'Item was not found in your wishlist.
+--------------------------------------+
| @message_out                         |
+--------------------------------------+
| Item was not found in your wishlist. |
+--------------------------------------+
1 row in set (0.01 sec)

mysql>


mysql> -- Get the wishlist for user ID 1
LL Gmysql> CALL GetUserWishlist(1);
-- Get the wishlist for user ID 5
CA+---------+----------+-------------+------------------------+---------------------------------------+--------------+-------------+----------------+---------------------+--------------------------+---------------------+---------------------+---------------------+
| item_id | owner_id | category_id | name                   | description                           | rental_price | rental_unit | item_condition | availability_status | location_description     | item_listing_date   | max_rental_duration | date_wishlisted     |
+---------+----------+-------------+------------------------+---------------------------------------+--------------+-------------+----------------+---------------------+--------------------------+---------------------+---------------------+---------------------+
|       9 |        8 |           3 | Hercules Roadeo Cycle  | Gear cycle, suitable for longer rides |        50.00 | day         | good           | available           | APJ Kalam Hostel Parking | 2025-04-17 01:08:03 |                  30 | 2025-04-17 01:09:09 |
|      15 |       14 |           6 | Small Room Cooler      | Personal air cooler, decent condition |       100.00 | week        | fair           | available           | APJ Kalam Room 230       | 2025-04-17 01:08:03 |                  30 | 2025-04-17 01:09:09 |
|      18 |       17 |           3 | Skates (Roller Blades) | Size 8 Roller Blades                  |        60.00 | day         | good           | available           | APJ Kalam Room 235       | 2025-04-17 01:08:03 |                   3 | 2025-04-17 01:09:09 |
+---------+----------+-------------+------------------------+---------------------------------------+--------------+-------------+----------------+---------------------+--------------------------+---------------------+---------------------+---------------------+
3 rows in set (0.00 sec)

LL GQuery OK, 0 rows affected (0.00 sec)

mysql>
mysql> -- Get the wishlist for user ID 5
etUserWmysql> CALL GetUserWishlist(5);
-- Get the wish+---------+----------+-------------+------------------------------------+-----------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+---------------------+
| item_id | owner_id | category_id | name                               | description                             | rental_price | rental_unit | item_condition | availability_status | location_description | item_listing_date   | max_rental_duration | date_wishlisted     |
+---------+----------+-------------+------------------------------------+-----------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+---------------------+
|       4 |        4 |           2 | HC Verma Physics Vol 1 & 2         | Standard physics textbooks for JEE/Engg |        50.00 | week        | fair           | available           | CV Raman Room 105    | 2025-04-17 01:08:03 |                  90 | 2025-04-17 01:09:09 |
|      10 |        9 |           2 | Concepts of Physics by HC Verma    | Vol 1 Only                              |        30.00 | week        | good           | available           | Aryabhatta Room 322  | 2025-04-17 01:08:03 |                  90 | 2025-04-17 01:09:09 |
|      16 |       15 |           2 | Introduction to Algorithms by CLRS | Standard algorithms textbook            |        70.00 | week        | good           | available           | Aryabhatta Room 335  | 2025-04-17 01:08:03 |                  90 | 2025-04-17 01:09:09 |
+---------+----------+-------------+------------------------------------+-----------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+---------------------+
3 rows in set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

mysql>
mysql> -- Get the wishlist for a user with an empty wishlist (will return empty set)
 GetUmysql> CALL GetUserWishlist(19); -- Assuming user 19 has no items wishlisted
t the wishlist fEmpty set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

mysql>
mysql> -- Get the wishlist for a non-existent user ID (will return empty set)
ALL Gmysql> CALL GetUserWishlist(999);
Empty set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

mysql>


mysql>
mysql>
mysql> -- Declare output variable
mysql> SET @message = '';
Query OK, 0 rows affected (0.00 sec)

mysql>
mysql> -- Example 1: Update price and condition for item_id = 1 (owned by user 1)
mysql> LL UCALL UpdateItemDetails(
    ->     1,          -- p_item_id
1,          ->     1,          -- p_acting_user_id (MUST be the owner)
    ->  NULL    NULL,       -- p_category_id (Not changing)
  NULL,         ->     NULL,       -- p_name (Not changing)
L,        ->     NULL,       -- p_description (Not changing)
,      -    ->     12.50,      -- p_rental_price (New price)
ULL,       --    ->     NULL,       -- p_rental_unit (Not changing)
fair',      ->     'fair',     -- p_item_condition (New condition)
    ->     NULL,       -- p_location_description (Not changing)
  NULL,       -- p_    ->     NULL,       -- p_max_rental_duration (Not changing)
    @me    -> ssage
)    @message
;
SEL    -> );
ECT @message; -- Should be successful

-- Example 2: Clear location and max duration for item_id = 2 (owned by user 2)
CALL UpdateItemDetails(
    2,          -- p_item_id
    2,          -- p_acting_user_id
    NULL, NULL, NULL, NULL, NULL, NULL,
    '',         -- p_location_description (Pass empty string to set NULL)
    NULL,Query OK, 1 row affected (0.01 sec)

       -mysql> SELECT @message; -- Should be successful
- p_max_rental+---------------------------------------------+
| @message                                    |
+---------------------------------------------+
| Item details update processed successfully. |
+---------------------------------------------+
1 row in set (0.00 sec)

mysql>
mysql> -- Example 2: Clear location and max duration for item_id = 2 (owned by user 2)
on (Pamysql> CALL UpdateItemDetails(
    ->     2,          -- p_item_id
ss NUL    ->     2,          -- p_acting_user_id
    ->     NULL, NULL, NULL, NULL, NULL, NULL,
    ->     '',         -- p_location_description (Pass empty string to set NULL)
    ->     NULL,       -- p_max_rental_duration (Pass NULL to set NULL)
  @message
);
    ->     @message
    -> );
SELECT @message; -- Should be successful

-- Example 3: Attempt update by wrong user (user 3 tries to update item 1)
CALL UpdateItemDetails(
    1,          -- p_item_idQuery OK, 1 row affected (0.01 sec)

mysql> SELECT @message; -- Should be successful

    3,         +---------------------------------------------+
| @message                                    |
+---------------------------------------------+
| Item details update processed successfully. |
+---------------------------------------------+
1 row in set (0.00 sec)

mysql>
mysql> -- Example 3: Attempt update by wrong user (user 3 tries to update item 1)
 -- p_amysql> CALL UpdateItemDetails(
cting_u    ->     1,          -- p_item_id
ser_id     ->     3,          -- p_acting_user_id (Incorrect owner)
 NULL    ->     NULL, 'New Name', NULL, NULL, NULL, NULL, NULL, NULL,
 @message
);
S    ->     @message
    -> );
ELECT @message; -- ShoulQuery OK, 1 row affected (0.00 sec)

mysql> SELECT @message; -- Should show 'Error: Permission denied...'

-- Example 4: Try to+---------------------------------------------------------------+
| @message                                                      |
+---------------------------------------------------------------+
| Error: Permission denied. You are not the owner of this item. |
+---------------------------------------------------------------+
1 row in set (0.00 sec)

mysql>
mysql> -- Example 4: Try to update non-existent item
L Updamysql> teItemDCALL UpdateItemDetails(
9,          ->     999,        -- p_item_id
            ->     1,          -- p_acting_user_id
    ->     NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
@message
);
SELEC    ->     @message
T @mes    -> );
sage; -- Should show 'Error: Query OK, 0 rows affected (0.00 sec)

mysql> SELECT @message; -- Should show 'Error: Item ID not found.'

-- Declare out+---------------------------+
| @message                  |
+---------------------------+
| Error: Item ID not found. |
+---------------------------+
1 row in set (0.00 sec)

mysql>
mysql>
mysql> -- Declare output variables (initialize for each call or reuse)
T @newmysql> SET @new_item_id = NULL;
message = '';

-Query OK, 0 rows affected (0.00 sec)

mysql> SET @message = '';
- Example 1: List an Query OK, 0 rows affected (0.00 sec)

mysql>
mysql> -- Example 1: List an item WITH a primary image
mysql> -- Assume user_id=1 and category_id=6 exist
istItem(
    1mysql> CALL ListItem(
    ->     1,                          -- p_owner_id (Aman Kumar)
                    ->     6,                          -- p_category_id (Room Essentials)
    ->     'Used Study Lamp',          -- p_name
Working    ->     'Working study lamp, adjustable neck. Bulb included.', -- p_description
            ->     10.00,                      -- p_rental_price
  'day',    ->     'day',                      -- p_rental_unit
od',        ->     'good',                     -- p_item_condition
    ->     'CV Raman, Ask Room 101',   -- p_location_description
    14,     ->     14,                         -- p_max_rental_duration (days)
 'url/st    ->     'url/studylamp_primary.jpg',-- p_primary_image_url
w_item_    ->     @new_item_id,               -- OUT variable for new item ID
ssage       ->     @message                    -- OUT variable for status message
;

-- C    -> );
heck results after calling
SELECT @new_item_id AS NewItemID, @message AS ResultMessage;
-- Expected: A new item ID (e.g., 22) and 'Item listed successfully. Primary image added.'

-- ----------------------------------------------------

-- Example 2: List an item WITHOUT providing a primary image
-- Assume user_id=2 and category_id=2 exist
CALL ListItem(
    2,                          -- p_owner_id (Priya Sharma)
    2,                          -- p_category_id (BQuery OK, 0 rows affected (0.01 sec)

ooks)
mysql>
mysql> -- Check results after calling
    'Operating mysql> SELECT @new_item_id AS NewItemID, @message AS ResultMessage;
Concepts',-- p_+-----------+------------------------------------------------+
| NewItemID | ResultMessage                                  |
+-----------+------------------------------------------------+
|        22 | Item listed successfully. Primary image added. |
+-----------+------------------------------------------------+
1 row in set (0.00 sec)

mysql> -- Expected: A new item ID (e.g., 22) and 'Item listed successfully. Primary image added.'
textbookmysql>
mysql> -- ----------------------------------------------------
berschatmysql>
mysql> -- Example 2: List an item WITHOUT providing a primary image
in, Gagmysql> -- Assume user_id=2 and category_id=2 exist
ne. Goomysql> CALL ListItem(
    -> d for C    2,                          -- p_owner_id (Priya Sharma)
    ->     2,                          -- p_category_id (Books)
SE cou    ->     'Operating System Concepts',-- p_name
    ->     '8th Edition textbook by Silberschatz, Galvin, Gagne. Good for CSE courses.', -- p_description
    ->     40.00,                      -- p_rental_price
  'week',           ->     'week',                     -- p_rental_unit
ir',        ->     'fair',                     -- p_item_condition
   NUL    -> L,        NULL,                       -- p_location_description (No location provided)
LL,      ->     NULL,                       -- p_max_rental_duration (No limit)
   NULL,        ->     NULL,                       -- p_primary_image_url (No image provided)
@new_i    ->     @new_item_id,
    ->     @message
;

-- Check re    -> );
sults after calling
SELECT @new_item_id AS NewItemID, @message AS ResultMessage;
-- Expected: A new item ID (e.g., 23) and 'Item listed successfully.'

-- ----------------------------------------------------

-- Example 3: Attempt to list with a non-existent Owner ID
CALL ListItem(
    999,    Query OK, 0 rows affected (0.01 sec)

mysql>
mysql> -- Check results after calling
                mysql> SELECT @new_item_id AS NewItemID, @message AS ResultMessage;
    -- p_owner_+-----------+---------------------------+
| NewItemID | ResultMessage             |
+-----------+---------------------------+
|        23 | Item listed successfully. |
+-----------+---------------------------+
1 row in set (0.00 sec)

mysql> -- Expected: A new item ID (e.g., 23) and 'Item listed successfully.'
ssuming User Imysql>
mysql> -- ----------------------------------------------------
mysql>
mysql> -- Example 3: Attempt to list with a non-existent Owner ID
oes NOmysql> CALL ListItem(
    -> T exist    999,                        -- p_owner_id (Assuming User ID 999 does NOT exist)
    ->     1,                          -- p_category_id
  'Test    ->     'Test Item Fail Owner', 'Desc', 5.00, 'day', 'new', NULL, NULL, NULL,
ew_item    ->     @new_item_id,
  @mess    ->     @message
ck resul    -> );
ts after calling
SELECT @new_iteQuery OK, 1 row affected (0.00 sec)

mysql>
mysql> -- Check results after calling
S NewImysql> SELECT @new_item_id AS NewItemID, @message AS ResultMessage;
pected: NULL for N+-----------+--------------------------------------+
| NewItemID | ResultMessage                        |
+-----------+--------------------------------------+
|      NULL | Error: Owner User ID does not exist. |
+-----------+--------------------------------------+
1 row in set (0.00 sec)

mysql> -- Expected: NULL for NewItemID and 'Error: Owner User ID does not exist.'
mysql>
mysql> -- ----------------------------------------------------
le 4: Attempt mysql>
mysql> -- Example 4: Attempt to list with an invalid (non-positive) price
ListItmysql> CALL ListItem(
    ->     3,                          -- p_owner_id (Assuming User ID 3 exists)
                       -    ->     1,                          -- p_category_id
est Item Pric    ->     'Test Item Price Fail', 'Desc', -5.00, 'day', 'new', NULL, NULL, NULL,
  @new_    -> item_i    @new_item_id,
    ->     @message
    -> );
 Check results after calling
SQuery OK, 0 rows affected (0.00 sec)

mysql>
mysql> -- Check results after calling
mysql> SELECT @new_item_id AS NewItemID, @message AS ResultMessage;
ted: NULL for NewItemID+-----------+--------------------------------------------------------------------------------------------------------------------+
| NewItemID | ResultMessage
         |
+-----------+--------------------------------------------------------------------------------------------------------------------+
|      NULL | Error: Owner ID, Category ID, Name, Description, valid Rental Price, Rental Unit, and Item Condition are required. |
+-----------+--------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)

mysql> -- Expected: NULL for NewItemID and 'Error: Owner ID, Category ID, Name, Description, valid Rental Price, Rental Unit, and Item Condition are required.'
--------mysql>
mysql> -- ----------------------------------------------------
5: Attmysql>
mysql> -- Example 5: Attempt to list without a required field (e.g., name)
LL Lmysql> CALL ListItem(
    ->     4, 1, NULL, 'Desc', 10.00, 'day', 'new', NULL, NULL, NULL,
em_id,
    ->     @new_item_id,
    ->     @message
;

-- C    -> );
ults after calling
SELQuery OK, 0 rows affected (0.00 sec)

ECT mysql>
mysql> -- Check results after calling
mysql> SELECT @new_item_id AS NewItemID, @message AS ResultMessage;
: NULL for NewIte+-----------+--------------------------------------------------------------------------------------------------------------------+
| NewItemID | ResultMessage
         |
+-----------+--------------------------------------------------------------------------------------------------------------------+
|      NULL | Error: Owner ID, Category ID, Name, Description, valid Rental Price, Rental Unit, and Item Condition are required. |
+-----------+--------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)

mID anmysql> -- Expected: NULL for NewItemID and 'Error: Owner ID, Category ID, Name, Description, valid Rental Price, Rental Unit, and Item Condition are required.'
-- Declare outpmysql>
mysql> -- Declare output variable
T @mesmysql> SET @message = '';
1: Mark item_Query OK, 0 rows affected (0.00 sec)

mysql>
mysql> -- Example 1: Mark item_id = 1 as 'rented' (assuming it's currently 'available')
L Updmysql> CALL UpdateItemAvailability(1, 'rented', @message);
message; -- Expected: 'Item availability status updated successfully to 'rented'.'

-- Example 2: Mark item_id = 1 back to 'available'
CALL UpdateItemAvailability(1, 'available', @message);
SELECT @message; -- Expected: 'Item availability status updated successfully to 'available'.'

-- Example 3: Try setting item_id = 1 to 'avQuery OK, 1 row affected (0.01 sec)

mysql> SELECT @message; -- Expected: 'Item availability status updated successfully to 'rented'.'
no change)
CA+------------------------------------------------------------+
| @message                                                   |
+------------------------------------------------------------+
| Item availability status updated successfully to 'rented'. |
+------------------------------------------------------------+
1 row in set (0.00 sec)

LL UpdateItmysql>
mysql> -- Example 2: Mark item_id = 1 back to 'available'
mysql> CALL UpdateItemAvailability(1, 'available', @message);
ilable', @message);
SELECT @message; -- Expected: 'Item availability status is already set to 'available'. No update performed.'

-- Example 4: Try updating a non-existent item
CALL UpdateItemAQuery OK, 1 row affected (0.01 sec)

mysql> SELECT @message; -- Expected: 'Item availability status updated successfully to 'available'.'
, 'unavailable', @messa+---------------------------------------------------------------+
ge);
S| @message                                                      |
+---------------------------------------------------------------+
| Item availability status updated successfully to 'available'. |
+---------------------------------------------------------------+
1 row in set (0.00 sec)

mysql>
ELECmysql> -- Example 3: Try setting item_id = 1 to 'available' again (no change)
mysql> CALL UpdateItemAvailability(1, 'available', @message);
sage; -- Expected: 'Error: IQuery OK, 1 row affected (0.00 sec)

tem IDmysql> SELECT @message; -- Expected: 'Item availability status is already set to 'available'. No update performed.'
und.'

-- Example 5: T+------------------------------------------------------------------------------+
| @message                                                                     |
+------------------------------------------------------------------------------+
| Item availability status is already set to 'available'. No update performed. |
+------------------------------------------------------------------------------+
1 row in set (0.00 sec)

mysql>
mysql> -- Example 4: Try updating a non-existent item
ry provmysql> CALL UpdateItemAvailability(999, 'unavailable', @message);
iding invalid status (DQuery OK, 0 rows affected (0.00 sec)

mysql> SELECT @message; -- Expected: 'Error: Item ID not found.'
 ENUM error usually)+---------------------------+
| @message                  |
+---------------------------+
| Error: Item ID not found. |
+---------------------------+
1 row in set (0.00 sec)

mysql>

-- Thmysql> -- Example 5: Try providing invalid status (Database handles ENUM error usually)
is call mysql> -- This call might raise a direct database error depending on strict modes,
 procedure mightmysql> -- or the procedure might not even be created if the ENUM doesn't match.
ALL mysql> -- CALL UpdateItemAvailability(1, 'broken', @message);
SELECT @mmysql> -- SELECT @message;
mple 6: Try prmysql>
mysql> -- Example 6: Try providing NULL status
CALLmysql> CALL UpdateItemAvailability(1, NULL, @message);
T @message; -- ExpectQuery OK, 0 rows affected (0.00 sec)

mysql> SELECT @message; -- Expected: 'Error: Item ID and New Availability Status are required.'




-- Example 1: Get+----------------------------------------------------------+
| @message                                                 |
+----------------------------------------------------------+
| Error: Item ID and New Availability Status are required. |
+----------------------------------------------------------+
1 row in set (0.00 sec)

mysql>
 detailsmysql>
mysql>
mysql>
mysql> -- Example 1: Get details for item_id = 1 (Casio Calculator)
 GetItemDetails(1)mysql> CALL GetItemDetails(1);
tput: A single row containing all details for +---------+--------------------------------+-------------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+----------+----------------+------------------+-----------------+---------------------------+-------------+---------------+----------------------------------+
| item_id | item_name                      | description                               | rental_price | rental_unit | item_condition | availability_status | location_description | date_added          | max_rental_duration | owner_id | owner_username | owner_first_name | owner_last_name | owner_email               | category_id | category_name | category_description             |
+---------+--------------------------------+-------------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+----------+----------------+------------------+-----------------+---------------------------+-------------+---------------+----------------------------------+
|       1 | Casio FX-991ES Plus Calculator | Scientific calculator, suitable for exams |        12.50 | day         | fair           | available           | CV Raman Room 101    | 2025-04-17 01:08:03 |                NULL |        1 | aman_b21       | Aman             | Kumar           | aman.kumar_b21@iitp.ac.in |           5 | Stationery    | Drafters, calculators, lab coats |
+---------+--------------------------------+-------------------------------------------+--------------+-------------+----------------+---------------------+----------------------+---------------------+---------------------+----------+----------------+------------------+-----------------+---------------------------+-------------+---------------+----------------------------------+
1 row in set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

mysql> -- Output: A single row containing all details for item 1, including owner (Aman) and category (Stationery) info.
 Examplmysql>
mysql> -- Example 2: Get details for item_id = 9 (Hercules Cycle)
 GetImysql> CALL GetItemDetails(9);
 single row containing all deta+---------+-----------------------+---------------------------------------+--------------+-------------+----------------+---------------------+--------------------------+---------------------+---------------------+----------+----------------+------------------+-----------------+-----------------------------+-------------+---------------+-----------------------------+
| item_id | item_name             | description                           | rental_price | rental_unit | item_condition | availability_status | location_description     | date_added          | max_rental_duration | owner_id | owner_username | owner_first_name | owner_last_name | owner_email                 | category_id | category_name | category_description        |
+---------+-----------------------+---------------------------------------+--------------+-------------+----------------+---------------------+--------------------------+---------------------+---------------------+----------+----------------+------------------+-----------------+-----------------------------+-------------+---------------+-----------------------------+
|       9 | Hercules Roadeo Cycle | Gear cycle, suitable for longer rides |        50.00 | day         | good
| available           | APJ Kalam Hostel Parking | 2025-04-17 01:08:03 |                  30 |        8 | kavita_b23     | Kavita           | Reddy           | kavita.reddy_b23@iitp.ac.in |           3 | Cycles        | Bicycles for campus commute |
+---------+-----------------------+---------------------------------------+--------------+-------------+----------------+---------------------+--------------------------+---------------------+---------------------+----------+----------------+------------------+-----------------+-----------------------------+-------------+---------------+-----------------------------+
1 row in set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

ils for mysql> -- Output: A single row containing all details for item 9, including owner (Kavita) and category (Cycles) info.
xample mysql>
mysql> -- Example 3: Get details for a non-existent item_id
etItemDmysql> CALL GetItemDetails(999);
-- Output: An empty result seEmpty set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

mysql> -- Output: An empty result set (no rows returned).



-- Dmysql>
mysql>
mysql>
mysql> -- Declare output variables
SET @mysql> SET @new_image_id = NULL;
T @mesQuery OK, 0 rows affected (0.00 sec)

sage = 'mysql> SET @message = '';
1: Add a PRIQuery OK, 0 rows affected (0.00 sec)

mysql>
mysql> -- Example 1: Add a PRIMARY image to item_id = 1
mysql>  AddItCALL AddItemImage(
            ->     1,                          -- p_item_id
_NEW    ->     'url/item1_NEW_primary.jpg', -- p_image_url
UE,              ->     TRUE,                       -- p_is_primary
   @new_image_    ->     @new_image_id,
 @messa    ->     @message
- Check results    -> );
 (any previous primary image for item 1 should now be is_primary=FALSE)
SELECT @new_image_id, @message;

-- Example 2: Add a NON-primary image to item_id = 1
CALL AddItemImage(
    1,                          -- p_item_id
    'url/item1_extra.jpg',      -- p_image_url
    FALSE,              Query OK, 0 rows affected (0.00 sec)

mysql> -- Check results (any previous primary image for item 1 should now be is_primary=FALSE)
-- p_ismysql> SELECT @new_image_id, @message;
_primary
    @+---------------+----------------------------------------------+
| @new_image_id | @message                                     |
+---------------+----------------------------------------------+
|            30 | Image added successfully. Marked as primary. |
+---------------+----------------------------------------------+
1 row in set (0.00 sec)

mysql>
mysql> new_ima-- Example 2: Add a NON-primary image to item_id = 1
ge_id,
    @memysql> CALL AddItemImage(
ssage
)    ->     1,                          -- p_item_id
;
-- Ch    ->     'url/item1_extra.jpg',      -- p_image_url
    ->     FALSE,                      -- p_is_primary
lts
SE    ->     @new_image_id,
    -> LECT    @message
 @new_    -> );
image_id, @message;

-- Example 3: Add another PRIMARY image to item_id = 1 (this will make the one from Ex1 non-primary)
CALL AddItemImage(
    1,                          -- p_item_id
    'url/item1_LATEST_primary.png',-Query OK, 0 rows affected (0.01 sec)

mysql> -- Check results
- p_image_url
mysql> SELECT @new_image_id, @message;
    TRUE,                   '+---------------+---------------------------+
| @new_image_id | @message                  |
+---------------+---------------------------+
|            31 | Image added successfully. |
+---------------+---------------------------+'
1 row in set (0.00 sec)

mysql>
mysql> -- Example 3: Add another PRIMARY image to item_id = 1 (this will make the one from Ex1 non-primary)
imary
  mysql> CALL AddItemImage(
  @new_    ->     1,                          -- p_item_id
image_id,
        ->     'url/item1_LATEST_primary.png',-- p_image_url
    ->     TRUE,                       -- p_is_primary
    ->     @new_image_id,
e
);
--    ->     @message
    -> );
results
SELECT @new_image_id, @message;

-- Example 4: Attempt to add image to non-existent item
CALL AddItemImage(
    999,                        -- p_item_id (invalid)
    'url/some_image.jpg',
    FALSE,
    @new_image_id,
    @message
);
-- Check results
SELECT @Query OK, 0 rows affected (0.01 sec)

mysql> -- Check results
e; -- Emysql> SELECT @new_image_id, @message;
xpected: NUL+---------------+----------------------------------------------+
L and '| @new_image_id | @message                                     |
+---------------+----------------------------------------------+
|            32 | Image added successfully. Marked as primary. |
+---------------+----------------------------------------------+
1 row in set (0.00 sec)

mysql>
mysql> -- Example 4: Attempt to add image to non-existent item
Error: Item Imysql> CALL AddItemImage(
D does    ->     999,                        -- p_item_id (invalid)
st.'

-- Exampl    ->     'url/some_image.jpg',
ttempt to add wi    ->     FALSE,
    -> th empty    @new_image_id,
    ->     @message
 URL
    -> );
CALL AddItemImage(
    1Query OK, 1 row affected (0.00 sec)

,
    ''mysql> -- Check results
,       mysql> SELECT @new_image_id, @message; -- Expected: NULL and 'Error: Item ID does not exist.'
image_url (emp+---------------+--------------------------------+
ty)
   | @new_image_id | @message                       |
+---------------+--------------------------------+
|          NULL | Error: Item ID does not exist. |
+---------------+--------------------------------+
1 row in set (0.00 sec)

mysql>
mysql> -- Example 5: Attempt to add with empty URL
 FALSmysql> CALL AddItemImage(
    ->     1,
E,
       ->     '',                         -- p_image_url (empty)
 @new_    ->     FALSE,
    ->     @new_image_id,

);
--     ->     @message
    -> );
Check results
SELECT @neQuery OK, 0 rows affected (0.00 sec)

mysql> -- Check results
w_image_id, @mysql> SELECT @new_image_id, @message; -- Expected: NULL and 'Error: Item ID, Image URL, and Is Primary flag are required.'


-- Declare output var+---------------+--------------------------------------------------------------+
| @new_image_id | @message                                                     |
+---------------+--------------------------------------------------------------+
|          NULL | Error: Item ID, Image URL, and Is Primary flag are required. |
+---------------+--------------------------------------------------------------+
1 row in set (0.01 sec)

iable
Smysql>
mysql>
mysql>
mysql> -- Declare output variable
essage = '';

--mysql> SET @message = '';
 ExamplQuery OK, 0 rows affected (0.00 sec)

mysql>
mysql> -- Example 1: Delete item_id = 21 (Pendrive, owned by user 20), assuming no active/confirmed rentals
teItem(21, 20,mysql> CALL DeleteItem(21, 20, @message);
T @message; -- Expected: 'Item deleted successfully...'

-- Example 2: Attempt to delete item_id = 2 (Hero Cycle, owned by user 2) Query OK, 1 row affected (0.00 sec)

mysql> SELECT @message; -- Expected: 'Item deleted successfully...'
s active/confirmed renta+---------------------------------------------------------------------+
| @message                                                            |
+---------------------------------------------------------------------+
| Error: Cannot delete item while it has active or confirmed rentals. |
+---------------------------------------------------------------------+
1 row in set (0.00 sec)

mysql>
mysql> -- Example 2: Attempt to delete item_id = 2 (Hero Cycle, owned by user 2) which has active/confirmed rentals (e.g., rental_id=1)
L DeleteItem(mysql> CALL DeleteItem(2, 2, @message);
 @message; -- Expected: 'ErrQuery OK, 1 row affected (0.00 sec)

mysql> SELECT @message; -- Expected: 'Error: Cannot delete item while it has active or confirmed rentals.'
Example 3: Attempt by+---------------------------------------------------------------------+
| @message                                                            |
+---------------------------------------------------------------------+
| Error: Cannot delete item while it has active or confirmed rentals. |
+---------------------------------------------------------------------+
1 row in set (0.00 sec)

 wrong umysql>
mysql> -- Example 3: Attempt by wrong user (user 1 tries to delete item 2 owned by user 2)
eleteItem(2, mysql> CALL DeleteItem(2, 1, @message);
CT @message; -- ExpeQuery OK, 1 row affected (0.00 sec)
cted: ''
mysql> SELECT @message; -- Expected: 'Error: Permission denied. You are not the owner of this item.'
xample 4: Att+---------------------------------------------------------------+
| @message                                                      |
+---------------------------------------------------------------+
| Error: Permission denied. You are not the owner of this item. |
+---------------------------------------------------------------+
1 row in set (0.00 sec)

mysql>''
empt to mysql> -- Example 4: Attempt to delete non-existent item
 Deletmysql> CALL DeleteItem(999, 1, @message);
LECT @message; -- Query OK, 0 rows affected (0.00 sec)

mysql> SELECT @message; -- Expected: 'Error: Item ID not found.''
+---------------------------+
| @message                  |
+---------------------------+
| Error: Item ID not found. |
+---------------------------+
1 row in set (0.00 sec)

mysql>


