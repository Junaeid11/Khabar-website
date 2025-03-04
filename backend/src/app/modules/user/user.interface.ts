import { Document, Model } from 'mongoose';

// Enum for User Roles
export enum UserRole {
   PROVIDER = 'provider',
   USER = 'user'
}

export interface IUser extends Document {
   email: string;
   password: string;
   name: string;
   role: UserRole;
   isActive: boolean;
   createdAt: Date;
   updatedAt: Date;
}

export interface UserModel extends Model<IUser> {
   isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string
   ): Promise<boolean>;
   isUserExistsByEmail(id: string): Promise<IUser>;
   checkUserExist(userId: string): Promise<IUser>;
}
