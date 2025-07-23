import { Injectable, Inject } from '@nestjs/common';
import { Patient } from '../../domain/patient/patient.entity';
import { PatientRepository } from '../../domain/patient/patient.repository';

@Injectable()
export class PatientService {
  constructor(
    @Inject('PatientRepository')
    private readonly patientRepository: PatientRepository,
  ) {}

  async create(patient: Omit<Patient, 'patientId'>): Promise<Patient> {
    return this.patientRepository.create(
      new Patient(
        null,
        patient.id,
        patient.firstName,
        patient.lastName,
        patient.email,
        patient.phone,
        patient.address,
        patient.city,
      ),
    );
  }

  async findById(id: string): Promise<Patient | null> {
    return this.patientRepository.findById(id);
  }

  async findAll(): Promise<Patient[]> {
    return this.patientRepository.findAll();
  }

  async update(patientId: number, patient: Partial<Patient>): Promise<Patient> {
    return this.patientRepository.update(patientId, patient);
  }

  async delete(patientId: number): Promise<void> {
    return this.patientRepository.delete(patientId);
  }
} 