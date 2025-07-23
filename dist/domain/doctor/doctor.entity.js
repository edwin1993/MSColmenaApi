"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
class Doctor {
    doctorId;
    id;
    firstName;
    lastName;
    email;
    phone;
    address;
    city;
    professionalCard;
    admissionDate;
    constructor(doctorId, id, firstName, lastName, email, phone, address, city, professionalCard, admissionDate) {
        this.doctorId = doctorId;
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.professionalCard = professionalCard;
        this.admissionDate = admissionDate;
    }
}
exports.Doctor = Doctor;
//# sourceMappingURL=doctor.entity.js.map