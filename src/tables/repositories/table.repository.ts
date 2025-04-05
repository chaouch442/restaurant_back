import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TableEntity } from '../entities/table.entity';

@Injectable()
export class TableRepository extends Repository<TableEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TableEntity, dataSource.createEntityManager());
  }
}
