"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  console.log("✌️session --->", session);
  return <h1>{session?.user.email}</h1>;
}
