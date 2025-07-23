import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { PatientService } from '../../application/patient/patient.service';
import { CreatePatientDto } from './patient.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { Roles } from '../../infrastructure/auth/roles.decorator';
import { UserRole } from '../../domain/auth/user.entity';

@ApiTags('Pacientes')
@Controller('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @HttpCode(200)
  @ApiOperation({ 
    summary: 'Crear un nuevo paciente',
    description: 'Registra un nuevo paciente en el sistema. Solo ADMIN y DOCTOR pueden crear pacientes.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Paciente creado exitosamente',
    schema: {
      example: {
        patientId: 1,
        id: "1234567890",
        firstName: "Juan",
        lastName: "Pérez",
        email: "juan.perez@correo.com",
        phone: "3001234567",
        address: "Calle 123 #45-67",
        city: "Bogotá"
      }
    }
  })
  @ApiResponse({ 
    status: 409, 
    description: 'El paciente ya está registrado (conflicto con identificación o email)',
    schema: {
      example: {
        statusCode: 409,
        message: "El paciente ya está registrado",
        error: "Conflict"
      }
    }
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor',
    schema: {
      example: {
        statusCode: 500,
        message: "Error al registrar paciente",
        error: "Internal Server Error"
      }
    }
  })
  async create(@Body() dto: CreatePatientDto) {
    try {
      const patient = await this.patientService.create(dto);
      return patient;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException('El paciente ya está registrado', HttpStatus.CONFLICT);
      }
      throw new HttpException('Error al registrar paciente', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST)
  @ApiOperation({ 
    summary: 'Obtener todos los pacientes',
    description: 'Retorna una lista de todos los pacientes registrados en el sistema.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de pacientes obtenida exitosamente',
    schema: {
      example: [
        {
          patientId: 1,
          id: "1234567890",
          firstName: "Juan",
          lastName: "Pérez",
          email: "juan.perez@correo.com",
          phone: "3001234567",
          address: "Calle 123 #45-67",
          city: "Bogotá"
        }
      ]
    }
  })
  async findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST)
  @ApiOperation({ 
    summary: 'Obtener un paciente por identificación',
    description: 'Busca un paciente específico usando su número de identificación.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Número de identificación del paciente (solo números)',
    example: '1234567890'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Paciente encontrado',
    schema: {
      example: {
        patientId: 1,
        id: "1234567890",
        firstName: "Juan",
        lastName: "Pérez",
        email: "juan.perez@correo.com",
        phone: "3001234567",
        address: "Calle 123 #45-67",
        city: "Bogotá"
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Paciente no encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: "Paciente no encontrado",
        error: "Not Found"
      }
    }
  })
  async findById(@Param('id') id: string) {
    const patient = await this.patientService.findById(id);
    if (!patient) {
      throw new HttpException('Paciente no encontrado', HttpStatus.NOT_FOUND);
    }
    return patient;
  }

  @Put(':patientId')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @ApiOperation({ 
    summary: 'Actualizar un paciente',
    description: 'Actualiza la información de un paciente existente. Solo ADMIN y DOCTOR pueden modificar pacientes.'
  })
  @ApiParam({ 
    name: 'patientId', 
    description: 'ID interno del paciente (número autoincremental)',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Paciente actualizado exitosamente',
    schema: {
      example: {
        patientId: 1,
        id: "1234567890",
        firstName: "Juan Carlos",
        lastName: "Pérez",
        email: "juan.perez@correo.com",
        phone: "3001234567",
        address: "Calle 123 #45-67",
        city: "Bogotá"
      }
    }
  })
  async update(@Param('patientId') patientId: number, @Body() dto: Partial<CreatePatientDto>) {
    return this.patientService.update(patientId, dto);
  }

  @Delete(':patientId')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ 
    summary: 'Eliminar un paciente',
    description: 'Elimina permanentemente un paciente del sistema. Solo ADMIN puede eliminar pacientes.'
  })
  @ApiParam({ 
    name: 'patientId', 
    description: 'ID interno del paciente (número autoincremental)',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Paciente eliminado exitosamente',
    schema: {
      example: {
        message: "Paciente eliminado"
      }
    }
  })
  async delete(@Param('patientId') patientId: number) {
    await this.patientService.delete(patientId);
    return { message: 'Paciente eliminado' };
  }
} 