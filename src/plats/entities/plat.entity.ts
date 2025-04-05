import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { MenuEntity } from '../../menu/entities/menu.entity';
import { MealTime } from '../enums/meal-time.enum';
import { ReservationEntity } from 'src/reservations/entities/reservation.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class PlatEntity {
  @PrimaryGeneratedColumn()
  id: string;
 
  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  image: string;
 
  @Column({ type: 'enum', enum: MealTime }) 
  mealTime: MealTime;

  @ManyToOne(() => MenuEntity, (menu) => menu.plats, {
    onDelete: 'CASCADE', // optionnel
  })
  menu: MenuEntity;
  
  @ManyToMany(() => ReservationEntity, (reservation) => reservation.plats)
  reservations: ReservationEntity[];
  

  
  
}
