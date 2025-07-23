"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medication = void 0;
class Medication {
    medicationId;
    name;
    description;
    prescribedFor;
    createdAt;
    updatedAt;
    constructor(medicationId, name, description, prescribedFor, createdAt = null, updatedAt = null) {
        this.medicationId = medicationId;
        this.name = name;
        this.description = description;
        this.prescribedFor = prescribedFor;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.Medication = Medication;
//# sourceMappingURL=medication.entity.js.map