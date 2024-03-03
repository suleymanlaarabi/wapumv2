import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequestWithAuthPayload } from 'src/auth/auth.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('update-profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  async updateProfilePicture(
    @UploadedFile()
    file: Express.Multer.File,
    @Req() { user }: RequestWithAuthPayload,
  ) {
    return await this.usersService.updateUserProfilePicture(user.userId, file);
  }

  @Get('')
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get('/user/:id')
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/search/:username')
  async searchUser(@Param('username') username: string) {
    if (username.length < 3)
      throw new Error('Username must be at least 3 characters long');

    return await this.usersService.searchUser(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getAuthenticatedUser(@Request() req: RequestWithAuthPayload) {
    const data = await this.usersService.getUserById(req.user.userId);
    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/update-username/:username')
  async updateUsername(
    @Param('username') username: string,
    @Req() req: RequestWithAuthPayload,
  ) {
    return await this.usersService.updateUsername(username, req.user.userId);
  }
}
