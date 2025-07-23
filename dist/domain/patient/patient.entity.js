"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
class Patient {
    patientId;
    id;
    firstName;
    lastName;
    email;
    phone;
    address;
    city;
    constructor(patientId, id, firstName, lastName, email, phone, address, city) {
        this.patientId = patientId;
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.city = city;
    }
}
exports.Patient = Patient;
//# sourceMappingURL=patient.entity.js.map