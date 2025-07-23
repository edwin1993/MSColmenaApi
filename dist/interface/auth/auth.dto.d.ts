import { UserRole } from '../../domain/auth/user.entity';
export declare class LoginDto {
    username: string;
    password: string;
}
export declare class RegisterDto {
    username: string;
    email: string;
    password: string;
    role: UserRole;
    isActive?: boolean;
    doctorId?: number;
}
