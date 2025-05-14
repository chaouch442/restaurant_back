import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class RestaurantBlocDto {


    @Expose()
    @IsUUID()
    blocId: string;

    @Expose()
    @IsNumber()
    maxTables: number;

    @Expose()
    @IsNumber()
    maxChaises: number;

}
