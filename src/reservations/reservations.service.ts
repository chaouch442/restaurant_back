import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ReservationRepository } from './repositories/reservation.repository';
import { CreateReservationDto } from './types/dtos/create-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantRepository } from 'src/restaurants/repositories/restaurant.repository';
import { TableRepository } from 'src/tables/repositories/table.repository';
import { Plat } from 'src/plats/entities/plat.entity';
import { platRepository } from 'src/plats/repositories/plat.repository';
import { getMealTime } from 'src/plats/utils/getMealTime';
import { UserRepository } from 'src/user/repositories/user.repository';
import { In, LessThanOrEqual } from 'typeorm';
import { UpdateReservationDto } from './types/dtos/update-reservation.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TableStatus } from 'src/tables/enums/status.enums';
import { ReservationStatus } from './enums/reservatin.enums';
import { TableRestaurant } from 'src/tables/entities/table.entity';
import { User } from 'src/user/entities/user.entity';
import { ReservationTable } from './entities/reservation.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { SystemConfig } from 'src/config/entities/config.entity';
import { SystemConfigRepository } from 'src/config/repositories/system-config.repository';
import { ReservationTime } from './entities/reservation-time.entity';
import { ReservationTimeRepository } from './repositories/reservation-time.repository';

@Injectable()
export class ReservationsService {

  
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: RestaurantRepository,

    @InjectRepository(TableRestaurant)
    private readonly tableRepository: TableRepository,

    @InjectRepository(User)
    private readonly userRepository: UserRepository,

    @InjectRepository(ReservationTable)
    private readonly reservationRepository: ReservationRepository,

    @InjectRepository(Plat)
    private readonly   platrepository : platRepository,
    @InjectRepository(SystemConfig)
    private readonly   systemConfigRepository : SystemConfigRepository,

    @InjectRepository(ReservationTime)
    private readonly reservationTimeRepository: ReservationTimeRepository,

  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async updateReservationStatus() {
    const now = new Date();

    const finishedReservations = await this.reservationRepository.find({
      where: {
        reservationDateTime: LessThanOrEqual(now),
        status: ReservationStatus.ACTIVE,
      },
      relations: ['table'],
    });

    for (const reservation of finishedReservations) {
      if (reservation.table) {
        reservation.table.status = TableStatus.AVAILABLE;
        await this.tableRepository.save(reservation.table);
      }

      reservation.status = ReservationStatus.FINISHED;
      await this.reservationRepository.save(reservation);
    }
  }
  



   async createReservation(createReservationDto: CreateReservationDto, user) {
   
    const { restaurantId, tableId, reservationDateTime,  customerName, platIds } = createReservationDto;

    const restaurant = await this.restaurantRepository.findOneBy({ id: restaurantId });
    if (!restaurant) throw new NotFoundException('Restaurant not found');
    
     const table = await this.tableRepository.findOneBy({ id: tableId });
    if (!table) throw new NotFoundException('Table not found');

     const connectedUser = await this.userRepository.findOneBy({ id:user.userId });
    if (!connectedUser) throw new NotFoundException('user not found');
 
  
    const config = await this.systemConfigRepository.findOneBy({});
    if (!config) throw new NotFoundException('System config not found');
    
    const timeSlot = await this. reservationTimeRepository .findOne({
      where: { id: createReservationDto.timeSlotId },
    });
    if (!timeSlot) throw new NotFoundException('Time slot not found');
    
  
    
//bech ye7seb 9adeh min mara bech ya3mel reo 
    const pastReservationsCount = await this.reservationRepository.countBy({
      restaurant: { id: restaurantId },
      user: { id: user.userId }
    });
    
    //fet nombre eno mayjech lil reservation
    if (pastReservationsCount >= config.maxNoShowAllowed) {
      throw new UnauthorizedException(
        `لقد تجاوزت الحد الأقصى لعدد الغيابات، الرجاء الاتصال بصاحب المطعم لإعادة التفعيل.`
      );
    }
    //3ando wa9et m7aded mta3 cancel
    
    const now = new Date();
    const diffInMinutes = (new Date(reservationDateTime).getTime() - now.getTime()) / (1000 * 60);
    if (diffInMinutes < config.maxCancelTimeBeforeReservation) {
      throw new UnauthorizedException(` Impossible d’annuler la réservation dans les ${config.maxCancelTimeBeforeReservation} minutes`);
    }
    
  const mealTime = getMealTime(reservationDateTime);
  if (!mealTime) {
    throw new BadRequestException('Invalid meal time');
  }

let plats: Plat[] = [];

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
      reservationDateTime:timeSlot.startTime,
      restaurant,
       table,
      user:connectedUser,
       plats,
       timeSlot
    });
   


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




async updateReservation(id: string, updateReservationDto: UpdateReservationDto,user: User) {
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

async deleteReservation(id: string,user: User) {
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




