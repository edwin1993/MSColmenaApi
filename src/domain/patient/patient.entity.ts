export class Patient {
  constructor(
    public readonly patientId: number | null,
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly address: string,
    public readonly city: string,
  ) {}
} 