import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { IReservationTimeSlot } from '../interfaces/reservation-time.interface';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
  
  
@Entity()
export class ReservationTime implements IReservationTimeSlot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; 

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column({ type: 'date', nullable: true })
 date2?: string;


  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Restaurant, { onDelete: 'CASCADE', eager: true })
  restaurant: Restaurant;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
  