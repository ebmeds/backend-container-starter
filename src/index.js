import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv-extended';
import middleware from './middleware';
import api from './api';
import logger from './lib/logger';

dotenv.load();

const app = express();
app.server = http.createServer(app);

app.use(
  bodyParser.json({
    limit: process.env.BODY_LIMIT,
  }),
);

// internal middleware
app.use(middleware());

// api router
app.use('/api', api());

app.server.listen(process.env.LISTEN_PORT, () => {
  logger.info(`Started on port ${app.server.address().port}`);
});

export default app;
