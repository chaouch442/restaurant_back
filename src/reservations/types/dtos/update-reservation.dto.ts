
import { PartialType } from '@nestjs/swagger';
import { CreateReservationDto } from './create-reservation.dto';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ReservationStatus } from 'src/reservations/enums/reservation.enums';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
    @IsOptional()
    @IsBoolean()
    isCancelled?: boolean;

    @IsOptional()
    @IsEnum(ReservationStatus)
    status?: ReservationStatus;


    @IsOptional()
    @IsString()
    customerName?: string;
}
