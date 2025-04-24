
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BlocService } from './bloc.service';
import { CreateBlocDto } from './types/dtos/create-bloc.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('bloc')
@Controller('bloc')
export class BlocController {
  constructor(private readonly blocService: BlocService) { }

  @Post()
  create(@Body() createDto: CreateBlocDto) {
    return this.blocService.create(createDto);
  }



  @Get()
  findAll() {
    return this.blocService.findAll();
  }

  @Get(':blocId/:restaurantId')
  getBlocWithRestaurant(
    @Param('blocId') blocId: string,
    @Param('restaurantId') restaurantId: string,
  ) {
    return this.blocService.getBlocByIdFiltered(blocId, restaurantId);
  }


}
