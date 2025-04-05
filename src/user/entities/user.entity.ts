import { RoleEntity } from 'src/auth/entities/role.entity';
import { Entity,  Column,   PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class UserEntity {
@PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;



  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  phone: string;
  
  @Column('text', { nullable: true })
  resetToken: string | null;
  
  @Column('timestamp', { nullable: true })
  resetTokenExpires: Date | null;
  

  @ManyToOne(() => RoleEntity, (role) => role.user, { eager: true })
role: RoleEntity;
 

 
 }
 

  
