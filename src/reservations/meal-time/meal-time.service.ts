import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealTimeEntity } from 'src/plats/entities/meal-time.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MealTimeService {
    constructor(
        @InjectRepository(MealTimeEntity)
        private readonly mealTimeRepository: Repository<MealTimeEntity>,
        @InjectRepository(Restaurant)
        private readonly restaurantRepository: Repository<Restaurant>
    ) { }
    async countByMealTime(): Promise<{ mealTime: string; count: number }[]> {
        return this.mealTimeRepository
            .createQueryBuilder('meal')
            .select('meal.mealTime', 'mealTime')
            .addSelect('COUNT(*)', 'count')
            .groupBy('meal.mealTime')
            .getRawMany();
    }
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

    async createMealTime(data: Partial<MealTimeEntity> & { restaurantId: string }): Promise<MealTimeEntity> {
        const restaurant = await this.restaurantRepository.findOneBy({ id: data.restaurantId });

        if (!restaurant) {
            throw new NotFoundException(`Restaurant with ID ${data.restaurantId} not found`);
        }

        const mealTime = this.mealTimeRepository.create({
            ...data,
            restaurant
        });

        return this.mealTimeRepository.save(mealTime);
    }
    async updateMealTime(id: string, updateData: Partial<MealTimeEntity>): Promise<MealTimeEntity> {
        const mealTime = await this.mealTimeRepository.preload({
            id,
            ...updateData,
        });

        if (!mealTime) {
            throw new NotFoundException(`MealTime with ID ${id} not found`);
        }

        return this.mealTimeRepository.save(mealTime);
    }
    async deleteMealTime(id: string) {
        const result = await this.mealTimeRepository.delete(id);

        if (result.affected === 0) {
            return null;
        }

        return { deleted: true };
    }


}
