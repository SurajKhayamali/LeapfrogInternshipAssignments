import knex, { Knex } from 'knex';
import camelCase from 'camelize';
import toSnakeCase from 'to-snake-case';
import { NextFunction } from 'express';

import { baseKnexConfig } from './knexFile';

const knexConfig: Knex.Config = {
  ...baseKnexConfig,
  connection: {
    ...baseKnexConfig.connection,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeCast: (field: any, next: NextFunction) => {
      if (field.type == 'DATE') {
        return field.string();
      }

      return next();
    },
  },
  wrapIdentifier: (value: string, origImpl: (value: string) => string) => {
    if (value === '*') {
      return origImpl(value);
    }

    return origImpl(toSnakeCase(value));
  },
  postProcessResponse: (result) => {
    return camelCase(result);
  },
};

export default knex(knexConfig);
