import { Injectable, UnauthorizedException  } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SecurityService } from 'src/security/security.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly securityService : SecurityService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = this.usersService.findByEmail(signInDto.email);
    const  verifyUserPassword = await this.securityService.verifyPassword(user.password, signInDto.password);
    if (!verifyUserPassword) {
            throw new UnauthorizedException('Invalid password');
    }

    // jwt implementation
    return user;
  }
}
