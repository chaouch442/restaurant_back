import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {  ViewType } from '../enums/view.enums';
import { TableStatus } from '../enums/status.enums';
import { Bloc } from 'src/bloc/entities/bloc.entity/bloc.entity';

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

  @Column({ nullable: true })
  row: number;
  
  @Column({ nullable: true })
  col: number;
  

  @ManyToOne(() => Bloc, (bloc) => bloc.tables, { eager: true })
  bloc: Bloc;

@Column({ nullable: true })
blocId: string;

}
