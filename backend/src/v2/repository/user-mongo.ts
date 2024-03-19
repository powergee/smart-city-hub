import { Schema } from "mongoose";
import { db } from "../utils/mongodb";
import { User } from "../core/model";
import { UserRepository } from "../core/repository";

const userSchema = new Schema<User>({
  userId: { type: String, unique: true },
  name: String,
  password: {
    hash: String,
    salt: String,
    method: String,
  },
  privilege: String,
  isAllowed: Boolean,
  signUpDate: Date,
});

const UserModel = db.model<User>("User", userSchema);

export class UserMongoRepo implements UserRepository {
  async create(user: User): Promise<User> {
    return await UserModel.create(user);
  }

  async findAll(): Promise<User[]> {
    return await UserModel.find();
  }

  async findByUserId(userId: string): Promise<User | null> {
    return await UserModel.findOne({ userId });
  }

  async update(user: User): Promise<User | null> {
    return await UserModel.findOneAndUpdate({ userId: user.userId }, user);
  }

  async delete(userId: string): Promise<User | null> {
    return await UserModel.findOneAndDelete({ userId });
  }
}
