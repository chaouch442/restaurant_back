import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { RestaurantStatus } from '../enums/status.enum';
import { IRestaurant } from '../interfaces/restaurant.interface';

@Entity()
export class Restaurant implements IRestaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  speciality: string;

  @Column()
  phone: string;

  @Column({ nullable: false })
  hourly: string;

  @Column({ type: 'enum', enum: RestaurantStatus })
  status: RestaurantStatus;


  @Column({ default: true })
  isActive: boolean;




  @Column({ type: 'text', nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
