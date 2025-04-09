import {Controller,Get,Post,Patch,Delete,Param,Body,Query, UseGuards,} from '@nestjs/common';
import { ReservationTimeService } from './reservation-time.service';
import { CreateReservationTimeDto } from '../types/dtos/create-reservation-time.dto';
import { UpdateReservationTimeDto } from '../types/dtos/update-reservation-time.dtos';
import { RolesGuard } from 'src/auth/guards/roles.guard';
  
  @UseGuards(RolesGuard)
  @Controller('reservation-time')
  export class ReservationTimeController {
    constructor(
      private readonly reservationService: ReservationTimeService ,
    ) {}
  
 
    @Post()
    create(@Body() createDto: CreateReservationTimeDto) {
      return this.reservationService.create(createDto);
    }
  
    @Get()
    findAll() {
      return this.reservationService.findAll();
    }
  
    
    @Get('restaurant/:restaurantId')
    findByRestaurant(@Param('restaurantId') restaurantId: string) {
      return this.reservationService.findByRestaurant(restaurantId);
    }
  
    
    @Get('restaurant/:restaurantId/date')
    findByRestaurantAndDate(
      @Param('restaurantId') restaurantId: string,
      @Query('date') date: string,
    ) {
      return this.reservationService.findByRestaurantAndDate(restaurantId, date);
    }
  
    
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateDto: UpdateReservationTimeDto,
    ) {
      return this.reservationService.update(id, updateDto);
    }
  
    
    @Delete(':id')
async delete(@Param('id') id: string) {
  return  this.reservationService.delete(id);
}

@Get(':id/plats')
getPlatsForSlot(@Param('id') slotId: string) {
  return this.reservationService.getPlatsFor(slotId);
}


  }
  