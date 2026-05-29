import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async createUser(data: Partial<User>): Promise<User> {
  const user = this.repository.create(data);

  return await this.repository.save(user);
}
  

  async findAll(options?: FindManyOptions<User>): Promise<User[]> {
    return await this.repository.find(options);
  }

  async findByEmail(
    email: string,
    options?: FindOneOptions<User>,
  ): Promise<User | null> {
    return await this.repository.findOne({
      where: { email },
      ...options,
    });
  }

  async findById(
    id: number,
    options?: FindOneOptions<User>,
  ): Promise<User | null> {
    return await this.repository.findOne({
      where: { id },
      ...options,
    });
  }

  async updateUser(
  id: number,
  data: Partial<User>,
): Promise<User | null> {
  const user = await this.repository.findOne({
    where: { id },
    relations: { roles: true },
  });

  if (!user) {
    return null;
  }

  Object.assign(user, data);

  return await this.repository.save(user);
}





/*
  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { id },
      relations: { roles: true },
    });

    if (!user) {
      return null;
    }

    Object.assign(user, updateUserDto);

    return await this.repository.save(user);
  }
*/

  async deleteUser(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}