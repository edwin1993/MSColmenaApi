import { Test, TestingModule } from '@nestjs/testing';
import { DoctorService } from '../doctor.service';
import { Doctor } from '../../../domain/doctor/doctor.entity';
import { DoctorRepository } from '../../../domain/doctor/doctor.repository';

describe('DoctorService', () => {
  let service: DoctorService;
  let mockDoctorRepository: jest.Mocked<DoctorRepository>;

  const mockDoctor = new Doctor(
    1,
    'DOC123456',
    'Dr. María',
    'González',
    'maria.gonzalez@hospital.com',
    '3009876543',
    'Calle 45 #67-89',
    'Bogotá',
    'MED-12345',
    new Date('2020-01-15'),
  );

  const mockCreateDoctorData = {
    id: 'DOC123456',
    firstName: 'Dr. María',
    lastName: 'González',
    email: 'maria.gonzalez@hospital.com',
    phone: '3009876543',
    address: 'Calle 45 #67-89',
    city: 'Bogotá',
    professionalCard: 'MED-12345',
    admissionDate: new Date('2020-01-15'),
  };

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorService,
        {
          provide: 'DoctorRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DoctorService>(DoctorService);
    mockDoctorRepository = module.get('DoctorRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new doctor successfully', async () => {
      mockDoctorRepository.create.mockResolvedValue(mockDoctor);

      const result = await service.create(mockCreateDoctorData);

      expect(mockDoctorRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          doctorId: null,
          id: mockCreateDoctorData.id,
          firstName: mockCreateDoctorData.firstName,
          lastName: mockCreateDoctorData.lastName,
          email: mockCreateDoctorData.email,
          phone: mockCreateDoctorData.phone,
          address: mockCreateDoctorData.address,
          city: mockCreateDoctorData.city,
          professionalCard: mockCreateDoctorData.professionalCard,
          admissionDate: mockCreateDoctorData.admissionDate,
        }),
      );
      expect(result).toEqual(mockDoctor);
    });

    it('should throw an error when repository fails', async () => {
      const error = new Error('Database error');
      mockDoctorRepository.create.mockRejectedValue(error);

      await expect(service.create(mockCreateDoctorData)).rejects.toThrow('Database error');
      expect(mockDoctorRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should return a doctor when found', async () => {
      mockDoctorRepository.findById.mockResolvedValue(mockDoctor);

      const result = await service.findById('DOC123456');

      expect(mockDoctorRepository.findById).toHaveBeenCalledWith('DOC123456');
      expect(result).toEqual(mockDoctor);
    });

    it('should return null when doctor not found', async () => {
      mockDoctorRepository.findById.mockResolvedValue(null);

      const result = await service.findById('nonexistent');

      expect(mockDoctorRepository.findById).toHaveBeenCalledWith('nonexistent');
      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return all doctors', async () => {
      const mockDoctors = [mockDoctor];
      mockDoctorRepository.findAll.mockResolvedValue(mockDoctors);

      const result = await service.findAll();

      expect(mockDoctorRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockDoctors);
    });

    it('should return empty array when no doctors exist', async () => {
      mockDoctorRepository.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(mockDoctorRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update a doctor successfully', async () => {
      const updateData = { firstName: 'Dr. María Elena' };
      const updatedDoctor = new Doctor(
        1,
        'DOC123456',
        'Dr. María Elena',
        'González',
        'maria.gonzalez@hospital.com',
        '3009876543',
        'Calle 45 #67-89',
        'Bogotá',
        'MED-12345',
        new Date('2020-01-15'),
      );

      mockDoctorRepository.update.mockResolvedValue(updatedDoctor);

      const result = await service.update(1, updateData);

      expect(mockDoctorRepository.update).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual(updatedDoctor);
    });

    it('should throw an error when update fails', async () => {
      const updateData = { firstName: 'Dr. María Elena' };
      const error = new Error('Update failed');
      mockDoctorRepository.update.mockRejectedValue(error);

      await expect(service.update(1, updateData)).rejects.toThrow('Update failed');
      expect(mockDoctorRepository.update).toHaveBeenCalledWith(1, updateData);
    });
  });

  describe('delete', () => {
    it('should delete a doctor successfully', async () => {
      mockDoctorRepository.delete.mockResolvedValue(undefined);

      await service.delete(1);

      expect(mockDoctorRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error when delete fails', async () => {
      const error = new Error('Delete failed');
      mockDoctorRepository.delete.mockRejectedValue(error);

      await expect(service.delete(1)).rejects.toThrow('Delete failed');
      expect(mockDoctorRepository.delete).toHaveBeenCalledWith(1);
    });
  });
}); 