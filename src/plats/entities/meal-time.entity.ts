import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MealTime } from '../enums/meal-time.enum';
import { ApiProperty } from '@nestjs/swagger';

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
}
