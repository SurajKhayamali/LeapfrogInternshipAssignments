import express from 'express';
import pino from 'pino-http';

import config from './config';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(pino());

app.use(routes);

app.listen(config.port, () => {
  console.log(`Server listening on port: ${config.port}`);
});
