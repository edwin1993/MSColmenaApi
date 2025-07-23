"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalOrder = void 0;
class MedicalOrder {
    medicalOrderId;
    appointmentId;
    description;
    expirationDate;
    specialty;
    createdAt;
    updatedAt;
    constructor(medicalOrderId, appointmentId, description, expirationDate, specialty, createdAt = null, updatedAt = null) {
        this.medicalOrderId = medicalOrderId;
        this.appointmentId = appointmentId;
        this.description = description;
        this.expirationDate = expirationDate;
        this.specialty = specialty;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.MedicalOrder = MedicalOrder;
//# sourceMappingURL=medical-order.entity.js.map