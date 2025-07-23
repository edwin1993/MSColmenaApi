import { MedicalOrderService } from '../../application/medical-order/medical-order.service';
import { CreateMedicalOrderDto, AddMedicationDto } from './medical-order.dto';
export declare class MedicalOrderController {
    private readonly medicalOrderService;
    constructor(medicalOrderService: MedicalOrderService);
    create(dto: CreateMedicalOrderDto): Promise<import("../../domain/medical-order/medical-order.entity").MedicalOrder>;
    findAll(): Promise<import("../../domain/medical-order/medical-order.entity").MedicalOrder[]>;
    findByAppointmentId(appointmentId: number): Promise<import("../../domain/medical-order/medical-order.entity").MedicalOrder[]>;
    findById(medicalOrderId: number): Promise<import("../../domain/medical-order/medical-order.entity").MedicalOrder>;
    getMedications(medicalOrderId: number): Promise<number[]>;
    addMedication(medicalOrderId: number, dto: AddMedicationDto): Promise<{
        message: string;
    }>;
    removeMedication(medicalOrderId: number, medicationId: number): Promise<{
        message: string;
    }>;
    update(medicalOrderId: number, dto: Partial<CreateMedicalOrderDto>): Promise<import("../../domain/medical-order/medical-order.entity").MedicalOrder>;
    delete(medicalOrderId: number): Promise<{
        message: string;
    }>;
}
