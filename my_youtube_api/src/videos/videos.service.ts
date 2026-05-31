import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { VideoRepository } from './videos.repository';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class VideosService {

  constructor(
    private readonly videoRepository: VideoRepository,
    private readonly usersService: UsersService,
  ) {}
  
  async create(createVideoDto: CreateVideoDto, currentUser: any): Promise<Video> {
     const user = await this.usersService.findByEmail(currentUser.userName);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.videoRepository.create({
      ...createVideoDto,
      user
    });
  }

  async findAll(): Promise<Video[]> {
    return await this.videoRepository.findAll();
  }

  async findOne(id: number): Promise<Video> {
    const video =  await this.videoRepository.findById(id);
    if (!video) {
      throw new NotFoundException('Video not found');
    }
    return video;
  }

  async update(id: number, updateVideoDto: UpdateVideoDto): Promise<Video> {
     const video = await this.videoRepository.update(id, updateVideoDto);
     if (!video) {
      throw new NotFoundException('Video not found');
     }
     return video;

  }

  async remove(id: number): Promise<void> {
    const video = await this.videoRepository.findById(id);
    if (!video) {
      throw new NotFoundException('Video not found');
    }
    await this.videoRepository.delete(video.id);
  }
}
