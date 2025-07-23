"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = exports.AppointmentStatus = void 0;
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus["PROGRAMADA"] = "PROGRAMADA";
    AppointmentStatus["ASISTIO"] = "ASISTIO";
    AppointmentStatus["NO_ASISTIO"] = "NO_ASISTIO";
})(AppointmentStatus || (exports.AppointmentStatus = AppointmentStatus = {}));
class Appointment {
    appointmentId;
    doctorId;
    patientId;
    appointmentDate;
    status;
    statusUpdateDate;
    createdAt;
    updatedAt;
    constructor(appointmentId, doctorId, patientId, appointmentDate, status = AppointmentStatus.PROGRAMADA, statusUpdateDate = null, createdAt = null, updatedAt = null) {
        this.appointmentId = appointmentId;
        this.doctorId = doctorId;
        this.patientId = patientId;
        this.appointmentDate = appointmentDate;
        this.status = status;
        this.statusUpdateDate = statusUpdateDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.Appointment = Appointment;
//# sourceMappingURL=appointment.entity.js.map