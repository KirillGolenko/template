import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import User from '@users/entity/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
    });
  }
  async validate(username: string, password: string): Promise<User> {
    return await this.authService.getAuthenticatedUser(username, password);
  }
}
