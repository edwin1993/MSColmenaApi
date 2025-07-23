import { Patient } from './patient.entity';
export interface PatientRepository {
    create(patient: Patient): Promise<Patient>;
    findById(id: string): Promise<Patient | null>;
    findByEmail(email: string): Promise<Patient | null>;
    findAll(): Promise<Patient[]>;
    update(patientId: number, patient: Partial<Patient>): Promise<Patient>;
    delete(patientId: number): Promise<void>;
}
