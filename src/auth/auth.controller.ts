import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import LocalAuthenticationGuard from '@guard/localAuthentication.guard';
import JwtAuthenticationGuard from '@guard/jwt-authentication.guard';
import RequestWithUser from '@interface/requestWithUser.interface';
import LoginPayload from '@dto/loginPayload.dto';
import { AuthService } from './auth.service';
import User from '@model/user.entity';
import { ApiTags } from '@nestjs/swagger';

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
  async logIn(@Body() body: LoginPayload, @Res() response: Response) {
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
