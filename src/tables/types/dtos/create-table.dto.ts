import { IsEnum, IsInt, IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TableStatus } from 'src/tables/enums/status.enums';
import { ReservationTable } from 'src/reservations/entities/reservation.entity';
import { ViewType } from 'src/tables/enums/view.enums';

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
  @IsOptional()
  @IsEnum(ViewType)
  view?: ViewType;


  @ApiProperty()
  @IsNumber()
  row: number;

  @ApiProperty()
  @IsNumber()
  col: number;

  @ApiProperty()
  @IsString()
  restaurantBlocId: string;




}
