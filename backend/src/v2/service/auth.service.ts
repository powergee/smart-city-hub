import { User, UserAuthTokenPayload } from "../core/model";
import { UserRepository } from "../core/repository";

import crypto from "crypto";
import jwt from "jsonwebtoken";

export class UserAuthService {
  readonly userRepo: UserRepository;
  readonly tokenSecret: string;
  readonly defaultExpiresIn: string | number;

  constructor(
    params: { tokenSecret: string; defaultExpiresIn: string | number },
    di: { userRepo: UserRepository }
  ) {
    this.userRepo = di.userRepo;
    if (
      params.tokenSecret === undefined ||
      params.tokenSecret === "" ||
      typeof params.tokenSecret !== "string"
    ) {
      throw new Error("tokenSecret is empty/undefined or not a string.");
    }
    this.tokenSecret = params.tokenSecret;
    this.defaultExpiresIn = params.defaultExpiresIn;
  }

  /**
   * 아이디와 비밀번호를 받아 사용자를 검증하고, 토큰을 발급한다.
   * 사용자 검증을 위해 사용자의 유무, 활성화 유무, 비밀번호 일치 여부를 확인한다.
   * @param userid 사용자 아이디
   * @param plainpw 사용자 평문 비밀번호
   * @returns 토큰 발급 성공시 토큰 string, 실패시 null
   */
  async issueToken(
    userid: string,
    plainpw: string,
    options?: { expiresIn?: string | number }
  ): Promise<string> {
    // 1. 사용자 유무 확인
    const user = await this.userRepo.findByUserId(userid);
    if (!user) {
      throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    }

    // 2. 비밀번호 유무 확인
    const password = await this.userRepo.findPasswordByUserId(userid);
    if (!password) {
      throw new Error("인증 중 오류가 발생했습니다. 관리자에게 문의하세요.");
    }

    // 3. 비밀번호 해싱 및 비교
    const { method, salt, hash } = password;
    const hashedPassword = crypto
      .createHash(method)
      .update(plainpw + salt)
      .digest("base64");

    // 4. 비밀번호 일치 여부 확인
    if (hashedPassword !== hash) {
      throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    }

    // 5. 활성화된 사용자인지 확인
    if (user.enabled !== true) {
      throw new Error("활성화되지 않은 사용자입니다. 관리자에게 문의하세요.");
    }

    // JWT 발급
    const token = jwt.sign({ type: "access", userId: userid }, this.tokenSecret, {
      expiresIn: options?.expiresIn || this.defaultExpiresIn,
    });

    return token;
  }

  /**
   * 토큰을 검증하고, 토큰에 담긴 사용자 정보를 반환한다.
   * @param token 검증할 토큰
   * @returns User
   */
  async verifyToken(token: string): Promise<User> {
    try {
      // 1. JWT 검증
      const payload = jwt.verify(token, this.tokenSecret) as UserAuthTokenPayload;

      // 2. 사용자 유무 확인
      const user = await this.userRepo.findByUserId(payload.userId);
      if (!user) {
        throw new Error("사용자를 찾을 수 없습니다.");
      }

      // 3. 활성화된 사용자인지 확인
      if (user.enabled === false) {
        throw new Error("활성화되지 않은 사용자입니다. 관리자에게 문의하세요.");
      }

      return user;
    } catch (err) {
      // JWT 검증 실패 처리
      if (err instanceof jwt.TokenExpiredError) {
        throw new Error("토큰이 만료되었습니다.");
      } else if (err instanceof jwt.JsonWebTokenError) {
        throw new Error("유효하지 않은 토큰입니다.");
      }

      throw err;
    }
  }
}
