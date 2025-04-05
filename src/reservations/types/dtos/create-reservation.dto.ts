import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty() 
  @IsUUID()
  @IsNotEmpty()
  restaurantId: string;

@ApiProperty() 
  @IsUUID()
  @IsNotEmpty()
  tableId: string;  

@ApiProperty() 
  @IsString()
  @IsOptional()
  customerName?: string; 
  
  @ApiProperty() 
  @IsDateString()
  @IsNotEmpty()
  reservationDateTime: string; 

  @ApiProperty() 
  @IsOptional()
platIds: string[]; 
}
