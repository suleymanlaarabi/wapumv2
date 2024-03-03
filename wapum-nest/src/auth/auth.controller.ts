import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { ResetPasswordDto } from 'src/auth/dto/reset-password.dto';
import { LoginResponse, RegisterResponse } from 'src/wapum-types/auth/Response';
import { AuthPayload } from '../wapum-types/auth/Auth';
import { LoginUserForm } from '../wapum-types/auth/Form';
import { AuthService } from './auth.service';
export type RequestWithAuthPayload = {
  user: AuthPayload;
};
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() authBody: LoginUserForm): Promise<LoginResponse> {
    return await this.authService.login(authBody);
  }
  @Post('register')
  async register(
    @Body() registerBody: CreateUserDto,
  ): Promise<RegisterResponse> {
    return await this.authService.register(registerBody);
  }

  @Post('request-reset-password')
  async requestResetPassword(@Body('email') email: string) {
    return await this.authService.resetUserPasswordRequest(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.resetUserPassword(
      resetPasswordDto.token,
      resetPasswordDto.password,
    );
  }
}
