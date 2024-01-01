import { Entity, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from '../abstracts/base.entity';

@Entity()
export class Todo extends CustomBaseEntity {
  @Property()
  title!: string;

  @Property()
  completed: boolean = false;

  constructor(title: string) {
    super();
    this.title = title;
  }
}
