import { AppointmentService } from '../../application/appointment/appointment.service';
import { CreateAppointmentDto, UpdateAppointmentStatusDto, SearchAppointmentsDto } from './appointment.dto';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    create(dto: CreateAppointmentDto): Promise<import("../../domain/appointment/appointment.entity").Appointment>;
    findAll(query: SearchAppointmentsDto): Promise<import("../../domain/appointment/appointment.entity").Appointment[]>;
    findAvailableDoctors(date: string): Promise<number[]>;
    findById(appointmentId: number): Promise<import("../../domain/appointment/appointment.entity").Appointment>;
    updateStatus(appointmentId: number, dto: UpdateAppointmentStatusDto): Promise<import("../../domain/appointment/appointment.entity").Appointment>;
    delete(appointmentId: number): Promise<{
        message: string;
    }>;
}
