import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMenuDto } from './types/dtos/create-menu.dto';
import { UpdateMenuDto } from './types/dtos/update-menu.dto';
import { MealTime } from 'src/plats/enums/meal-time.enum';
import { MenuRestaurant } from './entities/menu.entity';
import { Plat } from 'src/plats/entities/plat.entity';

@Injectable()
export class MenuService {
  create(createMenuDto: CreateMenuDto) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(MenuRestaurant)
    private menuRepository: Repository<MenuRestaurant>,
    @InjectRepository(Plat)
    private platRepository: Repository<Plat>,
  ) { }


  async createMenu(createMenuDto: CreateMenuDto) {
    const { plats, ...menuData } = createMenuDto;

    const newMenu = this.menuRepository.create(menuData);
    const savedMenu = await this.menuRepository.save(newMenu);

    const platsWithMenu = plats.map((plat) => ({
      ...plat,
      menu: savedMenu,
    }));

    await this.platRepository.save(platsWithMenu);

    return this.menuRepository.findOne({
      where: { id: savedMenu.id },
      relations: ['plats'],
    });
  }


  async getMenu() {
    return this.menuRepository.find({ relations: ['plats'] });
  }

  async getMenuById(id: string) {
    return this.menuRepository.findOne({ where: { id }, relations: ['plats'] });
  }

  async updateMenu(id: string, updateMenuDto: UpdateMenuDto) {
    const existingMenu = await this.menuRepository.findOne({
      where: { id },
      relations: ['plats'],
    });

    if (!existingMenu) {
      throw new NotFoundException('Menu not found');
    }

    if (updateMenuDto.name !== undefined) {
      existingMenu.name = updateMenuDto.name;
    }

    if (updateMenuDto.datecreation !== undefined) {
      existingMenu.datecreation = updateMenuDto.datecreation;
    }

    await this.platRepository.delete({ menu: { id } });

    if (updateMenuDto.plats && updateMenuDto.plats.length > 0) {
      const newPlats = updateMenuDto.plats.map((platData) => {
        const plat = this.platRepository.create(platData);
        plat.menu = existingMenu;
        return plat;
      });

      await this.platRepository.save(newPlats);
    }

    return await this.menuRepository.save(existingMenu);
  }



  async deleteMenu(id: string) {
    const menu = await this.menuRepository.findOne({ where: { id } });
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    await this.platRepository.delete({ menu: { id } });
    await this.menuRepository.delete(id);

    return { message: `Menu with ID ${id} successfully deleted` };
  }


  async getMenuByMealTime(mealTime: MealTime) {
    return this.menuRepository.find({
      relations: ['plats'],
      where: { plats: { mealTime: mealTime } }
    });
  }
}
