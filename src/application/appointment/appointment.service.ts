import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Appointment, AppointmentStatus } from '../../domain/appointment/appointment.entity';
import { AppointmentRepository } from '../../domain/appointment/appointment.repository';

@Injectable()
export class AppointmentService {
  constructor(
    @Inject('AppointmentRepository')
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  async create(appointment: Omit<Appointment, 'appointmentId' | 'createdAt' | 'updatedAt'>): Promise<Appointment> {
    // Validar que el médico esté disponible en esa fecha
    const existingAppointment = await this.appointmentRepository.findByDoctorAndDate(
      appointment.doctorId,
      appointment.appointmentDate,
    );
    
    if (existingAppointment) {
      throw new BadRequestException('El médico no está disponible en esa fecha y hora');
    }

    return this.appointmentRepository.create(
      new Appointment(
        null,
        appointment.doctorId,
        appointment.patientId,
        appointment.appointmentDate,
        AppointmentStatus.PROGRAMADA,
        null,
        null,
        null,
      ),
    );
  }

  async findById(appointmentId: number): Promise<Appointment | null> {
    return this.appointmentRepository.findById(appointmentId);
  }

  async findByPatientId(patientId: number): Promise<Appointment[]> {
    return this.appointmentRepository.findByPatientId(patientId);
  }

  async findByDoctorId(doctorId: number): Promise<Appointment[]> {
    return this.appointmentRepository.findByDoctorId(doctorId);
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Appointment[]> {
    return this.appointmentRepository.findByDateRange(startDate, endDate);
  }

  async findAvailableDoctors(date: Date): Promise<number[]> {
    return this.appointmentRepository.findAvailableDoctors(date);
  }

  async updateStatus(appointmentId: number, status: AppointmentStatus): Promise<Appointment> {
    return this.appointmentRepository.updateStatus(appointmentId, status);
  }

  async delete(appointmentId: number): Promise<void> {
    return this.appointmentRepository.delete(appointmentId);
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.findAll();
  }
} 