import { User, Password, PasswordMethod } from "../core/model";
import { UserRepository } from "../core/repository";
import mongoose from "mongoose";

export class UserMongoRepo implements UserRepository {
  static readonly schema = new mongoose.Schema({
    userId: { type: String, unique: true },
    userName: String,
    userPwHash: String,
    userPwSalt: String,
    userPwMethod: String,
    isManager: Boolean,
    isAllowed: Boolean,
    meta: {
      createdAt: { type: Date, defualt: Date.now },
      modifiedAt: { type: Date, default: Date.now },
    },
  });
  readonly db: mongoose.Connection;
  readonly UserModel;

  constructor(params: { db: mongoose.Connection; collectionName: string }) {
    this.db = params.db;
    this.UserModel = this.db.model(params.collectionName, UserMongoRepo.schema);
  }

  private convertToUser(user: any): User {
    return {
      userId: user.userId,
      name: user.userName,
      privilege: user.isManager ? "manager" : "user",
      enabled: user.isAllowed,
      createdAt: user.meta.createdAt,
    };
  }

  async create(user: User, password: Password): Promise<User> {
    const res = await this.UserModel.create({
      userId: user.userId,
      userName: user.name,
      userPwHash: password.hash,
      userPwSalt: password.salt,
      userPwMethod: password.method,
      isManager: user.privilege === "manager",
      isAllowed: user.enabled,
    });

    return this.convertToUser(res);
  }

  async findAll(): Promise<User[]> {
    const res = await this.UserModel.find();
    return res.map(this.convertToUser);
  }

  async findByUserId(userId: string): Promise<User | null> {
    const res = await this.UserModel.findOne({ userId });
    return res ? this.convertToUser(res) : null;
  }

  async findPasswordByUserId(userId: string): Promise<Password | null> {
    const res = await this.UserModel.findOne({ userId });
    const method = (res?.userPwMethod as PasswordMethod) || "sha512";

    return res
      ? {
          hash: res.userPwHash as string,
          salt: res.userPwSalt as string,
          method,
        }
      : null;
  }

  async update(user: User, password?: Password): Promise<User | null> {
    const res = await this.UserModel.findOneAndUpdate(
      { userId: user.userId },
      {
        userName: user.name,
        isManager: user.privilege === "manager",
        isAllowed: user.enabled,
        meta: { modifiedAt: Date.now() },
        ...(password && {
          userPwHash: password.hash,
          userPwSalt: password.salt,
          userPwMethod: password.method,
        }),
      },
      { new: true }
    );
    return res ? this.convertToUser(res) : null;
  }

  async delete(userId: string): Promise<User | null> {
    const res = await this.UserModel.findOneAndDelete({ userId });
    return res ? this.convertToUser(res) : null;
  }
}
