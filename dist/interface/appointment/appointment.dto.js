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
exports.SearchAppointmentsDto = exports.UpdateAppointmentStatusDto = exports.CreateAppointmentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const appointment_entity_1 = require("../../domain/appointment/appointment.entity");
class CreateAppointmentDto {
    doctorId;
    patientId;
    appointmentDate;
}
exports.CreateAppointmentDto = CreateAppointmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del médico que realizará la cita',
        example: 1
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAppointmentDto.prototype, "doctorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del paciente que asistirá a la cita',
        example: 1
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAppointmentDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha y hora de la cita',
        example: '2024-01-15T10:00:00.000Z'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "appointmentDate", void 0);
class UpdateAppointmentStatusDto {
    status;
}
exports.UpdateAppointmentStatusDto = UpdateAppointmentStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nuevo estado de la cita',
        enum: appointment_entity_1.AppointmentStatus,
        example: appointment_entity_1.AppointmentStatus.ASISTIO
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(appointment_entity_1.AppointmentStatus),
    __metadata("design:type", String)
], UpdateAppointmentStatusDto.prototype, "status", void 0);
class SearchAppointmentsDto {
    patientId;
    doctorId;
    startDate;
    endDate;
}
exports.SearchAppointmentsDto = SearchAppointmentsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del paciente para filtrar citas',
        example: 1,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SearchAppointmentsDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del médico para filtrar citas',
        example: 1,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SearchAppointmentsDto.prototype, "doctorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha de inicio para el rango de búsqueda',
        example: '2024-01-01T00:00:00.000Z',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SearchAppointmentsDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha de fin para el rango de búsqueda',
        example: '2024-01-31T23:59:59.999Z',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SearchAppointmentsDto.prototype, "endDate", void 0);
//# sourceMappingURL=appointment.dto.js.map