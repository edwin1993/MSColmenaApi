import { IsNotEmpty, IsNumber, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatus } from '../../domain/appointment/appointment.entity';

export class CreateAppointmentDto {
  @ApiProperty({ 
    description: 'ID del médico que realizará la cita', 
    example: 1
  })
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;

  @ApiProperty({ 
    description: 'ID del paciente que asistirá a la cita', 
    example: 1
  })
  @IsNotEmpty()
  @IsNumber()
  patientId: number;

  @ApiProperty({ 
    description: 'Fecha y hora de la cita', 
    example: '2024-01-15T10:00:00.000Z'
  })
  @IsNotEmpty()
  @IsDateString()
  appointmentDate: string;
}

export class UpdateAppointmentStatusDto {
  @ApiProperty({ 
    description: 'Nuevo estado de la cita', 
    enum: AppointmentStatus,
    example: AppointmentStatus.ASISTIO
  })
  @IsNotEmpty()
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}

export class SearchAppointmentsDto {
  @ApiProperty({ 
    description: 'ID del paciente para filtrar citas', 
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  patientId?: number;

  @ApiProperty({ 
    description: 'ID del médico para filtrar citas', 
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  doctorId?: number;

  @ApiProperty({ 
    description: 'Fecha de inicio para el rango de búsqueda', 
    example: '2024-01-01T00:00:00.000Z',
    required: false
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ 
    description: 'Fecha de fin para el rango de búsqueda', 
    example: '2024-01-31T23:59:59.999Z',
    required: false
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
} 