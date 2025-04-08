import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports:[TypeOrmModule.forFeature([Restaurant]) , AuthModule,],
  controllers: [RestaurantController],
  providers: [RestaurantService,RestaurantRepository],
  exports: [RestaurantService,RestaurantRepository], 
})
export class RestaurantModule {}