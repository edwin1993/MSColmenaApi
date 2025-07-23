import { Injectable, Inject, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../../domain/auth/user.entity';
import { UserRepository } from '../../domain/auth/user.repository';

export interface JwtPayload {
  userId: number;
  username: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  access_token: string;
  user: {
    userId: number;
    username: string;
    email: string;
    role: UserRole;
  };
}

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByUsername(username);
    if (user && user.isActive && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload: JwtPayload = {
      userId: user.userId!,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        userId: user.userId!,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }

  async register(userData: Omit<User, 'userId' | 'createdAt' | 'updatedAt'>): Promise<User> {
    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findByUsername(userData.username);
    if (existingUser) {
      throw new BadRequestException('El nombre de usuario ya está en uso');
    }

    const existingEmail = await this.userRepository.findByEmail(userData.email);
    if (existingEmail) {
      throw new BadRequestException('El email ya está en uso');
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return this.userRepository.create(
      new User(
        null,
        userData.username,
        userData.email,
        hashedPassword,
        userData.role,
        userData.isActive,
        userData.doctorId,
        null,
        null,
      ),
    );
  }

  async findById(userId: number): Promise<User | null> {
    return this.userRepository.findById(userId);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }
} 