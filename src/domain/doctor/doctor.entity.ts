export class Doctor {
  constructor(
    public readonly doctorId: number | null,
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly address: string,
    public readonly city: string,
    public readonly professionalCard: string,
    public readonly admissionDate: Date,
  ) {}
} 