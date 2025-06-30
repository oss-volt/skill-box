import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from '../models/user.model';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserEntitiy } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>
  ) {}

  async create(user: UserEntitiy) {
    return this.userModel.create(user);
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async deleteByEmail(email: string) {
    return this.userModel.deleteOne({ email }).exec();
  }
}
