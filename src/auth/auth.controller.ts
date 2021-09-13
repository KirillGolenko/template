import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import LocalAuthenticationGuard from '@guard/localAuthentication.guard';
import JwtAuthenticationGuard from '@guard/jwt-authentication.guard';
import RequestWithUser from 'src/auth/interface/requestWithUser.interface';
import UserLogin from '@dto/userLogin.dto';
import { AuthService } from './auth.service';
import User from '@users/entity/user.entity';
import { ApiTags } from '@nestjs/swagger';
import HttpExceptionFilter from 'src/filter/http-exception.filter';

@ApiTags('authentication')
@Controller('authentication')
export class AuthController {
  constructor(private readonly authenticationService: AuthService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @Post('register')
  async register(@Body() registrationData: User) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Body() body: UserLogin, @Res() response: Response) {
    const { user_name } = body;
    const cookie = this.authenticationService.getCookieWithJwtToken(user_name);
    response.setHeader('Set-Cookie', cookie);
    body.password = undefined;
    return response.send(body);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('log-out')
  async logOut(@Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return response.sendStatus(200);
  }
}
