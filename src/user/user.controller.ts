import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator/index';
import { User } from '@prisma/client';
import { UserDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  // @UseGuards(AuthGuard)

  @Get('profile')
  getProfile(user: User) {
    return this.userService.profile(user);
  }

  @Get('all')
  getAllUsers() {
    return this.userService.allUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() userDto: UserDto) {
    return this.userService.updateUser(id, userDto);
  }

  // @Get(':id')
  // getProfile(@Param() params: any): any {
  //   return this.userService.profile(params);
  //   // return 'muskan';
  // }
}
