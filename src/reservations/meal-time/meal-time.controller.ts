import { Controller, Get, Post, Param, Body, ParseUUIDPipe, Patch, Delete, NotFoundException } from '@nestjs/common';
import { MealTimeService } from './meal-time.service';
import { MealTimeEntity } from 'src/plats/entities/meal-time.entity';

@Controller('meal-times')
export class MealTimeController {
    constructor(private readonly mealTimeService: MealTimeService) { }
    @Get('count')
    async getMealTimeCounts() {
        return this.mealTimeService.countByMealTime();
    }
    @Get()
    findAll() {
        return this.mealTimeService.findAll();
    }

    @Get(':id')
    getMealTimeById(@Param('id', ParseUUIDPipe) id: string) {
        return this.mealTimeService.getMealTimeById(id);
    }

    @Post()
    createMealTime(
        @Body() mealTimeData: Partial<MealTimeEntity> & { restaurantId: string }
    ) {
        return this.mealTimeService.createMealTime(mealTimeData);
    }
    @Patch(':id')
    updateMealTime(
        @Param('id') id: string,
        @Body() updateData: Partial<MealTimeEntity>
    ) {
        return this.mealTimeService.updateMealTime(id, updateData);
    }
    @Delete(':mealId')
    async deleteMealTime(@Param('mealId') mealId: string) {
        return this.mealTimeService.deleteMealTime(mealId);
    }




}


