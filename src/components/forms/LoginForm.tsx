"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Control, FieldPath, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  async function onSubmit({ username, password }: z.infer<typeof FormSchema>) {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    console.log("✌️result --->", result);
    setLoading(false);
    if (result && result.ok) {
      router.push("/");
    }
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
            <LoginFormField
              name="username"
              label="Username"
              placeholder="emilys"
              formControl={form.control}
            />
            <LoginFormField
              name="password"
              label="Password"
              inputType="password"
              formControl={form.control}
            />
          </CardContent>
          <CardFooter>
            <Button disabled={loading} type="submit" className="w-full">
              {loading && <AiOutlineLoading className="animate-spin" />}
              <span className="ml-4">Sign in</span>
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

type LoginFormFieldProps = {
  name: FieldPath<z.infer<typeof FormSchema>>;
  label: string;
  placeholder?: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof FormSchema>, any>;
};

function LoginFormField({
  name,
  label,
  placeholder,
  description,
  inputType,
  formControl,
}: LoginFormFieldProps) {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className="transition-all">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder ?? undefined}
              type={inputType ?? "text"}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
