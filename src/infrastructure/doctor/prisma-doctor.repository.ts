import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Doctor } from '../../domain/doctor/doctor.entity';
import { DoctorRepository } from '../../domain/doctor/doctor.repository';

@Injectable()
export class PrismaDoctorRepository implements DoctorRepository {
  private prisma = new PrismaClient();

  async create(doctor: Doctor): Promise<Doctor> {
    const created = await this.prisma.doctor.create({
      data: {
        id: doctor.id,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        email: doctor.email,
        phone: doctor.phone,
        address: doctor.address,
        city: doctor.city,
        professionalCard: doctor.professionalCard,
        admissionDate: doctor.admissionDate,
      },
    });
    return new Doctor(
      created.doctorId,
      created.id,
      created.firstName,
      created.lastName,
      created.email,
      created.phone,
      created.address,
      created.city,
      created.professionalCard,
      created.admissionDate,
    );
  }

  async findById(id: string): Promise<Doctor | null> {
    const found = await this.prisma.doctor.findUnique({ where: { id } });
    if (!found) return null;
    return new Doctor(
      found.doctorId,
      found.id,
      found.firstName,
      found.lastName,
      found.email,
      found.phone,
      found.address,
      found.city,
      found.professionalCard,
      found.admissionDate,
    );
  }

  async findByEmail(email: string): Promise<Doctor | null> {
    const found = await this.prisma.doctor.findUnique({ where: { email } });
    if (!found) return null;
    return new Doctor(
      found.doctorId,
      found.id,
      found.firstName,
      found.lastName,
      found.email,
      found.phone,
      found.address,
      found.city,
      found.professionalCard,
      found.admissionDate,
    );
  }

  async findByProfessionalCard(professionalCard: string): Promise<Doctor | null> {
    const found = await this.prisma.doctor.findUnique({ where: { professionalCard } });
    if (!found) return null;
    return new Doctor(
      found.doctorId,
      found.id,
      found.firstName,
      found.lastName,
      found.email,
      found.phone,
      found.address,
      found.city,
      found.professionalCard,
      found.admissionDate,
    );
  }

  async findAll(): Promise<Doctor[]> {
    const doctors = await this.prisma.doctor.findMany();
    return doctors.map(
      (d: any) =>
        new Doctor(
          d.doctorId,
          d.id,
          d.firstName,
          d.lastName,
          d.email,
          d.phone,
          d.address,
          d.city,
          d.professionalCard,
          d.admissionDate,
        ),
    );
  }

  async update(doctorId: number, doctor: Partial<Doctor>): Promise<Doctor> {
    // Excluir doctorId del objeto data
    const { doctorId: _, ...data } = doctor;
    const updated = await this.prisma.doctor.update({
      where: { doctorId },
      data,
    });
    return new Doctor(
      updated.doctorId,
      updated.id,
      updated.firstName,
      updated.lastName,
      updated.email,
      updated.phone,
      updated.address,
      updated.city,
      updated.professionalCard,
      updated.admissionDate,
    );
  }

  async delete(doctorId: number): Promise<void> {
    await this.prisma.doctor.delete({ where: { doctorId } });
  }
} 