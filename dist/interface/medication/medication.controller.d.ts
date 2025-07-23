import { MedicationService } from '../../application/medication/medication.service';
import { CreateMedicationDto } from './medication.dto';
export declare class MedicationController {
    private readonly medicationService;
    constructor(medicationService: MedicationService);
    create(dto: CreateMedicationDto): Promise<import("../../domain/medication/medication.entity").Medication>;
    findAll(): Promise<import("../../domain/medication/medication.entity").Medication[]>;
    findById(medicationId: number): Promise<import("../../domain/medication/medication.entity").Medication>;
    update(medicationId: number, dto: Partial<CreateMedicationDto>): Promise<import("../../domain/medication/medication.entity").Medication>;
    delete(medicationId: number): Promise<{
        message: string;
    }>;
}
