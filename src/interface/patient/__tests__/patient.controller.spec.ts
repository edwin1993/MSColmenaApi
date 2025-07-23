import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PatientController } from '../patient.controller';
import { PatientService } from '../../../application/patient/patient.service';
import { CreatePatientDto } from '../patient.dto';
import { Patient } from '../../../domain/patient/patient.entity';

describe('PatientController', () => {
  let controller: PatientController;
  let mockPatientService: jest.Mocked<PatientService>;

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

  const mockCreatePatientDto: CreatePatientDto = {
    id: '1234567890',
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@correo.com',
    phone: '3001234567',
    address: 'Calle 123 #45-67',
    city: 'Bogotá',
  };

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PatientController>(PatientController);
    mockPatientService = module.get(PatientService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a patient successfully', async () => {
      mockPatientService.create.mockResolvedValue(mockPatient);

      const result = await controller.create(mockCreatePatientDto);

      expect(mockPatientService.create).toHaveBeenCalledWith(mockCreatePatientDto);
      expect(result).toEqual(mockPatient);
    });

    it('should handle Prisma unique constraint error', async () => {
      const prismaError = new Error('Unique constraint failed');
      (prismaError as any).code = 'P2002';
      mockPatientService.create.mockRejectedValue(prismaError);

      await expect(controller.create(mockCreatePatientDto)).rejects.toThrow(
        new HttpException('El paciente ya está registrado', HttpStatus.CONFLICT),
      );
    });

    it('should handle general errors', async () => {
      const error = new Error('Database error');
      mockPatientService.create.mockRejectedValue(error);

      await expect(controller.create(mockCreatePatientDto)).rejects.toThrow(
        new HttpException('Error al registrar paciente', HttpStatus.INTERNAL_SERVER_ERROR),
      );
    });
  });

  describe('findAll', () => {
    it('should return all patients', async () => {
      const mockPatients = [mockPatient];
      mockPatientService.findAll.mockResolvedValue(mockPatients);

      const result = await controller.findAll();

      expect(mockPatientService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockPatients);
    });

    it('should return empty array when no patients exist', async () => {
      mockPatientService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(mockPatientService.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('findById', () => {
    it('should return a patient when found', async () => {
      mockPatientService.findById.mockResolvedValue(mockPatient);

      const result = await controller.findById('1234567890');

      expect(mockPatientService.findById).toHaveBeenCalledWith('1234567890');
      expect(result).toEqual(mockPatient);
    });

    it('should throw 404 when patient not found', async () => {
      mockPatientService.findById.mockResolvedValue(null);

      await expect(controller.findById('nonexistent')).rejects.toThrow(
        new HttpException('Paciente no encontrado', HttpStatus.NOT_FOUND),
      );
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

      mockPatientService.update.mockResolvedValue(updatedPatient);

      const result = await controller.update(1, updateData);

      expect(mockPatientService.update).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual(updatedPatient);
    });

    it('should throw 404 when patient not found for update', async () => {
      const updateData = { firstName: 'Juan Carlos' };
      mockPatientService.update.mockRejectedValue(new Error('Patient not found'));

      await expect(controller.update(999, updateData)).rejects.toThrow('Patient not found');
    });
  });

  describe('delete', () => {
    it('should delete a patient successfully', async () => {
      mockPatientService.delete.mockResolvedValue(undefined);

      const result = await controller.delete(1);

      expect(mockPatientService.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ message: 'Paciente eliminado' });
    });

    it('should throw 404 when patient not found for deletion', async () => {
      mockPatientService.delete.mockRejectedValue(new Error('Patient not found'));

      await expect(controller.delete(999)).rejects.toThrow('Patient not found');
    });
  });
}); 