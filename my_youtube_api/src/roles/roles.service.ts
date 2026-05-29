import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesRepository } from './repositories/roles.repository';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.rolesRepository.createRole(createRoleDto);
  }

  async findAll(): Promise<Role[]> {
    return await this.rolesRepository.findAll();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const updatedRole = await this.rolesRepository.updateRole(id, updateRoleDto);

    if (!updatedRole) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    return updatedRole;
  }

  async remove(id: number): Promise<void> {
    await this.rolesRepository.deleteRole(id);
  }
}