import { Password, UserAuthTokenPayload } from "../core/model";
import { UserRepository } from "../core/repository";

import crypto from "crypto";
import jwt from "jsonwebtoken";

export class UserAuthExpiredError extends Error {
  constructor() {
    super("Token has expired.");
  }
}

export class UserAuthInvalidError extends Error {
  constructor() {
    super("Invalid token.");
  }
}

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
   * 사용자 유무 및 비밀번호를 확인한다.
   * @param userId 사용자 아이디
   * @param plainPassword 사용자 평문 비밀번호
   * @returns 유효한 사용자일 경우 true, 아닐 경우 false
   */
  async verifyUser(userId: string, plainPassword: string): Promise<boolean> {
    // 1. 사용자 유무 확인
    const user = await this.userRepo.findByUserId(userId);
    if (!user) return false;

    // 2. 비밀번호 확인
    const { method, salt, hash } = user.password as Password;
    const hashedPassword = crypto
      .createHash(method)
      .update(plainPassword + salt)
      .digest("base64");

    return hashedPassword === hash;
  }

  /**
   * 아이디와 비밀번호를 받아 사용자를 검증하고, 토큰을 발급한다.
   * @param userid 사용자 아이디
   * @param plainpw 사용자 평문 비밀번호
   * @returns 토큰 발급 성공시 토큰 string, 실패시 null
   */
  async issueToken(
    userid: string,
    plainpw: string,
    options?: { expiresIn?: string | number }
  ): Promise<string | null> {
    const isValid = await this.verifyUser(userid, plainpw);
    if (!isValid) return null;

    // JWT 발급
    const token = jwt.sign({ type: "access", userId: userid }, this.tokenSecret, {
      expiresIn: options?.expiresIn || this.defaultExpiresIn,
    });

    return token;
  }

  /**
   * 토큰을 검증하고, 토큰에 담긴 사용자 정보를 반환한다.
   * @param token 검증할 토큰
   * @returns UserAuthTokenPayload
   */
  async verifyToken(token: string): Promise<UserAuthTokenPayload> {
    try {
      // JWT 검증
      const payload = jwt.verify(token, this.tokenSecret) as UserAuthTokenPayload;
      return payload;
    } catch (err) {
      // JWT 검증 실패 처리
      if (err instanceof jwt.TokenExpiredError) {
        throw new UserAuthExpiredError();
      } else if (err instanceof jwt.JsonWebTokenError) {
        throw new UserAuthInvalidError();
      }

      throw err;
    }
  }
}
