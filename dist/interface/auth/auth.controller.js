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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("../../application/auth/auth.service");
const auth_dto_1 = require("./auth.dto");
const jwt_auth_guard_1 = require("../../infrastructure/auth/jwt-auth.guard");
const roles_guard_1 = require("../../infrastructure/auth/roles.guard");
const roles_decorator_1 = require("../../infrastructure/auth/roles.decorator");
const user_entity_1 = require("../../domain/auth/user.entity");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto) {
        return this.authService.login(loginDto.username, loginDto.password);
    }
    async register(registerDto) {
        const userData = {
            ...registerDto,
            isActive: registerDto.isActive ?? true,
            doctorId: registerDto.doctorId ?? null,
        };
        return this.authService.register(userData);
    }
    getProfile(req) {
        return req.user;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Iniciar sesión de usuario' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Login exitoso',
        schema: {
            type: 'object',
            properties: {
                access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                user: {
                    type: 'object',
                    properties: {
                        userId: { type: 'number', example: 1 },
                        username: { type: 'string', example: 'doctor.garcia' },
                        email: { type: 'string', example: 'doctor.garcia@hospital.com' },
                        role: { type: 'string', enum: Object.values(user_entity_1.UserRole), example: user_entity_1.UserRole.DOCTOR }
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Credenciales inválidas' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar nuevo usuario (solo ADMIN)' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Usuario registrado exitosamente',
        schema: {
            type: 'object',
            properties: {
                userId: { type: 'number', example: 1 },
                username: { type: 'string', example: 'doctor.garcia' },
                email: { type: 'string', example: 'doctor.garcia@hospital.com' },
                role: { type: 'string', enum: Object.values(user_entity_1.UserRole), example: user_entity_1.UserRole.DOCTOR },
                isActive: { type: 'boolean', example: true },
                doctorId: { type: 'number', example: 1 },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos inválidos o usuario ya existe' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'No autorizado' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acceso denegado - se requiere rol ADMIN' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener perfil del usuario autenticado' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Perfil del usuario',
        schema: {
            type: 'object',
            properties: {
                userId: { type: 'number', example: 1 },
                username: { type: 'string', example: 'doctor.garcia' },
                email: { type: 'string', example: 'doctor.garcia@hospital.com' },
                role: { type: 'string', enum: Object.values(user_entity_1.UserRole), example: user_entity_1.UserRole.DOCTOR }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'No autorizado' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Autenticación'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map