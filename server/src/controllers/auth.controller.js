import { registerUser, authenticateUser } from '../services/auth.service.js';
import { secret, expiresIn as _expiresIn } from '../../config/jwt.config.js';
import jwt from 'jsonwebtoken';

const { sign } = jwt;

async function register(req, res, next) {
    const requiredFields = [
        'username', 
        'email', 
        'password', 
        'firstName', 
        'lastName',
        'rollNumber', 
        'phoneNumber', 
        'hostelName', 
        'hostelBlock',
        'roomNumber',
        'profilePictureUrl'
    ];
    if (requiredFields.some(field => !req.body[field])) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const result = await registerUser(req.body);
        if (result.userId) {
            res.status(201).json({ userId: result.userId, message: result.message }); 
        } else {
            const statusCode = result.message.includes('exists') ? 409 : 400;
            res.status(statusCode).json({ message: result.message });
        }
    } catch (error) {
        next(error);
    }
}

const ONE_DAY = 24 * 60 * 60 * 1000; 
async function login(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const result = await authenticateUser(username, password);

        if (result.userId && result.accountStatus === 'active') {
            // JWT Payload
            const payload = {
                id: result.userId,
                username: result.username,
            };

            // Signing token
            const token = sign(payload, secret, {
                expiresIn: _expiresIn
            });

            // Set token in httpOnly cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: false, // Set to true in production with HTTPS
                sameSite: 'strict',
                maxAge: ONE_DAY,
            });

            // Send token and user info 
            res.status(200).json({
                userId: result.userId,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                message: result.message,
                accessToken: token
            });
        } else {
            res.status(401).json({ message: result.message || 'Invalid username or password.' }); // Unauthorized
        }
    } catch (error) {
        next(error);
    }
}

export {
    register,
    login,
    
};
