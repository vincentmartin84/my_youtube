import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';
import { Video } from './entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideoRepository {
  constructor(
    @InjectRepository(Video)
    private readonly repository : Repository<Video>,
  ) {}

  async create(videoData: Partial<Video>): Promise<Video> {
    const video = this.repository.create(videoData);
    return await this.repository.save(video);
  }

  async findAll(): Promise<Video[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Video | null> {
    return await this.repository.findOne({
      where: {id},
        })
  }



  async update(id: number, updateVideoDto: UpdateVideoDto): Promise<Video | null> {
    const video = await this.repository.findOne({
      where: {id},
    });

    if (!video) {
      return null;
    }

    const updatedVideo = this.repository.merge(video, updateVideoDto);
    return await this.repository.save(updatedVideo);
  }

  async delete(id :number): Promise<void> {
    await this.repository.delete(id);
  }
}