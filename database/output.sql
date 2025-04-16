
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

