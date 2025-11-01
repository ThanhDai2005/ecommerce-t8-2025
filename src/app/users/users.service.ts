import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './users.interface';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      firstName: 'dai',
      lastName: 'nguyen',
      email: 'daivn@gmail.com',
      password: '123456',
    },
  ];
  getUsers(): User[] {
    return this.users;
  }

  getUser(id: string): User {
    const userFound = this.users.find((item) => item.id == id);
    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    return userFound;
  }

  createUsers(user: User): User {
    this.users.push(user);
    return user;
  }
}
