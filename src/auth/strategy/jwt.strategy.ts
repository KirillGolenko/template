import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '@users/users.service';
import TokenPayload from 'src/auth/interface/tokenPayload.interface';
import * as config from 'config';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: config.get('jwt.secret'),
    });
  }

  async validate(payload: TokenPayload) {
    return this.userService.getByUserName(payload.user_name);
  }
}
