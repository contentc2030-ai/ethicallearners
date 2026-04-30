import winston from 'winston';
import 'winston-daily-rotate-file'; // Import the package

const isLocal = process.env.LOCAL === 'true';

// Create a logger instance
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize({
            level: true,
            colors: {
                info: 'green',
                warn: 'yellow',
                error: 'red',
            }
        }),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            // Extract ANSI color codes and transform only the level text to uppercase
            const levelUppercase = level.replace(/(\u001b\[[0-9;]*m)?([a-z]+)(\u001b\[[0-9;]*m)?/i, (match, p1, p2, p3) => {
                return `${p1 || ''}${p2.toUpperCase()}${p3 || ''}`;
            });
            return `${timestamp} || [${levelUppercase}] ||  ${message}`;
        })
    ),
    transports: isLocal
        ? [
            new winston.transports.DailyRotateFile({
                dirname: 'logs', // Directory for log files
                filename: 'applicationLog-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                maxFiles: '2d', // Retain logs for 20 days
            })
        ]
        : [
            new winston.transports.Console({}) // Colorized logs in console
        ],
});

export default logger;
