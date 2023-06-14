import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async profile(user: User) {
    return user;
  }

  async allUsers() {
    return this.prisma.user.findMany();
  }

  async getUser(sub: number) {
    const id = +sub;
    const user = await this.prisma.user.findFirst({
      where: { id },
    });
    delete user.hash;
    return user;
  }

  async deleteUser(sub: number) {
    const id = +sub;
    const user = await this.prisma.user.delete({
      where: { id },
    });
    return 'sucess';
  }

  async updateUser(sub: number, userDto: UserDto) {
    const id = +sub;
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        firstName: userDto.firstName,
        lastName: userDto.lastName,
      },
    });

    delete user.hash;

    return user;
  }
}
