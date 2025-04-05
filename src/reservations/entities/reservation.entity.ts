import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { RestaurantEntity } from 'src/restaurants/entities/restaurant.entity';
import { TableEntity } from 'src/tables/entities/table.entity';
import { PlatEntity } from 'src/plats/entities/plat.entity';
import { MenuEntity } from 'src/menu/entities/menu.entity';
import { MealTime } from 'src/plats/enums/meal-time.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ReservationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
 customerName: string;

 

  @Column({ type: 'timestamp' })
  reservationDateTime: Date;  

  @Column({ default: false })
  isCancelled: boolean;  


@ManyToOne(() => UserEntity, { eager: true })  
user: UserEntity;

  @ManyToOne(() => RestaurantEntity, { eager: true })  
  restaurant: RestaurantEntity;

  @ManyToOne(() => TableEntity, { eager: true, nullable: true })
  table?: TableEntity;

  
  @ManyToMany(() => PlatEntity, { eager: true })
  @JoinTable()
  plats: PlatEntity[];
  
  
  @Column({ type: 'enum', enum: MealTime, nullable: true })
  mealTime?: MealTime;

  @Column({ nullable: true })
 qrCode?: string;

  
  @CreateDateColumn()
  createdAt: Date;

  
  @UpdateDateColumn()
    updatedAt: Date; 
 
}
