import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '../prisma-user.repository';
import { User, UserRole } from '../../../domain/auth/user.entity';

// Mock PrismaClient
jest.mock('@prisma/client');

describe('PrismaUserRepository', () => {
  let repository: PrismaUserRepository;
  let mockPrisma: jest.Mocked<PrismaClient>;

  const mockPrismaUser = {
    userId: 1,
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashedPassword',
    role: 'DOCTOR',
    isActive: true,
    doctorId: 1,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  };

  const mockUser = new User(
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaUserRepository],
    }).compile();

    repository = module.get<PrismaUserRepository>(PrismaUserRepository);
    mockPrisma = repository['prisma'] as jest.Mocked<PrismaClient>;

    // Inicializa mockPrisma.user para evitar errores de undefined
    Object.defineProperty(mockPrisma, 'user', {
      value: {},
      writable: true,
    });

    // Reset mocks
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      const newUser = new User(
        null,
        'newuser',
        'newuser@example.com',
        'hashedPassword',
        UserRole.ADMIN,
        true,
        null,
        null,
        null
      );

      mockPrisma.user.create = jest.fn();
      (mockPrisma.user.create as jest.Mock).mockResolvedValue(mockPrismaUser);

      const result = await repository.create(newUser);

      expect(result).toEqual(mockUser);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'hashedPassword',
          role: 'ADMIN',
          isActive: true,
          doctorId: null,
        },
      });
    });
  });

  describe('findById', () => {
    it('should return user when found', async () => {
      mockPrisma.user.findUnique = jest.fn();
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockPrismaUser);

      const result = await repository.findById(1);

      expect(result).toEqual(mockUser);
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { userId: 1 },
      });
    });

    it('should return null when user not found', async () => {
      mockPrisma.user.findUnique = jest.fn();
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById(999);

      expect(result).toBeNull();
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { userId: 999 },
      });
    });
  });

  describe('findByUsername', () => {
    it('should return user when found', async () => {
      mockPrisma.user.findUnique = jest.fn();
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockPrismaUser);

      const result = await repository.findByUsername('testuser');

      expect(result).toEqual(mockUser);
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { username: 'testuser' },
      });
    });

    it('should return null when user not found', async () => {
      mockPrisma.user.findUnique = jest.fn();
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findByUsername('nonexistent');

      expect(result).toBeNull();
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { username: 'nonexistent' },
      });
    });
  });

  describe('findByEmail', () => {
    it('should return user when found', async () => {
      mockPrisma.user.findUnique = jest.fn();
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockPrismaUser);

      const result = await repository.findByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('should return null when user not found', async () => {
      mockPrisma.user.findUnique = jest.fn();
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findByEmail('nonexistent@example.com');

      expect(result).toBeNull();
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'nonexistent@example.com' },
      });
    });
  });

  describe('findByDoctorId', () => {
    it('should return user when found', async () => {
      mockPrisma.user.findUnique = jest.fn();
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(mockPrismaUser);

      const result = await repository.findByDoctorId(1);

      expect(result).toEqual(mockUser);
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { doctorId: 1 },
      });
    });

    it('should return null when user not found', async () => {
      mockPrisma.user.findUnique = jest.fn();
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findByDoctorId(999);

      expect(result).toBeNull();
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { doctorId: 999 },
      });
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockPrismaUsers = [
        mockPrismaUser,
        {
          ...mockPrismaUser,
          userId: 2,
          username: 'user2',
          email: 'user2@example.com',
        },
      ];

      mockPrisma.user.findMany = jest.fn();
      (mockPrisma.user.findMany as jest.Mock).mockResolvedValue(mockPrismaUsers);

      const result = await repository.findAll();

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(mockUser);
      expect(result[1].userId).toBe(2);
      expect(result[1].username).toBe('user2');
      expect(mockPrisma.user.findMany).toHaveBeenCalled();
    });

    it('should return empty array when no users exist', async () => {
      mockPrisma.user.findMany = jest.fn();
      (mockPrisma.user.findMany as jest.Mock).mockResolvedValue([]);

      const result = await repository.findAll();

      expect(result).toEqual([]);
      expect(mockPrisma.user.findMany).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update user successfully', async () => {
      const updateData = {
        username: 'updateduser',
        email: 'updated@example.com',
      };

      const updatedPrismaUser = {
        ...mockPrismaUser,
        ...updateData,
      };

      mockPrisma.user.update = jest.fn();
      (mockPrisma.user.update as jest.Mock).mockResolvedValue(updatedPrismaUser);

      const result = await repository.update(1, updateData);

      expect(result.username).toBe('updateduser');
      expect(result.email).toBe('updated@example.com');
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { userId: 1 },
        data: updateData,
      });
    });

    it('should exclude userId, createdAt, and updatedAt from update data', async () => {
      const updateData = {
        userId: 999, // Should be excluded
        username: 'updateduser',
        createdAt: new Date(), // Should be excluded
        updatedAt: new Date(), // Should be excluded
      };

      mockPrisma.user.update = jest.fn();
      (mockPrisma.user.update as jest.Mock).mockResolvedValue(mockPrismaUser);

      await repository.update(1, updateData);

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { userId: 1 },
        data: { username: 'updateduser' },
      });
    });
  });

  describe('delete', () => {
    it('should delete user successfully', async () => {
      // Aseguramos que sea un mock de Jest
      mockPrisma.user.delete = jest.fn();
      (mockPrisma.user.delete as jest.Mock).mockResolvedValue(mockPrismaUser);

      await repository.delete(1);

      expect(mockPrisma.user.delete).toHaveBeenCalledWith({
        where: { userId: 1 },
      });
    });
  });
}); 