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
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { MedicalOrderService } from '../../application/medical-order/medical-order.service';
import { CreateMedicalOrderDto, AddMedicationDto, MedicalOrderWithMedicationsDto } from './medical-order.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { Roles } from '../../infrastructure/auth/roles.decorator';
import { UserRole } from '../../domain/auth/user.entity';

@ApiTags('Órdenes Médicas')
@Controller('medical-orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class MedicalOrderController {
  constructor(private readonly medicalOrderService: MedicalOrderService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @ApiOperation({ 
    summary: 'Crear una nueva orden médica',
    description: 'Crea una nueva orden médica. Solo ADMIN y DOCTOR pueden crear órdenes médicas.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Orden médica creada exitosamente',
    schema: {
      example: {
        medicalOrderId: 1,
        appointmentId: 1,
        description: "Orden para análisis de sangre completo",
        expirationDate: "2024-02-15T00:00:00.000Z",
        specialty: "Medicina General",
        createdAt: "2024-01-10T15:30:00.000Z",
        updatedAt: "2024-01-10T15:30:00.000Z"
      }
    }
  })
  async create(@Body() dto: CreateMedicalOrderDto) {
    try {
      const medicalOrder = await this.medicalOrderService.create({
        appointmentId: dto.appointmentId,
        description: dto.description,
        expirationDate: new Date(dto.expirationDate),
        specialty: dto.specialty,
      });
      return medicalOrder;
    } catch (error) {
      throw new HttpException('Error al crear la orden médica', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE)
  @ApiOperation({ 
    summary: 'Obtener todas las órdenes médicas',
    description: 'Retorna una lista de todas las órdenes médicas registradas en el sistema.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de órdenes médicas obtenida exitosamente',
    schema: {
      example: [
        {
          medicalOrderId: 1,
          appointmentId: 1,
          description: "Orden para análisis de sangre completo",
          expirationDate: "2024-02-15T00:00:00.000Z",
          specialty: "Medicina General",
          createdAt: "2024-01-10T15:30:00.000Z",
          updatedAt: "2024-01-10T15:30:00.000Z"
        }
      ]
    }
  })
  async findAll() {
    return this.medicalOrderService.findAll();
  }

  @Get('appointment/:appointmentId')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE)
  @ApiOperation({ 
    summary: 'Obtener órdenes médicas por cita',
    description: 'Retorna todas las órdenes médicas adjuntas a una cita específica.'
  })
  @ApiParam({ 
    name: 'appointmentId', 
    description: 'ID de la cita médica',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Órdenes médicas de la cita',
    schema: {
      example: [
        {
          medicalOrderId: 1,
          appointmentId: 1,
          description: "Orden para análisis de sangre completo",
          expirationDate: "2024-02-15T00:00:00.000Z",
          specialty: "Medicina General",
          createdAt: "2024-01-10T15:30:00.000Z",
          updatedAt: "2024-01-10T15:30:00.000Z"
        }
      ]
    }
  })
  async findByAppointmentId(@Param('appointmentId', ParseIntPipe) appointmentId: number) {
    return this.medicalOrderService.findByAppointmentId(appointmentId);
  }

  @Get(':medicalOrderId')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE)
  @ApiOperation({ 
    summary: 'Obtener una orden médica por ID',
    description: 'Busca una orden médica específica usando su ID interno.'
  })
  @ApiParam({ 
    name: 'medicalOrderId', 
    description: 'ID interno de la orden médica',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Orden médica encontrada',
    schema: {
      example: {
        medicalOrderId: 1,
        appointmentId: 1,
        description: "Orden para análisis de sangre completo",
        expirationDate: "2024-02-15T00:00:00.000Z",
        specialty: "Medicina General",
        createdAt: "2024-01-10T15:30:00.000Z",
        updatedAt: "2024-01-10T15:30:00.000Z"
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Orden médica no encontrada',
    schema: {
      example: {
        statusCode: 404,
        message: "Orden médica no encontrada",
        error: "Not Found"
      }
    }
  })
  async findById(@Param('medicalOrderId', ParseIntPipe) medicalOrderId: number) {
    const medicalOrder = await this.medicalOrderService.findById(medicalOrderId);
    if (!medicalOrder) {
      throw new HttpException('Orden médica no encontrada', HttpStatus.NOT_FOUND);
    }
    return medicalOrder;
  }

  @Get(':medicalOrderId/medications')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE)
  @ApiOperation({ 
    summary: 'Obtener medicamentos de una orden médica',
    description: 'Retorna la lista de IDs de medicamentos adjuntos a una orden médica específica.'
  })
  @ApiParam({ 
    name: 'medicalOrderId', 
    description: 'ID interno de la orden médica',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de IDs de medicamentos',
    schema: {
      example: [1, 2, 3]
    }
  })
  async getMedications(@Param('medicalOrderId', ParseIntPipe) medicalOrderId: number) {
    return this.medicalOrderService.getMedications(medicalOrderId);
  }

  @Post(':medicalOrderId/medications')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @ApiOperation({ 
    summary: 'Adjuntar medicamento a una orden médica',
    description: 'Agrega un medicamento específico a una orden médica existente. Solo ADMIN y DOCTOR pueden adjuntar medicamentos.'
  })
  @ApiParam({ 
    name: 'medicalOrderId', 
    description: 'ID interno de la orden médica',
    example: 1
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Medicamento adjuntado exitosamente',
    schema: {
      example: {
        message: "Medicamento adjuntado exitosamente"
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Orden médica no encontrada',
    schema: {
      example: {
        statusCode: 400,
        message: "Orden médica no encontrada",
        error: "Bad Request"
      }
    }
  })
  async addMedication(
    @Param('medicalOrderId', ParseIntPipe) medicalOrderId: number,
    @Body() dto: AddMedicationDto
  ) {
    try {
      await this.medicalOrderService.addMedication(medicalOrderId, dto.medicationId);
      return { message: 'Medicamento adjuntado exitosamente' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al adjuntar medicamento', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':medicalOrderId/medications/:medicationId')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @ApiOperation({ 
    summary: 'Remover medicamento de una orden médica',
    description: 'Elimina un medicamento específico de una orden médica existente. Solo ADMIN y DOCTOR pueden remover medicamentos.'
  })
  @ApiParam({ 
    name: 'medicalOrderId', 
    description: 'ID interno de la orden médica',
    example: 1
  })
  @ApiParam({ 
    name: 'medicationId', 
    description: 'ID del medicamento a remover',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Medicamento removido exitosamente',
    schema: {
      example: {
        message: "Medicamento removido exitosamente"
      }
    }
  })
  async removeMedication(
    @Param('medicalOrderId', ParseIntPipe) medicalOrderId: number,
    @Param('medicationId', ParseIntPipe) medicationId: number
  ) {
    await this.medicalOrderService.removeMedication(medicalOrderId, medicationId);
    return { message: 'Medicamento removido exitosamente' };
  }

  @Put(':medicalOrderId')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @ApiOperation({ 
    summary: 'Actualizar una orden médica',
    description: 'Actualiza la información de una orden médica existente. Solo ADMIN y DOCTOR pueden modificar órdenes médicas.'
  })
  @ApiParam({ 
    name: 'medicalOrderId', 
    description: 'ID interno de la orden médica',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Orden médica actualizada exitosamente',
    schema: {
      example: {
        medicalOrderId: 1,
        appointmentId: 1,
        description: "Orden actualizada para análisis de sangre completo",
        expirationDate: "2024-02-15T00:00:00.000Z",
        specialty: "Medicina General",
        createdAt: "2024-01-10T15:30:00.000Z",
        updatedAt: "2024-01-10T16:00:00.000Z"
      }
    }
  })
  async update(@Param('medicalOrderId', ParseIntPipe) medicalOrderId: number, @Body() dto: Partial<CreateMedicalOrderDto>) {
    const updateData: any = { ...dto };
    if (dto.expirationDate) {
      updateData.expirationDate = new Date(dto.expirationDate);
    }
    return this.medicalOrderService.update(medicalOrderId, updateData);
  }

  @Delete(':medicalOrderId')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ 
    summary: 'Eliminar una orden médica',
    description: 'Elimina permanentemente una orden médica del sistema. Solo ADMIN puede eliminar órdenes médicas.'
  })
  @ApiParam({ 
    name: 'medicalOrderId', 
    description: 'ID interno de la orden médica',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Orden médica eliminada exitosamente',
    schema: {
      example: {
        message: "Orden médica eliminada"
      }
    }
  })
  async delete(@Param('medicalOrderId', ParseIntPipe) medicalOrderId: number) {
    await this.medicalOrderService.delete(medicalOrderId);
    return { message: 'Orden médica eliminada' };
  }
} 