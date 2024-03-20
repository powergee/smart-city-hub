import { AuthTokenIDPWRepository } from "core/repository";

export default class AuthTokenIDPWBackendRepo implements AuthTokenIDPWRepository {
  private readonly baseUrl;

  constructor(params?: { baseUrl?: string }) {
    this.baseUrl = params?.baseUrl || "http://localhost:4000";
  }

  async issue(auth: { id: string; pw: string }) {
    const reqData = {
      userid: auth.id,
      plainpw: auth.pw,
    };

    const res = await fetch(`${this.baseUrl}/v2/auth/issue`, {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqData),
    });

    if (res.ok) {
      return await res.text();
    } else {
      throw new Error(await res.text());
    }
  }
}
