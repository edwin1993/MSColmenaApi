import { Module } from '@nestjs/common';
import { PatientController } from '../../interface/patient/patient.controller';
import { PatientService } from '../../application/patient/patient.service';
import { PrismaPatientRepository } from './prisma-patient.repository';

@Module({
  controllers: [PatientController],
  providers: [
    PatientService,
    {
      provide: 'PatientRepository',
      useClass: PrismaPatientRepository,
    },
  ],
  exports: [PatientService],
})
export class PatientModule {} 