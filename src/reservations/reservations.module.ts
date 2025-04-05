import { Module } from '@nestjs/common';
import { ReservationController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { ReservationEntity } from './entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from 'src/restaurants/entities/restaurant.entity';
import { TableEntity } from 'src/tables/entities/table.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ReservationRepository } from './repositories/reservation.repository';
import { UserModule } from 'src/user/user.module';
import { PlatEntity } from 'src/plats/entities/plat.entity';
import { MenuEntity } from 'src/menu/entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity, RestaurantEntity, TableEntity,UserEntity,MenuEntity,PlatEntity])],
  controllers: [ReservationController],
  providers: [ReservationsService,ReservationRepository],
  exports: [ReservationsService,ReservationRepository],
})
export class ReservationsModule {}
