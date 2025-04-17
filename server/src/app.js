// src/app.js
import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import apiRouter from './routes'; 
import errorMiddleware from './middleware/error.middleware'; // Will be created later

config();

const app = express();

// --- Global Middleware ---
app.use(json());
app.use(urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

// --- Middleware  ---
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
});

//API routes
app.use('/api', apiRouter);

// --- Health Check Route  ---
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Catch-all for routes not defined above
app.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found on this server.' });
});

app.use(errorMiddleware);

export default app; 
