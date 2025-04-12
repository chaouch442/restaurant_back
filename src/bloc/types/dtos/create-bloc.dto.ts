import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { BlocStatus } from "src/bloc/enums/status.enum";
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
   

    @ApiProperty({ enum: BlocStatus })
    @IsEnum(BlocStatus, {
      message: 'Le status doit être soit "true" soit "false"',
    })
    status: BlocStatus;
  }
  