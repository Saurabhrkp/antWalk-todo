import { transports, format } from 'winston';
import expressWinston from 'express-winston';
import { environment, logDirectory } from 'configs';

const apiLoggerTransports = [new transports.File({ filename: `${logDirectory}/combined.log` })];
const errorLoggerTransports = [new transports.File({ filename: `${logDirectory}/errors.log`, level: 'error' })];

if (environment !== 'production') {
	apiLoggerTransports.push(new transports.Console());
	errorLoggerTransports.push(new transports.Console());
}

export const apiLogger = expressWinston.logger({
	transports: apiLoggerTransports,
	format: format.combine(
		format.errors({ stack: true }),
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		format.printf(({ level, message, timestamp, stack }) => {
			if (stack) return `${timestamp} ${level}: ${message}\n${stack}`; // Custom format for error logs
			return `${timestamp} ${level}: ${message}`; // Default format for other logs
		})
	),
	meta: false,
	expressFormat: true,
	colorize: false,
	statusLevels: true,
	skip: (req, _res) => req.method === 'OPTIONS',
});

export const errorLogger = expressWinston.errorLogger({
	transports: errorLoggerTransports,
	format: format.combine(
		format.errors({ stack: true }),
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		format.printf(({ level, message, timestamp, meta }) => {
			const error = JSON.stringify(meta?.error);
			console.error({ timestamp, level, message, meta });
			return `${timestamp} ${level}: ${message}, error: ${error}`;
		})
	),
	meta: true,
	requestField: null,
	blacklistedMetaFields: ['process', 'stack', 'trace', 'os', 'message'],
	dynamicMeta: (req, res, _err) => { return { url: req.url, body: req.body }; },
	skip: (req, _res) => req.method === 'OPTIONS',
});
