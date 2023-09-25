import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
// avoid to use callback in scrypt function
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

// setup promise object ot scrypt
const scrypt = promisify(_scrypt);

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
    const salt = randomBytes(8).toString('hex');
    // let script return value as Buffer for typescript know what type it is
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    // create user
    // return user
  }

  signin() {}
}
