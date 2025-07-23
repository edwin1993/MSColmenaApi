import { Module } from '@nestjs/common';
import { MedicationController } from '../../interface/medication/medication.controller';
import { MedicationService } from '../../application/medication/medication.service';
import { PrismaMedicationRepository } from './prisma-medication.repository';

@Module({
  controllers: [MedicationController],
  providers: [
    MedicationService,
    {
      provide: 'MedicationRepository',
      useClass: PrismaMedicationRepository,
    },
  ],
  exports: [MedicationService],
})
export class MedicationModule {} 