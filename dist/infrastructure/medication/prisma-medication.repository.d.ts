import { Medication } from '../../domain/medication/medication.entity';
import { MedicationRepository } from '../../domain/medication/medication.repository';
export declare class PrismaMedicationRepository implements MedicationRepository {
    private prisma;
    create(medication: Medication): Promise<Medication>;
    findById(medicationId: number): Promise<Medication | null>;
    findByName(name: string): Promise<Medication | null>;
    findAll(): Promise<Medication[]>;
    update(medicationId: number, medication: Partial<Medication>): Promise<Medication>;
    delete(medicationId: number): Promise<void>;
}
