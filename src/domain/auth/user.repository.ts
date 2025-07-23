import { User } from './user.entity';

export interface UserRepository {
  create(user: User): Promise<User>;
  findById(userId: number): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByDoctorId(doctorId: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(userId: number, user: Partial<User>): Promise<User>;
  delete(userId: number): Promise<void>;
} 