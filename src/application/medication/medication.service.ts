import { Injectable, Inject } from '@nestjs/common';
import { Medication } from '../../domain/medication/medication.entity';
import { MedicationRepository } from '../../domain/medication/medication.repository';

@Injectable()
export class MedicationService {
  constructor(
    @Inject('MedicationRepository')
    private readonly medicationRepository: MedicationRepository,
  ) {}

  async create(medication: Omit<Medication, 'medicationId' | 'createdAt' | 'updatedAt'>): Promise<Medication> {
    return this.medicationRepository.create(
      new Medication(
        null,
        medication.name,
        medication.description,
        medication.prescribedFor,
        null,
        null,
      ),
    );
  }

  async findById(medicationId: number): Promise<Medication | null> {
    return this.medicationRepository.findById(medicationId);
  }

  async findByName(name: string): Promise<Medication | null> {
    return this.medicationRepository.findByName(name);
  }

  async findAll(): Promise<Medication[]> {
    return this.medicationRepository.findAll();
  }

  async update(medicationId: number, medication: Partial<Medication>): Promise<Medication> {
    return this.medicationRepository.update(medicationId, medication);
  }

  async delete(medicationId: number): Promise<void> {
    return this.medicationRepository.delete(medicationId);
  }
} 