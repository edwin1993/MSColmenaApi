import { Doctor } from '../doctor.entity';

describe('Doctor Entity', () => {
  const mockDoctorData = {
    doctorId: 1,
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

  describe('Doctor Creation', () => {
    it('should create a doctor with all properties', () => {
      const doctor = new Doctor(
        mockDoctorData.doctorId,
        mockDoctorData.id,
        mockDoctorData.firstName,
        mockDoctorData.lastName,
        mockDoctorData.email,
        mockDoctorData.phone,
        mockDoctorData.address,
        mockDoctorData.city,
        mockDoctorData.professionalCard,
        mockDoctorData.admissionDate,
      );

      expect(doctor.doctorId).toBe(mockDoctorData.doctorId);
      expect(doctor.id).toBe(mockDoctorData.id);
      expect(doctor.firstName).toBe(mockDoctorData.firstName);
      expect(doctor.lastName).toBe(mockDoctorData.lastName);
      expect(doctor.email).toBe(mockDoctorData.email);
      expect(doctor.phone).toBe(mockDoctorData.phone);
      expect(doctor.address).toBe(mockDoctorData.address);
      expect(doctor.city).toBe(mockDoctorData.city);
      expect(doctor.professionalCard).toBe(mockDoctorData.professionalCard);
      expect(doctor.admissionDate).toBe(mockDoctorData.admissionDate);
    });

    it('should create a doctor with null doctorId for new doctors', () => {
      const doctor = new Doctor(
        null,
        mockDoctorData.id,
        mockDoctorData.firstName,
        mockDoctorData.lastName,
        mockDoctorData.email,
        mockDoctorData.phone,
        mockDoctorData.address,
        mockDoctorData.city,
        mockDoctorData.professionalCard,
        mockDoctorData.admissionDate,
      );

      expect(doctor.doctorId).toBeNull();
      expect(doctor.id).toBe(mockDoctorData.id);
    });
  });

  describe('Doctor Properties', () => {
    let doctor: Doctor;

    beforeEach(() => {
      doctor = new Doctor(
        mockDoctorData.doctorId,
        mockDoctorData.id,
        mockDoctorData.firstName,
        mockDoctorData.lastName,
        mockDoctorData.email,
        mockDoctorData.phone,
        mockDoctorData.address,
        mockDoctorData.city,
        mockDoctorData.professionalCard,
        mockDoctorData.admissionDate,
      );
    });

    it('should have readonly properties', () => {
      expect(doctor.doctorId).toBeDefined();
      expect(doctor.id).toBeDefined();
      expect(doctor.firstName).toBeDefined();
      expect(doctor.lastName).toBeDefined();
      expect(doctor.email).toBeDefined();
      expect(doctor.phone).toBeDefined();
      expect(doctor.address).toBeDefined();
      expect(doctor.city).toBeDefined();
      expect(doctor.professionalCard).toBeDefined();
      expect(doctor.admissionDate).toBeDefined();
    });

    it('should return correct full name with title', () => {
      const fullName = `${doctor.firstName} ${doctor.lastName}`;
      expect(fullName).toBe('Dr. María González');
    });

    it('should return correct professional card', () => {
      expect(doctor.professionalCard).toBe('MED-12345');
    });

    it('should return correct admission date', () => {
      expect(doctor.admissionDate).toEqual(new Date('2020-01-15'));
    });
  });

  describe('Doctor Validation', () => {
    it('should accept valid email format', () => {
      const doctor = new Doctor(
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

      expect(doctor.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    it('should accept valid phone number format', () => {
      const doctor = new Doctor(
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

      expect(doctor.phone).toMatch(/^\d{10}$/);
    });

    it('should accept valid professional card format', () => {
      const doctor = new Doctor(
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

      expect(doctor.professionalCard).toMatch(/^MED-\d{5}$/);
    });
  });

  describe('Doctor Business Rules', () => {
    it('should identify doctor with valid admission date', () => {
      const doctor = new Doctor(
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

      const isValidAdmissionDate = doctor.admissionDate instanceof Date && !isNaN(doctor.admissionDate.getTime());
      expect(isValidAdmissionDate).toBe(true);
    });

    it('should identify doctor with professional card', () => {
      const doctor = new Doctor(
        2,
        'DOC789012',
        'Dr. Carlos',
        'Rodríguez',
        'carlos.rodriguez@hospital.com',
        '3001234567',
        'Calle 12 #34-56',
        'Medellín',
        'MED-67890',
        new Date('2019-06-20'),
      );

      const hasProfessionalCard = doctor.professionalCard && doctor.professionalCard.length > 0;
      expect(hasProfessionalCard).toBe(true);
    });
  });
}); 