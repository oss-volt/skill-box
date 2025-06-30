import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser, UserRole } from '@skill-box/interfaces';
import { Document } from 'mongoose';

@Schema()
export class UserModel extends Document implements IUser {
  _id: string;

  @Prop()
  displayName?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({
    required: true,
    enum: UserRole,
    type: String,
    default: UserRole.Student,
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
