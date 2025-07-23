"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaPatientRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const patient_entity_1 = require("../../domain/patient/patient.entity");
let PrismaPatientRepository = class PrismaPatientRepository {
    prisma = new client_1.PrismaClient();
    async create(patient) {
        const created = await this.prisma.patient.create({
            data: {
                id: patient.id,
                firstName: patient.firstName,
                lastName: patient.lastName,
                email: patient.email,
                phone: patient.phone,
                address: patient.address,
                city: patient.city,
            },
        });
        return new patient_entity_1.Patient(created.patientId, created.id, created.firstName, created.lastName, created.email, created.phone, created.address, created.city);
    }
    async findById(id) {
        const found = await this.prisma.patient.findUnique({ where: { id } });
        if (!found)
            return null;
        return new patient_entity_1.Patient(found.patientId, found.id, found.firstName, found.lastName, found.email, found.phone, found.address, found.city);
    }
    async findByEmail(email) {
        const found = await this.prisma.patient.findUnique({ where: { email } });
        if (!found)
            return null;
        return new patient_entity_1.Patient(found.patientId, found.id, found.firstName, found.lastName, found.email, found.phone, found.address, found.city);
    }
    async findAll() {
        const patients = await this.prisma.patient.findMany();
        return patients.map((p) => new patient_entity_1.Patient(p.patientId, p.id, p.firstName, p.lastName, p.email, p.phone, p.address, p.city));
    }
    async update(patientId, patient) {
        const { patientId: _, ...data } = patient;
        const updated = await this.prisma.patient.update({
            where: { patientId },
            data,
        });
        return new patient_entity_1.Patient(updated.patientId, updated.id, updated.firstName, updated.lastName, updated.email, updated.phone, updated.address, updated.city);
    }
    async delete(patientId) {
        await this.prisma.patient.delete({ where: { patientId } });
    }
};
exports.PrismaPatientRepository = PrismaPatientRepository;
exports.PrismaPatientRepository = PrismaPatientRepository = __decorate([
    (0, common_1.Injectable)()
], PrismaPatientRepository);
//# sourceMappingURL=prisma-patient.repository.js.map