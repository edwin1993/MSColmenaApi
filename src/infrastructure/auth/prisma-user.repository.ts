import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User, UserRole } from '../../domain/auth/user.entity';
import { UserRepository } from '../../domain/auth/user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  private prisma = new PrismaClient();

  async create(user: User): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role as any,
        isActive: user.isActive,
        doctorId: user.doctorId,
      },
    });
    return new User(
      created.userId,
      created.username,
      created.email,
      created.password,
      created.role as UserRole,
      created.isActive,
      created.doctorId,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findById(userId: number): Promise<User | null> {
    const found = await this.prisma.user.findUnique({ where: { userId } });
    if (!found) return null;
    return new User(
      found.userId,
      found.username,
      found.email,
      found.password,
      found.role as UserRole,
      found.isActive,
      found.doctorId,
      found.createdAt,
      found.updatedAt,
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    const found = await this.prisma.user.findUnique({ where: { username } });
    if (!found) return null;
    return new User(
      found.userId,
      found.username,
      found.email,
      found.password,
      found.role as UserRole,
      found.isActive,
      found.doctorId,
      found.createdAt,
      found.updatedAt,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await this.prisma.user.findUnique({ where: { email } });
    if (!found) return null;
    return new User(
      found.userId,
      found.username,
      found.email,
      found.password,
      found.role as UserRole,
      found.isActive,
      found.doctorId,
      found.createdAt,
      found.updatedAt,
    );
  }

  async findByDoctorId(doctorId: number): Promise<User | null> {
    const found = await this.prisma.user.findUnique({ where: { doctorId } });
    if (!found) return null;
    return new User(
      found.userId,
      found.username,
      found.email,
      found.password,
      found.role as UserRole,
      found.isActive,
      found.doctorId,
      found.createdAt,
      found.updatedAt,
    );
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(
      (u: any) =>
        new User(
          u.userId,
          u.username,
          u.email,
          u.password,
          u.role as UserRole,
          u.isActive,
          u.doctorId,
          u.createdAt,
          u.updatedAt,
        ),
    );
  }

  async update(userId: number, user: Partial<User>): Promise<User> {
    // Excluir campos que no deben estar en el update
    const { userId: _, createdAt, updatedAt, ...data } = user;
    const updated = await this.prisma.user.update({
      where: { userId },
      data,
    });
    return new User(
      updated.userId,
      updated.username,
      updated.email,
      updated.password,
      updated.role as UserRole,
      updated.isActive,
      updated.doctorId,
      updated.createdAt,
      updated.updatedAt,
    );
  }

  async delete(userId: number): Promise<void> {
    await this.prisma.user.delete({ where: { userId } });
  }
} 