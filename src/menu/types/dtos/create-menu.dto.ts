import { IsString, IsNotEmpty, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePlatDto } from 'src/plats/types/dtos/create-plat.dto';
import { ApiProperty } from '@nestjs/swagger';


export class CreateMenuDto {
  @ApiProperty() 
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()  
  datecreation: string;
@ApiProperty() 
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePlatDto)
  plats: CreatePlatDto[];
}
