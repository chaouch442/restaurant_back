import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { ViewType } from "src/tables/enums/view.enums";

export class CreateBlocDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  etage: string;

  @ApiProperty({ enum: ViewType })
  @IsEnum(ViewType)
  view: ViewType;
  
  }
  