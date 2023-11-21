import config from "@/config";

const URL_APIS = config.BACK_URL;
interface User {
  username: string;
  password: string;
}

export async function LoginAuthService(credentials: User) {
  const response = await fetch(`${URL_APIS}/auth/login`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  return { ...data, status: response.status };
}

export async function AccessAuthService(roleId: string) {
  const response = await fetch(`${URL_APIS}/rol/${roleId}`);
  const { data: access, status } = await response.json();
  return { status, access };
}
