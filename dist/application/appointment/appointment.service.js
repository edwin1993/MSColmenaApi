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
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const appointment_entity_1 = require("../../domain/appointment/appointment.entity");
let AppointmentService = class AppointmentService {
    appointmentRepository;
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    async create(appointment) {
        const existingAppointment = await this.appointmentRepository.findByDoctorAndDate(appointment.doctorId, appointment.appointmentDate);
        if (existingAppointment) {
            throw new common_1.BadRequestException('El médico no está disponible en esa fecha y hora');
        }
        return this.appointmentRepository.create(new appointment_entity_1.Appointment(null, appointment.doctorId, appointment.patientId, appointment.appointmentDate, appointment_entity_1.AppointmentStatus.PROGRAMADA, null, null, null));
    }
    async findById(appointmentId) {
        return this.appointmentRepository.findById(appointmentId);
    }
    async findByPatientId(patientId) {
        return this.appointmentRepository.findByPatientId(patientId);
    }
    async findByDoctorId(doctorId) {
        return this.appointmentRepository.findByDoctorId(doctorId);
    }
    async findByDateRange(startDate, endDate) {
        return this.appointmentRepository.findByDateRange(startDate, endDate);
    }
    async findAvailableDoctors(date) {
        return this.appointmentRepository.findAvailableDoctors(date);
    }
    async updateStatus(appointmentId, status) {
        return this.appointmentRepository.updateStatus(appointmentId, status);
    }
    async delete(appointmentId) {
        return this.appointmentRepository.delete(appointmentId);
    }
    async findAll() {
        return this.appointmentRepository.findAll();
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AppointmentRepository')),
    __metadata("design:paramtypes", [Object])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map