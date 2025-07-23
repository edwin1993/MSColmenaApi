export class Medication {
  constructor(
    public readonly medicationId: number | null,
    public readonly name: string,
    public readonly description: string,
    public readonly prescribedFor: string,
    public readonly createdAt: Date | null = null,
    public readonly updatedAt: Date | null = null,
  ) {}
} 