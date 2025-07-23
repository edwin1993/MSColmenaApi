import { Medication } from './medication.entity';

export interface MedicationRepository {
  create(medication: Medication): Promise<Medication>;
  findById(medicationId: number): Promise<Medication | null>;
  findByName(name: string): Promise<Medication | null>;
  findAll(): Promise<Medication[]>;
  update(medicationId: number, medication: Partial<Medication>): Promise<Medication>;
  delete(medicationId: number): Promise<void>;
} 