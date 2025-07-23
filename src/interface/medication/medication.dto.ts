import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicationDto {
  @ApiProperty({ 
    description: 'Nombre del medicamento', 
    example: 'Paracetamol',
    minLength: 1,
    maxLength: 200
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  name: string;

  @ApiProperty({ 
    description: 'Descripción del medicamento', 
    example: 'Analgésico y antipirético utilizado para tratar el dolor y la fiebre',
    minLength: 1
  })
  @IsNotEmpty()
  @IsString()
  @Length(1)
  description: string;

  @ApiProperty({ 
    description: 'Enfermedades o condiciones para las que se prescribe el medicamento', 
    example: 'Dolor de cabeza, fiebre, dolores musculares',
    minLength: 1
  })
  @IsNotEmpty()
  @IsString()
  @Length(1)
  prescribedFor: string;
} 