import { PatientService } from '../../application/patient/patient.service';
import { CreatePatientDto } from './patient.dto';
export declare class PatientController {
    private readonly patientService;
    constructor(patientService: PatientService);
    create(dto: CreatePatientDto): Promise<import("../../domain/patient/patient.entity").Patient>;
    findAll(): Promise<import("../../domain/patient/patient.entity").Patient[]>;
    findById(id: string): Promise<import("../../domain/patient/patient.entity").Patient>;
    update(patientId: number, dto: Partial<CreatePatientDto>): Promise<import("../../domain/patient/patient.entity").Patient>;
    delete(patientId: number): Promise<{
        message: string;
    }>;
}
