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
exports.DoctorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const doctor_service_1 = require("../../application/doctor/doctor.service");
const doctor_dto_1 = require("./doctor.dto");
const jwt_auth_guard_1 = require("../../infrastructure/auth/jwt-auth.guard");
const roles_guard_1 = require("../../infrastructure/auth/roles.guard");
const roles_decorator_1 = require("../../infrastructure/auth/roles.decorator");
const user_entity_1 = require("../../domain/auth/user.entity");
let DoctorController = class DoctorController {
    doctorService;
    constructor(doctorService) {
        this.doctorService = doctorService;
    }
    create(createDoctorDto) {
        const doctorData = {
            ...createDoctorDto,
            admissionDate: new Date(createDoctorDto.admissionDate),
        };
        return this.doctorService.create(doctorData);
    }
    findAll() {
        return this.doctorService.findAll();
    }
    findOne(id) {
        return this.doctorService.findById(id);
    }
    update(id, updateDoctorDto) {
        const updateData = { ...updateDoctorDto };
        if (updateDoctorDto.admissionDate) {
            updateData.admissionDate = new Date(updateDoctorDto.admissionDate);
        }
        return this.doctorService.update(+id, updateData);
    }
    remove(id) {
        return this.doctorService.delete(+id);
    }
};
exports.DoctorController = DoctorController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo doctor (solo ADMIN)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Doctor creado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'No autorizado' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acceso denegado - se requiere rol ADMIN' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [doctor_dto_1.CreateDoctorDto]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.DOCTOR, user_entity_1.UserRole.NURSE, user_entity_1.UserRole.RECEPTIONIST),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los doctores' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de doctores obtenida exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'No autorizado' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.DOCTOR, user_entity_1.UserRole.NURSE, user_entity_1.UserRole.RECEPTIONIST),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un doctor por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Doctor encontrado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Doctor no encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'No autorizado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.DOCTOR),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un doctor (solo ADMIN y DOCTOR)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Doctor actualizado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Doctor no encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'No autorizado' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acceso denegado - se requiere rol ADMIN o DOCTOR' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, doctor_dto_1.UpdateDoctorDto]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un doctor (solo ADMIN)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Doctor eliminado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Doctor no encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'No autorizado' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acceso denegado - se requiere rol ADMIN' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "remove", null);
exports.DoctorController = DoctorController = __decorate([
    (0, swagger_1.ApiTags)('Doctores'),
    (0, common_1.Controller)('doctors'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService])
], DoctorController);
//# sourceMappingURL=doctor.controller.js.map