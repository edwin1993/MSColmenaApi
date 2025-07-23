import { JwtService } from '@nestjs/jwt';
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
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<User | null>;
    login(username: string, password: string): Promise<LoginResponse>;
    register(userData: Omit<User, 'userId' | 'createdAt' | 'updatedAt'>): Promise<User>;
    findById(userId: number): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
}
