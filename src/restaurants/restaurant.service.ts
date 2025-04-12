import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { CreateRestaurantDto } from './types/dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './types/dto/update-restaurant.dto';
import { RestaurantStatus } from './enums/status.enum';

@Injectable()
export class RestaurantService {
  
  constructor
  (private readonly RestaurantRepository:RestaurantRepository,

  ){}

  async getRestaurantById(id: string) {
    const fetchedRestaurant = await this.RestaurantRepository.findOneBy({ id });
  
    if (!fetchedRestaurant) {
      throw new BadRequestException(`Restaurant with ID ${id} not found`);
    }
  
    if (fetchedRestaurant.hourly) {
      const [start, end] = fetchedRestaurant.hourly.split('-');
      const nowHour = new Date().getHours();
  
      const startHour = parseInt(start);
      const endHour = parseInt(end);
  
      const isOpen = nowHour >= startHour && nowHour < endHour;
      fetchedRestaurant.status = isOpen ? RestaurantStatus.OUVERT : RestaurantStatus.FERME;
    }
  
    return fetchedRestaurant;
  }
  



async getRestaurant() {
  const restaurants = await this.RestaurantRepository.find({
    where: { isActive: true },
  });


  const nowHour = new Date().getHours();
  for (const r of restaurants) {
    if (r.hourly) {
      const [start, end] = r.hourly.split('-');
      const startHour = parseInt(start);
      const endHour = parseInt(end);
      const isOpen = nowHour >= startHour && nowHour < endHour;
      r.status = isOpen ? RestaurantStatus.OUVERT : RestaurantStatus.FERME;
    }
  }

  return restaurants;
}




async createRestaurant(dto: CreateRestaurantDto) {
  const [start, end] = dto.hourly.split('-');
  const nowHour = new Date().getHours();
  const startHour = parseInt(start);
  const endHour = parseInt(end);
  const isOpen = nowHour >= startHour && nowHour < endHour;

  const restaurant = this.RestaurantRepository.create({
    ...dto,
    status: isOpen ? RestaurantStatus.OUVERT : RestaurantStatus.FERME
  });

  return this.RestaurantRepository.save(restaurant);
}



async deleteRestaurant(id: string) {
  const restaurant = await this.RestaurantRepository.findOneBy({ id });
  
  if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
  }
  
  await this.RestaurantRepository.delete(id);
  return { message: `Restaurant with ID ${id} deleted successfully` };
}


async updateRestaurant(id: string, updateRestaurantDto: UpdateRestaurantDto) {
  const restaurant = await this.RestaurantRepository.findOneBy({ id });

  if (!restaurant) {
    throw new NotFoundException(`Restaurant with ID ${id} not found`);
  }

  Object.assign(restaurant, updateRestaurantDto);
  return await this.RestaurantRepository.save(restaurant);
}

async deactivateRestaurant(id: string) {
  const restaurant = await this.RestaurantRepository.findOneBy({ id });

  if (!restaurant) {
    throw new NotFoundException(`Restaurant with ID ${id} not found`);
  }

  restaurant.isActive = false;
  return await this.RestaurantRepository.save(restaurant);
}
async toggleActive(id: string) {
  const restaurant = await this.RestaurantRepository.findOneBy({ id });

  if (!restaurant) {
    throw new NotFoundException(`Restaurant with ID ${id} not found`);
  }

  restaurant.isActive = !restaurant.isActive;

  return this.RestaurantRepository.save(restaurant);
}

 


}