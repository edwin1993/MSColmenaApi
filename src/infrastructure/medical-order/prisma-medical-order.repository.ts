import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { MedicalOrder } from '../../domain/medical-order/medical-order.entity';
import { MedicalOrderRepository } from '../../domain/medical-order/medical-order.repository';

@Injectable()
export class PrismaMedicalOrderRepository implements MedicalOrderRepository {
  private prisma = new PrismaClient();

  async create(medicalOrder: MedicalOrder): Promise<MedicalOrder> {
    const created = await this.prisma.medicalOrder.create({
      data: {
        appointmentId: medicalOrder.appointmentId,
        description: medicalOrder.description,
        expirationDate: medicalOrder.expirationDate,
        specialty: medicalOrder.specialty,
      },
    });
    return new MedicalOrder(
      created.medicalOrderId,
      created.appointmentId,
      created.description,
      created.expirationDate,
      created.specialty,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findById(medicalOrderId: number): Promise<MedicalOrder | null> {
    const found = await this.prisma.medicalOrder.findUnique({ where: { medicalOrderId } });
    if (!found) return null;
    return new MedicalOrder(
      found.medicalOrderId,
      found.appointmentId,
      found.description,
      found.expirationDate,
      found.specialty,
      found.createdAt,
      found.updatedAt,
    );
  }

  async findByAppointmentId(appointmentId: number): Promise<MedicalOrder[]> {
    const medicalOrders = await this.prisma.medicalOrder.findMany({ where: { appointmentId } });
    return medicalOrders.map(
      (mo: any) =>
        new MedicalOrder(
          mo.medicalOrderId,
          mo.appointmentId,
          mo.description,
          mo.expirationDate,
          mo.specialty,
          mo.createdAt,
          mo.updatedAt,
        ),
    );
  }

  async findAll(): Promise<MedicalOrder[]> {
    const medicalOrders = await this.prisma.medicalOrder.findMany();
    return medicalOrders.map(
      (mo: any) =>
        new MedicalOrder(
          mo.medicalOrderId,
          mo.appointmentId,
          mo.description,
          mo.expirationDate,
          mo.specialty,
          mo.createdAt,
          mo.updatedAt,
        ),
    );
  }

  async update(medicalOrderId: number, medicalOrder: Partial<MedicalOrder>): Promise<MedicalOrder> {
    // Excluir campos que no deben estar en el update
    const { medicalOrderId: _, createdAt, updatedAt, ...data } = medicalOrder;
    const updated = await this.prisma.medicalOrder.update({
      where: { medicalOrderId },
      data,
    });
    return new MedicalOrder(
      updated.medicalOrderId,
      updated.appointmentId,
      updated.description,
      updated.expirationDate,
      updated.specialty,
      updated.createdAt,
      updated.updatedAt,
    );
  }

  async delete(medicalOrderId: number): Promise<void> {
    await this.prisma.medicalOrder.delete({ where: { medicalOrderId } });
  }

  // Métodos para gestionar medicamentos adjuntos
  async addMedication(medicalOrderId: number, medicationId: number): Promise<void> {
    await this.prisma.medicalOrderMedication.create({
      data: {
        medicalOrderId,
        medicationId,
      },
    });
  }

  async removeMedication(medicalOrderId: number, medicationId: number): Promise<void> {
    await this.prisma.medicalOrderMedication.delete({
      where: {
        medicalOrderId_medicationId: {
          medicalOrderId,
          medicationId,
        },
      },
    });
  }

  async getMedications(medicalOrderId: number): Promise<number[]> {
    const medications = await this.prisma.medicalOrderMedication.findMany({
      where: { medicalOrderId },
      select: { medicationId: true },
    });
    return medications.map((m: any) => m.medicationId);
  }
} 