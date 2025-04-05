import { IsString, IsNotEmpty,IsBoolean, IsOptional, IsEnum } from 'class-validator';
import { RestaurantStatus } from '../../enums/status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto {
  @ApiProperty()
  @IsNotEmpty()
 @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  speciality: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
 phone: string;
  @ApiProperty()
@IsNotEmpty()
@IsString()
hourly: string;

  @ApiProperty({ enum: RestaurantStatus, required: false })
  @IsOptional()
  @IsEnum(RestaurantStatus, { message: "status must be 'ouvert' or 'ferme'" })
  status?: RestaurantStatus;
}
