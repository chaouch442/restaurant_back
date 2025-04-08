import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {  ViewType } from '../enums/view.enums';
import { TableStatus } from '../enums/status.enums';

@Entity()
export class TableRestaurant{
  @PrimaryGeneratedColumn('uuid')
  id: string;
@ApiProperty()
  @Column()
  numChaises: number;
  @ApiProperty({ enum: ViewType })
  @Column()
  view: ViewType;
 
 @ApiProperty({ enum: TableStatus })
  @Column()
  status: TableStatus;
  
 
}
