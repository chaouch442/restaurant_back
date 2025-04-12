import {Entity,Column,CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany} from 'typeorm';


import { MealTime } from 'src/plats/enums/meal-time.enum';
import { ReservationTime } from './reservation-time.entity';
import { ReservationStatus } from '../enums/reservation.enums';
import { User } from 'src/user/entities/user.entity';
import { TableRestaurant } from 'src/tables/entities/table.entity';
import { Plat } from 'src/plats/entities/plat.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';



@Entity()
export class ReservationTable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customerName: string;

  @Column({ type: 'timestamp' })
  reservationDateTime: Date;

  @Column({ default: false })
  isCancelled: boolean;
  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.ACTIVE,
  })
  status: ReservationStatus;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Restaurant, { eager: true })
  restaurant: Restaurant;

  @ManyToOne(() => TableRestaurant, { eager: true, nullable: true })
  table?: TableRestaurant;

  @ManyToMany(() => Plat, { eager: true })
  @JoinTable()
  plats: Plat[];

  @Column({ type: 'enum', enum: MealTime, nullable: true })
  mealTime?: MealTime;



  @ManyToOne(() => ReservationTime, { eager: true, nullable: true }) 
  timeSlot?: ReservationTime;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
