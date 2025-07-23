import { validate } from 'class-validator';
import { LoginDto, RegisterDto } from '../auth.dto';
import { UserRole } from '../../../domain/auth/user.entity';

describe('Auth DTOs', () => {
  describe('LoginDto', () => {
    it('should pass validation with valid data', async () => {
      const loginDto = new LoginDto();
      loginDto.username = 'testuser';
      loginDto.password = 'password123';

      const errors = await validate(loginDto);

      expect(errors).toHaveLength(0);
    });

    it('should fail validation when username is empty', async () => {
      const loginDto = new LoginDto();
      loginDto.username = '';
      loginDto.password = 'password123';

      const errors = await validate(loginDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('username');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('should fail validation when password is too short', async () => {
      const loginDto = new LoginDto();
      loginDto.username = 'testuser';
      loginDto.password = '123';

      const errors = await validate(loginDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('password');
      expect(errors[0].constraints).toHaveProperty('length');
    });

    it('should fail validation when username is too long', async () => {
      const loginDto = new LoginDto();
      loginDto.username = 'a'.repeat(51); // 51 characters
      loginDto.password = 'password123';

      const errors = await validate(loginDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('username');
      expect(errors[0].constraints).toHaveProperty('length');
    });

    it('should fail validation when password is not a string', async () => {
      const loginDto = new LoginDto();
      loginDto.username = 'testuser';
      (loginDto as any).password = 123;

      const errors = await validate(loginDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('password');
      expect(errors[0].constraints).toHaveProperty('isString');
    });
  });

  describe('RegisterDto', () => {
    it('should pass validation with valid data', async () => {
      const registerDto = new RegisterDto();
      registerDto.username = 'newuser';
      registerDto.email = 'newuser@example.com';
      registerDto.password = 'password123';
      registerDto.role = UserRole.DOCTOR;

      const errors = await validate(registerDto);

      expect(errors).toHaveLength(0);
    });

    it('should pass validation with optional fields', async () => {
      const registerDto = new RegisterDto();
      registerDto.username = 'newuser';
      registerDto.email = 'newuser@example.com';
      registerDto.password = 'password123';
      registerDto.role = UserRole.DOCTOR;
      registerDto.isActive = false;
      registerDto.doctorId = 1;

      const errors = await validate(registerDto);

      expect(errors).toHaveLength(0);
    });

    it('should fail validation when email is invalid', async () => {
      const registerDto = new RegisterDto();
      registerDto.username = 'newuser';
      registerDto.email = 'invalid-email';
      registerDto.password = 'password123';
      registerDto.role = UserRole.DOCTOR;

      const errors = await validate(registerDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('email');
      expect(errors[0].constraints).toHaveProperty('isEmail');
    });

    it('should fail validation when email is too long', async () => {
      const registerDto = new RegisterDto();
      registerDto.username = 'newuser';
      registerDto.email = 'a'.repeat(201) + '@example.com'; // 201+ characters
      registerDto.password = 'password123';
      registerDto.role = UserRole.DOCTOR;

      const errors = await validate(registerDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('email');
      expect(errors[0].constraints).toHaveProperty('length');
    });

    it('should fail validation when role is invalid', async () => {
      const registerDto = new RegisterDto();
      registerDto.username = 'newuser';
      registerDto.email = 'newuser@example.com';
      registerDto.password = 'password123';
      (registerDto as any).role = 'INVALID_ROLE';

      const errors = await validate(registerDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('role');
      expect(errors[0].constraints).toHaveProperty('isEnum');
    });

    it('should pass validation with all valid roles', async () => {
      const validRoles = [UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST];

      for (const role of validRoles) {
        const registerDto = new RegisterDto();
        registerDto.username = 'newuser';
        registerDto.email = 'newuser@example.com';
        registerDto.password = 'password123';
        registerDto.role = role;

        const errors = await validate(registerDto);

        expect(errors).toHaveLength(0);
      }
    });

    it('should fail validation when username is missing', async () => {
      const registerDto = new RegisterDto();
      registerDto.email = 'newuser@example.com';
      registerDto.password = 'password123';
      registerDto.role = UserRole.DOCTOR;

      const errors = await validate(registerDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('username');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('should fail validation when password is missing', async () => {
      const registerDto = new RegisterDto();
      registerDto.username = 'newuser';
      registerDto.email = 'newuser@example.com';
      registerDto.role = UserRole.DOCTOR;

      const errors = await validate(registerDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('password');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('should fail validation when role is missing', async () => {
      const registerDto = new RegisterDto();
      registerDto.username = 'newuser';
      registerDto.email = 'newuser@example.com';
      registerDto.password = 'password123';

      const errors = await validate(registerDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('role');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });
  });
}); 