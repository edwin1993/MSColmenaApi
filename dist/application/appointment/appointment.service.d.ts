import { Appointment, AppointmentStatus } from '../../domain/appointment/appointment.entity';
import { AppointmentRepository } from '../../domain/appointment/appointment.repository';
export declare class AppointmentService {
    private readonly appointmentRepository;
    constructor(appointmentRepository: AppointmentRepository);
    create(appointment: Omit<Appointment, 'appointmentId' | 'createdAt' | 'updatedAt'>): Promise<Appointment>;
    findById(appointmentId: number): Promise<Appointment | null>;
    findByPatientId(patientId: number): Promise<Appointment[]>;
    findByDoctorId(doctorId: number): Promise<Appointment[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<Appointment[]>;
    findAvailableDoctors(date: Date): Promise<number[]>;
    updateStatus(appointmentId: number, status: AppointmentStatus): Promise<Appointment>;
    delete(appointmentId: number): Promise<void>;
    findAll(): Promise<Appointment[]>;
}
