import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { AppointmentService } from '../../application/appointment/appointment.service';
import { CreateAppointmentDto, UpdateAppointmentStatusDto, SearchAppointmentsDto } from './appointment.dto';
import { AppointmentStatus } from '../../domain/appointment/appointment.entity';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { Roles } from '../../infrastructure/auth/roles.decorator';
import { UserRole } from '../../domain/auth/user.entity';

@ApiTags('Citas Médicas')
@Controller('appointments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.RECEPTIONIST)
  @ApiOperation({ 
    summary: 'Crear una nueva cita médica',
    description: 'Registra una nueva cita médica. Solo ADMIN, DOCTOR y RECEPTIONIST pueden crear citas.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Cita médica creada exitosamente',
    schema: {
      example: {
        appointmentId: 1,
        doctorId: 1,
        patientId: 1,
        appointmentDate: "2024-01-15T10:00:00.000Z",
        status: "PROGRAMADA",
        statusUpdateDate: null,
        createdAt: "2024-01-10T15:30:00.000Z",
        updatedAt: "2024-01-10T15:30:00.000Z"
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'El médico no está disponible en esa fecha y hora',
    schema: {
      example: {
        statusCode: 400,
        message: "El médico no está disponible en esa fecha y hora",
        error: "Bad Request"
      }
    }
  })
  async create(@Body() dto: CreateAppointmentDto) {
    try {
      const appointment = await this.appointmentService.create({
        doctorId: dto.doctorId,
        patientId: dto.patientId,
        appointmentDate: new Date(dto.appointmentDate),
        status: AppointmentStatus.PROGRAMADA,
        statusUpdateDate: null,
      });
      return appointment;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al crear la cita médica', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST)
  @ApiOperation({ 
    summary: 'Obtener citas médicas con filtros',
    description: 'Retorna una lista de citas médicas con opciones de filtrado por paciente, médico y rango de fechas.'
  })
  @ApiQuery({ name: 'patientId', required: false, description: 'ID del paciente' })
  @ApiQuery({ name: 'doctorId', required: false, description: 'ID del médico' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Fecha de inicio' })
  @ApiQuery({ name: 'endDate', required: false, description: 'Fecha de fin' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de citas médicas obtenida exitosamente',
    schema: {
      example: [
        {
          appointmentId: 1,
          doctorId: 1,
          patientId: 1,
          appointmentDate: "2024-01-15T10:00:00.000Z",
          status: "PROGRAMADA",
          statusUpdateDate: null,
          createdAt: "2024-01-10T15:30:00.000Z",
          updatedAt: "2024-01-10T15:30:00.000Z"
        }
      ]
    }
  })
  async findAll(@Query() query: SearchAppointmentsDto) {
    // Transformar los parámetros de query a números si están presentes
    const patientId = query.patientId ? Number(query.patientId) : undefined;
    const doctorId = query.doctorId ? Number(query.doctorId) : undefined;
    
    if (patientId) {
      return this.appointmentService.findByPatientId(patientId);
    }
    if (doctorId) {
      return this.appointmentService.findByDoctorId(doctorId);
    }
    if (query.startDate && query.endDate) {
      return this.appointmentService.findByDateRange(
        new Date(query.startDate),
        new Date(query.endDate)
      );
    }
    return this.appointmentService.findAll();
  }

  @Get('available-doctors')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST)
  @ApiOperation({ 
    summary: 'Obtener médicos disponibles por fecha',
    description: 'Retorna una lista de IDs de médicos que están disponibles en una fecha específica.'
  })
  @ApiQuery({ 
    name: 'date', 
    required: true, 
    description: 'Fecha para verificar disponibilidad',
    example: '2024-01-15'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de médicos disponibles',
    schema: {
      example: [1, 2, 3]
    }
  })
  async findAvailableDoctors(@Query('date') date: string) {
    return this.appointmentService.findAvailableDoctors(new Date(date));
  }

  @Get(':appointmentId')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST)
  @ApiOperation({ 
    summary: 'Obtener una cita médica por ID',
    description: 'Busca una cita médica específica usando su ID interno.'
  })
  @ApiParam({ 
    name: 'appointmentId', 
    description: 'ID interno de la cita médica',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Cita médica encontrada',
    schema: {
      example: {
        appointmentId: 1,
        doctorId: 1,
        patientId: 1,
        appointmentDate: "2024-01-15T10:00:00.000Z",
        status: "PROGRAMADA",
        statusUpdateDate: null,
        createdAt: "2024-01-10T15:30:00.000Z",
        updatedAt: "2024-01-10T15:30:00.000Z"
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Cita médica no encontrada',
    schema: {
      example: {
        statusCode: 404,
        message: "Cita médica no encontrada",
        error: "Not Found"
      }
    }
  })
  async findById(@Param('appointmentId', ParseIntPipe) appointmentId: number) {
    const appointment = await this.appointmentService.findById(appointmentId);
    if (!appointment) {
      throw new HttpException('Cita médica no encontrada', HttpStatus.NOT_FOUND);
    }
    return appointment;
  }

  @Put(':appointmentId/status')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @ApiOperation({ 
    summary: 'Actualizar el estado de una cita médica',
    description: 'Permite al médico cambiar el estado de la cita. Solo ADMIN y DOCTOR pueden cambiar el estado.'
  })
  @ApiParam({ 
    name: 'appointmentId', 
    description: 'ID interno de la cita médica',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Estado de la cita actualizado exitosamente',
    schema: {
      example: {
        appointmentId: 1,
        doctorId: 1,
        patientId: 1,
        appointmentDate: "2024-01-15T10:00:00.000Z",
        status: "ASISTIO",
        statusUpdateDate: "2024-01-15T10:30:00.000Z",
        createdAt: "2024-01-10T15:30:00.000Z",
        updatedAt: "2024-01-15T10:30:00.000Z"
      }
    }
  })
  async updateStatus(
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
    @Body() dto: UpdateAppointmentStatusDto
  ) {
    return this.appointmentService.updateStatus(appointmentId, dto.status);
  }

  @Delete(':appointmentId')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ 
    summary: 'Eliminar una cita médica',
    description: 'Elimina permanentemente una cita médica del sistema. Solo ADMIN puede eliminar citas.'
  })
  @ApiParam({ 
    name: 'appointmentId', 
    description: 'ID interno de la cita médica',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Cita médica eliminada exitosamente',
    schema: {
      example: {
        message: "Cita médica eliminada"
      }
    }
  })
  async delete(@Param('appointmentId', ParseIntPipe) appointmentId: number) {
    await this.appointmentService.delete(appointmentId);
    return { message: 'Cita médica eliminada' };
  }
} 