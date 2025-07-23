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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalOrderWithMedicationsDto = exports.AddMedicationDto = exports.CreateMedicalOrderDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateMedicalOrderDto {
    appointmentId;
    description;
    expirationDate;
    specialty;
}
exports.CreateMedicalOrderDto = CreateMedicalOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la cita médica a la que se adjunta la orden',
        example: 1
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMedicalOrderDto.prototype, "appointmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descripción de la orden médica',
        example: 'Orden para análisis de sangre completo',
        minLength: 1
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1),
    __metadata("design:type", String)
], CreateMedicalOrderDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha de caducidad de la orden médica',
        example: '2024-02-15T00:00:00.000Z'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateMedicalOrderDto.prototype, "expirationDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Especialidad médica de la orden',
        example: 'Medicina General',
        minLength: 1,
        maxLength: 100
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], CreateMedicalOrderDto.prototype, "specialty", void 0);
class AddMedicationDto {
    medicationId;
}
exports.AddMedicationDto = AddMedicationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del medicamento a adjuntar',
        example: 1
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddMedicationDto.prototype, "medicationId", void 0);
class MedicalOrderWithMedicationsDto {
    medicalOrderId;
    appointmentId;
    description;
    expirationDate;
    specialty;
    medications;
}
exports.MedicalOrderWithMedicationsDto = MedicalOrderWithMedicationsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la orden médica',
        example: 1
    }),
    __metadata("design:type", Number)
], MedicalOrderWithMedicationsDto.prototype, "medicalOrderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la cita médica',
        example: 1
    }),
    __metadata("design:type", Number)
], MedicalOrderWithMedicationsDto.prototype, "appointmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descripción de la orden',
        example: 'Orden para análisis de sangre completo'
    }),
    __metadata("design:type", String)
], MedicalOrderWithMedicationsDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha de caducidad',
        example: '2024-02-15T00:00:00.000Z'
    }),
    __metadata("design:type", String)
], MedicalOrderWithMedicationsDto.prototype, "expirationDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Especialidad médica',
        example: 'Medicina General'
    }),
    __metadata("design:type", String)
], MedicalOrderWithMedicationsDto.prototype, "specialty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de IDs de medicamentos adjuntos',
        example: [1, 2, 3]
    }),
    __metadata("design:type", Array)
], MedicalOrderWithMedicationsDto.prototype, "medications", void 0);
//# sourceMappingURL=medical-order.dto.js.map