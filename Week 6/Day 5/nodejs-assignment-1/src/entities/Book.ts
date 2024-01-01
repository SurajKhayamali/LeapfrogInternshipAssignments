import {
  //   Collection,
  Entity,
  //   ManyToMany,
  //   ManyToOne,
  Property,
} from '@mikro-orm/core';
import { CustomBaseEntity } from '../abstracts/base.entity';

@Entity()
export class Book extends CustomBaseEntity {
  @Property()
  title!: string;

  //   @ManyToOne(() => Author)
  //   author!: Author;

  //   @ManyToOne(() => Publisher, { ref: true, nullable: true })
  //   publisher?: Ref<Publisher>;

  //   @ManyToMany({ entity: 'BookTag', fixedOrder: true })
  //   tags = new Collection<BookTag>(this);
}
