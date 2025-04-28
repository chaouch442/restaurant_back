import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';

import { CreateMenuDto } from './types/dtos/create-menu.dto';
import { UpdateMenuDto } from './types/dtos/update-menu.dto';
import { MealTime } from 'src/plats/enums/meal-time.enum';
import { MenuRestaurant } from './entities/menu.entity';
import { Plat } from 'src/plats/entities/plat.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { MealTimeEntity } from 'src/plats/entities/meal-time.entity';

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


    @InjectRepository(MealTimeEntity)
    private mealTimeRepository: Repository<MealTimeEntity>,
    private dataSource: DataSource,
  ) { }


  // async createMenu(createMenuDto: CreateMenuDto) {
  //   const { plats, restaurantId, ...menuData } = createMenuDto;

  //   const newMenu = this.menuRepository.create({
  //     ...menuData,
  //     restaurant: { id: restaurantId },
  //   });
  //   const savedMenu = await this.menuRepository.save(newMenu);

  //   const platsReloaded: Plat[] = [];

  //   for (const platDto of plats) {
  //     // 1. Trouver les mealTimes correspondants
  //     const mealTimes = await this.mealTimeRepository.findBy({
  //       id: In(platDto.mealTimeIds),
  //     });

  //     const { mealTimeIds, ...rest } = platDto;

  //     // 2. Créer et sauvegarder le plat avec ses MealTimes
  //     const plat = this.platRepository.create({
  //       ...rest,
  //       menu: savedMenu,
  //       mealTimes: mealTimes, // <=== Ici c'est bon !
  //     });
  //     const savedPlat = await this.platRepository.save(plat);

  //     platsReloaded.push(savedPlat);
  //   }

  //   // 3. Retourner le menu avec plats + leurs mealtimes
  //   return this.menuRepository.findOne({
  //     where: { id: savedMenu.id },
  //     relations: ['plats', 'plats.mealTimes', 'restaurant'],
  //   });
  // }

  async createMenu(createMenuDto: CreateMenuDto) {
    const { plats, restaurantId, ...menuData } = createMenuDto;

    const menu = this.menuRepository.create({
      ...menuData,
      restaurant: { id: restaurantId },
    });
    const savedMenu = await this.menuRepository.save(menu);

    for (const platDto of plats) {
      const { mealTimeIds, ...platData } = platDto;

      const mealTimes = await this.mealTimeRepository.find({
        where: { id: In(mealTimeIds) },
      });

      if (mealTimes.length !== mealTimeIds.length) {
        throw new Error(`Certains MealTimes sont introuvables.`);
      }

      const plat = this.platRepository.create({
        ...platData,
        menu: savedMenu,
        mealTimes,
      });

      await this.platRepository.save(plat);
    }

    return await this.menuRepository.findOne({
      where: { id: savedMenu.id },
      relations: ['plats', 'plats.mealTimes', 'restaurant'],
    });
  }







  async getMenu() {
    return this.menuRepository.find({ relations: ['plats'] });
  }

  async getMenuById(id: string) {
    return this.menuRepository.findOne({ where: { id }, relations: ['plats', 'plats.mealTimes'] });
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


  // async getMenuByMealTime(mealTime: MealTime) {
  //   return this.menuRepository.find({
  //     relations: ['plats'],
  //     where: { plats: { mealTime: mealTime } }
  //   });
  // }



  async getMenuByMealTime(mealTimeId: string) {
    return this.menuRepository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.plats', 'plat')
      .leftJoinAndSelect('plat.mealTimes', 'mealTime')
      .where('mealTime.id = :mealTimeId', { mealTimeId })
      .getMany();
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
