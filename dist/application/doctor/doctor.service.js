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
exports.DoctorService = void 0;
const common_1 = require("@nestjs/common");
const doctor_entity_1 = require("../../domain/doctor/doctor.entity");
let DoctorService = class DoctorService {
    doctorRepository;
    constructor(doctorRepository) {
        this.doctorRepository = doctorRepository;
    }
    async create(doctor) {
        return this.doctorRepository.create(new doctor_entity_1.Doctor(null, doctor.id, doctor.firstName, doctor.lastName, doctor.email, doctor.phone, doctor.address, doctor.city, doctor.professionalCard, doctor.admissionDate));
    }
    async findById(id) {
        return this.doctorRepository.findById(id);
    }
    async findAll() {
        return this.doctorRepository.findAll();
    }
    async update(doctorId, doctor) {
        return this.doctorRepository.update(doctorId, doctor);
    }
    async delete(doctorId) {
        return this.doctorRepository.delete(doctorId);
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DoctorRepository')),
    __metadata("design:paramtypes", [Object])
], DoctorService);
//# sourceMappingURL=doctor.service.js.map