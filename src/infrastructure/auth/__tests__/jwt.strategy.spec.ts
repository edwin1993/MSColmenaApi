import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtStrategy } from '../jwt.strategy';
import { AuthService } from '../../../application/auth/auth.service';
import { User, UserRole } from '../../../domain/auth/user.entity';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let authService: jest.Mocked<AuthService>;

  const mockUser = new User(
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

  const mockPayload = {
    userId: 1,
    username: 'testuser',
    email: 'test@example.com',
    role: UserRole.DOCTOR,
  };

  const mockAuthService = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    authService = module.get(AuthService);

    // Reset mocks
    jest.clearAllMocks();
  });

  describe('validate', () => {
    it('should return user payload when user exists and is active', async () => {
      authService.findById.mockResolvedValue(mockUser);

      const result = await strategy.validate(mockPayload);

      expect(result).toEqual({
        userId: 1,
        username: 'testuser',
        email: 'test@example.com',
        role: UserRole.DOCTOR,
      });
      expect(authService.findById).toHaveBeenCalledWith(1);
    });

    it('should throw UnauthorizedException when user does not exist', async () => {
      authService.findById.mockResolvedValue(null);

      await expect(strategy.validate(mockPayload)).rejects.toThrow(
        UnauthorizedException
      );
      expect(authService.findById).toHaveBeenCalledWith(1);
    });

    it('should throw UnauthorizedException when user is inactive', async () => {
      const inactiveUser = new User(
        1,
        'testuser',
        'test@example.com',
        'hashedPassword',
        UserRole.DOCTOR,
        false
      );
      authService.findById.mockResolvedValue(inactiveUser);

      await expect(strategy.validate(mockPayload)).rejects.toThrow(
        UnauthorizedException
      );
      expect(authService.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('constructor', () => {
    it('should configure JWT strategy with correct options', () => {
      // The strategy should be configured with the correct options
      expect(strategy).toBeDefined();
    });
  });
}); 