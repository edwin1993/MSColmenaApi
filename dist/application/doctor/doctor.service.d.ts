import { Doctor } from '../../domain/doctor/doctor.entity';
import { DoctorRepository } from '../../domain/doctor/doctor.repository';
export declare class DoctorService {
    private readonly doctorRepository;
    constructor(doctorRepository: DoctorRepository);
    create(doctor: Omit<Doctor, 'doctorId'>): Promise<Doctor>;
    findById(id: string): Promise<Doctor | null>;
    findAll(): Promise<Doctor[]>;
    update(doctorId: number, doctor: Partial<Doctor>): Promise<Doctor>;
    delete(doctorId: number): Promise<void>;
}
