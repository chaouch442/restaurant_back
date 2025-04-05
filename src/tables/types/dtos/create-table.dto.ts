import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsEnum, Min } from 'class-validator';

export class CreateTableDto {
  @ApiProperty() 
  @IsInt()
  @Min(1, { message: 'Le nombre de chaises doit être au moins 1' })
  numChaises: number;
  
@ApiProperty() 
  @IsString()
  view: string;

@ApiProperty() 
  @IsEnum(['available', 'occupied'], { message: 'Le status doit être soit "available" soit "occupied"' })
  status: 'available' | 'occupied';
}
