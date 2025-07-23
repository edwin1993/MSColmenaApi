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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { MedicationService } from '../../application/medication/medication.service';
import { CreateMedicationDto } from './medication.dto';

@ApiTags('Medicamentos')
@Controller('medications')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Crear un nuevo medicamento',
    description: 'Registra un nuevo medicamento en el sistema. Valida que no exista un medicamento con el mismo nombre.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Medicamento creado exitosamente',
    schema: {
      example: {
        medicationId: 1,
        name: "Paracetamol",
        description: "Analgésico y antipirético utilizado para tratar el dolor y la fiebre",
        prescribedFor: "Dolor de cabeza, fiebre, dolores musculares",
        createdAt: "2024-01-10T15:30:00.000Z",
        updatedAt: "2024-01-10T15:30:00.000Z"
      }
    }
  })
  @ApiResponse({ 
    status: 409, 
    description: 'El medicamento ya está registrado',
    schema: {
      example: {
        statusCode: 409,
        message: "El medicamento ya está registrado",
        error: "Conflict"
      }
    }
  })
  async create(@Body() dto: CreateMedicationDto) {
    try {
      const medication = await this.medicationService.create(dto);
      return medication;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException('El medicamento ya está registrado', HttpStatus.CONFLICT);
      }
      throw new HttpException('Error al registrar medicamento', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todos los medicamentos',
    description: 'Retorna una lista de todos los medicamentos registrados en el sistema.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de medicamentos obtenida exitosamente',
    schema: {
      example: [
        {
          medicationId: 1,
          name: "Paracetamol",
          description: "Analgésico y antipirético utilizado para tratar el dolor y la fiebre",
          prescribedFor: "Dolor de cabeza, fiebre, dolores musculares",
          createdAt: "2024-01-10T15:30:00.000Z",
          updatedAt: "2024-01-10T15:30:00.000Z"
        }
      ]
    }
  })
  async findAll() {
    return this.medicationService.findAll();
  }

  @Get(':medicationId')
  @ApiOperation({ 
    summary: 'Obtener un medicamento por ID',
    description: 'Busca un medicamento específico usando su ID interno.'
  })
  @ApiParam({ 
    name: 'medicationId', 
    description: 'ID interno del medicamento',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Medicamento encontrado',
    schema: {
      example: {
        medicationId: 1,
        name: "Paracetamol",
        description: "Analgésico y antipirético utilizado para tratar el dolor y la fiebre",
        prescribedFor: "Dolor de cabeza, fiebre, dolores musculares",
        createdAt: "2024-01-10T15:30:00.000Z",
        updatedAt: "2024-01-10T15:30:00.000Z"
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Medicamento no encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: "Medicamento no encontrado",
        error: "Not Found"
      }
    }
  })
  async findById(@Param('medicationId', ParseIntPipe) medicationId: number) {
    const medication = await this.medicationService.findById(medicationId);
    if (!medication) {
      throw new HttpException('Medicamento no encontrado', HttpStatus.NOT_FOUND);
    }
    return medication;
  }

  @Put(':medicationId')
  @ApiOperation({ 
    summary: 'Actualizar un medicamento',
    description: 'Actualiza la información de un medicamento existente usando su ID interno.'
  })
  @ApiParam({ 
    name: 'medicationId', 
    description: 'ID interno del medicamento',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Medicamento actualizado exitosamente',
    schema: {
      example: {
        medicationId: 1,
        name: "Paracetamol 500mg",
        description: "Analgésico y antipirético utilizado para tratar el dolor y la fiebre",
        prescribedFor: "Dolor de cabeza, fiebre, dolores musculares",
        createdAt: "2024-01-10T15:30:00.000Z",
        updatedAt: "2024-01-10T16:00:00.000Z"
      }
    }
  })
  async update(@Param('medicationId', ParseIntPipe) medicationId: number, @Body() dto: Partial<CreateMedicationDto>) {
    return this.medicationService.update(medicationId, dto);
  }

  @Delete(':medicationId')
  @ApiOperation({ 
    summary: 'Eliminar un medicamento',
    description: 'Elimina permanentemente un medicamento del sistema usando su ID interno.'
  })
  @ApiParam({ 
    name: 'medicationId', 
    description: 'ID interno del medicamento',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Medicamento eliminado exitosamente',
    schema: {
      example: {
        message: "Medicamento eliminado"
      }
    }
  })
  async delete(@Param('medicationId', ParseIntPipe) medicationId: number) {
    await this.medicationService.delete(medicationId);
    return { message: 'Medicamento eliminado' };
  }
} 