export type UserPrivilege = "manager" | "user";

export type PasswordMethod = "sha512";
export type Password = {
  hash: string;
  salt: string;
  method: PasswordMethod;
};

export type User = {
  userId: string;
  name: string;
  privilege: UserPrivilege;
  enabled: boolean;
  createdAt: Date;
};

export type UserAuthTokenPayload = {
  userId: string;
  name: string;
  type: "access";
};
