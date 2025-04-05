import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './entities/restaurant.entity';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { AuthModule } from 'src/auth/auth.module';
import { ReservationEntity } from 'src/reservations/entities/reservation.entity';
import { ReservationRepository } from 'src/reservations/repositories/reservation.repository';

@Module({
  imports:[TypeOrmModule.forFeature([RestaurantEntity]) , AuthModule,],
  controllers: [RestaurantController],
  providers: [RestaurantService,RestaurantRepository],
  exports: [RestaurantService,RestaurantRepository], 
})
export class RestaurantModule {}