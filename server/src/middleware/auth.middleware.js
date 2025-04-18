import jwt from 'jsonwebtoken';
import { secret } from '../../config/jwt.config.js';

const { verify } = jwt;

function verifyToken(req, res, next) {
    // console.log("hello")
    // const authHeader = req.headers['authorization'];
    // console.log(`${authHeader}` );
    // const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    // if (!token) {
    //     return res.status(403).json({ message: 'No toooken provided.' }); // Forbidden
    // }

    const token = req.cookies.token;
    // console.log(req.cookies)
    // console.log(token,"token")

    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    verify(token, secret, (err, decoded) => {
        if (err) {
             console.error('JWT Verification Error:', err.message);
             if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Unauthorized! Token was expired.' });
             }
             return res.status(401).json({ message: 'Unauthorized! Failed to authenticate token.' }); // Unauthorized
        }
        
        req.userId = decoded.id;
        next();
    });
}

export default verifyToken;
