"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaMedicationRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const medication_entity_1 = require("../../domain/medication/medication.entity");
let PrismaMedicationRepository = class PrismaMedicationRepository {
    prisma = new client_1.PrismaClient();
    async create(medication) {
        const created = await this.prisma.medication.create({
            data: {
                name: medication.name,
                description: medication.description,
                prescribedFor: medication.prescribedFor,
            },
        });
        return new medication_entity_1.Medication(created.medicationId, created.name, created.description, created.prescribedFor, created.createdAt, created.updatedAt);
    }
    async findById(medicationId) {
        const found = await this.prisma.medication.findUnique({ where: { medicationId } });
        if (!found)
            return null;
        return new medication_entity_1.Medication(found.medicationId, found.name, found.description, found.prescribedFor, found.createdAt, found.updatedAt);
    }
    async findByName(name) {
        const found = await this.prisma.medication.findUnique({ where: { name } });
        if (!found)
            return null;
        return new medication_entity_1.Medication(found.medicationId, found.name, found.description, found.prescribedFor, found.createdAt, found.updatedAt);
    }
    async findAll() {
        const medications = await this.prisma.medication.findMany();
        return medications.map((m) => new medication_entity_1.Medication(m.medicationId, m.name, m.description, m.prescribedFor, m.createdAt, m.updatedAt));
    }
    async update(medicationId, medication) {
        const { medicationId: _, createdAt, updatedAt, ...data } = medication;
        const updated = await this.prisma.medication.update({
            where: { medicationId },
            data,
        });
        return new medication_entity_1.Medication(updated.medicationId, updated.name, updated.description, updated.prescribedFor, updated.createdAt, updated.updatedAt);
    }
    async delete(medicationId) {
        await this.prisma.medication.delete({ where: { medicationId } });
    }
};
exports.PrismaMedicationRepository = PrismaMedicationRepository;
exports.PrismaMedicationRepository = PrismaMedicationRepository = __decorate([
    (0, common_1.Injectable)()
], PrismaMedicationRepository);
//# sourceMappingURL=prisma-medication.repository.js.map