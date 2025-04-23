import { Controller, Get, Post, Body, Param, Delete, Put, Patch, ParseUUIDPipe } from '@nestjs/common';

import { CreateMenuDto } from './types/dtos/create-menu.dto';
import { UpdateMenuDto } from './types/dtos/update-menu.dto';
import { MenuService } from './menu.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { MealTime } from 'src/plats/enums/meal-time.enum';
@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }
  @Roles('manager')
  @Post()
  async createMenu(@Body() createMenuDto: CreateMenuDto) {
    if (!createMenuDto.datecreation) {
      throw new Error("La date de création est obligatoire !");
    }
    return this.menuService.createMenu(createMenuDto);
  }

  @Get()
  async getMenu() {
    return this.menuService.getMenu();
  }

  @Get(':id')
  async getMenuById(@Param('id', ParseUUIDPipe) id: string) {
    return this.menuService.getMenuById(id);
  }
  @Roles('manager')
  @Patch(':id')
  async updateMenu(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.updateMenu(id, updateMenuDto);
  }
  @Roles('manager')
  @Delete(':id')
  async deleteMenu(@Param('id', ParseUUIDPipe) id: string) {
    return this.menuService.deleteMenu(id);
  }

  @Get('/mealTime/:mealTime')
  async getMenuByMealTime(@Param('mealTime') mealTime: MealTime) {
    return this.menuService.getMenuByMealTime(mealTime);
  }
  @Get('by-restaurant/:id')
  getMenusByRestaurant(@Param('id') restaurantId: string) {
    return this.menuService.findMenusByRestaurantId(restaurantId);
  }
}
