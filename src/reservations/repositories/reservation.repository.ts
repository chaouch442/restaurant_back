import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ReservationEntity } from '../entities/reservation.entity';

@Injectable()
export class ReservationRepository extends Repository<ReservationEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ReservationEntity, dataSource.createEntityManager());
  }
}
