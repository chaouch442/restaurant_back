// import { Injectable, NotFoundException } from '@nestjs/common';

// import { BlocStatus } from 'src/bloc/enums/status.enum';
// import { ReservationRepository } from 'src/reservations/repositories/reservation.repository';
// import { RestaurantRepository } from 'src/restaurants/repositories/restaurant.repository';
// import { TableRestaurant } from 'src/tables/entities/table.entity';

// @Injectable()
// export class CustomerService {
//   constructor(private readonly reservationRepository: ReservationRepository,
//     private readonly restaurantRepository: RestaurantRepository

//   ) { }


//   async getDisponibiliteParBloc(restaurantId: string, datetime: string) {
//     const date = new Date(datetime);

//     const restaurant = await this.restaurantRepository.findOne({
//       where: { id: restaurantId },
//       relations: ['restaurantBlocs', 'restaurantBlocs.bloc', 'restaurantBlocs.tables'],
//     });

//     if (!restaurant) {
//       throw new NotFoundException('Restaurant not found');
//     }

//     const result: {
//       blocId: string;
//       blocName: string;
//       status: BlocStatus;
//       tablesDisponibles: TableRestaurant[];
//     }[] = [];

//     for (const rb of restaurant.restaurantBlocs) {
//       const tablesDisponibles: TableRestaurant[] = [];

//       for (const table of rb.tables) {
//         const reserved = await this.reservationRepository.findOne({
//           where: {
//             table: { id: table.id },
//             date: date,
//           },
//           relations: ['time'],
//         });

//         if (!reserved) {
//           tablesDisponibles.push(table);
//         }
//       }

//       result.push({
//         blocId: rb.bloc.id,
//         blocName: rb.bloc.name,
//         status: tablesDisponibles.length > 0 ? BlocStatus.Active : BlocStatus.INACTIVE,
//         tablesDisponibles,
//       });
//     }
//   }

//   // findOne(id: number) {
//   //   return `This action returns a #${id} customer`;
//   // }

//   // update(id: number, updateCustomerDto: UpdateCustomerDto) {
//   //   return `This action updates a #${id} customer`;
//   // }

//   // remove(id: number) {
//   //   return `This action removes a #${id} customer`;
//   // }
// }
