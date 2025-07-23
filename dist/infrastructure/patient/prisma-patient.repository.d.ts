import { Patient } from '../../domain/patient/patient.entity';
import { PatientRepository } from '../../domain/patient/patient.repository';
export declare class PrismaPatientRepository implements PatientRepository {
    private prisma;
    create(patient: Patient): Promise<Patient>;
    findById(id: string): Promise<Patient | null>;
    findByEmail(email: string): Promise<Patient | null>;
    findAll(): Promise<Patient[]>;
    update(patientId: number, patient: Partial<Patient>): Promise<Patient>;
    delete(patientId: number): Promise<void>;
}
