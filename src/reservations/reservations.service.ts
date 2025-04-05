import { BadRequestException, Body, ForbiddenException, Injectable, NotFoundException, Param, Patch, Post, UnauthorizedException } from '@nestjs/common';
import { ReservationRepository } from './repositories/reservation.repository';
import { CreateReservationDto } from './types/dtos/create-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from './entities/reservation.entity';
import { RestaurantEntity } from 'src/restaurants/entities/restaurant.entity';
import { RestaurantRepository } from 'src/restaurants/repositories/restaurant.repository';
import { TableEntity } from 'src/tables/entities/table.entity';
import { TableRepository } from 'src/tables/repositories/table.repository';
import { MenuEntity } from 'src/menu/entities/menu.entity';
import { MenuRepository } from 'src/menu/repositories/menu.repository';
import { PlatEntity } from 'src/plats/entities/plat.entity';
import * as QRCode from 'qrcode';
import { platRepository } from 'src/plats/repositories/plat.repository';
import { getMealTime } from 'src/plats/utils/getMealTime';
import { UserRepository } from 'src/user/repositories/user.repository';
import { UserEntity } from 'src/user/entities/user.entity';
import { In } from 'typeorm';
import { UpdateReservationDto } from './types/dtos/update-reservation.dto';

@Injectable()
export class ReservationsService {

  
  constructor(
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepository: RestaurantRepository,

    @InjectRepository(TableEntity)
    private readonly tableRepository: TableRepository,

    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,

    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: ReservationRepository,

    @InjectRepository(MenuEntity)
    private readonly   menuRepository : MenuRepository,

    @InjectRepository(PlatEntity)
    private readonly   platrepository : platRepository,

  ) {}

   async createReservation(createReservationDto: CreateReservationDto, user) {
   
    const { restaurantId, tableId, reservationDateTime,  customerName, platIds } = createReservationDto;

    const restaurant = await this.restaurantRepository.findOneBy({ id: restaurantId });
    if (!restaurant) throw new NotFoundException('Restaurant not found');
    
     const table = await this.tableRepository.findOneBy({ id: tableId });
    if (!table) throw new NotFoundException('Table not found');

     const connectedUser = await this.userRepository.findOneBy({ id:user.userId });
    if (!connectedUser) throw new NotFoundException('user not found');
    
  //    const mealTime = getMealTime(reservationDateTime); 

    
  //   const plats = await this.platrepository.findBy({
  //    id: In(platIds),
  //    mealTime,
  //  });
    
  //  const invalidPlats = plats.filter((plat) => plat.mealTime !== mealTime);
  //  if (invalidPlats.length > 0) {
  //    throw new BadRequestException(`Certains plats ne correspondent pas au type de repas: ${mealTime}`);
  //  }
  const mealTime = getMealTime(reservationDateTime);

let plats: PlatEntity[] = [];

if (platIds && platIds.length > 0) {
  plats = await this.platrepository.findBy({
    id: In(platIds),
    mealTime,
  });
}

const invalidPlats = plats.filter((plat) => plat.mealTime !== mealTime);

if (invalidPlats.length > 0) {
  throw new BadRequestException(`certains plats ne correspondent pas au type de repas: ${mealTime}`);
}

     console.log(user.userId)
     const reservation = this.reservationRepository.create({
      customerName,
      reservationDateTime,
      restaurant,
       table,
      user:connectedUser,
       plats,
    });
    const qrContent = `reservation:${reservation.id}`; // ou un lien vers un endpoint /validate

// ⬇ Générer le QR code en base64
     reservation.qrCode = await QRCode.toDataURL(qrContent);
    return this.reservationRepository.save(reservation);
  
  
}




async getReservationById(id: string) {
  const fetchedReservation = await this.reservationRepository.findOneBy( { id: id } );

  if (!fetchedReservation) {
      throw new BadRequestException(`Reservation with ID ${id} not found`);
  }

  return fetchedReservation;
}


async getReservation() {
  return this.reservationRepository.find();
}




async updateReservation(id: string, updateReservationDto: UpdateReservationDto,user: UserEntity) {
  const reservation = await this.reservationRepository.findOneBy({ id });

  if (!reservation){
    throw new NotFoundException(`Restaurant with ID ${id} not found`);
  }
  if (reservation.user.id !== user.id) {
    throw new UnauthorizedException('Vous ne pouvez modifier que vos propres réservations');
  }

  Object.assign(reservation, updateReservationDto);
  return await this.reservationRepository.save(reservation);
}

async deleteReservation(id: string,user: UserEntity) {
  const reservation = await this.reservationRepository.findOneBy({ id });
  
  if (!reservation) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
  }
  if (reservation.user.id !== user.id) {
    throw new UnauthorizedException("Vous ne pouvez supprimer que vos propres réservations");
  }
  await this.reservationRepository.delete(id);
  return { message: `Restaurant with ID ${id} deleted successfully` };
}




}




