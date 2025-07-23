import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService, LoginResponse } from '../../application/auth/auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { Roles } from '../../infrastructure/auth/roles.decorator';
import { UserRole } from '../../domain/auth/user.entity';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión de usuario' })
  @ApiResponse({ 
    status: 200, 
    description: 'Login exitoso',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        user: {
          type: 'object',
          properties: {
            userId: { type: 'number', example: 1 },
            username: { type: 'string', example: 'doctor.garcia' },
            email: { type: 'string', example: 'doctor.garcia@hospital.com' },
            role: { type: 'string', enum: Object.values(UserRole), example: UserRole.DOCTOR }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  @Post('register')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registrar nuevo usuario (solo ADMIN)' })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuario registrado exitosamente',
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 1 },
        username: { type: 'string', example: 'doctor.garcia' },
        email: { type: 'string', example: 'doctor.garcia@hospital.com' },
        role: { type: 'string', enum: Object.values(UserRole), example: UserRole.DOCTOR },
        isActive: { type: 'boolean', example: true },
        doctorId: { type: 'number', example: 1 },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos o usuario ya existe' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado - se requiere rol ADMIN' })
  async register(@Body() registerDto: RegisterDto) {
    const userData = {
      ...registerDto,
      isActive: registerDto.isActive ?? true,
      doctorId: registerDto.doctorId ?? null,
    };
    return this.authService.register(userData);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  @ApiResponse({ 
    status: 200, 
    description: 'Perfil del usuario',
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 1 },
        username: { type: 'string', example: 'doctor.garcia' },
        email: { type: 'string', example: 'doctor.garcia@hospital.com' },
        role: { type: 'string', enum: Object.values(UserRole), example: UserRole.DOCTOR }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  getProfile(@Request() req: any) {
    return req.user;
  }
} 