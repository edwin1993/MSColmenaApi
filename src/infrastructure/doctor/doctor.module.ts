import { Module } from '@nestjs/common';
import { DoctorController } from '../../interface/doctor/doctor.controller';
import { DoctorService } from '../../application/doctor/doctor.service';
import { PrismaDoctorRepository } from './prisma-doctor.repository';

@Module({
  controllers: [DoctorController],
  providers: [
    DoctorService,
    {
      provide: 'DoctorRepository',
      useClass: PrismaDoctorRepository,
    },
  ],
  exports: [DoctorService],
})
export class DoctorModule {} 