import { User, UserPrivilege } from "../core/model";
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
      privilege: "user", // 기본 권한
      enabled: false, // 기본 사용 불가능
      createdAt: new Date(),
    };

    // 4. DB 저장
    const res = await this.userRepo.create(user, { hash, salt, method });
    return res;
  }

  /**
   * 사용자 목록을 조회한다.
   * @returns 사용자 목록
   */
  async listUsers(): Promise<User[]> {
    const userList = await this.userRepo.findAll();
    return userList;
  }

  /**
   * 사용자를 특정 Privilege로 설정한다.
   * @param userId 사용자 아이디
   * @param privilege 설정할 권한
   * @returns User 모델
   */
  async setPrivilege(userId: string, privilege: UserPrivilege): Promise<User> {
    // 1. 사용자 확인
    const user = await this.userRepo.findByUserId(userId);
    if (!user) {
      throw new Error(`사용자 ${userId}을(를) 찾을 수 없습니다.`);
    }

    // 2. 권한 설정
    user.privilege = privilege;
    const res = await this.userRepo.update(user);
    if (!res) {
      throw new Error(`사용자 ${userId}의 권한 설정에 실패했습니다.`);
    }

    return res;
  }

  /**
   * 사용자의 enabled 상태를 설정한다.
   * @param userId 사용자 아이디
   * @param enabled 사용 가능 여부
   * @returns User 모델
   */
  async setEnabled(userId: string, enabled: boolean): Promise<User> {
    // 1. 사용자 확인
    const user = await this.userRepo.findByUserId(userId);
    if (!user) {
      throw new Error(`사용자 ${userId}을(를) 찾을 수 없습니다.`);
    }

    // 2. enabled 설정
    user.enabled = enabled;
    const res = await this.userRepo.update(user);
    if (!res) {
      throw new Error(`사용자 ${userId}의 enabled 설정에 실패했습니다.`);
    }

    return res;
  }
}
