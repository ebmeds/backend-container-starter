import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';
import logger from './lib/logger';
import config from './config.json';

const app = express();
app.server = http.createServer(app);

app.use(
  bodyParser.json({
    limit: config.bodyLimit,
  }),
);

// internal middleware
app.use(middleware({ config }));

// api router
app.use('/api', api({ config }));

app.server.listen(process.env.PORT || config.port, () => {
  logger.info(`Started on port ${app.server.address().port}`);
});

export default app;
