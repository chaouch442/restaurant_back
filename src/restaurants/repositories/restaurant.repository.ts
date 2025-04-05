import { Repository } from 'typeorm';
import {  RestaurantEntity } from  '../entities/restaurant.entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class RestaurantRepository extends Repository<RestaurantEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RestaurantEntity, dataSource.createEntityManager());
  }
}
