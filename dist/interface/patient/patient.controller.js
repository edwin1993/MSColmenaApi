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
exports.PatientController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const patient_service_1 = require("../../application/patient/patient.service");
const patient_dto_1 = require("./patient.dto");
let PatientController = class PatientController {
    patientService;
    constructor(patientService) {
        this.patientService = patientService;
    }
    async create(dto) {
        try {
            const patient = await this.patientService.create(dto);
            return patient;
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.HttpException('El paciente ya está registrado', common_1.HttpStatus.CONFLICT);
            }
            throw new common_1.HttpException('Error al registrar paciente', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        return this.patientService.findAll();
    }
    async findById(id) {
        const patient = await this.patientService.findById(id);
        if (!patient) {
            throw new common_1.HttpException('Paciente no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        return patient;
    }
    async update(patientId, dto) {
        return this.patientService.update(patientId, dto);
    }
    async delete(patientId) {
        await this.patientService.delete(patientId);
        return { message: 'Paciente eliminado' };
    }
};
exports.PatientController = PatientController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear un nuevo paciente',
        description: 'Registra un nuevo paciente en el sistema. Valida que no exista un paciente con la misma identificación o email.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'El paciente ya está registrado (conflicto con identificación o email)',
        schema: {
            example: {
                statusCode: 409,
                message: "El paciente ya está registrado",
                error: "Conflict"
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error interno del servidor',
        schema: {
            example: {
                statusCode: 500,
                message: "Error al registrar paciente",
                error: "Internal Server Error"
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [patient_dto_1.CreatePatientDto]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener todos los pacientes',
        description: 'Retorna una lista de todos los pacientes registrados en el sistema.'
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener un paciente por identificación',
        description: 'Busca un paciente específico usando su número de identificación.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Número de identificación del paciente (solo números)',
        example: '1234567890'
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Paciente no encontrado',
        schema: {
            example: {
                statusCode: 404,
                message: "Paciente no encontrado",
                error: "Not Found"
            }
        }
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':patientId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar un paciente',
        description: 'Actualiza la información de un paciente existente usando su ID interno.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'patientId',
        description: 'ID interno del paciente (número autoincremental)',
        example: 1
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':patientId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar un paciente',
        description: 'Elimina permanentemente un paciente del sistema usando su ID interno.'
    }),
    (0, swagger_1.ApiParam)({
        name: 'patientId',
        description: 'ID interno del paciente (número autoincremental)',
        example: 1
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Paciente eliminado exitosamente',
        schema: {
            example: {
                message: "Paciente eliminado"
            }
        }
    }),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "delete", null);
exports.PatientController = PatientController = __decorate([
    (0, swagger_1.ApiTags)('Pacientes'),
    (0, common_1.Controller)('patients'),
    __metadata("design:paramtypes", [patient_service_1.PatientService])
], PatientController);
//# sourceMappingURL=patient.controller.js.map