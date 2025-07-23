"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../../domain/auth/user.entity");
let AuthService = class AuthService {
    userRepository;
    jwtService;
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async validateUser(username, password) {
        const user = await this.userRepository.findByUsername(username);
        if (user && user.isActive && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
    async login(username, password) {
        const user = await this.validateUser(username, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const payload = {
            userId: user.userId,
            username: user.username,
            email: user.email,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                userId: user.userId,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        };
    }
    async register(userData) {
        const existingUser = await this.userRepository.findByUsername(userData.username);
        if (existingUser) {
            throw new common_1.BadRequestException('El nombre de usuario ya está en uso');
        }
        const existingEmail = await this.userRepository.findByEmail(userData.email);
        if (existingEmail) {
            throw new common_1.BadRequestException('El email ya está en uso');
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return this.userRepository.create(new user_entity_1.User(null, userData.username, userData.email, hashedPassword, userData.role, userData.isActive, userData.doctorId, null, null));
    }
    async findById(userId) {
        return this.userRepository.findById(userId);
    }
    async findByUsername(username) {
        return this.userRepository.findByUsername(username);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UserRepository')),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map