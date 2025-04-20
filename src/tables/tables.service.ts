import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TableRepository } from './repositories/table.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTableDto } from './types/dtos/create-table.dto';
import { UpdateTableDto } from './types/update-table.dto';
import { TableRestaurant } from './entities/table.entity';
import { RestaurantBlocRepository } from 'src/restaurants/repositories/restaurant-bloc.repository';
import { RestaurantBloc } from 'src/restaurants/entities/Restaurant-Bloc.entity';
import { TableStatus } from './enums/status.enums';


@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(TableRestaurant)
    private readonly TableRepository: TableRepository,
    @InjectRepository(RestaurantBloc)
    private readonly restaurantBlocRepository: RestaurantBlocRepository) { }


  async createTable(dto: CreateTableDto): Promise<TableRestaurant> {
    const bloc = await this.restaurantBlocRepository.findOne({
      where: { id: dto.restaurantBlocId },
      relations: ['tables'],
    });

    if (!bloc) {
      throw new NotFoundException('RestaurantBloc not found');
    }

    const currentTableCount = bloc.tables.length;
    const currentTotalChairs = bloc.tables.reduce(
      (sum, table) => sum + table.numChaises,
      0
    );

    const newTableChairs = dto.numChaises;

    const tableLimitReached = currentTableCount + 1 > bloc.maxTables;
    const chairLimitReached = currentTotalChairs + newTableChairs > bloc.maxChaises;

    if (tableLimitReached || chairLimitReached) {
      const errors: string[] = [];
      if (tableLimitReached) errors.push(`maxTables dépassé (${bloc.maxTables})`);
      if (chairLimitReached) errors.push(`maxChaises dépassé (${bloc.maxChaises})`);
      throw new BadRequestException({
        message: 'Bloc plein',
        errors: errors,
      });

    }

    const table = this.TableRepository.create({
      numChaises: dto.numChaises,
      status: dto.status,
      view: dto.view,
      row: dto.row,
      col: dto.col,
      restaurantBloc: bloc,
    });

    return await this.TableRepository.save(table);
  }















  async getTable() {
    return this.TableRepository.find();
  }
  async getTableById(id: string) {
    const table = await this.TableRepository.findOne({
      where: { id: id },
      relations: ['restaurantBloc', 'restaurantBloc.bloc']  // <= charge les relations !
    });

    if (!table) {
      throw new NotFoundException(`Table with ID ${id} not found`);
    }

    return table;
  }

  async updateTable(id: string, updateTableDto: UpdateTableDto) {
    const table = await this.TableRepository.findOneBy({ id });

    if (!table) {
      throw new NotFoundException(`Table with ID ${id} not found`);
    }

    Object.assign(table, updateTableDto);
    return await this.TableRepository.save(table);
  }

  async delete(id: string) {
    const table = await this.TableRepository.findOne({ where: { id } });

    if (!table) {
      throw new NotFoundException('Table not found');
    }

    try {
      await this.TableRepository.delete(id);
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
      throw new InternalServerErrorException('Impossible de supprimer la table.');
    }
  }



  async updateStatus(id: string, status: string) {
    const table = await this.TableRepository.findOneBy({ id });

    if (!table) {
      throw new NotFoundException('Table non trouvée');
    }


    if (!Object.values(TableStatus).includes(status as TableStatus)) {
      throw new BadRequestException('Statut invalide');
    }

    table.status = status as TableStatus;
    console.log('status', status, table);
    return await this.TableRepository.save(table);
  }
}