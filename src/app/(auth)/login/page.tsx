import LoginForm from "@/components/forms/LoginForm";
import { Metadata } from "next";

export default function Login() {
  return <LoginForm />;
}

export const metadata: Metadata = {
  title: "Markaz | Log in",
  description: "Login to the account",
};
