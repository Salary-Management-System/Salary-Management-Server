import dayjs from 'dayjs';
import logger from 'pino';

const log = logger({
    transport : {
        target : 'pino-pretty',
        options : {
            colorized : true
        }
    },
    base : {
        pid : false
    },
    timestamp : () => `,"time":"${dayjs().format()}"`
})

export default log;