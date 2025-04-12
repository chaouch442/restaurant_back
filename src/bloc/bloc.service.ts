
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Bloc } from './entities/bloc.entity/bloc.entity';
import { CreateBlocDto } from './types/dtos/create-bloc.dto';
import { BlocRepository } from './repositories/bloc.repository';
import { TableRestaurant } from 'src/tables/entities/table.entity';
import { TableStatus } from 'src/tables/enums/status.enums';
import { BlocStatus } from './enums/status.enum';


@Injectable()
export class BlocService {
  constructor(@InjectRepository(Bloc) private blocRepository: BlocRepository) {}

  create( createBlocDto: CreateBlocDto) {
    const { name, etage ,view} =  createBlocDto;
    const newBloc= this.blocRepository.create({ name, etage,view });
    return this.blocRepository.save(newBloc);
  }

 async findAll() {
    
   const bloc= await this.blocRepository.find({ relations: ['tables'] });
   for (let i = 0; i < bloc.length; i++) {
    const currentBloc = bloc[i];
  
 
    const hasOccupiedTable = currentBloc.tables.some(table => table.status === "available");
  
    if (hasOccupiedTable) {
      currentBloc.status = BlocStatus.Active; 
    }else{
      currentBloc.status=BlocStatus.INACTIVE
    }
  
  }
  
  
   return bloc;
  }

  findOne(id: string) {
    return this.blocRepository.findOne({ where: { id }, relations: ['tables'] });
  }
}
