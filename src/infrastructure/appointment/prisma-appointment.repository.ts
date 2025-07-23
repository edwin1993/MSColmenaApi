import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Appointment, AppointmentStatus } from '../../domain/appointment/appointment.entity';
import { AppointmentRepository } from '../../domain/appointment/appointment.repository';

@Injectable()
export class PrismaAppointmentRepository implements AppointmentRepository {
  private prisma = new PrismaClient();

  async create(appointment: Appointment): Promise<Appointment> {
    const created = await this.prisma.appointment.create({
      data: {
        doctorId: appointment.doctorId,
        patientId: appointment.patientId,
        appointmentDate: appointment.appointmentDate,
        status: appointment.status,
        statusUpdateDate: appointment.statusUpdateDate,
      },
    });
    return new Appointment(
      created.appointmentId,
      created.doctorId,
      created.patientId,
      created.appointmentDate,
      created.status as AppointmentStatus,
      created.statusUpdateDate,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findById(appointmentId: number): Promise<Appointment | null> {
    const found = await this.prisma.appointment.findUnique({ where: { appointmentId } });
    if (!found) return null;
    return new Appointment(
      found.appointmentId,
      found.doctorId,
      found.patientId,
      found.appointmentDate,
      found.status as AppointmentStatus,
      found.statusUpdateDate,
      found.createdAt,
      found.updatedAt,
    );
  }

  async findByPatientId(patientId: number): Promise<Appointment[]> {
    const appointments = await this.prisma.appointment.findMany({ where: { patientId } });
    return appointments.map(
      (a: any) =>
        new Appointment(
          a.appointmentId,
          a.doctorId,
          a.patientId,
          a.appointmentDate,
          a.status as AppointmentStatus,
          a.statusUpdateDate,
          a.createdAt,
          a.updatedAt,
        ),
    );
  }

  async findByDoctorId(doctorId: number): Promise<Appointment[]> {
    const appointments = await this.prisma.appointment.findMany({ where: { doctorId } });
    return appointments.map(
      (a: any) =>
        new Appointment(
          a.appointmentId,
          a.doctorId,
          a.patientId,
          a.appointmentDate,
          a.status as AppointmentStatus,
          a.statusUpdateDate,
          a.createdAt,
          a.updatedAt,
        ),
    );
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Appointment[]> {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        appointmentDate: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    return appointments.map(
      (a: any) =>
        new Appointment(
          a.appointmentId,
          a.doctorId,
          a.patientId,
          a.appointmentDate,
          a.status as AppointmentStatus,
          a.statusUpdateDate,
          a.createdAt,
          a.updatedAt,
        ),
    );
  }

  async findByDoctorAndDate(doctorId: number, date: Date): Promise<Appointment | null> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const found = await this.prisma.appointment.findFirst({
      where: {
        doctorId,
        appointmentDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    
    if (!found) return null;
    return new Appointment(
      found.appointmentId,
      found.doctorId,
      found.patientId,
      found.appointmentDate,
      found.status as AppointmentStatus,
      found.statusUpdateDate,
      found.createdAt,
      found.updatedAt,
    );
  }

  async findAvailableDoctors(date: Date): Promise<number[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Obtener todos los doctores
    const allDoctors = await this.prisma.doctor.findMany({
      select: { doctorId: true },
    });

    // Obtener doctores ocupados en esa fecha
    const busyDoctors = await this.prisma.appointment.findMany({
      where: {
        appointmentDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      select: { doctorId: true },
    });

    const busyDoctorIds = new Set(busyDoctors.map((d: any) => d.doctorId));
    return allDoctors
      .map((d: any) => d.doctorId)
      .filter((doctorId: number) => !busyDoctorIds.has(doctorId));
  }

  async updateStatus(appointmentId: number, status: AppointmentStatus): Promise<Appointment> {
    const updated = await this.prisma.appointment.update({
      where: { appointmentId },
      data: {
        status,
        statusUpdateDate: new Date(),
      },
    });
    return new Appointment(
      updated.appointmentId,
      updated.doctorId,
      updated.patientId,
      updated.appointmentDate,
      updated.status as AppointmentStatus,
      updated.statusUpdateDate,
      updated.createdAt,
      updated.updatedAt,
    );
  }

  async delete(appointmentId: number): Promise<void> {
    await this.prisma.appointment.delete({ where: { appointmentId } });
  }

  async findAll(): Promise<Appointment[]> {
    const appointments = await this.prisma.appointment.findMany();
    return appointments.map(
      (a: any) =>
        new Appointment(
          a.appointmentId,
          a.doctorId,
          a.patientId,
          a.appointmentDate,
          a.status as AppointmentStatus,
          a.statusUpdateDate,
          a.createdAt,
          a.updatedAt,
        ),
    );
  }
} 