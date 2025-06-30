import { Injectable } from '@nestjs/common';
import { RegisterDto } from './auth.controller';
import { UserRepository } from '../user/repositories/user.repository';
import { UserEntitiy } from '../user/entities/user.entity';
import { UserRole } from '@skill-box/interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async register({ email, password, displayName }: RegisterDto) {
    const existedUser = await this.userRepository.findByEmail(email);

    if (existedUser) {
      throw new Error('Such user is already registered');
    }

    const userEntity = await new UserEntitiy({
      displayName,
      email,
      passwordHash: '',
      role: UserRole.Student,
    }).setPassword(password);

    const user = await this.userRepository.create(userEntity);
    return { email: user.email };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Wrong email or password');
    }

    const userEntity = new UserEntitiy(user);
    const isCorrectPassword = await userEntity.validatePassword(password);

    if (!isCorrectPassword) {
      throw new Error('Wrong email or password');
    }

    return { id: user._id };
  }

  async login(id: string) {
    return {
      access_token: await this.jwtService.signAsync({ id }),
    };
  }
}
