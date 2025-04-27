import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { MealTime } from '../enums/meal-time.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Plat } from './plat.entity';

@Entity()
export class MealTimeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: MealTime })
  mealTime: MealTime;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;



  @ManyToMany(() => Plat, (plat) => plat.mealTimes)
  plats: Plat[];

}
