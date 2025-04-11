import { IsEnum, IsInt, IsNumber, IsString, IsUUID, Min, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TableStatus } from 'src/tables/enums/status.enums';
import { ViewType } from 'src/tables/enums/view.enums';
import { Type } from 'class-transformer';
import { CreateBlocDto } from 'src/bloc/types/dtos/create-bloc.dto';

export class CreateTableDto {
  @ApiProperty()
  @IsInt()
  @Min(1, { message: 'Le nombre de chaises doit être au moins 1' })
  numChaises: number;

 
  @ApiProperty({ enum: TableStatus })
  @IsEnum(TableStatus, {
    message: 'Le status doit être soit "available" soit "occupied"',
  })
  status: TableStatus;


  @ApiProperty()
  @IsNumber()
  row: number;

  @ApiProperty()
  @IsNumber()
  col: number;
  @ApiProperty()
  @IsString()
  blocId: string;
  
}
