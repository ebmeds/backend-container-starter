import { Router } from 'express';
import requestLogger from './request-logger';

export default () => {
  const routes = Router();

  routes.use(requestLogger); // Insert Bunyan logger into req.log
  // Add more middleware here...

  return routes;
};
