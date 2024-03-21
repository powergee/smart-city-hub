"use client";

import { UserItem } from "core/model";
import React, { createContext, useContext, useState } from "react";

type ContextProp = {
  loginUser: UserItem | null;
  setLoginUser: React.Dispatch<React.SetStateAction<UserItem | null>>;
};

const LoginStateContext = createContext<ContextProp | undefined>(undefined);

/**
 * Login 전역 상태를 사용할 수 있도록 하는 Context Provider 컴포넌트입니다.
 * 상위 컴포넌트를 LoginStateProvider로 감싸주어야 합니다.
 */
export const LoginStateProvider = (props?: { children: React.ReactNode }) => {
  const [loginUser, setLoginUser] = useState<UserItem | null>(null);

  return (
    <LoginStateContext.Provider value={{ loginUser, setLoginUser }}>
      {props?.children}
    </LoginStateContext.Provider>
  );
};

/**
 * Login 전역 상태를 사용할 수 있도록 하는 Custom Hook입니다.
 * @returns \{ loginUser, setLoginUser \},
 *          loginUser는 로그인한 사용자 정보(UserItem), setLoginUser는 로그인한 사용자 정보를 변경하는 함수입니다.
 */
export const useLoginState = (): ContextProp => {
  const context = useContext(LoginStateContext);
  if (!context) {
    throw new Error("useLoginState must be used within a LoginStateProvider");
  }
  return context;
};
