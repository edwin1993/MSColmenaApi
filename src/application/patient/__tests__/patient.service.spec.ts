import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from '../patient.service';
import { Patient } from '../../../domain/patient/patient.entity';
import { PatientRepository } from '../../../domain/patient/patient.repository';

describe('PatientService', () => {
  let service: PatientService;
  let mockPatientRepository: jest.Mocked<PatientRepository>;

  const mockPatient = new Patient(
    1,
    '1234567890',
    'Juan',
    'Pérez',
    'juan.perez@correo.com',
    '3001234567',
    'Calle 123 #45-67',
    'Bogotá',
  );

  const mockCreatePatientData = {
    id: '1234567890',
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@correo.com',
    phone: '3001234567',
    address: 'Calle 123 #45-67',
    city: 'Bogotá',
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
        PatientService,
        {
          provide: 'PatientRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
    mockPatientRepository = module.get('PatientRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new patient successfully', async () => {
      mockPatientRepository.create.mockResolvedValue(mockPatient);

      const result = await service.create(mockCreatePatientData);

      expect(mockPatientRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          patientId: null,
          id: mockCreatePatientData.id,
          firstName: mockCreatePatientData.firstName,
          lastName: mockCreatePatientData.lastName,
          email: mockCreatePatientData.email,
          phone: mockCreatePatientData.phone,
          address: mockCreatePatientData.address,
          city: mockCreatePatientData.city,
        }),
      );
      expect(result).toEqual(mockPatient);
    });

    it('should throw an error when repository fails', async () => {
      const error = new Error('Database error');
      mockPatientRepository.create.mockRejectedValue(error);

      await expect(service.create(mockCreatePatientData)).rejects.toThrow('Database error');
      expect(mockPatientRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should return a patient when found', async () => {
      mockPatientRepository.findById.mockResolvedValue(mockPatient);

      const result = await service.findById('1234567890');

      expect(mockPatientRepository.findById).toHaveBeenCalledWith('1234567890');
      expect(result).toEqual(mockPatient);
    });

    it('should return null when patient not found', async () => {
      mockPatientRepository.findById.mockResolvedValue(null);

      const result = await service.findById('nonexistent');

      expect(mockPatientRepository.findById).toHaveBeenCalledWith('nonexistent');
      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return all patients', async () => {
      const mockPatients = [mockPatient];
      mockPatientRepository.findAll.mockResolvedValue(mockPatients);

      const result = await service.findAll();

      expect(mockPatientRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockPatients);
    });

    it('should return empty array when no patients exist', async () => {
      mockPatientRepository.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(mockPatientRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update a patient successfully', async () => {
      const updateData = { firstName: 'Juan Carlos' };
      const updatedPatient = new Patient(
        1,
        '1234567890',
        'Juan Carlos',
        'Pérez',
        'juan.perez@correo.com',
        '3001234567',
        'Calle 123 #45-67',
        'Bogotá',
      );

      mockPatientRepository.update.mockResolvedValue(updatedPatient);

      const result = await service.update(1, updateData);

      expect(mockPatientRepository.update).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual(updatedPatient);
    });

    it('should throw an error when update fails', async () => {
      const updateData = { firstName: 'Juan Carlos' };
      const error = new Error('Update failed');
      mockPatientRepository.update.mockRejectedValue(error);

      await expect(service.update(1, updateData)).rejects.toThrow('Update failed');
      expect(mockPatientRepository.update).toHaveBeenCalledWith(1, updateData);
    });
  });

  describe('delete', () => {
    it('should delete a patient successfully', async () => {
      mockPatientRepository.delete.mockResolvedValue(undefined);

      await service.delete(1);

      expect(mockPatientRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error when delete fails', async () => {
      const error = new Error('Delete failed');
      mockPatientRepository.delete.mockRejectedValue(error);

      await expect(service.delete(1)).rejects.toThrow('Delete failed');
      expect(mockPatientRepository.delete).toHaveBeenCalledWith(1);
    });
  });
}); 