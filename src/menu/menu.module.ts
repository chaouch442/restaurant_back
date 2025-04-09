import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuRestaurant } from './entities/menu.entity';
import { Plat } from 'src/plats/entities/plat.entity';


@Module({
  imports: [TypeOrmModule.forFeature([MenuRestaurant,Plat])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
