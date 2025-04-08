import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMenuDto } from './types/dtos/create-menu.dto';
import { UpdateMenuDto } from './types/dtos/update-menu.dto';
import { MealTime } from 'src/plats/enums/meal-time.enum';
import { MenuRestaurant } from './entities/menu.entity';

@Injectable()
export class MenuService {
  create(createMenuDto: CreateMenuDto) {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(MenuRestaurant)
    private menuRepository: Repository<MenuRestaurant>,
  ) {}

  async createMenu(createMenuDto: CreateMenuDto){
    const newMenu = this.menuRepository.create(createMenuDto);
    return this.menuRepository.save(newMenu);
  }

  async getMenu() {
    return this.menuRepository.find({ relations: ['plats'] });
  }

  async getMenuById(id: string) {
    return this.menuRepository.findOne({ where: { id }, relations: ['plats'] });
  }

  async updateMenu(id: string, updateMenuDto: UpdateMenuDto) {
    await this.menuRepository.update(id, updateMenuDto);
    return this.menuRepository.findOne({ where: { id }, relations: ['plats'] });
  }
  

  async deleteMenu(id: string){
    await this.menuRepository.delete(id);
    return { message: `menu with ID ${id} successfully deleted` };
  }
  async getMenuByMealTime(mealTime: MealTime) {
    return this.menuRepository.find({
      relations: ['plats'],
      where: { plats: { mealTime: mealTime } }
    });
}}
