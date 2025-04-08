import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Plat } from '../../plats/entities/plat.entity';



@Entity()
export class MenuRestaurant{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'date', nullable: false }) 
  datecreation: string; 


  @OneToMany(() => Plat, (plat) => plat.menu)
  plats: Plat[];
  
  


}
