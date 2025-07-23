export enum UserRole {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  NURSE = 'NURSE',
  RECEPTIONIST = 'RECEPTIONIST',
}

export class User {
  constructor(
    public readonly userId: number | null,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: UserRole,
    public readonly isActive: boolean = true,
    public readonly doctorId: number | null = null,
    public readonly createdAt: Date | null = null,
    public readonly updatedAt: Date | null = null,
  ) {}
} 