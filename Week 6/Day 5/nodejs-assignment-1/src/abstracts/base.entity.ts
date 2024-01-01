// import { BaseEntity, Entity, SerializedPrimaryKey } from '@mikro-orm/core';

import { PrimaryKey } from '@mikro-orm/core';

// @Entity()
// export abstract class AbstractEntity extends BaseEntity<
//   AbstractEntity,
//   'id',
//   ''
// > {
//   @SerializedPrimaryKey()
//   id: number;

//   @CreateDateColumn({ type: 'timestamp' })
//   createdAt: Date;

//   @UpdateDateColumn({ type: 'timestamp' })
//   updatedAt: Date;
// }

export class CustomBaseEntity {
  @PrimaryKey()
  id!: number; // auto increment PK in SQL drivers
}
