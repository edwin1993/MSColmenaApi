import { User, UserRole } from '../user.entity';

describe('User Entity', () => {
  describe('constructor', () => {
    it('should create a user with all properties', () => {
      const user = new User(
        1,
        'testuser',
        'test@example.com',
        'hashedPassword',
        UserRole.DOCTOR,
        true,
        1,
        new Date('2023-01-01'),
        new Date('2023-01-01')
      );

      expect(user.userId).toBe(1);
      expect(user.username).toBe('testuser');
      expect(user.email).toBe('test@example.com');
      expect(user.password).toBe('hashedPassword');
      expect(user.role).toBe(UserRole.DOCTOR);
      expect(user.isActive).toBe(true);
      expect(user.doctorId).toBe(1);
      expect(user.createdAt).toEqual(new Date('2023-01-01'));
      expect(user.updatedAt).toEqual(new Date('2023-01-01'));
    });

    it('should create a user with default values', () => {
      const user = new User(
        null,
        'testuser',
        'test@example.com',
        'hashedPassword',
        UserRole.ADMIN
      );

      expect(user.userId).toBeNull();
      expect(user.username).toBe('testuser');
      expect(user.email).toBe('test@example.com');
      expect(user.password).toBe('hashedPassword');
      expect(user.role).toBe(UserRole.ADMIN);
      expect(user.isActive).toBe(true);
      expect(user.doctorId).toBeNull();
      expect(user.createdAt).toBeNull();
      expect(user.updatedAt).toBeNull();
    });

    it('should create a user with custom isActive value', () => {
      const user = new User(
        1,
        'testuser',
        'test@example.com',
        'hashedPassword',
        UserRole.NURSE,
        false
      );

      expect(user.isActive).toBe(false);
    });
  });

  describe('UserRole enum', () => {
    it('should have all required roles', () => {
      expect(UserRole.ADMIN).toBe('ADMIN');
      expect(UserRole.DOCTOR).toBe('DOCTOR');
      expect(UserRole.NURSE).toBe('NURSE');
      expect(UserRole.RECEPTIONIST).toBe('RECEPTIONIST');
    });

    it('should have correct number of roles', () => {
      const roles = Object.values(UserRole);
      expect(roles).toHaveLength(4);
    });
  });
}); 