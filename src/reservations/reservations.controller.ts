import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './types/dtos/create-reservation.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import{Request}from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateReservationDto } from './types/dtos/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from './entities/reservation.entity';

@ApiTags('reservation')
@Controller('reservations')
@UseGuards(RolesGuard)
export class ReservationController {
  
    constructor(private readonly reservationService: ReservationsService,
      @InjectRepository(ReservationEntity)
      private readonly reservationRepository,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createReservation(
      @Body() createReservationDto: CreateReservationDto,
      @User() user: UserEntity,
    )
    {
      console.log("test+++++++++++++++++++++++")
    console.log(user)
      return this.reservationService.createReservation(createReservationDto,user);
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
         async updateReservation(@Param('id') id: string, @Body() updatereservationDto :UpdateReservationDto,@User() user: UserEntity,) {
       console.log('updateReservationDto:', updatereservationDto);
        return this.reservationService.updateReservation(id, updatereservationDto,user);
        }
      @Delete(':id')
     @UseGuards(JwtAuthGuard)
      async deleteReservation(@Param('id', ParseUUIDPipe) id: string, @User() user: UserEntity,) {
          return this.reservationService.deleteReservation(id,user);
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