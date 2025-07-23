export declare enum AppointmentStatus {
    PROGRAMADA = "PROGRAMADA",
    ASISTIO = "ASISTIO",
    NO_ASISTIO = "NO_ASISTIO"
}
export declare class Appointment {
    readonly appointmentId: number | null;
    readonly doctorId: number;
    readonly patientId: number;
    readonly appointmentDate: Date;
    readonly status: AppointmentStatus;
    readonly statusUpdateDate: Date | null;
    readonly createdAt: Date | null;
    readonly updatedAt: Date | null;
    constructor(appointmentId: number | null, doctorId: number, patientId: number, appointmentDate: Date, status?: AppointmentStatus, statusUpdateDate?: Date | null, createdAt?: Date | null, updatedAt?: Date | null);
}
