import { Module } from '@nestjs/common';
import { AppointmentController } from '../../interface/appointment/appointment.controller';
import { AppointmentService } from '../../application/appointment/appointment.service';
import { PrismaAppointmentRepository } from './prisma-appointment.repository';

@Module({
  controllers: [AppointmentController],
  providers: [
    AppointmentService,
    {
      provide: 'AppointmentRepository',
      useClass: PrismaAppointmentRepository,
    },
  ],
  exports: [AppointmentService],
})
export class AppointmentModule {} 