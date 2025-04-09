import { IBloc } from "src/bloc/interfaces/bloc.interface";
import { TableRestaurant } from "src/tables/entities/table.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Bloc  implements IBloc{
 
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  etage: string;

  @Column()
  view: string;

  @OneToMany(() => TableRestaurant, (table) => table.bloc)
  tables: TableRestaurant[];

  @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
