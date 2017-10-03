import uuid from 'uuid';
import logger from '../lib/logger';

/**
 * Middleware that inserts a Bunyan logging object
 * into `req.logger`, which should be used everywhere
 * within a request. Automatically sets the `req_id` field
 * in the logging message.
 */
export default function requestLogger(req, res, next) {
  // Normal operation: Request ID is provided in request
  // HTTP header. If not, generate some random ID.
  const requestId = req.get('X-Request-Id') || uuid();
  req.logger = logger.child({ req_id: requestId });
  next();
}
