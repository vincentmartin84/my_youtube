import { Injectable, NotFoundException,   ConflictException, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { RolesRepository } from 'src/roles/repositories/roles.repository';
import { Role } from '../roles/entities/role.entity';
import { User } from './entities/user.entity';
import { SecurityService } from 'src/security/security.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly securityService: SecurityService,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // récupérer le rôle USER
    const defaultRole = await this.rolesRepository.findOne({
      where: {
        label: 'ROLE_USER',
      },
    });

    if (!defaultRole) {
      throw new NotFoundException('Default role USER not found');
    }
    // hacher le mot de passe
    const hashPassword = await this.securityService.hashPassword(createUserDto.password);
    // créer le user avec le rôle par défaut
    const user = await this.usersRepository.createUser({
      ...createUserDto,
      password: hashPassword,
      roles: [defaultRole],
    });

    return user;
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

    return user;
  }

  // UPDATE USER
  async update(id: number, updateUserDto: UpdateUserDto, currentUser: User) {

    if (currentUser.id !== +id) {
        throw new ForbiddenException(
      'You can update only your profil',
    );
  }
  
  const updatedUser = await this.usersRepository.updateUser(
    id,
    updateUserDto,
  );

  if (!updatedUser) {
    throw new NotFoundException('User not found');
  }

  return updatedUser;
}
  async delete(id: number, currentUser: any) {

    if (currentUser.sub !== +id) {
      throw new ForbiddenException('You can only delete your profil');
    }
    await this.usersRepository.deleteUser(id);

    return {
      message: 'User deleted successfully',
    };
  }
}