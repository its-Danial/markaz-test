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
import Link from "next/link";
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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("✌️data --->", data);
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
          <CardFooter className="flex-col">
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="sign-up" className="underline">
                Sign up
              </Link>
            </div>
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
