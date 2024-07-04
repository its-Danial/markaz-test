"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, ValidatedFormField } from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const FormSchema = z.object({
  username: z.string().min(1, {
    message: "Username must not be empty",
  }),
  password: z.string().min(1, {
    message: "Password must not be empty",
  }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  async function onSubmit({ username, password }: z.infer<typeof FormSchema>) {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: true,
      username,
      password,
    });
    console.log("✌️result --->", result);
    setLoading(false);
    // if (result!.ok) {
    //   router.push("/");
    // }
  }

  return (
    <Card className="w-full max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your credentials to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <ValidatedFormField<FormSchemaType>
              name="username"
              label="Username"
              placeholder="emilys"
              formControl={form.control}
            />
            <ValidatedFormField<FormSchemaType>
              name="password"
              label="Password"
              inputType="password"
              formControl={form.control}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <AiOutlineLoading size={20} className="animate-spin" />
              ) : (
                <span>Sign in</span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
