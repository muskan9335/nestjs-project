import { BookmarksDto } from './dto/bookmarks.dto';
import { BookmarksService } from './bookmarks.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post()
  addBookmarks(@Body() bookmarksDto: BookmarksDto, @GetUser() user: User) {
    return this.bookmarksService.addBookmarks(bookmarksDto, user);
  }

  @Get()
  getBookmarks() {
    return this.bookmarksService.getBookmarks();
  }

  @Get(':id')
  getSingleBookmark(@Param('id') prodId: number) {
    return this.bookmarksService.getSingleBookmark(prodId);
  }

  @Put(':id')
  updateBookmark(
    @Param('id') prodId: number,
    @Body() bookmarksDto: BookmarksDto,
  ) {
    return this.bookmarksService.updateBookmark(prodId, bookmarksDto);
  }

  @Delete(':id')
  deleteBookmark(@Param('id') prodId: number) {
    return this.bookmarksService.deleteBookmark(prodId);
  }
}
