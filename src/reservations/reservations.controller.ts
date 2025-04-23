import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './types/dtos/create-reservation.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { userId } from 'src/user/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateReservationDto } from './types/dtos/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationTable } from './entities/reservation.entity';
import { User } from 'src/user/entities/user.entity';

@ApiTags('reservations')
@Controller('reservations')
@UseGuards(RolesGuard)
export class ReservationController {

  constructor(private readonly reservationService: ReservationsService,
    @InjectRepository(ReservationTable)
    private readonly reservationRepository,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createReservation(
    @Body() createReservationDto: CreateReservationDto,
    @userId() user: User,
  ) {
    console.log("test+++++++++++++++++++++++")
    console.log(user)
    return this.reservationService.createReservation(createReservationDto, user);
  }

  @Get(':id')
  async getReservationById(@Param('id', ParseUUIDPipe) id: string) {
    console.log("ID reçu :", id);
    return this.reservationService.getReservationById(id);
  }
  @Get()
  async getReservation() {
    return this.reservationService.getReservation();
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateReservation(@Param('id') id: string, @Body() updatereservationDto: UpdateReservationDto, @userId() user: any,) {
    console.log('updateReservationDto:', updatereservationDto);
    return this.reservationService.updateReservation(id, updatereservationDto, user);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteReservation(@Param('id', ParseUUIDPipe) id: string, @userId() user: User,) {
    return this.reservationService.deleteReservation(id, user);
  }


  @Get('verify/:id')
  async verifyReservation(@Param('id') id: string) {
    const reservation = await this.reservationRepository.findOneBy({ id });

    if (!reservation) {
      throw new NotFoundException('Réservation non trouvée');
    }

    return {
      message: 'Réservation valide',
      customerName: reservation.customerName,
      reservationDateTime: reservation.reservationDateTime,
      table: reservation.table,
      restaurant: reservation.restaurant,
    };
  }

}