import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { BCryptService } from './bcrypt.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private bcryptService: BCryptService
  ) {}

  async signIn(name: string, pass: string) {
    const user = await this.usersService.findUser(name);
    if (!user || !(await this.bcryptService.checkUser(pass, user.pass))) {
      throw new UnauthorizedException('Login or password is incorrect');
    }
    const payload = { username: user.name, sub: user.id, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

  async register(name: string, pass: string) {
    const passHash = await this.bcryptService.hashPassword(pass);
    const user: CreateUserDto = { name, pass: passHash };
    await this.usersService.addUser(user);
    return this.signIn(name, pass);
  }
}
