import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from 'typeorm';

import { UserEntity } from 'src/user/entities/user.entity';


@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  
  @OneToMany(() => UserEntity, (user) => user.role)
  user: UserEntity[];

  
}
