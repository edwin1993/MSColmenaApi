"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const user_entity_1 = require("../../domain/auth/user.entity");
let PrismaUserRepository = class PrismaUserRepository {
    prisma = new client_1.PrismaClient();
    async create(user) {
        const created = await this.prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                password: user.password,
                role: user.role,
                isActive: user.isActive,
                doctorId: user.doctorId,
            },
        });
        return new user_entity_1.User(created.userId, created.username, created.email, created.password, created.role, created.isActive, created.doctorId, created.createdAt, created.updatedAt);
    }
    async findById(userId) {
        const found = await this.prisma.user.findUnique({ where: { userId } });
        if (!found)
            return null;
        return new user_entity_1.User(found.userId, found.username, found.email, found.password, found.role, found.isActive, found.doctorId, found.createdAt, found.updatedAt);
    }
    async findByUsername(username) {
        const found = await this.prisma.user.findUnique({ where: { username } });
        if (!found)
            return null;
        return new user_entity_1.User(found.userId, found.username, found.email, found.password, found.role, found.isActive, found.doctorId, found.createdAt, found.updatedAt);
    }
    async findByEmail(email) {
        const found = await this.prisma.user.findUnique({ where: { email } });
        if (!found)
            return null;
        return new user_entity_1.User(found.userId, found.username, found.email, found.password, found.role, found.isActive, found.doctorId, found.createdAt, found.updatedAt);
    }
    async findByDoctorId(doctorId) {
        const found = await this.prisma.user.findUnique({ where: { doctorId } });
        if (!found)
            return null;
        return new user_entity_1.User(found.userId, found.username, found.email, found.password, found.role, found.isActive, found.doctorId, found.createdAt, found.updatedAt);
    }
    async findAll() {
        const users = await this.prisma.user.findMany();
        return users.map((u) => new user_entity_1.User(u.userId, u.username, u.email, u.password, u.role, u.isActive, u.doctorId, u.createdAt, u.updatedAt));
    }
    async update(userId, user) {
        const { userId: _, createdAt, updatedAt, ...data } = user;
        const updated = await this.prisma.user.update({
            where: { userId },
            data,
        });
        return new user_entity_1.User(updated.userId, updated.username, updated.email, updated.password, updated.role, updated.isActive, updated.doctorId, updated.createdAt, updated.updatedAt);
    }
    async delete(userId) {
        await this.prisma.user.delete({ where: { userId } });
    }
};
exports.PrismaUserRepository = PrismaUserRepository;
exports.PrismaUserRepository = PrismaUserRepository = __decorate([
    (0, common_1.Injectable)()
], PrismaUserRepository);
//# sourceMappingURL=prisma-user.repository.js.map