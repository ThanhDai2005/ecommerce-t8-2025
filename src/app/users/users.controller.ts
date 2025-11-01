import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from './users.interface';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): User[] {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string): User {
    return this.usersService.getUser(id);
  }

  @Post()
  createUsers(@Body() user: User): User {
    return this.usersService.createUsers(user);
  }
}
