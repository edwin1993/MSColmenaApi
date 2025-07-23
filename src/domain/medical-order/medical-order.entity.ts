export class MedicalOrder {
  constructor(
    public readonly medicalOrderId: number | null,
    public readonly appointmentId: number,
    public readonly description: string,
    public readonly expirationDate: Date,
    public readonly specialty: string,
    public readonly createdAt: Date | null = null,
    public readonly updatedAt: Date | null = null,
  ) {}
} 