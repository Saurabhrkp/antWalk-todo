import { validate } from 'auth';
import logger from 'helpers/logger';

export const authentication = async (req, res, next) => {
  try {
    if (!req.headers['accesstoken']) throw new Error('Unable to find access token.');
    const accessToken = req.headers['accesstoken'];
    const payload = await validate(accessToken);
    res.locals.userId = payload.userId;
    res.locals.email = payload.email;
    return next();
  } catch (error) {
    logger.error(error);
    throw error;
  }
};