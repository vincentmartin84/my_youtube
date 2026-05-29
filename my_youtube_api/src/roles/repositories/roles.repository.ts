import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../entities/role.entity';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.repository.create(createRoleDto);
    return await this.repository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Role | null> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<Role | null> {
    const role = await this.repository.findOne({
      where: { id },
    });

    if (!role) {
      return null;
    }

    const updatedRole = this.repository.merge(role, updateRoleDto);
    return await this.repository.save(updatedRole);
  }

  async deleteRole(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}