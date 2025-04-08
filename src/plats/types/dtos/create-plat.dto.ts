import { IsString, IsNotEmpty, IsUrl, IsEnum } from 'class-validator';
import { MealTime } from 'src/plats/enums/meal-time.enum';

export class CreatePlatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsUrl()
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  @IsEnum(MealTime)  
  mealTime: MealTime;
}
