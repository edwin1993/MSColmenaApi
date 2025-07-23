import { IsNotEmpty, IsString, IsEmail, IsEnum, Length, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../domain/auth/user.entity';

export class LoginDto {
  @ApiProperty({ 
    description: 'Nombre de usuario', 
    example: 'doctor.garcia',
    minLength: 1,
    maxLength: 50
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  username: string;

  @ApiProperty({ 
    description: 'Contraseña del usuario', 
    example: 'password123',
    minLength: 6
  })
  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string;
}

export class RegisterDto {
  @ApiProperty({ 
    description: 'Nombre de usuario único', 
    example: 'doctor.garcia',
    minLength: 1,
    maxLength: 50
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  username: string;

  @ApiProperty({ 
    description: 'Email del usuario', 
    example: 'doctor.garcia@hospital.com',
    minLength: 1,
    maxLength: 200
  })
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 200)
  email: string;

  @ApiProperty({ 
    description: 'Contraseña del usuario', 
    example: 'password123',
    minLength: 6
  })
  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string;

  @ApiProperty({ 
    description: 'Rol del usuario en el sistema', 
    enum: UserRole,
    example: UserRole.DOCTOR
  })
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ 
    description: 'Estado activo del usuario', 
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;

  @ApiProperty({ 
    description: 'ID del doctor (opcional, solo para usuarios con rol DOCTOR)', 
    example: 1,
    required: false
  })
  doctorId?: number;
} 