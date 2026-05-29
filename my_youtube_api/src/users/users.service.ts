import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.createUser(createUserDto);
  }

  async findAll() {
    return await this.usersRepository.findAll({
      relations: {
        roles: true,
      },
    });
  }

  async findById(id: number) {
    const user = await this.usersRepository.findById(id, {
      relations: {
        roles: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email, {
      relations: {
        roles: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // ✅ UPDATE USER AVEC GESTION DES ROLES
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findById(id, {
      relations: {
        roles: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // 🔥 transformation: number[] -> Role[]
    const roles = updateUserDto.roles?.map((roleId) => ({
      id: roleId,
    })) as Role[] | undefined;

    const dataToUpdate = {
      ...updateUserDto,
      roles,
    };

    await this.usersRepository.updateUser(id, dataToUpdate);

    return this.usersRepository.findById(id, {
      relations: {
        roles: true,
      },
    });
  }

  async delete(id: number) {
    await this.usersRepository.deleteUser(id);

    return {
      message: 'User deleted successfully',
    };
  }
}