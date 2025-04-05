import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MealTime } from '../enums/meal-time.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class MealTimeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
@ApiProperty() 
  @Column({ type: 'enum', enum: MealTime })
  mealTime: MealTime;
@ApiProperty() 
  @Column({ type: 'time' })
  startTime: string;
@ApiProperty() 
  @Column({ type: 'time' })
  endTime: string;
}
