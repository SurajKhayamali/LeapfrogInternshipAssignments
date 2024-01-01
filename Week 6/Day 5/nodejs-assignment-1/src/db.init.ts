import { MikroORM, type PostgreSqlDriver } from '@mikro-orm/postgresql'; // or any other driver package

// const orm = await MikroORM.init<PostgreSqlDriver>({
//   entities: ['./dist/entities'], // path to our JS entities (dist), relative to `baseDir`
//   entitiesTs: ['./src/entities'], // path to our TS entities (src), relative to `baseDir`
//   dbName: 'my-db-name',
//   type: 'postgresql',
// });
// console.log(orm.em); // access EntityManager via `em` property

export let orm: unknown;

MikroORM.init<PostgreSqlDriver>({
  entities: ['./dist/entities'], // path to our JS entities (dist), relative to `baseDir`
  entitiesTs: ['./src/entities'], // path to our TS entities (src), relative to `baseDir`
  dbName: 'nodejs-assignment-1',
  type: 'postgresql',
  clientUrl: 'postgres://postgres:example@localhost:5432/nodejs-assignment-1',
})
  .then((ormRes) => {
    console.log(ormRes.em); // access EntityManager via `em` property
    orm = ormRes;
  })
  .catch((err) => {
    console.error(err);
  });
