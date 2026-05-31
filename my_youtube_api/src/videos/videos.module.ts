import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { VideoRepository } from './videos.repository';
import { Video } from './entities/video.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Video]),
    UsersModule,
  ],
  controllers: [VideosController],
  providers: [VideosService, VideoRepository],
})
export class VideosModule {}
