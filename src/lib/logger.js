import bunyan from 'bunyan';
import bunyanTcp from 'bunyan-logstash-tcp';

const streams = [];

// Log either to logstash or console
if (process.env.USE_LOGSTASH.toLowerCase() === 'yes') {
  streams.push({
    level: process.env.LOG_LEVEL,
    type: 'raw',
    stream: bunyanTcp
      .createStream({
        host: process.env.LOGSTASH_HOST,
        port: Number(process.env.LOGSTASH_PORT),
        max_connect_retries: -1,
        retry_interval: 1000 * 10, // 10 seconds
      })
      .on('error', err =>
        // eslint-disable-next-line no-console
        console.log(
          `${new Date()}: Error connecting to logstash at ${process.env
            .LOGSTASH_HOST}:${process.env
            .LOGSTASH_PORT}, reason: ${err.code}. Retrying in 10 seconds...`,
        ),
      ),
  });
} else {
  streams.push({
    stream: process.stdout,
    level: process.env.LOG_LEVEL,
  });
}

const logger = bunyan.createLogger({
  name: process.env.npm_package_name || 'unknown', // npm_package_name is set when app started with npm start
  serializers: bunyan.stdSerializers,
  streams,
});

export default logger;
