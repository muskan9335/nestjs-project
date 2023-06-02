import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signup() {
    return { msg: 'hey I am signeup' };
  }

  signin() {
    return { msg: 'hey I am signin' };
  }
}
