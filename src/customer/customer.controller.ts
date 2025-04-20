// import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
// import { RestaurantService } from 'src/restaurants/restaurant.service';


// @Controller('customer')
// export class CustomerController {
//   constructor(private readonly restaurantService: RestaurantService) { }



//   @Get(':id/tables-disponibles')
//   getDisponibiliteParBloc(
//     @Param('id') restaurantId: string,
//     @Query('datetime') datetime: string
//   ) {
//     return this.restaurantService.getDisponibiliteParBloc(restaurantId, datetime);
//   }


//   // @Get(':id')
//   // findOne(@Param('id') id: string) {
//   //   return this.customerService.findOne(+id);
//   // }

//   // @Patch(':id')
//   // update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
//   //   return this.customerService.update(+id, updateCustomerDto);
//   // }

//   // @Delete(':id')
//   // remove(@Param('id') id: string) {
//   //   return this.customerService.remove(+id);
//   // }
// }
