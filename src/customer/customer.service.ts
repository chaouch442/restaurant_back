import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReservationTable } from "src/reservations/entities/reservation.entity";
import { ReservationRepository } from "src/reservations/repositories/reservation.repository";

@Injectable()
export class CustomerService {

    constructor(
        @InjectRepository(ReservationTable)
        private readonly reservationRepository: ReservationRepository) { }

    async checkAvailability(tableId: string, date: string, startTime: string, endTime: string): Promise<{ available: boolean }> {
        const conflicting = await this.reservationRepository
            .createQueryBuilder('reservation')
            .leftJoin('reservation.reservationTime', 'time')
            .leftJoin('reservation.table', 'table')
            .where('table.id = :tableId', { tableId })
            .andWhere('time.date2 = :date', { date })
            .andWhere(
                '(time.startTime < :endTime AND time.endTime > :startTime)',
                { startTime, endTime }
            )
            .getOne();

        return { available: !conflicting };
    }

}
