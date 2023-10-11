/* eslint-disable no-shadow */
const winston = require("winston");

const { combine, printf } = winston.format;
require("winston-syslog");
const colorizer = winston.format.colorize();

const logFormat = printf(({ level, message }) => {
  return `${new Date().toString()} ${level} : ${colorizer.colorize(
    level,
    JSON.stringify(message)
  )}`;
});

const logger = winston.createLogger({
  format: combine(winston.format.json(), logFormat),
  transports: [new winston.transports.Console()],
});

if (process.env.NODE_ENV === "stage" || process.env.NODE_ENV === "production") {
  logger.add(
    new winston.transports.File({ filename: "error.log", level: "error" })
  );
  logger.add(new winston.transports.File({ filename: "combined.log" }));
  // logger.add(papertrail);
}

module.exports = logger;
