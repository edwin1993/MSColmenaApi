import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../../application/auth/auth.service';
import { AuthController } from '../../interface/auth/auth.controller';
import { PrismaUserRepository } from './prisma-user.repository';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RolesGuard,
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  exports: [AuthService, JwtStrategy, RolesGuard],
})
export class AuthModule {} 