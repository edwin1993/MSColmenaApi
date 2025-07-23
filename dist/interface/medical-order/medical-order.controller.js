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
exports.MedicalOrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const medical_order_service_1 = require("../../application/medical-order/medical-order.service");
const medical_order_dto_1 = require("./medical-order.dto");
let MedicalOrderController = class MedicalOrderController {
    medicalOrderService;
    constructor(medicalOrderService) {
        this.medicalOrderService = medicalOrderService;
    }
    async create(dto) {
        try {
            const medicalOrder = await this.medicalOrderService.create({
                appointmentId: dto.appointmentId,
                description: dto.description,
                expirationDate: new Date(dto.expirationDate),
                specialty: dto.specialty,
            });
            return medicalOrder;
        }
        catch (error) {
            throw new common_1.HttpException('Error al crear la orden médica', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        return this.medicalOrderService.findAll();
    }
    async findByAppointmentId(appointmentId) {
        return this.medicalOrderService.findByAppointmentId(appointmentId);
    }
    async findById(medicalOrderId) {
        const medicalOrder = await this.medicalOrderService.findById(medicalOrderId);
        if (!medicalOrder) {
            throw new common_1.HttpException('Orden médica no encontrada', common_1.HttpStatus.NOT_FOUND);
        }
        return medicalOrder;
    }
    async getMedications(medicalOrderId) {
        return this.medicalOrderService.getMedications(medicalOrderId);
    }
    async addMedication(medicalOrderId, dto) {
        try {
            await this.medicalOrderService.addMedication(medicalOrderId, dto.medicationId);
            return { message: 'Medicamento adjuntado exitosamente' };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Error al adjuntar medicamento', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeMedication(medicalOrderId, medicationId) {
        await this.medicalOrderService.removeMedication(medicalOrderId, medicationId);
        return { message: 'Medicamento removido exitosamente' };
    }
    async update(medicalOrderId, dto) {
        const updateData = { ...dto };
        if (dto.expirationDate) {
            updateData.expirationDate = new Date(dto.expirationDate);
        }
        return this.medicalOrderService.update(medicalOrderId, updateData);
    }
    async delete(medicalOrderId) {
        await this.medicalOrderService.delete(medicalOrderId);
        return { message: 'Orden médica eliminada' };
    }
};
exports.MedicalOrderController = MedicalOrderController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear una nueva orden médica',
        description: 'Crea una nueva orden médica y la adjunta a una cita específica.'
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [medical_order_dto_1.CreateMedicalOrderDto]),
    __metadata("design:returntype", Promise)
], MedicalOrderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener todas las órdenes médicas',
        description: 'Retorna una lista de todas las órdenes médicas registradas en el sistema.'
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MedicalOrderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('appointment/:appointmentId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener órdenes médicas por cita',
        description: 'Retorna todas las órdenes médicas adjuntas a una cita específica.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'appointmentId',
        description: 'ID de la cita médica',
        example: 1
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Param)('appointmentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MedicalOrderController.prototype, "findByAppointmentId", null);
__decorate([
    (0, common_1.Get)(':medicalOrderId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener una orden médica por ID',
        description: 'Busca una orden médica específica usando su ID interno.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'medicalOrderId',
        description: 'ID interno de la orden médica',
        example: 1
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Orden médica no encontrada',
        schema: {
            example: {
                statusCode: 404,
                message: "Orden médica no encontrada",
                error: "Not Found"
            }
        }
    }),
    __param(0, (0, common_1.Param)('medicalOrderId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MedicalOrderController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(':medicalOrderId/medications'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener medicamentos de una orden médica',
        description: 'Retorna la lista de IDs de medicamentos adjuntos a una orden médica específica.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'medicalOrderId',
        description: 'ID interno de la orden médica',
        example: 1
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de IDs de medicamentos',
        schema: {
            example: [1, 2, 3]
        }
    }),
    __param(0, (0, common_1.Param)('medicalOrderId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MedicalOrderController.prototype, "getMedications", null);
__decorate([
    (0, common_1.Post)(':medicalOrderId/medications'),
    (0, swagger_1.ApiOperation)({
        summary: 'Adjuntar medicamento a una orden médica',
        description: 'Agrega un medicamento específico a una orden médica existente.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'medicalOrderId',
        description: 'ID interno de la orden médica',
        example: 1
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Medicamento adjuntado exitosamente',
        schema: {
            example: {
                message: "Medicamento adjuntado exitosamente"
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Orden médica no encontrada',
        schema: {
            example: {
                statusCode: 400,
                message: "Orden médica no encontrada",
                error: "Bad Request"
            }
        }
    }),
    __param(0, (0, common_1.Param)('medicalOrderId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, medical_order_dto_1.AddMedicationDto]),
    __metadata("design:returntype", Promise)
], MedicalOrderController.prototype, "addMedication", null);
__decorate([
    (0, common_1.Delete)(':medicalOrderId/medications/:medicationId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Remover medicamento de una orden médica',
        description: 'Elimina un medicamento específico de una orden médica existente.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'medicalOrderId',
        description: 'ID interno de la orden médica',
        example: 1
    }),
    (0, swagger_1.ApiParam)({
        name: 'medicationId',
        description: 'ID del medicamento a remover',
        example: 1
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Medicamento removido exitosamente',
        schema: {
            example: {
                message: "Medicamento removido exitosamente"
            }
        }
    }),
    __param(0, (0, common_1.Param)('medicalOrderId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('medicationId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], MedicalOrderController.prototype, "removeMedication", null);
__decorate([
    (0, common_1.Put)(':medicalOrderId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar una orden médica',
        description: 'Actualiza la información de una orden médica existente usando su ID interno.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'medicalOrderId',
        description: 'ID interno de la orden médica',
        example: 1
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Param)('medicalOrderId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MedicalOrderController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':medicalOrderId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar una orden médica',
        description: 'Elimina permanentemente una orden médica del sistema usando su ID interno.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'medicalOrderId',
        description: 'ID interno de la orden médica',
        example: 1
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Orden médica eliminada exitosamente',
        schema: {
            example: {
                message: "Orden médica eliminada"
            }
        }
    }),
    __param(0, (0, common_1.Param)('medicalOrderId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MedicalOrderController.prototype, "delete", null);
exports.MedicalOrderController = MedicalOrderController = __decorate([
    (0, swagger_1.ApiTags)('Órdenes Médicas'),
    (0, common_1.Controller)('medical-orders'),
    __metadata("design:paramtypes", [medical_order_service_1.MedicalOrderService])
], MedicalOrderController);
//# sourceMappingURL=medical-order.controller.js.map