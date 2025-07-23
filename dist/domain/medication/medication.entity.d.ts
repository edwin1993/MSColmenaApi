export declare class Medication {
    readonly medicationId: number | null;
    readonly name: string;
    readonly description: string;
    readonly prescribedFor: string;
    readonly createdAt: Date | null;
    readonly updatedAt: Date | null;
    constructor(medicationId: number | null, name: string, description: string, prescribedFor: string, createdAt?: Date | null, updatedAt?: Date | null);
}
