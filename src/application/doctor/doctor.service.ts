import { Injectable, Inject, NotFoundException } from '@nestjs/common';
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
    try {
      return await this.doctorRepository.update(doctorId, doctor);
    } catch (error) {
      if (error.message.includes('no encontrado')) {
        throw new NotFoundException(`Doctor con ID ${doctorId} no encontrado`);
      }
      throw error;
    }
  }

  async delete(doctorId: number): Promise<void> {
    try {
      return await this.doctorRepository.delete(doctorId);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Doctor con ID ${doctorId} no encontrado`);
      }
      throw error;
    }
  }
} 