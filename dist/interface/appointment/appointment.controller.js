"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const appointment_service_1 = require("../../application/appointment/appointment.service");
const appointment_dto_1 = require("./appointment.dto");
const appointment_entity_1 = require("../../domain/appointment/appointment.entity");
let AppointmentController = class AppointmentController {
    appointmentService;
    constructor(appointmentService) {
        this.appointmentService = appointmentService;
    }
    async create(dto) {
        try {
            const appointment = await this.appointmentService.create({
                doctorId: dto.doctorId,
                patientId: dto.patientId,
                appointmentDate: new Date(dto.appointmentDate),
                status: appointment_entity_1.AppointmentStatus.PROGRAMADA,
                statusUpdateDate: null,
            });
            return appointment;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Error al crear la cita médica', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(query) {
        if (query.patientId) {
            return this.appointmentService.findByPatientId(query.patientId);
        }
        if (query.doctorId) {
            return this.appointmentService.findByDoctorId(query.doctorId);
        }
        if (query.startDate && query.endDate) {
            return this.appointmentService.findByDateRange(new Date(query.startDate), new Date(query.endDate));
        }
        return this.appointmentService.findAll();
    }
    async findAvailableDoctors(date) {
        return this.appointmentService.findAvailableDoctors(new Date(date));
    }
    async findById(appointmentId) {
        const appointment = await this.appointmentService.findById(appointmentId);
        if (!appointment) {
            throw new common_1.HttpException('Cita médica no encontrada', common_1.HttpStatus.NOT_FOUND);
        }
        return appointment;
    }
    async updateStatus(appointmentId, dto) {
        return this.appointmentService.updateStatus(appointmentId, dto.status);
    }
    async delete(appointmentId) {
        await this.appointmentService.delete(appointmentId);
        return { message: 'Cita médica eliminada' };
    }
};
exports.AppointmentController = AppointmentController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear una nueva cita médica',
        description: 'Registra una nueva cita médica. Valida que el médico esté disponible en la fecha y hora especificada.'
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'El médico no está disponible en esa fecha y hora',
        schema: {
            example: {
                statusCode: 400,
                message: "El médico no está disponible en esa fecha y hora",
                error: "Bad Request"
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [appointment_dto_1.CreateAppointmentDto]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener citas médicas con filtros',
        description: 'Retorna una lista de citas médicas con opciones de filtrado por paciente, médico y rango de fechas.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'patientId', required: false, description: 'ID del paciente' }),
    (0, swagger_1.ApiQuery)({ name: 'doctorId', required: false, description: 'ID del médico' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, description: 'Fecha de inicio' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, description: 'Fecha de fin' }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [appointment_dto_1.SearchAppointmentsDto]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('available-doctors'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener médicos disponibles por fecha',
        description: 'Retorna una lista de IDs de médicos que están disponibles en una fecha específica.'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'date',
        required: true,
        description: 'Fecha para verificar disponibilidad',
        example: '2024-01-15'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de médicos disponibles',
        schema: {
            example: [1, 2, 3]
        }
    }),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "findAvailableDoctors", null);
__decorate([
    (0, common_1.Get)(':appointmentId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener una cita médica por ID',
        description: 'Busca una cita médica específica usando su ID interno.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'appointmentId',
        description: 'ID interno de la cita médica',
        example: 1
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Cita médica no encontrada',
        schema: {
            example: {
                statusCode: 404,
                message: "Cita médica no encontrada",
                error: "Not Found"
            }
        }
    }),
    __param(0, (0, common_1.Param)('appointmentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':appointmentId/status'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar el estado de una cita médica',
        description: 'Permite al médico cambiar el estado de la cita (ASISTIO, NO_ASISTIO).'
    }),
    (0, swagger_1.ApiParam)({
        name: 'appointmentId',
        description: 'ID interno de la cita médica',
        example: 1
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Param)('appointmentId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, appointment_dto_1.UpdateAppointmentStatusDto]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':appointmentId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar una cita médica',
        description: 'Elimina permanentemente una cita médica del sistema.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'appointmentId',
        description: 'ID interno de la cita médica',
        example: 1
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cita médica eliminada exitosamente',
        schema: {
            example: {
                message: "Cita médica eliminada"
            }
        }
    }),
    __param(0, (0, common_1.Param)('appointmentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "delete", null);
exports.AppointmentController = AppointmentController = __decorate([
    (0, swagger_1.ApiTags)('Citas Médicas'),
    (0, common_1.Controller)('appointments'),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService])
], AppointmentController);
//# sourceMappingURL=appointment.controller.js.map