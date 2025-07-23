import { Doctor } from './doctor.entity';

export interface DoctorRepository {
  create(doctor: Doctor): Promise<Doctor>;
  findById(id: string): Promise<Doctor | null>;
  findByEmail(email: string): Promise<Doctor | null>;
  findByProfessionalCard(professionalCard: string): Promise<Doctor | null>;
  findAll(): Promise<Doctor[]>;
  update(doctorId: number, doctor: Partial<Doctor>): Promise<Doctor>;
  delete(doctorId: number): Promise<void>;
} 