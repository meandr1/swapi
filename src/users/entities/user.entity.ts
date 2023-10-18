import { Role } from 'src/role/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  pass: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User
  })
  role: Role;
}
