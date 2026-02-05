"use client";

import { checkWhoami } from "@/actions";
import { useLoginState } from "@components/login-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [resolvedWhoiam, setResolvedWhoiam] = useState(false);
  const { loginUser, setLoginUser } = useLoginState();

  useEffect(() => {
    if (loginUser) {
      setResolvedWhoiam(true);
      return;
    }

    (async () => {
      try {
        const user = await checkWhoami();
        setLoginUser(user);
        setResolvedWhoiam(true);

        if (!user) {
          router.replace("/login");
        }
      } catch (error) {
        console.error("Failed to check auth status:", error);
        router.replace("/login");
      }
    })();
  }, [loginUser, setLoginUser, router]);

  if (!resolvedWhoiam || !loginUser) {
    return <></>; // Or a loading spinner
  }

  return <>{children}</>;
}
