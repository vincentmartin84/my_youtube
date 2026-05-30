import { Injectable, NotFoundException, UnauthorizedException  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SecurityService } from 'src/security/security.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly securityService : SecurityService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async signIn(signInDto: SignInDto): Promise<{ access_token: string}> {
    const user = await this.usersService.findByEmail(signInDto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    const  verifyUserPassword = await this.securityService.verifyPassword(user.password, signInDto.password);
    if (!verifyUserPassword) {
            throw new UnauthorizedException('Invalid password');
    }

    // jwt implementation
    const payload = { sub: user.id, userName: user.email};
    return {
            access_token: await this.jwtService.signAsync(payload),
    }
  }
}
