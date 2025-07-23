import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({ 
    description: 'Identificación del paciente (solo números)', 
    example: '1234567890',
    minLength: 1,
    maxLength: 20
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  @Matches(/^\d+$/)
  id: string;

  @ApiProperty({ 
    description: 'Nombre del paciente', 
    example: 'Juan',
    minLength: 1,
    maxLength: 90
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 90)
  firstName: string;

  @ApiProperty({ 
    description: 'Apellido del paciente', 
    example: 'Pérez',
    minLength: 1,
    maxLength: 90
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 90)
  lastName: string;

  @ApiProperty({ 
    description: 'Correo electrónico de contacto del paciente', 
    example: 'juan.perez@correo.com',
    minLength: 1,
    maxLength: 200
  })
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 200)
  email: string;

  @ApiProperty({ 
    description: 'Teléfono de contacto del paciente', 
    example: '3001234567',
    minLength: 1,
    maxLength: 20
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  phone: string;

  @ApiProperty({ 
    description: 'Dirección del paciente', 
    example: 'Calle 123 #45-67',
    minLength: 1,
    maxLength: 200
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  address: string;

  @ApiProperty({ 
    description: 'Ciudad de residencia del paciente', 
    example: 'Bogotá',
    minLength: 1,
    maxLength: 90
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 90)
  city: string;
} 