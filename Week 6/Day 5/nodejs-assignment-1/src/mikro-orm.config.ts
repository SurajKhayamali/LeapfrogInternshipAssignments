import { Options } from '@mikro-orm/core';
import { Todo } from './entities/Todo';

const config: Options = {
  entities: [Todo], // no need for `entitiesTs` this way
  dbName: 'nodejs-assignment-1',
  type: 'postgresql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'example',
};

export default config;
