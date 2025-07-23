import { DoctorService } from '../../application/doctor/doctor.service';
import { CreateDoctorDto, UpdateDoctorDto } from './doctor.dto';
export declare class DoctorController {
    private readonly doctorService;
    constructor(doctorService: DoctorService);
    create(createDoctorDto: CreateDoctorDto): Promise<import("../../domain/doctor/doctor.entity").Doctor>;
    findAll(): Promise<import("../../domain/doctor/doctor.entity").Doctor[]>;
    findOne(id: string): Promise<import("../../domain/doctor/doctor.entity").Doctor | null>;
    update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<import("../../domain/doctor/doctor.entity").Doctor>;
    remove(id: string): Promise<void>;
}
