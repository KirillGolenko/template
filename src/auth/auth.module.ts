import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategy/google.strategy';
import LocalStrategy from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import JwtStrategy from './strategy/jwt.strategy';
import { UsersModule } from '@users/users.module';
import { AuthService } from './auth.service';
import * as config from 'config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: config.get('jwt.secret'),
      signOptions: {
        expiresIn: `${config.get('jwt.expirationTime')}s`,
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
