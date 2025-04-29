import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { ReservationTable } from 'src/reservations/entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([ReservationTable])],
    controllers: [CustomerController],
    providers: [CustomerService],
})
export class CustomerModule { }
