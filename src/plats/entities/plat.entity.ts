import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { MealTime } from '../enums/meal-time.enum';
import { MenuRestaurant } from 'src/menu/entities/menu.entity';
import { ReservationTable } from 'src/reservations/entities/reservation.entity';


@Entity()
export class Plat{
  @PrimaryGeneratedColumn('uuid')
  id: string;
 
  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ type: 'text', nullable: true })
  image: string;
  

 
  @Column({ type: 'enum', enum: MealTime }) 
  mealTime: MealTime;

  @ManyToOne(() => MenuRestaurant, (menu) => menu.plats, {
    onDelete: 'CASCADE',
  })
  menu: MenuRestaurant;
  
  @ManyToMany(() => ReservationTable, (reservation) => reservation.plats)
  reservations: ReservationTable[];
  

  
  
}
