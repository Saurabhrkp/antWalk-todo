import { jwtSecret, jwtExpiresIn } from 'configs';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// Promisify the functions
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);
const decodeAsync = promisify(jwt.decode);

export const decode = async (token) => {
  return await decodeAsync(token, jwtSecret);
};

export const encode = async (payload) => {
  return await signAsync(payload, jwtSecret, { expiresIn: jwtExpiresIn });
};

export const validate = async (token) => {
  return await verifyAsync(token, jwtSecret);
};