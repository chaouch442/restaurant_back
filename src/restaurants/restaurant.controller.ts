import { Controller, Get, Post, Delete, Patch, Body, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './types/dto/create-restaurant.dto'; 
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateRestaurantDto } from './types/dto/update-restaurant.dto';




@ApiTags('restaurants')
@Controller('restaurant')
@UseGuards(RolesGuard)
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get(':id')
  async getRestaurantById(@Param('id', ParseUUIDPipe) id: string) {
      console.log("ID reçu :", id); 
      return this.restaurantService.getRestaurantById(id);
  }
  
  @Get()
  async getRestaurant() {
      return this.restaurantService.getRestaurant();
  }
  
  @Post()
  @Roles('admin')
  async createRestaurant(@Body()createRestaurantDto:  CreateRestaurantDto){
    return this.restaurantService.createRestaurant(createRestaurantDto);
  }
  @Delete(':id')
  @Roles('admin')
  async deleteRestaurant(@Param('id') id: string) {
      return this.restaurantService.deleteRestaurant(id);
  }
  @Patch(':id')
  @Roles('admin')
   async updateRestaurant(@Param('id', ParseUUIDPipe) id: string, @Body() updaterestaurantDto : UpdateRestaurantDto) {
  console.log('updateRestaurantDto:', updaterestaurantDto);
  return this.restaurantService.updateRestaurant(id, updaterestaurantDto);
      }
  @Patch('deactivate/:id')
@Roles('admin') 
async deactivateRestaurant(@Param('id', ParseUUIDPipe) id: string) {
  return this.restaurantService.deactivateRestaurant(id);
}
@Patch(':id/toggle-active')
@Roles('admin')
async toggleRestaurantActive(@Param('id', ParseUUIDPipe) id: string) {
  return this.restaurantService.toggleActive(id);
}


  }
  
  

  

