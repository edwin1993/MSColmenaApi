import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Patient } from '../../domain/patient/patient.entity';
import { PatientRepository } from '../../domain/patient/patient.repository';

@Injectable()
export class PrismaPatientRepository implements PatientRepository {
  private prisma = new PrismaClient();

  async create(patient: Patient): Promise<Patient> {
    const created = await this.prisma.patient.create({
      data: {
        id: patient.id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
        phone: patient.phone,
        address: patient.address,
        city: patient.city,
      },
    });
    return new Patient(
      created.patientId,
      created.id,
      created.firstName,
      created.lastName,
      created.email,
      created.phone,
      created.address,
      created.city,
    );
  }

  async findById(id: string): Promise<Patient | null> {
    const found = await this.prisma.patient.findUnique({ where: { id } });
    if (!found) return null;
    return new Patient(
      found.patientId,
      found.id,
      found.firstName,
      found.lastName,
      found.email,
      found.phone,
      found.address,
      found.city,
    );
  }

  async findByEmail(email: string): Promise<Patient | null> {
    const found = await this.prisma.patient.findUnique({ where: { email } });
    if (!found) return null;
    return new Patient(
      found.patientId,
      found.id,
      found.firstName,
      found.lastName,
      found.email,
      found.phone,
      found.address,
      found.city,
    );
  }

  async findAll(): Promise<Patient[]> {
    const patients = await this.prisma.patient.findMany();
    return patients.map(
      (p: any) =>
        new Patient(
          p.patientId,
          p.id,
          p.firstName,
          p.lastName,
          p.email,
          p.phone,
          p.address,
          p.city,
        ),
    );
  }

  async update(patientId: number, patient: Partial<Patient>): Promise<Patient> {
    // Excluir patientId del objeto data
    const { patientId: _, ...data } = patient;
    const updated = await this.prisma.patient.update({
      where: { patientId },
      data,
    });
    return new Patient(
      updated.patientId,
      updated.id,
      updated.firstName,
      updated.lastName,
      updated.email,
      updated.phone,
      updated.address,
      updated.city,
    );
  }

  async delete(patientId: number): Promise<void> {
    await this.prisma.patient.delete({ where: { patientId } });
  }
} 