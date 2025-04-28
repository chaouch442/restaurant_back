import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MealTimeService } from './meal-time.service';
import { MealTimeController } from './meal-time.controller';
import { MealTimeEntity } from 'src/plats/entities/meal-time.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MealTimeEntity])],
    controllers: [MealTimeController],
    providers: [MealTimeService],
})
export class MealTimeModule { }
