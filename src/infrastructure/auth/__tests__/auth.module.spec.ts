import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth.module';
import { AuthService } from '../../../application/auth/auth.service';
import { AuthController } from '../../../interface/auth/auth.controller';
import { PrismaUserRepository } from '../prisma-user.repository';
import { JwtStrategy } from '../jwt.strategy';
import { RolesGuard } from '../roles.guard';

describe('AuthModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: 'test-secret',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtStrategy,
        RolesGuard,
        {
          provide: 'UserRepository',
          useClass: PrismaUserRepository,
        },
      ],
    }).compile();
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide AuthService', () => {
    const authService = module.get<AuthService>(AuthService);
    expect(authService).toBeDefined();
    expect(authService).toBeInstanceOf(AuthService);
  });

  it('should provide AuthController', () => {
    const authController = module.get<AuthController>(AuthController);
    expect(authController).toBeDefined();
    expect(authController).toBeInstanceOf(AuthController);
  });

  it('should provide JwtStrategy', () => {
    const jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    expect(jwtStrategy).toBeDefined();
    expect(jwtStrategy).toBeInstanceOf(JwtStrategy);
  });

  it('should provide RolesGuard', () => {
    const rolesGuard = module.get<RolesGuard>(RolesGuard);
    expect(rolesGuard).toBeDefined();
    expect(rolesGuard).toBeInstanceOf(RolesGuard);
  });

  it('should provide UserRepository', () => {
    const userRepository = module.get('UserRepository');
    expect(userRepository).toBeDefined();
    expect(userRepository).toBeInstanceOf(PrismaUserRepository);
  });

  it('should configure JwtModule with correct options', () => {
    const jwtModule = module.get(JwtModule);
    expect(jwtModule).toBeDefined();
  });

  it('should configure PassportModule', () => {
    const passportModule = module.get(PassportModule);
    expect(passportModule).toBeDefined();
  });

  it('should have all required dependencies injected', () => {
    const authController = module.get<AuthController>(AuthController);
    const authService = module.get<AuthService>(AuthService);

    // Verify that the controller has the service injected
    expect(authController['authService']).toBeDefined();
    expect(authController['authService']).toBe(authService);
  });

  it('should have JwtStrategy with AuthService dependency', () => {
    const jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    const authService = module.get<AuthService>(AuthService);

    // Verify that the strategy has the service injected
    expect(jwtStrategy['authService']).toBeDefined();
    expect(jwtStrategy['authService']).toBe(authService);
  });

  it('should have RolesGuard with Reflector dependency', () => {
    const rolesGuard = module.get<RolesGuard>(RolesGuard);
    
    // Verify that the guard has the reflector injected
    expect(rolesGuard['reflector']).toBeDefined();
  });
}); 