import {  IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Column } from 'typeorm';

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  fileUrl: string;


}
