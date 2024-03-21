import { User, Password } from "./model";

export interface UserRepository {
  create(user: User, password: Password): Promise<User>;
  findAll(): Promise<User[]>;
  findByUserId(userId: string): Promise<User | null>;
  findPasswordByUserId(userId: string): Promise<Password | null>;
  update(user: User, password?: Password): Promise<User | null>;
  delete(userId: string): Promise<User | null>;
}
