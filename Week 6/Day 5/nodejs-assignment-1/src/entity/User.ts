import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  age: number;

  constructor(firstName: string, lastName: string, age: number) {
    // this.id = Math.floor(Math.random() * 100);
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
}
