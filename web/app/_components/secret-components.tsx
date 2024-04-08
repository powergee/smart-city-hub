"use client";

import React from "react";
import Link from "next/link";
import { useLoginState } from "./login-context";
import { UserPrivilege } from "core/model";

export function SecretLink(props: {
  children: React.ReactNode;
  href: string;
  className?: string;
  allow?: UserPrivilege[];
}) {
  const { loginUser } = useLoginState();
  if (!loginUser) {
    return null;
  }
  if (props.allow && !props.allow.includes(loginUser.privilege)) {
    return null;
  }

  return (
    <Link className={props.className} href={props.href}>
      {props.children}
    </Link>
  );
}

export function SecretButton(props: {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  allow?: UserPrivilege[];
}) {
  const { loginUser } = useLoginState();
  if (loginUser?.privilege !== "manager") {
    return null;
  }
  if (props.allow && !props.allow.includes(loginUser.privilege)) {
    return null;
  }

  return (
    <button className={props.className} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
