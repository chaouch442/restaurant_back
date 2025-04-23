
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsOptional, IsString, } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsEmail({}, { message: 'Email invalide' })
  email: string;


  @ApiProperty()
  @IsString()
  name: string;


  @ApiProperty()
  @IsString()
  lastname?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  role?: string;


  @ApiProperty()
  @IsOptional()
  @IsString()
  phone?: string;


  @IsOptional()
  @IsDateString()
  dateDebutContrat?: string;
}
