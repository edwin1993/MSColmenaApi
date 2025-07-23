import { IsNotEmpty, IsString, IsDateString, IsNumber, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicalOrderDto {
  @ApiProperty({ 
    description: 'ID de la cita médica a la que se adjunta la orden', 
    example: 1
  })
  @IsNotEmpty()
  @IsNumber()
  appointmentId: number;

  @ApiProperty({ 
    description: 'Descripción de la orden médica', 
    example: 'Orden para análisis de sangre completo',
    minLength: 1
  })
  @IsNotEmpty()
  @IsString()
  @Length(1)
  description: string;

  @ApiProperty({ 
    description: 'Fecha de caducidad de la orden médica', 
    example: '2024-02-15T00:00:00.000Z'
  })
  @IsNotEmpty()
  @IsDateString()
  expirationDate: string;

  @ApiProperty({ 
    description: 'Especialidad médica de la orden', 
    example: 'Medicina General',
    minLength: 1,
    maxLength: 100
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  specialty: string;
}

export class AddMedicationDto {
  @ApiProperty({ 
    description: 'ID del medicamento a adjuntar', 
    example: 1
  })
  @IsNotEmpty()
  @IsNumber()
  medicationId: number;
}

export class MedicalOrderWithMedicationsDto {
  @ApiProperty({ 
    description: 'ID de la orden médica', 
    example: 1
  })
  medicalOrderId: number;

  @ApiProperty({ 
    description: 'ID de la cita médica', 
    example: 1
  })
  appointmentId: number;

  @ApiProperty({ 
    description: 'Descripción de la orden', 
    example: 'Orden para análisis de sangre completo'
  })
  description: string;

  @ApiProperty({ 
    description: 'Fecha de caducidad', 
    example: '2024-02-15T00:00:00.000Z'
  })
  expirationDate: string;

  @ApiProperty({ 
    description: 'Especialidad médica', 
    example: 'Medicina General'
  })
  specialty: string;

  @ApiProperty({ 
    description: 'Lista de IDs de medicamentos adjuntos', 
    example: [1, 2, 3]
  })
  medications: number[];
} 