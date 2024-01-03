import { camelCase, snakeCase } from 'change-case';
import knex, { Knex } from 'knex';

import { baseKnexConfig } from './knexFile';
import { NextFunction } from 'express';

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

    return origImpl(snakeCase(value));
  },
  postProcessResponse: (result) => {
    return camelCase(result);
  },
};

export default knex(knexConfig);
