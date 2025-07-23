import { Patient } from '../../domain/patient/patient.entity';
import { PatientRepository } from '../../domain/patient/patient.repository';
export declare class PatientService {
    private readonly patientRepository;
    constructor(patientRepository: PatientRepository);
    create(patient: Omit<Patient, 'patientId'>): Promise<Patient>;
    findById(id: string): Promise<Patient | null>;
    findAll(): Promise<Patient[]>;
    update(patientId: number, patient: Partial<Patient>): Promise<Patient>;
    delete(patientId: number): Promise<void>;
}
