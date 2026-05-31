import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  fileUrl: string;

  @ManyToOne(() => User, user => user.videos)
  user: User;
}
