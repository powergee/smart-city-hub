import Container from "@components/container";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LoginPage() {
  async function loginAction(formData: FormData) {
    "use server";

    const rawFormData = {
      userid: formData.get("userid"),
      plainpw: formData.get("plainpw"),
    };

    const res = await fetch("http://localhost:4000/v2/auth/issue", {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rawFormData),
    });

    if (res.ok) {
      cookies().set("accessToken", await res.text(), { httpOnly: true });
      redirect("/");
    } else {
      console.log("로그인 실패");
    }
  }

  if (cookies().get("accessToken")) {
    redirect("/");
  }

  return (
    <Container className="h-full flex items-center justify-center">
      <div className="flex-1 max-w-96">
        <form className="bg-white shadow border rounded p-8" action={loginAction}>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="userid">
              아이디
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 transition focus:outline-none focus:ring"
              id="userid"
              name="userid"
              type="text"
            />
          </div>
          <div className="mb-8">
            <label className="block font-bold mb-2" htmlFor="userid">
              비밀번호
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 transition focus:outline-none focus:ring"
              id="plainpw"
              name="plainpw"
              type="password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-uos-blue hover:bg-uos-signiture-blue transition text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
              type="submit"
            >
              로그인
            </button>
            <Link
              className="inline-block align-baseline font-bold text-uos-blue hover:text-uos-signiture-blue transition"
              href="/register"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
}
