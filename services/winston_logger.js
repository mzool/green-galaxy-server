import { createLogger, transports, format } from 'winston';
const { combine, timestamp, label, printf } = format;

// Define log levels and colors (optional)
const logLevels = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'blue',
    verbose: 'cyan',
    debug: 'magenta',
    silly: 'white',
};
const myLabel = `Green Glaxy`
// Create a custom log format
const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

// Create a Winston logger instance
const logger = createLogger({
    levels: logLevels, // Customize log levels if needed
    level: "error",
    format: combine(
        label({ label: myLabel }), // Customize label
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Customize timestamp format
        logFormat // Apply the custom log format
    ),
    transports: [
        // Console transport for logging to the console
        new transports.Console({
            format: format.combine(
                format.colorize(), // Apply colorization for console output (optional)
                format.simple() // Simple console format
            ),
        }),

        // File transport for logging to a log file
        new transports.File({
            filename: 'greenGalaxy.log', // Specify the log file name
            maxsize: 1048576, // Maximum log file size (in bytes)
            maxFiles: 5, // Maximum number of log files to keep
            tailable: true, // Support tailing the log file
            format: format.combine(
                format.uncolorize(), // Disable colorization for file output
                format.simple() // Simple file format
            ),
        }),
    ],
});

// Example log statements


export default logger;
