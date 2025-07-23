import { Doctor } from '../../domain/doctor/doctor.entity';
import { DoctorRepository } from '../../domain/doctor/doctor.repository';
export declare class PrismaDoctorRepository implements DoctorRepository {
    private prisma;
    create(doctor: Doctor): Promise<Doctor>;
    findById(id: string): Promise<Doctor | null>;
    findByEmail(email: string): Promise<Doctor | null>;
    findByProfessionalCard(professionalCard: string): Promise<Doctor | null>;
    findAll(): Promise<Doctor[]>;
    update(doctorId: number, doctor: Partial<Doctor>): Promise<Doctor>;
    delete(doctorId: number): Promise<void>;
}
