import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { PlatEntity } from '../../plats/entities/plat.entity';
import { IMen } from '../interfaces/menu.interface';
import { ApiProperty } from '@nestjs/swagger';


@Entity()
export class MenuEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'date', nullable: false }) 
  datecreation: string; 


  @OneToMany(() => PlatEntity, (plat) => plat.menu)
  plats: PlatEntity[];
  
  


}
