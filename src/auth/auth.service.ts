import { ConfigService } from '@nestjs/config';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  jwtService: any;
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      const roleUser = await this.prisma.roleUser.create({
        data: {
          roleId: 2,
          userId: user.id,
        },
      });

      delete user.hash;
      return user;
    } catch (error) {
      // console.log(error.code);
      // if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Credentials taken');
      }
      // }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Email Is not correct');

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) throw new UnauthorizedException('Credentials incorrect');

    // delete user.hash;
    // return this.signToken(user.id, user.email);
    // if (user?.hash !== dto.password) {
    //   throw new UnauthorizedException();
    // }
    const payload = { sub: user.id, email: user.email };
    const secret = this.config.get('JWT_SECRET');
    return {
      access_token: await this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: secret,
      }),
    };
  }
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
