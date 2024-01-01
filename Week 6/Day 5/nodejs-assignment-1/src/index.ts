import express from 'express';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';
import { MikroORM, RequestContext } from '@mikro-orm/core';

// import './db.init';
import config from './config';
import routes from './routes';
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware';
import mikroORMConfig from './mikro-orm.config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.cookieSecret));

(async () => {
  const orm = await MikroORM.init(mikroORMConfig);
  console.log(orm.em); // access EntityManager via `em` property

  app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
  });
})();

app.use(pino());

app.use(routes);

app.use(errorHandlerMiddleware);

app.listen(config.port, () => {
  console.log(`Server listening on port: ${config.port}`);
});
