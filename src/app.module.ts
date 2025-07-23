import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DoctorModule } from './infrastructure/doctor/doctor.module';
import { PatientModule } from './infrastructure/patient/patient.module';
import { AppointmentModule } from './infrastructure/appointment/appointment.module';
import { MedicalOrderModule } from './infrastructure/medical-order/medical-order.module';
import { MedicationModule } from './infrastructure/medication/medication.module';
import { AuthModule } from './infrastructure/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    DoctorModule,
    PatientModule,
    AppointmentModule,
    MedicalOrderModule,
    MedicationModule,
  ],
})
export class AppModule {}
