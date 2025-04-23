import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateMenuDto } from './types/dtos/create-menu.dto';
import { UpdateMenuDto } from './types/dtos/update-menu.dto';
import { MealTime } from 'src/plats/enums/meal-time.enum';
import { MenuRestaurant } from './entities/menu.entity';
import { Plat } from 'src/plats/entities/plat.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

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
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    private dataSource: DataSource,
  ) { }


  async createMenu(createMenuDto: CreateMenuDto) {
    const { plats, restaurantId, ...menuData } = createMenuDto;

    const newMenu = this.menuRepository.create({
      ...menuData,
      restaurant: { id: restaurantId },
    });

    const savedMenu = await this.menuRepository.save(newMenu);

    const platsWithMenu = plats.map((plat) => ({
      ...plat,
      menu: savedMenu,

    }));

    await this.platRepository.save(platsWithMenu);

    return this.menuRepository.findOne({
      where: { id: savedMenu.id },
      relations: ['plats', 'restaurant'],
    });
  }


  async getMenu() {
    return this.menuRepository.find({ relations: ['plats'] });
  }

  async getMenuById(id: string) {
    return this.menuRepository.findOne({ where: { id }, relations: ['plats'] });
  }

  async updateMenu(id: string, updateMenuDto: UpdateMenuDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const menuRepository = queryRunner.manager.getRepository(MenuRestaurant);
      const platRepository = queryRunner.manager.getRepository(Plat);

      const existingMenu = await menuRepository.findOne({
        where: { id },
        relations: ['plats', 'restaurant'],
      });

      if (!existingMenu) {
        throw new Error('Menu not found');
      }

      // Mise à jour des champs du menu
      if (updateMenuDto.name !== undefined) {
        existingMenu.name = updateMenuDto.name;
      }

      if (updateMenuDto.datecreation !== undefined) {
        existingMenu.datecreation = updateMenuDto.datecreation;
      }

      // Supprimer les anciens plats
      await platRepository.delete({ menu: { id } });

      // Créer les nouveaux plats
      if (updateMenuDto.plats && updateMenuDto.plats.length > 0) {
        const newPlats = updateMenuDto.plats.map(platData =>
          platRepository.create({
            ...platData,
            menu: existingMenu, // Lien établi ici
          }),
        );

        await platRepository.save(newPlats);
      }

      // Sauvegarde finale du menu
      await menuRepository.save(existingMenu);

      await queryRunner.commitTransaction();

      // Retourne le menu à jour avec les relations
      return await this.menuRepository.findOne({
        where: { id },
        relations: ['plats'],
      });

    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Erreur dans updateMenu:', error);
      throw error;

    } finally {
      await queryRunner.release();
    }
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





  async findMenusByRestaurantId(restaurantId: string): Promise<MenuRestaurant[]> {
    return this.menuRepository.find({
      where: {
        restaurant: {
          id: restaurantId,
        },
      },
      relations: ['restaurant', 'plats'],
    });
  }
}
