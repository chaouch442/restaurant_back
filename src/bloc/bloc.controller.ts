
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BlocService } from './bloc.service';
import { CreateBlocDto } from './types/dtos/create-bloc.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('bloc')
@Controller('bloc')
export class BlocController {
  constructor(private readonly blocService: BlocService) {}

  @Post()
  create(@Body() createBlocDto: CreateBlocDto) {
    return this.blocService.create(createBlocDto);
  }
  

  @Get()
  findAll() {
    return this.blocService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blocService.findOne(id);
  }
}
