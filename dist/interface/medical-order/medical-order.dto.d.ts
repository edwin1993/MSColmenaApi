export declare class CreateMedicalOrderDto {
    appointmentId: number;
    description: string;
    expirationDate: string;
    specialty: string;
}
export declare class AddMedicationDto {
    medicationId: number;
}
export declare class MedicalOrderWithMedicationsDto {
    medicalOrderId: number;
    appointmentId: number;
    description: string;
    expirationDate: string;
    specialty: string;
    medications: number[];
}
