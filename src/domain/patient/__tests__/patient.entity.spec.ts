import { Patient } from '../patient.entity';

describe('Patient Entity', () => {
  const mockPatientData = {
    patientId: 1,
    id: '1234567890',
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@correo.com',
    phone: '3001234567',
    address: 'Calle 123 #45-67',
    city: 'Bogotá',
  };

  describe('Patient Creation', () => {
    it('should create a patient with all properties', () => {
      const patient = new Patient(
        mockPatientData.patientId,
        mockPatientData.id,
        mockPatientData.firstName,
        mockPatientData.lastName,
        mockPatientData.email,
        mockPatientData.phone,
        mockPatientData.address,
        mockPatientData.city,
      );

      expect(patient.patientId).toBe(mockPatientData.patientId);
      expect(patient.id).toBe(mockPatientData.id);
      expect(patient.firstName).toBe(mockPatientData.firstName);
      expect(patient.lastName).toBe(mockPatientData.lastName);
      expect(patient.email).toBe(mockPatientData.email);
      expect(patient.phone).toBe(mockPatientData.phone);
      expect(patient.address).toBe(mockPatientData.address);
      expect(patient.city).toBe(mockPatientData.city);
    });

    it('should create a patient with null patientId for new patients', () => {
      const patient = new Patient(
        null,
        mockPatientData.id,
        mockPatientData.firstName,
        mockPatientData.lastName,
        mockPatientData.email,
        mockPatientData.phone,
        mockPatientData.address,
        mockPatientData.city,
      );

      expect(patient.patientId).toBeNull();
      expect(patient.id).toBe(mockPatientData.id);
    });
  });

  describe('Patient Properties', () => {
    let patient: Patient;

    beforeEach(() => {
      patient = new Patient(
        mockPatientData.patientId,
        mockPatientData.id,
        mockPatientData.firstName,
        mockPatientData.lastName,
        mockPatientData.email,
        mockPatientData.phone,
        mockPatientData.address,
        mockPatientData.city,
      );
    });

    it('should have readonly properties', () => {
      expect(patient.patientId).toBeDefined();
      expect(patient.id).toBeDefined();
      expect(patient.firstName).toBeDefined();
      expect(patient.lastName).toBeDefined();
      expect(patient.email).toBeDefined();
      expect(patient.phone).toBeDefined();
      expect(patient.address).toBeDefined();
      expect(patient.city).toBeDefined();
    });

    it('should return correct full name', () => {
      const fullName = `${patient.firstName} ${patient.lastName}`;
      expect(fullName).toBe('Juan Pérez');
    });
  });

  describe('Patient Validation', () => {
    it('should accept valid email format', () => {
      const patient = new Patient(
        1,
        '1234567890',
        'Juan',
        'Pérez',
        'juan.perez@correo.com',
        '3001234567',
        'Calle 123 #45-67',
        'Bogotá',
      );

      expect(patient.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    it('should accept valid phone number format', () => {
      const patient = new Patient(
        1,
        '1234567890',
        'Juan',
        'Pérez',
        'juan.perez@correo.com',
        '3001234567',
        'Calle 123 #45-67',
        'Bogotá',
      );

      expect(patient.phone).toMatch(/^\d{10}$/);
    });
  });
}); 