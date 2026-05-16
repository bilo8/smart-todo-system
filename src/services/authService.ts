import type { AuthUser } from "../types/auth";

interface LoginPayload {
  username: string;
  password: string;
}

const fakeUser: AuthUser = {
  id: 1,
  username: "touka",
  email: "touka@gmail.com",
  firstName: "Touka",
  lastName: "Mawass",
  gender: "female",
  image: "https://ui-avatars.com/api/?name=Touka+Mawass",
  accessToken: "fake-access-token-touka",
  refreshToken: "fake-refresh-token-touka",
};

export async function loginUser({
  username,
  password,
}: LoginPayload): Promise<AuthUser> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  if (username === "touka" && password === "123456") {
    return fakeUser;
  }

  throw new Error("Invalid username or password");
}