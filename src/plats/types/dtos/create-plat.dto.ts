import { IsString, IsNotEmpty, IsUrl, IsEnum, IsOptional } from 'class-validator';
import { MealTime } from 'src/plats/enums/meal-time.enum';

export class CreatePlatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNotEmpty()
  @IsEnum(MealTime)
  mealTime: MealTime;


  @IsString()
  @IsNotEmpty()
  description: string;



  @IsNotEmpty()
  price: number;

}
