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
exports.CreateMedicationDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateMedicationDto {
    name;
    description;
    prescribedFor;
}
exports.CreateMedicationDto = CreateMedicationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del medicamento',
        example: 'Paracetamol',
        minLength: 1,
        maxLength: 200
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 200),
    __metadata("design:type", String)
], CreateMedicationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descripción del medicamento',
        example: 'Analgésico y antipirético utilizado para tratar el dolor y la fiebre',
        minLength: 1
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1),
    __metadata("design:type", String)
], CreateMedicationDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Enfermedades o condiciones para las que se prescribe el medicamento',
        example: 'Dolor de cabeza, fiebre, dolores musculares',
        minLength: 1
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1),
    __metadata("design:type", String)
], CreateMedicationDto.prototype, "prescribedFor", void 0);
//# sourceMappingURL=medication.dto.js.map