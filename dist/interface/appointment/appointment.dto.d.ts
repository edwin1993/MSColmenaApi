import { AppointmentStatus } from '../../domain/appointment/appointment.entity';
export declare class CreateAppointmentDto {
    doctorId: number;
    patientId: number;
    appointmentDate: string;
}
export declare class UpdateAppointmentStatusDto {
    status: AppointmentStatus;
}
export declare class SearchAppointmentsDto {
    patientId?: number;
    doctorId?: number;
    startDate?: string;
    endDate?: string;
}
