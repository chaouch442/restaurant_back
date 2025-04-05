import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MenuEntity } from '../entities/menu.entity';

@Injectable()
export class MenuRepository extends Repository<MenuEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(MenuEntity, dataSource.createEntityManager());
  }
}