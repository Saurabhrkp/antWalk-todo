// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;

export const logDirectory = process.env.LOG_DIR;

export const dbURL = process.env.DATABASE_URL;

export const jwtSecret = process.env.JWT_SECRET;
export const jwtExpiresIn = process.env.JWT_EXPIREIN;

export const emailService = process.env.SMTP_SERVICE;
export const emailUser = process.env.SMTP_USER;
export const emailPassword = process.env.SMTP_PASS;