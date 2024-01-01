import { Migration } from '@mikro-orm/migrations';

export class Migration20240101195601 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "todo" ("id" serial primary key, "title" varchar(255) not null, "completed" boolean not null default false);');

    this.addSql('drop table if exists "user" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "user" ("id" serial, "firstName" varchar not null default null, "lastName" varchar not null default null, "age" int4 not null default null, constraint "PK_cace4a159ff9f2512dd42373760" primary key ("id"));');

    this.addSql('drop table if exists "todo" cascade;');
  }

}
