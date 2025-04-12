import { BlocStatus } from "src/bloc/enums/status.enum";
import { IBloc } from "src/bloc/interfaces/bloc.interface";
import { TableRestaurant } from "src/tables/entities/table.entity";
import { ViewType } from "src/tables/enums/view.enums";
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
 view: ViewType; 

 @Column({ default: 'true' }) 

 status:BlocStatus;


  @OneToMany(() => TableRestaurant, (table) => table.bloc, {
    cascade: true,
  })
  tables: TableRestaurant[];

  @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
