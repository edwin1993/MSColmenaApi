import { Appointment, AppointmentStatus } from './appointment.entity';

export interface AppointmentRepository {
  create(appointment: Appointment): Promise<Appointment>;
  findById(appointmentId: number): Promise<Appointment | null>;
  findByPatientId(patientId: number): Promise<Appointment[]>;
  findByDoctorId(doctorId: number): Promise<Appointment[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<Appointment[]>;
  findByDoctorAndDate(doctorId: number, date: Date): Promise<Appointment | null>;
  findAvailableDoctors(date: Date): Promise<number[]>;
  updateStatus(appointmentId: number, status: AppointmentStatus): Promise<Appointment>;
  delete(appointmentId: number): Promise<void>;
  findAll(): Promise<Appointment[]>;
} 