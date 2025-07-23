export declare enum UserRole {
    ADMIN = "ADMIN",
    DOCTOR = "DOCTOR",
    NURSE = "NURSE",
    RECEPTIONIST = "RECEPTIONIST"
}
export declare class User {
    readonly userId: number | null;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly role: UserRole;
    readonly isActive: boolean;
    readonly doctorId: number | null;
    readonly createdAt: Date | null;
    readonly updatedAt: Date | null;
    constructor(userId: number | null, username: string, email: string, password: string, role: UserRole, isActive?: boolean, doctorId?: number | null, createdAt?: Date | null, updatedAt?: Date | null);
}
