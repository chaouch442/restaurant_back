
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Bloc } from './entities/bloc.entity/bloc.entity';
import { CreateBlocDto } from './types/dtos/create-bloc.dto';
import { BlocRepository } from './repositories/bloc.repository';


@Injectable()
export class BlocService {
  constructor(@InjectRepository(Bloc) private blocRepository: BlocRepository) {}

  create( createBlocDto: CreateBlocDto) {
    const { name, etage,view } =  createBlocDto;
    const newBloc= this.blocRepository.create({ name, etage,view });
    return this.blocRepository.save(newBloc);
  }

  findAll() {
    return this.blocRepository.find({ relations: ['tables'] });
  }

  findOne(id: string) {
    return this.blocRepository.findOne({ where: { id }, relations: ['tables'] });
  }
}
