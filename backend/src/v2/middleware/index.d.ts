import { UserAuthTokenPayload } from "../core/model";

declare module "koa" {
  interface DefaultState extends CustomState {}
}

/**
 * Koa Middleware의 State 확장 필드입니다.
 * 전역 Middleware의 추가로 인한 타입 추론이 필요한 경우 아래에 추가하도록 합니다.
 */
type CustomState = AuthState;

// auth-parser.ts
type AuthState = {
  auth: {
    user?: UserAuthTokenPayload | null;
    error?: Error;
  };
};
