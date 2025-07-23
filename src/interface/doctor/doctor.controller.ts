import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DoctorService } from '../../application/doctor/doctor.service';
import { CreateDoctorDto, UpdateDoctorDto } from './doctor.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { Roles } from '../../infrastructure/auth/roles.decorator';
import { UserRole } from '../../domain/auth/user.entity';

@ApiTags('Doctores')
@Controller('doctors')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Crear un nuevo doctor (solo ADMIN)' })
  @ApiResponse({ status: 201, description: 'Doctor creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado - se requiere rol ADMIN' })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    const doctorData = {
      ...createDoctorDto,
      admissionDate: new Date(createDoctorDto.admissionDate),
    };
    return this.doctorService.create(doctorData);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST)
  @ApiOperation({ summary: 'Obtener todos los doctores' })
  @ApiResponse({ status: 200, description: 'Lista de doctores obtenida exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST)
  @ApiOperation({ summary: 'Obtener un doctor por ID' })
  @ApiResponse({ status: 200, description: 'Doctor encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Doctor no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findOne(@Param('id') id: string) {
    return this.doctorService.findById(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @ApiOperation({ summary: 'Actualizar un doctor (solo ADMIN y DOCTOR)' })
  @ApiResponse({ status: 200, description: 'Doctor actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Doctor no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado - se requiere rol ADMIN o DOCTOR' })
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    const updateData: any = { ...updateDoctorDto };
    if (updateDoctorDto.admissionDate) {
      updateData.admissionDate = new Date(updateDoctorDto.admissionDate);
    }
    return this.doctorService.update(+id, updateData);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Eliminar un doctor (solo ADMIN)' })
  @ApiResponse({ status: 200, description: 'Doctor eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Doctor no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado - se requiere rol ADMIN' })
  remove(@Param('id') id: string) {
    return this.doctorService.delete(+id);
  }
} 