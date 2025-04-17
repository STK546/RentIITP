// config/db.config.js
import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';

config(); 

const pool = createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
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
