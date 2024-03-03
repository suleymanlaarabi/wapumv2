import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createId } from '@paralleldrive/cuid2';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { MailerService } from 'src/mailer/mailer.service';
import { PrismaService } from 'src/prisma.service';
import { LoginUserForm } from 'src/wapum-types/auth/Form';
import { AuthPayload } from '../wapum-types/auth/Auth';
import { RegisterError, ResetPasswordError } from '../wapum-types/auth/Error';
import { LoginResponse, RegisterResponse } from '../wapum-types/auth/Response';
import { Response } from '../wapum-types/global.types';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async login(auth: LoginUserForm): Promise<LoginResponse> {
    const existingUser: User = await this.prismaService.user.findUnique({
      where: { email: auth.email },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    const isPasswordValid = await this.isPasswordValid(
      auth.password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new Error('Password is incorrect');
    }
    const authenticateUser = await this.authenticateUser({
      userId: existingUser.id,
      username: existingUser.username,
    });
    return {
      access_token: authenticateUser.access_token,
      data: {
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        age: existingUser.age,
        phone: existingUser.phone,
        avatar: existingUser.avatar,
      },
    };
  }

  async register(auth: CreateUserDto): Promise<RegisterResponse> {
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: auth.email }, { username: auth.username }],
      },
    });

    if (existingUser) {
      throw new HttpException(
        RegisterError.EMAIL_OR_USERNAME_ALREADY_EXISTS,
        400,
      );
    }

    const newUser: User = await this.prismaService.user.create({
      data: {
        email: auth.email,
        username: auth.username,
        password: await this.hashPassword(auth.password),
        firstName: auth.firstName,
        lastName: auth.lastName,
        age: auth.age,
        phone: auth.phone,
      },
    });

    this.mailerService.sendCreatedAccountEmail(newUser);

    const authenticateUser = await this.authenticateUser({
      userId: newUser.id,
      username: newUser.username,
    });

    return {
      access_token: authenticateUser.access_token,
      data: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        age: newUser.age,
        phone: newUser.phone,
        avatar: newUser.avatar,
      },
    };
  }

  async resetUserPasswordRequest(email: string): Promise<Response> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      throw new HttpException(ResetPasswordError.USER_NOT_FOUND, 400);
    }

    if (existingUser.isResettingPassword) {
      throw new HttpException(
        ResetPasswordError.RESET_PASSWORD_ALREADY_REQUESTED,
        400,
      );
    }

    await this.prismaService.user.update({
      where: { email },
      data: { isResettingPassword: true, resetPasswordToken: createId() },
    });

    await this.mailerService.sendResetPasswordEmail(
      existingUser,
      existingUser.resetPasswordToken,
    );

    return {
      error: false,
      message: ['Reset password request sent'],
    };
  }

  async resetUserPassword(token: string, password: string): Promise<Response> {
    const tokenVerification = await this.verifyResetPasswordToken(token);

    if (tokenVerification.error) {
      return tokenVerification;
    }

    const existingUser = await this.prismaService.user.findFirst({
      where: { resetPasswordToken: token },
    });

    await this.prismaService.user.update({
      where: { id: existingUser.id },
      data: {
        password: await this.hashPassword(password),
        resetPasswordToken: null,
        isResettingPassword: false,
      },
    });

    return {
      error: false,
      message: ['Password reset successfully'],
    };
  }

  private async verifyResetPasswordToken(token: string): Promise<Response> {
    const existingUser = await this.prismaService.user.findFirst({
      where: { resetPasswordToken: token },
    });

    if (!existingUser) {
      throw new HttpException(ResetPasswordError.INVALID_TOKEN, 400);
    }

    if (existingUser.isResettingPassword === false) {
      throw new HttpException(
        ResetPasswordError.USER_NOT_REQUESTING_RESET_PASSWORD,
        400,
      );
    }

    return {
      error: false,
      message: ['Token is valid'],
    };
  }

  private async isPasswordValid(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
  }

  private async hashPassword(password: string) {
    return await hash(password, 10);
  }

  private async authenticateUser(payload: AuthPayload) {
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
