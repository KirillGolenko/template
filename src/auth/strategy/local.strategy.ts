import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import User from '@model/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private AuthService: AuthService) {
    super({
      usernameField: 'user_name',
    });
  }
  async validate(user_name: string, password: string): Promise<User> {
    return this.AuthService.getAuthenticatedUser(user_name, password);
  }
}
