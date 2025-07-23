import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth.service';
import { User, UserRole } from '../../../domain/auth/user.entity';
import { UserRepository } from '../../../domain/auth/user.repository';

// Mock bcrypt
jest.mock('bcrypt');
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: jest.Mocked<UserRepository>;
  let jwtService: jest.Mocked<JwtService>;

  const mockUser: User = new User(
    1,
    'testuser',
    'test@example.com',
    'hashedPassword',
    UserRole.DOCTOR,
    true,
    1,
    new Date(),
    new Date()
  );

  const mockUserRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    findByUsername: jest.fn(),
    findByEmail: jest.fn(),
    findByDoctorId: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockJwtService: jest.Mocked<JwtService> = {
    sign: jest.fn(),
    signAsync: jest.fn(),
    verify: jest.fn(),
    verifyAsync: jest.fn(),
    decode: jest.fn(),
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'UserRepository',
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get('UserRepository');
    jwtService = module.get<JwtService>(JwtService) as jest.Mocked<JwtService>;

    // Reset mocks
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return user when credentials are valid', async () => {
      userRepository.findByUsername.mockResolvedValue(mockUser);
      mockBcrypt.compare.mockResolvedValue(true as unknown as never);

      const result = await service.validateUser('testuser', 'password');

      expect(result).toEqual(mockUser);
      expect(userRepository.findByUsername).toHaveBeenCalledWith('testuser');
      expect(mockBcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword');
    });

    it('should return null when user does not exist', async () => {
      userRepository.findByUsername.mockResolvedValue(null);

      const result = await service.validateUser('nonexistent', 'password');

      expect(result).toBeNull();
      expect(userRepository.findByUsername).toHaveBeenCalledWith('nonexistent');
      expect(mockBcrypt.compare).not.toHaveBeenCalled();
    });

    it('should return null when user is inactive', async () => {
      const inactiveUser = new User(
        1,
        'testuser',
        'test@example.com',
        'hashedPassword',
        UserRole.DOCTOR,
        false
      );
      userRepository.findByUsername.mockResolvedValue(inactiveUser);

      const result = await service.validateUser('testuser', 'password');

      expect(result).toBeNull();
      expect(mockBcrypt.compare).not.toHaveBeenCalled();
    });

    it('should return null when password is incorrect', async () => {
      userRepository.findByUsername.mockResolvedValue(mockUser);
      mockBcrypt.compare.mockResolvedValue(false as unknown as never);

      const result = await service.validateUser('testuser', 'wrongpassword');

      expect(result).toBeNull();
      expect(mockBcrypt.compare).toHaveBeenCalledWith('wrongpassword', 'hashedPassword');
    });
  });

  describe('login', () => {
    it('should return login response with token when credentials are valid', async () => {
      const mockToken = 'jwt-token';
      userRepository.findByUsername.mockResolvedValue(mockUser);
      mockBcrypt.compare.mockResolvedValue(true as unknown as never);
      jwtService.sign.mockReturnValue(mockToken);

      const result = await service.login('testuser', 'password');

      expect(result).toEqual({
        access_token: mockToken,
        user: {
          userId: 1,
          username: 'testuser',
          email: 'test@example.com',
          role: UserRole.DOCTOR,
        },
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        userId: 1,
        username: 'testuser',
        email: 'test@example.com',
        role: UserRole.DOCTOR,
      });
    });

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      userRepository.findByUsername.mockResolvedValue(null);

      await expect(service.login('testuser', 'password')).rejects.toThrow(
        UnauthorizedException
      );
      expect(jwtService.sign).not.toHaveBeenCalled();
    });
  });

  describe('register', () => {
    const registerData = {
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'password123',
      role: UserRole.DOCTOR,
      isActive: true,
      doctorId: 1,
    };

    it('should create user successfully when data is valid', async () => {
      userRepository.findByUsername.mockResolvedValue(null);
      userRepository.findByEmail.mockResolvedValue(null);
      mockBcrypt.hash.mockResolvedValue('hashedPassword' as unknown as never);
      userRepository.create.mockResolvedValue(mockUser);

      const result = await service.register(registerData);

      expect(result).toEqual(mockUser);
      expect(userRepository.findByUsername).toHaveBeenCalledWith('newuser');
      expect(userRepository.findByEmail).toHaveBeenCalledWith('newuser@example.com');
      expect(mockBcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(userRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'hashedPassword',
          role: UserRole.DOCTOR,
        })
      );
    });

    it('should throw BadRequestException when username already exists', async () => {
      userRepository.findByUsername.mockResolvedValue(mockUser);

      await expect(service.register(registerData)).rejects.toThrow(
        BadRequestException
      );
      expect(userRepository.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when email already exists', async () => {
      userRepository.findByUsername.mockResolvedValue(null);
      userRepository.findByEmail.mockResolvedValue(mockUser);

      await expect(service.register(registerData)).rejects.toThrow(
        BadRequestException
      );
      expect(userRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return user when found', async () => {
      userRepository.findById.mockResolvedValue(mockUser);

      const result = await service.findById(1);

      expect(result).toEqual(mockUser);
      expect(userRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should return null when user not found', async () => {
      userRepository.findById.mockResolvedValue(null);

      const result = await service.findById(999);

      expect(result).toBeNull();
      expect(userRepository.findById).toHaveBeenCalledWith(999);
    });
  });

  describe('findByUsername', () => {
    it('should return user when found', async () => {
      userRepository.findByUsername.mockResolvedValue(mockUser);

      const result = await service.findByUsername('testuser');

      expect(result).toEqual(mockUser);
      expect(userRepository.findByUsername).toHaveBeenCalledWith('testuser');
    });

    it('should return null when user not found', async () => {
      userRepository.findByUsername.mockResolvedValue(null);

      const result = await service.findByUsername('nonexistent');

      expect(result).toBeNull();
      expect(userRepository.findByUsername).toHaveBeenCalledWith('nonexistent');
    });
  });
}); 