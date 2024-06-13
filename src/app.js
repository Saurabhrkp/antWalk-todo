import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import 'express-async-errors';

import { errorLogger } from 'middlewares/apiLogger';

import { environment } from 'configs/index';
import indexRoute from 'routes/index';

// Creating express app
const app = express();

/**
 * Express App Global configurations
 */
// Disable x-powered-by in headers
app.disable('x-powered-by');
// Enable CORS
app.use(cors());
// Parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));
// Text parser for Forms
app.use(express.text({ limit: '5mb', type: 'text/csv' }));
// JSON parser for Forms
app.use(express.json({ limit: '5mb', type: 'application/json' }));

/** Security Compression. */
if (environment === 'production') {
	/** Protects app from some well-known web vulnerabilities. */
	app.use(helmet());
	/** Compress all routes. */
	app.use(compression());
	/** Remove Compression if using Nginx */
}

// Routes
app.get('/health-check', (_req, res) => res.send('Health OK'));
app.use('/', indexRoute);

// catch 404 and forward to error handler
app.use((_req, res, next) => {
	const url = res.req.originalUrl;
	return res.status(404).json({ status: 'FAILED', message: `NOT FOUND: ${url}` });
});

// Logging Error requests
app.use(errorLogger);

// Middleware Error Handler
app.use(async (err, req, res, _next) => {
	return res.status(500).json({ error: { status: 'FAILED', message: err.message } });
});

module.exports = app;