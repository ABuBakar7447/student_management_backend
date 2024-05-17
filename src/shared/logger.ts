import { createLogger, format, transports } from 'winston'
import path from 'path'

const { combine, timestamp, label, printf } = format
import DailyRotateFile from 'winston-daily-rotate-file'

//custom log format

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${date.toDateString()} ${hour}:${minutes}:${seconds}  [${label}] ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'Student DM Backend' }),
    timestamp(),
    myFormat,
    // prettyPrint()
  ),
  transports: [
    new transports.Console(),
    //   new transports.File({
    //     filename: path.join(process.cwd(),'logs','winston','success','studentdm-%DATE%-success.log'),
    //     level: 'info' }),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'success',
        'studentdm-%DATE%-success.log',
      ),
      level: 'info',
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

const errorlogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'Student DM Backend' }),
    timestamp(),
    myFormat,
    // prettyPrint()
  ),
  transports: [
    new transports.Console(),
    //   new transports.File({
    //     filename: path.join(process.cwd(),'logs','winston','error','studentdm-%DATE%-error.log'),
    //     level: 'error' }),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'error',
        'studentdm-%DATE%-error.log',
      ),
      level: 'error',
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export { logger, errorlogger }
