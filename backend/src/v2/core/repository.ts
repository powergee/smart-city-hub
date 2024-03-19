import { User } from "./model";

export interface UserRepository {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findByUserId(userId: string): Promise<User | null>;
  update(user: User): Promise<User | null>;
  delete(userId: string): Promise<User | null>;
}
