export declare class MedicalOrder {
    readonly medicalOrderId: number | null;
    readonly appointmentId: number;
    readonly description: string;
    readonly expirationDate: Date;
    readonly specialty: string;
    readonly createdAt: Date | null;
    readonly updatedAt: Date | null;
    constructor(medicalOrderId: number | null, appointmentId: number, description: string, expirationDate: Date, specialty: string, createdAt?: Date | null, updatedAt?: Date | null);
}
