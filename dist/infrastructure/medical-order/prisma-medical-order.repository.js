"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaMedicalOrderRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const medical_order_entity_1 = require("../../domain/medical-order/medical-order.entity");
let PrismaMedicalOrderRepository = class PrismaMedicalOrderRepository {
    prisma = new client_1.PrismaClient();
    async create(medicalOrder) {
        const created = await this.prisma.medicalOrder.create({
            data: {
                appointmentId: medicalOrder.appointmentId,
                description: medicalOrder.description,
                expirationDate: medicalOrder.expirationDate,
                specialty: medicalOrder.specialty,
            },
        });
        return new medical_order_entity_1.MedicalOrder(created.medicalOrderId, created.appointmentId, created.description, created.expirationDate, created.specialty, created.createdAt, created.updatedAt);
    }
    async findById(medicalOrderId) {
        const found = await this.prisma.medicalOrder.findUnique({ where: { medicalOrderId } });
        if (!found)
            return null;
        return new medical_order_entity_1.MedicalOrder(found.medicalOrderId, found.appointmentId, found.description, found.expirationDate, found.specialty, found.createdAt, found.updatedAt);
    }
    async findByAppointmentId(appointmentId) {
        const medicalOrders = await this.prisma.medicalOrder.findMany({ where: { appointmentId } });
        return medicalOrders.map((mo) => new medical_order_entity_1.MedicalOrder(mo.medicalOrderId, mo.appointmentId, mo.description, mo.expirationDate, mo.specialty, mo.createdAt, mo.updatedAt));
    }
    async findAll() {
        const medicalOrders = await this.prisma.medicalOrder.findMany();
        return medicalOrders.map((mo) => new medical_order_entity_1.MedicalOrder(mo.medicalOrderId, mo.appointmentId, mo.description, mo.expirationDate, mo.specialty, mo.createdAt, mo.updatedAt));
    }
    async update(medicalOrderId, medicalOrder) {
        const { medicalOrderId: _, createdAt, updatedAt, ...data } = medicalOrder;
        const updated = await this.prisma.medicalOrder.update({
            where: { medicalOrderId },
            data,
        });
        return new medical_order_entity_1.MedicalOrder(updated.medicalOrderId, updated.appointmentId, updated.description, updated.expirationDate, updated.specialty, updated.createdAt, updated.updatedAt);
    }
    async delete(medicalOrderId) {
        await this.prisma.medicalOrder.delete({ where: { medicalOrderId } });
    }
    async addMedication(medicalOrderId, medicationId) {
        await this.prisma.medicalOrderMedication.create({
            data: {
                medicalOrderId,
                medicationId,
            },
        });
    }
    async removeMedication(medicalOrderId, medicationId) {
        await this.prisma.medicalOrderMedication.delete({
            where: {
                medicalOrderId_medicationId: {
                    medicalOrderId,
                    medicationId,
                },
            },
        });
    }
    async getMedications(medicalOrderId) {
        const medications = await this.prisma.medicalOrderMedication.findMany({
            where: { medicalOrderId },
            select: { medicationId: true },
        });
        return medications.map((m) => m.medicationId);
    }
};
exports.PrismaMedicalOrderRepository = PrismaMedicalOrderRepository;
exports.PrismaMedicalOrderRepository = PrismaMedicalOrderRepository = __decorate([
    (0, common_1.Injectable)()
], PrismaMedicalOrderRepository);
//# sourceMappingURL=prisma-medical-order.repository.js.map