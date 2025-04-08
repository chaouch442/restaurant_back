import {
    ApiProperty,
    ApiPropertyOptional,
  } from '@nestjs/swagger';
  import {
    IsString,
    IsOptional,
    IsUUID,
    IsBoolean,
  } from 'class-validator';
  
  export class CreateReservationTimeDto {
    @IsString()
    @ApiProperty()
    name: string;


    @ApiProperty({
      example: '11:30',
      description: 'Start time of the reservation slot (HH:mm)',
    })
    @IsString()
    startTime: string;
  
    @ApiProperty({
      example: '13:30',
      description: 'End time of the reservation slot (HH:mm)',
    })
    @IsString()
    endTime: string;
  
    @ApiPropertyOptional({
      example: '2025-04-15',
      description: 'Optional specific date for the slot (YYYY-MM-DD)',
    })
    @IsOptional()
    @IsString()
    date2?: string;
  
    @ApiProperty({
      description: 'ID of the associated restaurant',
    })
    @IsUUID()
    restaurantId: string;
  
    @ApiPropertyOptional({
      example: true,
      description: 'Whether this time slot is active (default: true)',
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
  }
  