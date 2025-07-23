import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../../../application/auth/auth.service';
import { User, UserRole } from '../../../domain/auth/user.entity';
import { LoginDto, RegisterDto } from '../auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
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

  const mockLoginResponse = {
    access_token: 'jwt-token',
    user: {
      userId: 1,
      username: 'testuser',
      email: 'test@example.com',
      role: UserRole.DOCTOR,
    },
  };

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
    findById: jest.fn(),
    findByUsername: jest.fn(),
    validateUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);

    // Reset mocks
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return login response when credentials are valid', async () => {
      const loginDto: LoginDto = {
        username: 'testuser',
        password: 'password123',
      };

      authService.login.mockResolvedValue(mockLoginResponse);

      const result = await controller.login(loginDto);

      expect(result).toEqual(mockLoginResponse);
      expect(authService.login).toHaveBeenCalledWith('testuser', 'password123');
    });

    it('should pass login data to service correctly', async () => {
      const loginDto: LoginDto = {
        username: 'admin',
        password: 'admin123',
      };

      authService.login.mockResolvedValue(mockLoginResponse);

      await controller.login(loginDto);

      expect(authService.login).toHaveBeenCalledWith('admin', 'admin123');
    });
  });

  describe('register', () => {
    it('should register user successfully when data is valid', async () => {
      const registerDto: RegisterDto = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
        role: UserRole.DOCTOR,
        isActive: true,
        doctorId: 1,
      };

      authService.register.mockResolvedValue(mockUser);

      const result = await controller.register(registerDto);

      expect(result).toEqual(mockUser);
      expect(authService.register).toHaveBeenCalledWith({
        ...registerDto,
        isActive: true,
        doctorId: 1,
      });
    });

    it('should handle register data with default values', async () => {
      const registerDto: RegisterDto = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
        role: UserRole.ADMIN,
        // isActive and doctorId not provided
      };

      authService.register.mockResolvedValue(mockUser);

      await controller.register(registerDto);

      expect(authService.register).toHaveBeenCalledWith({
        ...registerDto,
        isActive: true,
        doctorId: null,
      });
    });

    it('should handle register data with custom values', async () => {
      const registerDto: RegisterDto = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
        role: UserRole.NURSE,
        isActive: false,
        doctorId: 5,
      };

      authService.register.mockResolvedValue(mockUser);

      await controller.register(registerDto);

      expect(authService.register).toHaveBeenCalledWith({
        ...registerDto,
        isActive: false,
        doctorId: 5,
      });
    });
  });

  describe('getProfile', () => {
    it('should return user profile from request', () => {
      const mockRequest = {
        user: {
          userId: 1,
          username: 'testuser',
          email: 'test@example.com',
          role: UserRole.DOCTOR,
        },
      };

      const result = controller.getProfile(mockRequest);

      expect(result).toEqual(mockRequest.user);
    });

    it('should return complete user profile data', () => {
      const mockRequest = {
        user: {
          userId: 2,
          username: 'admin',
          email: 'admin@hospital.com',
          role: UserRole.ADMIN,
        },
      };

      const result = controller.getProfile(mockRequest);

      expect(result).toEqual({
        userId: 2,
        username: 'admin',
        email: 'admin@hospital.com',
        role: UserRole.ADMIN,
      });
    });
  });
}); 