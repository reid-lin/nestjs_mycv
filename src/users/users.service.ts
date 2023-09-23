import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    // create user entity
    const user = this.repo.create({ email, password });

    // save user data of entity to DB
    return this.repo.save(user);

    // this line DO NOT execute hooks, if input plain object text
    // return this.repo.save({ email, password });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  // update user attrs steps
  // step 1: attrs: Partial<User>
  // step 2: async, await
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    // step 3: handle user not found -> throw error
    if (!user) {
      throw new NotFoundException('user not found');
    }

    // step 4: use Object.assign to merge new attrs to old user entity
    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  // remove user steps
  // step 2: async, await -> find the user from DB
  async remove(id: number) {
    // step 1: find user
    const user = await this.findOne(id);

    // step 3: handle user not found -> throw error
    if (!user) {
      throw new NotFoundException('user not found');
    }

    // step 4: delete user
    return this.repo.remove(user);
  }
}
