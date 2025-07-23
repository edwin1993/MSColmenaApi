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
exports.MedicationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const medication_service_1 = require("../../application/medication/medication.service");
const medication_dto_1 = require("./medication.dto");
let MedicationController = class MedicationController {
    medicationService;
    constructor(medicationService) {
        this.medicationService = medicationService;
    }
    async create(dto) {
        try {
            const medication = await this.medicationService.create(dto);
            return medication;
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.HttpException('El medicamento ya está registrado', common_1.HttpStatus.CONFLICT);
            }
            throw new common_1.HttpException('Error al registrar medicamento', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        return this.medicationService.findAll();
    }
    async findById(medicationId) {
        const medication = await this.medicationService.findById(medicationId);
        if (!medication) {
            throw new common_1.HttpException('Medicamento no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        return medication;
    }
    async update(medicationId, dto) {
        return this.medicationService.update(medicationId, dto);
    }
    async delete(medicationId) {
        await this.medicationService.delete(medicationId);
        return { message: 'Medicamento eliminado' };
    }
};
exports.MedicationController = MedicationController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear un nuevo medicamento',
        description: 'Registra un nuevo medicamento en el sistema. Valida que no exista un medicamento con el mismo nombre.'
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'El medicamento ya está registrado',
        schema: {
            example: {
                statusCode: 409,
                message: "El medicamento ya está registrado",
                error: "Conflict"
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [medication_dto_1.CreateMedicationDto]),
    __metadata("design:returntype", Promise)
], MedicationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener todos los medicamentos',
        description: 'Retorna una lista de todos los medicamentos registrados en el sistema.'
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MedicationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':medicationId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener un medicamento por ID',
        description: 'Busca un medicamento específico usando su ID interno.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'medicationId',
        description: 'ID interno del medicamento',
        example: 1
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Medicamento no encontrado',
        schema: {
            example: {
                statusCode: 404,
                message: "Medicamento no encontrado",
                error: "Not Found"
            }
        }
    }),
    __param(0, (0, common_1.Param)('medicationId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MedicationController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':medicationId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar un medicamento',
        description: 'Actualiza la información de un medicamento existente usando su ID interno.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'medicationId',
        description: 'ID interno del medicamento',
        example: 1
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Param)('medicationId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MedicationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':medicationId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar un medicamento',
        description: 'Elimina permanentemente un medicamento del sistema usando su ID interno.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'medicationId',
        description: 'ID interno del medicamento',
        example: 1
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Medicamento eliminado exitosamente',
        schema: {
            example: {
                message: "Medicamento eliminado"
            }
        }
    }),
    __param(0, (0, common_1.Param)('medicationId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MedicationController.prototype, "delete", null);
exports.MedicationController = MedicationController = __decorate([
    (0, swagger_1.ApiTags)('Medicamentos'),
    (0, common_1.Controller)('medications'),
    __metadata("design:paramtypes", [medication_service_1.MedicationService])
], MedicationController);
//# sourceMappingURL=medication.controller.js.map