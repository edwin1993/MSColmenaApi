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
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const patient_entity_1 = require("../../domain/patient/patient.entity");
let PatientService = class PatientService {
    patientRepository;
    constructor(patientRepository) {
        this.patientRepository = patientRepository;
    }
    async create(patient) {
        return this.patientRepository.create(new patient_entity_1.Patient(null, patient.id, patient.firstName, patient.lastName, patient.email, patient.phone, patient.address, patient.city));
    }
    async findById(id) {
        return this.patientRepository.findById(id);
    }
    async findAll() {
        return this.patientRepository.findAll();
    }
    async update(patientId, patient) {
        return this.patientRepository.update(patientId, patient);
    }
    async delete(patientId) {
        return this.patientRepository.delete(patientId);
    }
};
exports.PatientService = PatientService;
exports.PatientService = PatientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PatientRepository')),
    __metadata("design:paramtypes", [Object])
], PatientService);
//# sourceMappingURL=patient.service.js.map