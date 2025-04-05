import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { RoleEntity } from './auth/entities/role.entity';
import { RestaurantEntity } from './restaurants/entities/restaurant.entity';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from './restaurants/restaurant.module';
import { UserModule } from './user/user.module';

import { ModuleController } from './module/module.controller';
import { TablesModule } from './tables/tables.module';
import { TableEntity } from './tables/entities/table.entity';
import { MenuModule } from './menu/menu.module';
import { PlatsService } from './plats/plats.service';
import { PlatsModule } from './plats/plats.module';
import { MenuEntity } from './menu/entities/menu.entity';
import { PlatEntity } from './plats/entities/plat.entity';
import { ReservationsModule } from './reservations/reservations.module';
import { ReservationEntity } from './reservations/entities/reservation.entity';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '0000',
        database: 'restaurants',
        entities: [RestaurantEntity, UserEntity, RoleEntity, TableEntity,MenuEntity,PlatEntity,ReservationEntity],
        synchronize: true,
        logging: true,
      }),
    }),
 
    TypeOrmModule.forFeature([UserEntity, RoleEntity, RestaurantEntity,TableEntity,MenuEntity,PlatEntity,ReservationEntity]),
    RestaurantModule,
    AuthModule,
    UserModule,
    TablesModule,
    MenuModule,
    PlatsModule,
    ReservationsModule,
   
  ],
  controllers: [AppController, ModuleController],
  providers: [AppService, PlatsService],
})
export class AppModule {}
