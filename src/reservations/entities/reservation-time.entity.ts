import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IReservationTimeSlot } from '../interfaces/reservation-time.interface';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { ReservationTable } from './reservation.entity';


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
  date2?: Date;



  @Column({ default: true })
  isActive: boolean;




  @OneToOne(() => ReservationTable, { eager: true, nullable: true })
  reservationTable: ReservationTable;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
