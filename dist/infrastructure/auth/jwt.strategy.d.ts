import { Strategy } from 'passport-jwt';
import { AuthService, JwtPayload } from '../../application/auth/auth.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(payload: JwtPayload): Promise<{
        userId: number;
        username: string;
        email: string;
        role: import("../../domain/auth/user.entity").UserRole;
    }>;
}
export {};
