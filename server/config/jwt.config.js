import { config } from 'dotenv';
config();

export const secret = process.env.JWT_SECRET;
export const expiresIn = process.env.JWT_EXPIRES_IN || '1h';
