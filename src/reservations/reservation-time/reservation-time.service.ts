import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantRepository } from 'src/restaurants/repositories/restaurant.repository';
import { Equal, IsNull, Repository } from 'typeorm';
import { ReservationTimeRepository } from '../repositories/reservation-time.repository';
import { CreateReservationTimeDto } from '../types/dtos/create-reservation-time.dto';
import { UpdateReservationTimeDto } from '../types/dtos/update-reservation-time.dtos';
import { getMealTime } from 'src/plats/utils/getMealTime';
import { InjectRepository } from '@nestjs/typeorm';
import { Plat } from 'src/plats/entities/plat.entity';

@Injectable()
export class ReservationTimeService {
    constructor(
    private readonly slotRepo: ReservationTimeRepository,
    private restaurantRepo: RestaurantRepository ,
    @InjectRepository(Plat)
    private platRepo: Repository<Plat>,
  ) {}

  async getPlatsFor(slotId: string) {
    const slot = await this.slotRepo.findOne({
      where: { id: slotId },
    });

    if (!slot) throw new NotFoundException('Slot not found');

    const mealTime = getMealTime(`2000-01-01T${slot.startTime}`);

    return this.platRepo.find({
        where: { mealTime },
        relations: ['menu'], 
        select: {
          id: true,
          name: true,
          type: true,
          mealTime: true,
          image: true,      
          menu: {
            id: true,
            name: true,
            datecreation: true,
          },
        },
      });
    }


  async create(createReservationTimeDto: CreateReservationTimeDto) {
    const restaurant = await this.restaurantRepo.findOneBy({ id: createReservationTimeDto.restaurantId });
    if (!restaurant) throw new NotFoundException('Restaurant not found');

    const slot = this.slotRepo.create({
      ...createReservationTimeDto,
      restaurant,
    });

    return this.slotRepo.save(slot);
  }

  async findAll() {
    return this.slotRepo.find();
  }

  async findByRestaurant(restaurantId: string) {
    return this.slotRepo.find({
      where: {
        restaurant: { id: restaurantId },
        isActive: true,
      },
    });
  }
  async findByRestaurantAndDate(restaurantId: string, date: string) {
    const specificSlots = await this.slotRepo.find({
      where: {
        restaurant: { id: restaurantId },
        date2: Equal(date), 
        isActive: true,
      },
    });
  
    if (specificSlots.length > 0) {
      return specificSlots;
    }
  
    return this.slotRepo.find({
      where: {
        restaurant: { id: restaurantId },
        date2: IsNull(), 
        isActive: true,
      },
    });
  }
  async update(id: string, updateReservationTime: UpdateReservationTimeDto) {
    const slot = await this.slotRepo.findOneBy({ id });
    if (!slot) throw new NotFoundException('Slot not found');
  
    Object.assign(slot, updateReservationTime);
    return this.slotRepo.save(slot);
  }
  async delete(id: string): Promise<void> {
    const result = await this.slotRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Slot not found');
    }
  }
  
  
}