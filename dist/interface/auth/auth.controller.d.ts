import { AuthService, LoginResponse } from '../../application/auth/auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<LoginResponse>;
    register(registerDto: RegisterDto): Promise<import("../../domain/auth/user.entity").User>;
    getProfile(req: any): any;
}
