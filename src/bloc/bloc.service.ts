
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bloc } from './entities/bloc.entity';
import { BlocRepository } from './repositories/bloc.repository';
import { TableStatus } from 'src/tables/enums/status.enums';
import { CreateBlocDto } from './types/dtos/create-bloc.dto';


@Injectable()
export class BlocService {
  constructor(@InjectRepository(Bloc)
  private blocRepository: BlocRepository) { }




  async create(createDto: CreateBlocDto): Promise<Bloc> {
    const bloc = this.blocRepository.create(createDto);
    return await this.blocRepository.save(bloc);
  }

  async findAll() {
    return this.blocRepository.find();
  }




  async findOne(id: string): Promise<Bloc | null> {
    return this.blocRepository.findOne({
      where: { id },
      relations: [
        'restaurantBlocs',
        'restaurantBlocs.tables'
      ],
    });
  }

}
