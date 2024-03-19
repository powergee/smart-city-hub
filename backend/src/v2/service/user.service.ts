import { User } from "../core/model";
import { UserRepository } from "../core/repository";
import crypto from "crypto";

export class UserService {
  readonly userRepo: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  /**
   * 사용자 정보와 비밀번호를 이용하여 사용자를 생성한다. 이때 비밀번호는 암호화하여 저장한다.
   * @param userId 사용자 아이디
   * @param plainPassword 사용자 평문 비밀번호
   * @param name 사용자 이름
   * @returns User 모델
   */
  async createUser(userId: string, plainPassword: string, name?: string): Promise<User> {
    // 1. 기존 사용자 확인
    const existingUser = await this.userRepo.findByUserId(userId);
    if (existingUser) {
      throw new Error(`아이디 ${userId}을(를) 사용하는 사용자가 이미 존재합니다.`);
    }

    // 2. 암호 해싱
    const method = "sha512";
    const salt = crypto.randomBytes(32).toString("base64");
    const hash = crypto
      .createHash("sha512")
      .update(plainPassword + salt)
      .digest("base64");

    // 3. 사용자 생성
    const user: User = {
      userId,
      name: name || userId,
      password: { hash, salt, method },
      privilege: "user", // 기본 권한
      isAllowed: true, // 기본 사용 가능
      signUpDate: new Date(),
    };

    // 4. DB 저장
    const res = await this.userRepo.create(user);
    return res;
  }
}
