import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TableStatus } from '../enums/status.enums';
import { RestaurantBloc } from 'src/restaurants/entities/Restaurant-Bloc.entity';
import { ViewType } from '../enums/view.enums';

@Entity()
export class TableRestaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty()
  @Column()
  numChaises: number;

  @ApiProperty({ enum: TableStatus })
  @Column()
  status: TableStatus;

  @Column({ type: 'enum', enum: ViewType, nullable: true })
  view: ViewType;


  @Column({ nullable: true })
  row: number;

  @Column({ nullable: true })
  col: number;


  @ManyToOne(() => RestaurantBloc, (rb) => rb.tables, { eager: true, onDelete: 'CASCADE' })
  restaurantBloc: RestaurantBloc;



}
