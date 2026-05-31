import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SecurityModule } from 'src/security/security.module';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';
import { RolesModule } from 'src/roles/roles.module';
import { Video } from 'src/videos/entities/video.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Video]),
    RolesModule,
    SecurityModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository,],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
