import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from './restaurants/restaurant.module';
import { UserModule } from './user/user.module';
import { ModuleController } from './module/module.controller';
import { TablesModule } from './tables/tables.module';
import { MenuModule } from './menu/menu.module';
import { PlatsService } from './plats/plats.service';
import { PlatsModule } from './plats/plats.module';
import { ReservationsModule } from './reservations/reservations.module';
import {  ReservationTable } from './reservations/entities/reservation.entity';
import { ReservationTime } from './reservations/entities/reservation-time.entity';
import { SystemConfig } from './config/entities/config.entity';
import { CustomConfigModule } from './config/config.module';
import { TableRestaurant } from './tables/entities/table.entity';
import { MenuRestaurant } from './menu/entities/menu.entity';
import { RoleUser } from './auth/entities/role.entity';
import { User } from './user/entities/user.entity';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { Plat } from './plats/entities/plat.entity';
import { BlocService } from './bloc/bloc.service';
import { BlocController } from './bloc/bloc.controller';
import { BlocModule } from './bloc/bloc.module';
import { Bloc } from './bloc/entities/bloc.entity';




@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '0000',
        database: 'restaurants',
        entities: [Restaurant, User, RoleUser, TableRestaurant,MenuRestaurant,Plat, ReservationTable,ReservationTime,SystemConfig,Bloc],
        synchronize: true,
        logging: true,
      }),
    }),
 
    TypeOrmModule.forFeature([User, RoleUser, Restaurant,TableRestaurant,MenuRestaurant,Plat, ReservationTable,ReservationTime,SystemConfig,Bloc]),
    RestaurantModule,
    AuthModule,
    UserModule,
    TablesModule,
    MenuModule,
    PlatsModule,
    ReservationsModule,
    CustomConfigModule,
    BlocModule
  
   
  ],
  controllers: [AppController, ModuleController, BlocController],
  providers: [AppService, PlatsService, BlocService],
})
export class AppModule {}
