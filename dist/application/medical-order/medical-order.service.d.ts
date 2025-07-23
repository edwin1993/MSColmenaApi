import { MedicalOrder } from '../../domain/medical-order/medical-order.entity';
import { MedicalOrderRepository } from '../../domain/medical-order/medical-order.repository';
export declare class MedicalOrderService {
    private readonly medicalOrderRepository;
    constructor(medicalOrderRepository: MedicalOrderRepository);
    create(medicalOrder: Omit<MedicalOrder, 'medicalOrderId' | 'createdAt' | 'updatedAt'>): Promise<MedicalOrder>;
    findById(medicalOrderId: number): Promise<MedicalOrder | null>;
    findByAppointmentId(appointmentId: number): Promise<MedicalOrder[]>;
    findAll(): Promise<MedicalOrder[]>;
    update(medicalOrderId: number, medicalOrder: Partial<MedicalOrder>): Promise<MedicalOrder>;
    delete(medicalOrderId: number): Promise<void>;
    addMedication(medicalOrderId: number, medicationId: number): Promise<void>;
    removeMedication(medicalOrderId: number, medicationId: number): Promise<void>;
    getMedications(medicalOrderId: number): Promise<number[]>;
}
