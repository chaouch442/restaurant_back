import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { CreateRestaurantDto } from './types/dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './types/dto/update-restaurant.dto';
import { ReservationRepository } from 'src/reservations/repositories/reservation.repository';

@Injectable()
export class RestaurantService {
  
  constructor
  (private readonly RestaurantRepository:RestaurantRepository,

  ){}

  async getRestaurantById(id: string) {
    const fetchedRestaurant = await this.RestaurantRepository.findOneBy( { id: id } );

    if (!fetchedRestaurant) {
        throw new BadRequestException(`Restaurant with ID ${id} not found`);
    }

    return fetchedRestaurant;
}



  async getRestaurant() {
    return this.RestaurantRepository.find();
}



  async createRestaurant( createAuthorDto: CreateRestaurantDto) {

    return this.RestaurantRepository.save(
this.RestaurantRepository.create(createAuthorDto))
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




}