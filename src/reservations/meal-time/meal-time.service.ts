import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealTimeEntity } from 'src/plats/entities/meal-time.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MealTimeService {
    constructor(
        @InjectRepository(MealTimeEntity)
        private readonly mealTimeRepository: Repository<MealTimeEntity>,
    ) { }

    async findAll(): Promise<MealTimeEntity[]> {
        return this.mealTimeRepository.find();
    }

    async getMealTimeById(id: string): Promise<MealTimeEntity> {
        const mealTime = await this.mealTimeRepository.findOneBy({ id });
        if (!mealTime) {
            throw new NotFoundException(`MealTime with ID ${id} not found`);
        }
        return mealTime;
    }

    async createMealTime(data: Partial<MealTimeEntity>): Promise<MealTimeEntity> {
        const mealTime = this.mealTimeRepository.create(data);
        return this.mealTimeRepository.save(mealTime);
    }
}
