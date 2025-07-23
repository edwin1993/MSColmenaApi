import { IsEmail, IsNotEmpty, IsString, Length, Matches, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({ description: 'Identificación del médico (solo números)', example: '1234567890' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  @Matches(/^\d+$/)
  id: string;

  @ApiProperty({ description: 'Nombre del médico', example: 'Carlos' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 90)
  firstName: string;

  @ApiProperty({ description: 'Apellido del médico', example: 'García' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 90)
  lastName: string;

  @ApiProperty({ description: 'Correo electrónico del médico', example: 'carlos.garcia@hospital.com' })
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 200)
  email: string;

  @ApiProperty({ description: 'Teléfono del médico', example: '3001234567' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  phone: string;

  @ApiProperty({ description: 'Dirección del médico', example: 'Calle 45 #23-12' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  address: string;

  @ApiProperty({ description: 'Ciudad del médico', example: 'Medellín' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 90)
  city: string;

  @ApiProperty({ description: 'Número de tarjeta profesional', example: 'TP-12345' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  professionalCard: string;

  @ApiProperty({ description: 'Fecha de ingreso al centro médico', example: '2023-01-15' })
  @IsNotEmpty()
  @IsDateString()
  admissionDate: string;
}

export class UpdateDoctorDto {
  @ApiProperty({ description: 'Identificación del médico (solo números)', example: '1234567890', required: false })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  @Matches(/^\d+$/)
  id?: string;

  @ApiProperty({ description: 'Nombre del médico', example: 'Carlos', required: false })
  @IsOptional()
  @IsString()
  @Length(1, 90)
  firstName?: string;

  @ApiProperty({ description: 'Apellido del médico', example: 'García', required: false })
  @IsOptional()
  @IsString()
  @Length(1, 90)
  lastName?: string;

  @ApiProperty({ description: 'Correo electrónico del médico', example: 'carlos.garcia@hospital.com', required: false })
  @IsOptional()
  @IsEmail()
  @Length(1, 200)
  email?: string;

  @ApiProperty({ description: 'Teléfono del médico', example: '3001234567', required: false })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  phone?: string;

  @ApiProperty({ description: 'Dirección del médico', example: 'Calle 45 #23-12', required: false })
  @IsOptional()
  @IsString()
  @Length(1, 200)
  address?: string;

  @ApiProperty({ description: 'Ciudad del médico', example: 'Medellín', required: false })
  @IsOptional()
  @IsString()
  @Length(1, 90)
  city?: string;

  @ApiProperty({ description: 'Número de tarjeta profesional', example: 'TP-12345', required: false })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  professionalCard?: string;

  @ApiProperty({ description: 'Fecha de ingreso al centro médico', example: '2023-01-15', required: false })
  @IsOptional()
  @IsDateString()
  admissionDate?: string;
} 