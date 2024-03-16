import { HttpException, Injectable } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { PrismaService } from 'src/prisma.service';
import { UsersError } from '../wapum-types/users/Error';
@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
  ) {}

  async getUsers() {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
    return users;
  }

  async getUserById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        age: true,
        avatar: true,
      },
    });

    if (!user) throw new HttpException(UsersError.USER_NOT_FOUND, 404);

    return user;
  }

  async searchUser(username: string) {
    const users = await this.prismaService.user.findMany({
      where: {
        username: {
          contains: username,
        },
      },
      select: {
        id: true,
        username: true,
      },
    });

    return users;
  }

  async updateUsername(username: string, id: string) {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser)
      throw new HttpException(UsersError.USER_ALREADY_EXIST, 404);

    await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        username,
      },
    });
  }

  async updateUserProfilePicture(
    userId: string,
    profilePicture: Express.Multer.File,
  ) {
    const { avatar } = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        avatar: true,
      },
    });

    if (avatar && avatar !== 'avatar') {
      try {
        await this.fileService.deleteFile(avatar);
      } catch (e) {}
    }

    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar: userId,
      },
    });

    this.fileService.compressAndSaveImage(profilePicture, userId);
    return avatar;
  }
}
