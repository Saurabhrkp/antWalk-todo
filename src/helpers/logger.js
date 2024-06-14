import { createLogger, format, transports } from 'winston';
import { environment, logDirectory } from 'configs';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [new transports.File({ filename: `${logDirectory}/api.log` })]
});


if (environment !== 'production') {
  logger.add(new transports.Console({ format: format.simple() }));
}

export default logger;
