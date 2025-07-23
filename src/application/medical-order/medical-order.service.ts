import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { MedicalOrder } from '../../domain/medical-order/medical-order.entity';
import { MedicalOrderRepository } from '../../domain/medical-order/medical-order.repository';

@Injectable()
export class MedicalOrderService {
  constructor(
    @Inject('MedicalOrderRepository')
    private readonly medicalOrderRepository: MedicalOrderRepository,
  ) {}

  async create(medicalOrder: Omit<MedicalOrder, 'medicalOrderId' | 'createdAt' | 'updatedAt'>): Promise<MedicalOrder> {
    return this.medicalOrderRepository.create(
      new MedicalOrder(
        null,
        medicalOrder.appointmentId,
        medicalOrder.description,
        medicalOrder.expirationDate,
        medicalOrder.specialty,
        null,
        null,
      ),
    );
  }

  async findById(medicalOrderId: number): Promise<MedicalOrder | null> {
    return this.medicalOrderRepository.findById(medicalOrderId);
  }

  async findByAppointmentId(appointmentId: number): Promise<MedicalOrder[]> {
    return this.medicalOrderRepository.findByAppointmentId(appointmentId);
  }

  async findAll(): Promise<MedicalOrder[]> {
    return this.medicalOrderRepository.findAll();
  }

  async update(medicalOrderId: number, medicalOrder: Partial<MedicalOrder>): Promise<MedicalOrder> {
    return this.medicalOrderRepository.update(medicalOrderId, medicalOrder);
  }

  async delete(medicalOrderId: number): Promise<void> {
    return this.medicalOrderRepository.delete(medicalOrderId);
  }

  // Métodos para gestionar medicamentos adjuntos
  async addMedication(medicalOrderId: number, medicationId: number): Promise<void> {
    // Verificar que la orden médica existe
    const medicalOrder = await this.medicalOrderRepository.findById(medicalOrderId);
    if (!medicalOrder) {
      throw new BadRequestException('Orden médica no encontrada');
    }
    
    return this.medicalOrderRepository.addMedication(medicalOrderId, medicationId);
  }

  async removeMedication(medicalOrderId: number, medicationId: number): Promise<void> {
    return this.medicalOrderRepository.removeMedication(medicalOrderId, medicationId);
  }

  async getMedications(medicalOrderId: number): Promise<number[]> {
    return this.medicalOrderRepository.getMedications(medicalOrderId);
  }
} 