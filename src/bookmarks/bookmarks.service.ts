import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { BookmarksDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Injectable()
export class BookmarksService {
  constructor(private prisma: PrismaService) {}

  async addBookmarks(bookmarksDto: BookmarksDto, user: User) {
    console.log(user);
    const bookmark = await this.prisma.bookmark.create({
      data: {
        title: bookmarksDto.title,
        description: bookmarksDto.description,
        link: bookmarksDto.link,
        userId: user.id,
      },
    });
    return bookmark;
  }

  getBookmarks() {
    return this.prisma.bookmark.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  getSingleBookmark(bookmarkId: number) {
    const id = +bookmarkId;
    console.log(id);
    const bookmark = this.prisma.bookmark.findFirst({
      where: { id },
      include: {
        user: true,
      },
    });
    if (!bookmark) throw new NotFoundException('Not Found');
    return bookmark;
  }

  async updateBookmark(bookmarkId: number, bookmarksDto: BookmarksDto) {
    const id = +bookmarkId;
    const bookmark = await this.prisma.bookmark.update({
      where: { id },
      data: {
        title: bookmarksDto.title,
        description: bookmarksDto.description,
        link: bookmarksDto.link,
        userId: bookmarksDto.userId,
      },
    });

    return bookmark;
  }

  async deleteBookmark(bookmarkId: number) {
    const id = +bookmarkId;
    const bookmark = await this.prisma.bookmark.delete({
      where: { id },
    });
    return 'Success';
  }
}
