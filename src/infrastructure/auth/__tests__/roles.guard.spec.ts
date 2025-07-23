import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from '../roles.guard';
import { UserRole } from '../../../domain/auth/user.entity';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: jest.Mocked<Reflector>;

  const mockReflector = {
    getAllAndOverride: jest.fn(),
  };

  const createMockExecutionContext = (user: any) => ({
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({ user }),
    }),
    getHandler: jest.fn(),
    getClass: jest.fn(),
  } as any);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: mockReflector,
        },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get(Reflector);

    // Reset mocks
    jest.clearAllMocks();
  });

  describe('canActivate', () => {
    it('should return true when no roles are required', () => {
      reflector.getAllAndOverride.mockReturnValue(undefined);
      const mockExecutionContext = createMockExecutionContext({
        userId: 1,
        username: 'testuser',
        role: UserRole.DOCTOR,
      });

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
      expect(reflector.getAllAndOverride).toHaveBeenCalledWith('roles', [
        mockExecutionContext.getHandler(),
        mockExecutionContext.getClass(),
      ]);
    });

    it('should return true when user has required role', () => {
      reflector.getAllAndOverride.mockReturnValue([UserRole.DOCTOR, UserRole.ADMIN]);
      const mockExecutionContext = createMockExecutionContext({
        userId: 1,
        username: 'testuser',
        role: UserRole.DOCTOR,
      });

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
    });

    it('should return true when user has one of the required roles', () => {
      reflector.getAllAndOverride.mockReturnValue([UserRole.NURSE, UserRole.DOCTOR]);
      const mockExecutionContext = createMockExecutionContext({
        userId: 1,
        username: 'testuser',
        role: UserRole.DOCTOR,
      });

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
    });

    it('should return false when user does not have required role', () => {
      reflector.getAllAndOverride.mockReturnValue([UserRole.ADMIN]);
      const mockExecutionContext = createMockExecutionContext({
        userId: 1,
        username: 'testuser',
        role: UserRole.DOCTOR,
      });

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(false);
    });

    it('should return false when user has no role', () => {
      reflector.getAllAndOverride.mockReturnValue([UserRole.ADMIN]);
      const mockExecutionContext = createMockExecutionContext({
        userId: 1,
        username: 'testuser',
        // No role property
      });

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(false);
    });

    it('should return false when user object is missing', () => {
      reflector.getAllAndOverride.mockReturnValue([UserRole.ADMIN]);
      const mockExecutionContext = createMockExecutionContext(undefined);

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(false);
    });
  });
}); 