export declare class Doctor {
    readonly doctorId: number | null;
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly phone: string;
    readonly address: string;
    readonly city: string;
    readonly professionalCard: string;
    readonly admissionDate: Date;
    constructor(doctorId: number | null, id: string, firstName: string, lastName: string, email: string, phone: string, address: string, city: string, professionalCard: string, admissionDate: Date);
}
