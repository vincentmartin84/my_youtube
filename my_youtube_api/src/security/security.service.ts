import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';

@Injectable()
export class SecurityService {
  
  async hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }

  async verifyPassword(hashedPassword: string, plainPassword: string): Promise<boolean> {
    return await argon2.verify(hashedPassword, plainPassword);
  }

}
