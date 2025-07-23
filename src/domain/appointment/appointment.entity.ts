export enum AppointmentStatus {
  PROGRAMADA = 'PROGRAMADA',
  ASISTIO = 'ASISTIO',
  NO_ASISTIO = 'NO_ASISTIO',
}

export class Appointment {
  constructor(
    public readonly appointmentId: number | null,
    public readonly doctorId: number,
    public readonly patientId: number,
    public readonly appointmentDate: Date,
    public readonly status: AppointmentStatus = AppointmentStatus.PROGRAMADA,
    public readonly statusUpdateDate: Date | null = null,
    public readonly createdAt: Date | null = null,
    public readonly updatedAt: Date | null = null,
  ) {}
} 