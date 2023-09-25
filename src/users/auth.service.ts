import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // find user -> userService -> async, await -> user.length
    const user = await this.userService.find(email);

    if (user.length) {
      throw new BadRequestException('email in use');
    }
    // hash password
    // create user
    // return user
  }

  signin() {}
}
