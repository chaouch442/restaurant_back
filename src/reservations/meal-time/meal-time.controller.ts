import { Controller, Get, Post, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { MealTimeService } from './meal-time.service';
import { MealTimeEntity } from 'src/plats/entities/meal-time.entity';

@Controller('meal-times')
export class MealTimeController {
    constructor(private readonly mealTimeService: MealTimeService) { }

    @Get()
    findAll() {
        return this.mealTimeService.findAll();
    }

    @Get(':id')
    getMealTimeById(@Param('id', ParseUUIDPipe) id: string) {
        return this.mealTimeService.getMealTimeById(id);
    }

    @Post()
    createMealTime(@Body() mealTimeData: Partial<MealTimeEntity>) {
        return this.mealTimeService.createMealTime(mealTimeData);
    }
}
