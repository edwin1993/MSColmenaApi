"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaDoctorRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const doctor_entity_1 = require("../../domain/doctor/doctor.entity");
let PrismaDoctorRepository = class PrismaDoctorRepository {
    prisma = new client_1.PrismaClient();
    async create(doctor) {
        const created = await this.prisma.doctor.create({
            data: {
                id: doctor.id,
                firstName: doctor.firstName,
                lastName: doctor.lastName,
                email: doctor.email,
                phone: doctor.phone,
                address: doctor.address,
                city: doctor.city,
                professionalCard: doctor.professionalCard,
                admissionDate: doctor.admissionDate,
            },
        });
        return new doctor_entity_1.Doctor(created.doctorId, created.id, created.firstName, created.lastName, created.email, created.phone, created.address, created.city, created.professionalCard, created.admissionDate);
    }
    async findById(id) {
        const found = await this.prisma.doctor.findUnique({ where: { id } });
        if (!found)
            return null;
        return new doctor_entity_1.Doctor(found.doctorId, found.id, found.firstName, found.lastName, found.email, found.phone, found.address, found.city, found.professionalCard, found.admissionDate);
    }
    async findByEmail(email) {
        const found = await this.prisma.doctor.findUnique({ where: { email } });
        if (!found)
            return null;
        return new doctor_entity_1.Doctor(found.doctorId, found.id, found.firstName, found.lastName, found.email, found.phone, found.address, found.city, found.professionalCard, found.admissionDate);
    }
    async findByProfessionalCard(professionalCard) {
        const found = await this.prisma.doctor.findUnique({ where: { professionalCard } });
        if (!found)
            return null;
        return new doctor_entity_1.Doctor(found.doctorId, found.id, found.firstName, found.lastName, found.email, found.phone, found.address, found.city, found.professionalCard, found.admissionDate);
    }
    async findAll() {
        const doctors = await this.prisma.doctor.findMany();
        return doctors.map((d) => new doctor_entity_1.Doctor(d.doctorId, d.id, d.firstName, d.lastName, d.email, d.phone, d.address, d.city, d.professionalCard, d.admissionDate));
    }
    async update(doctorId, doctor) {
        const { doctorId: _, ...data } = doctor;
        const updated = await this.prisma.doctor.update({
            where: { doctorId },
            data,
        });
        return new doctor_entity_1.Doctor(updated.doctorId, updated.id, updated.firstName, updated.lastName, updated.email, updated.phone, updated.address, updated.city, updated.professionalCard, updated.admissionDate);
    }
    async delete(doctorId) {
        await this.prisma.doctor.delete({ where: { doctorId } });
    }
};
exports.PrismaDoctorRepository = PrismaDoctorRepository;
exports.PrismaDoctorRepository = PrismaDoctorRepository = __decorate([
    (0, common_1.Injectable)()
], PrismaDoctorRepository);
//# sourceMappingURL=prisma-doctor.repository.js.map