import { registerUser, authenticateUser } from '../services/auth.service.js';
import { secret, expiresIn as _expiresIn } from '../../config/jwt.config.js';
import jwt from 'jsonwebtoken';

const { sign } = jwt;

async function register(req, res, next) {
    const requiredFields = [
        'username', 
        'email', 
        'password', 
        // 'firstName', 
        // 'lastName',
        'rollNumber', 
        // 'phoneNumber', 
        'hostelName', 
        'hostelBlock',
        'roomNumber',
        // 'profilePictureUrl'
    ];

    // console.log(req.body)
    // const missingFields = requiredFields.filter(field => !req.body[field]);

    // if (missingFields.length > 0) {
    //     console.log("Missing fields:", missingFields);
    //     return res.status(400).json({ 
    //         message: 'Missing required fields.', 
    //         missingFields 
    //     });
    // }

    try {
        const result = await registerUser(req.body);
        console.log(result)
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
const SEVEN_DAYS = 7 * ONE_DAY; // 7 days in milliseconds

async function login(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const result = await authenticateUser(username, password);
        console.log(result,"afs")

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
                secure: true,
                sameSite: 'None',
                maxAge: SEVEN_DAYS, // Changed from ONE_DAY to SEVEN_DAYS
            });

            // Send token and user info 
            res.status(200).json({
                userId: result.userId,
                username,
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

async function logout(req, res) {
    try {
        // Clear the token cookie
        console.log("logout")
        res.clearCookie('user','token', {
            httpOnly: true,
            secure: true, // Set to true in production with HTTPS
            sameSite: 'None'
        });
        localStorage.removeItem('token');
        localStorage.removeItem('user');    

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Error during logout' });
    }
}

export {
    register,
    login,
    logout
};
