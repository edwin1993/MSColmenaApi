import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Medication } from '../../domain/medication/medication.entity';
import { MedicationRepository } from '../../domain/medication/medication.repository';

@Injectable()
export class PrismaMedicationRepository implements MedicationRepository {
  private prisma = new PrismaClient();

  async create(medication: Medication): Promise<Medication> {
    const created = await this.prisma.medication.create({
      data: {
        name: medication.name,
        description: medication.description,
        prescribedFor: medication.prescribedFor,
      },
    });
    return new Medication(
      created.medicationId,
      created.name,
      created.description,
      created.prescribedFor,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findById(medicationId: number): Promise<Medication | null> {
    const found = await this.prisma.medication.findUnique({ where: { medicationId } });
    if (!found) return null;
    return new Medication(
      found.medicationId,
      found.name,
      found.description,
      found.prescribedFor,
      found.createdAt,
      found.updatedAt,
    );
  }

  async findByName(name: string): Promise<Medication | null> {
    const found = await this.prisma.medication.findUnique({ where: { name } });
    if (!found) return null;
    return new Medication(
      found.medicationId,
      found.name,
      found.description,
      found.prescribedFor,
      found.createdAt,
      found.updatedAt,
    );
  }

  async findAll(): Promise<Medication[]> {
    const medications = await this.prisma.medication.findMany();
    return medications.map(
      (m: any) =>
        new Medication(
          m.medicationId,
          m.name,
          m.description,
          m.prescribedFor,
          m.createdAt,
          m.updatedAt,
        ),
    );
  }

  async update(medicationId: number, medication: Partial<Medication>): Promise<Medication> {
    // Excluir campos que no deben estar en el update
    const { medicationId: _, createdAt, updatedAt, ...data } = medication;
    const updated = await this.prisma.medication.update({
      where: { medicationId },
      data,
    });
    return new Medication(
      updated.medicationId,
      updated.name,
      updated.description,
      updated.prescribedFor,
      updated.createdAt,
      updated.updatedAt,
    );
  }

  async delete(medicationId: number): Promise<void> {
    await this.prisma.medication.delete({ where: { medicationId } });
  }
} 