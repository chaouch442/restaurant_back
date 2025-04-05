import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PlatEntity } from '../entities/plat.entity';


@Injectable()
export class platRepository extends Repository<PlatEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PlatEntity, dataSource.createEntityManager());
  }
}