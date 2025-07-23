import { MedicalOrder } from './medical-order.entity';

export interface MedicalOrderRepository {
  create(medicalOrder: MedicalOrder): Promise<MedicalOrder>;
  findById(medicalOrderId: number): Promise<MedicalOrder | null>;
  findByAppointmentId(appointmentId: number): Promise<MedicalOrder[]>;
  findAll(): Promise<MedicalOrder[]>;
  update(medicalOrderId: number, medicalOrder: Partial<MedicalOrder>): Promise<MedicalOrder>;
  delete(medicalOrderId: number): Promise<void>;
  
  // Métodos para gestionar medicamentos adjuntos
  addMedication(medicalOrderId: number, medicationId: number): Promise<void>;
  removeMedication(medicalOrderId: number, medicationId: number): Promise<void>;
  getMedications(medicalOrderId: number): Promise<number[]>;
} 