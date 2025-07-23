import { Injectable, Inject } from '@nestjs/common';
import { Doctor } from '../../domain/doctor/doctor.entity';
import { DoctorRepository } from '../../domain/doctor/doctor.repository';

@Injectable()
export class DoctorService {
  constructor(
    @Inject('DoctorRepository')
    private readonly doctorRepository: DoctorRepository,
  ) {}

  async create(doctor: Omit<Doctor, 'doctorId'>): Promise<Doctor> {
    return this.doctorRepository.create(
      new Doctor(
        null,
        doctor.id,
        doctor.firstName,
        doctor.lastName,
        doctor.email,
        doctor.phone,
        doctor.address,
        doctor.city,
        doctor.professionalCard,
        doctor.admissionDate,
      ),
    );
  }

  async findById(id: string): Promise<Doctor | null> {
    return this.doctorRepository.findById(id);
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorRepository.findAll();
  }

  async update(doctorId: number, doctor: Partial<Doctor>): Promise<Doctor> {
    return this.doctorRepository.update(doctorId, doctor);
  }

  async delete(doctorId: number): Promise<void> {
    return this.doctorRepository.delete(doctorId);
  }
} 