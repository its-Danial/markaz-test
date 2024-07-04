import "server-only";

import { getServerSession, Session } from "next-auth";
import { authOptions } from "./authOptions";

export default async function $fetch(
  url: string | URL | Request,
  config?: RequestInit,
) {
  const {
    user: { token },
  } = (await getServerSession(authOptions)) as Session;

  if (!token) {
    throw new Error("No token found in session");
  }

  return await fetch(url, {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}
