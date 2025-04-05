
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString,  } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @ApiProperty()
 @ApiProperty()
  @IsString()
  name: string;


  @ApiProperty() 
  @IsString()
  @IsOptional()
  role?: string;
  
  
  @ApiProperty() 
  @IsOptional() 
  @IsString()
  phone?: string;
}
