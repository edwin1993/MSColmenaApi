"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAppointmentRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const appointment_entity_1 = require("../../domain/appointment/appointment.entity");
let PrismaAppointmentRepository = class PrismaAppointmentRepository {
    prisma = new client_1.PrismaClient();
    async create(appointment) {
        const created = await this.prisma.appointment.create({
            data: {
                doctorId: appointment.doctorId,
                patientId: appointment.patientId,
                appointmentDate: appointment.appointmentDate,
                status: appointment.status,
                statusUpdateDate: appointment.statusUpdateDate,
            },
        });
        return new appointment_entity_1.Appointment(created.appointmentId, created.doctorId, created.patientId, created.appointmentDate, created.status, created.statusUpdateDate, created.createdAt, created.updatedAt);
    }
    async findById(appointmentId) {
        const found = await this.prisma.appointment.findUnique({ where: { appointmentId } });
        if (!found)
            return null;
        return new appointment_entity_1.Appointment(found.appointmentId, found.doctorId, found.patientId, found.appointmentDate, found.status, found.statusUpdateDate, found.createdAt, found.updatedAt);
    }
    async findByPatientId(patientId) {
        const appointments = await this.prisma.appointment.findMany({ where: { patientId } });
        return appointments.map((a) => new appointment_entity_1.Appointment(a.appointmentId, a.doctorId, a.patientId, a.appointmentDate, a.status, a.statusUpdateDate, a.createdAt, a.updatedAt));
    }
    async findByDoctorId(doctorId) {
        const appointments = await this.prisma.appointment.findMany({ where: { doctorId } });
        return appointments.map((a) => new appointment_entity_1.Appointment(a.appointmentId, a.doctorId, a.patientId, a.appointmentDate, a.status, a.statusUpdateDate, a.createdAt, a.updatedAt));
    }
    async findByDateRange(startDate, endDate) {
        const appointments = await this.prisma.appointment.findMany({
            where: {
                appointmentDate: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
        return appointments.map((a) => new appointment_entity_1.Appointment(a.appointmentId, a.doctorId, a.patientId, a.appointmentDate, a.status, a.statusUpdateDate, a.createdAt, a.updatedAt));
    }
    async findByDoctorAndDate(doctorId, date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        const found = await this.prisma.appointment.findFirst({
            where: {
                doctorId,
                appointmentDate: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });
        if (!found)
            return null;
        return new appointment_entity_1.Appointment(found.appointmentId, found.doctorId, found.patientId, found.appointmentDate, found.status, found.statusUpdateDate, found.createdAt, found.updatedAt);
    }
    async findAvailableDoctors(date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        const allDoctors = await this.prisma.doctor.findMany({
            select: { doctorId: true },
        });
        const busyDoctors = await this.prisma.appointment.findMany({
            where: {
                appointmentDate: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
            select: { doctorId: true },
        });
        const busyDoctorIds = new Set(busyDoctors.map((d) => d.doctorId));
        return allDoctors
            .map((d) => d.doctorId)
            .filter((doctorId) => !busyDoctorIds.has(doctorId));
    }
    async updateStatus(appointmentId, status) {
        const updated = await this.prisma.appointment.update({
            where: { appointmentId },
            data: {
                status,
                statusUpdateDate: new Date(),
            },
        });
        return new appointment_entity_1.Appointment(updated.appointmentId, updated.doctorId, updated.patientId, updated.appointmentDate, updated.status, updated.statusUpdateDate, updated.createdAt, updated.updatedAt);
    }
    async delete(appointmentId) {
        await this.prisma.appointment.delete({ where: { appointmentId } });
    }
    async findAll() {
        const appointments = await this.prisma.appointment.findMany();
        return appointments.map((a) => new appointment_entity_1.Appointment(a.appointmentId, a.doctorId, a.patientId, a.appointmentDate, a.status, a.statusUpdateDate, a.createdAt, a.updatedAt));
    }
};
exports.PrismaAppointmentRepository = PrismaAppointmentRepository;
exports.PrismaAppointmentRepository = PrismaAppointmentRepository = __decorate([
    (0, common_1.Injectable)()
], PrismaAppointmentRepository);
//# sourceMappingURL=prisma-appointment.repository.js.map