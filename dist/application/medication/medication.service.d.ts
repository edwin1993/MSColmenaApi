import { Medication } from '../../domain/medication/medication.entity';
import { MedicationRepository } from '../../domain/medication/medication.repository';
export declare class MedicationService {
    private readonly medicationRepository;
    constructor(medicationRepository: MedicationRepository);
    create(medication: Omit<Medication, 'medicationId' | 'createdAt' | 'updatedAt'>): Promise<Medication>;
    findById(medicationId: number): Promise<Medication | null>;
    findByName(name: string): Promise<Medication | null>;
    findAll(): Promise<Medication[]>;
    update(medicationId: number, medication: Partial<Medication>): Promise<Medication>;
    delete(medicationId: number): Promise<void>;
}
