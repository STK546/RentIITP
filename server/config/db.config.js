import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';

config(); 

console.log('DB config:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
});


const pool = createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,  // Add this line
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false // or true depending on your server config
    },
    waitForConnections: true,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
    queueLimit: 0
});

pool.getConnection()
    .then(connection => {
        console.log('Successfully connected to the database pool.');
        connection.release();
    })
    .catch(err => {
        console.error('[ERROR] Connecting to database:', err.message);
        // process.exit(1);
    });

    

export default pool;
