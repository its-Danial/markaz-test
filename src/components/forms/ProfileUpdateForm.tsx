"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, ValidatedFormField } from "@/components/ui/form";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

const FormSchema = z.object({
  username: z.string().min(1, {
    message: "Username must not be empty",
  }),
  email: z.string().email({
    message: "Should be a valid email",
  }),
  firstName: z.string().min(1, {
    message: "First name must not be empty",
  }),
  lastName: z.string().min(1, {
    message: "Last name must not be empty",
  }),
  gender: z.enum(["female", "male", "other"]),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function ProfileUpdateForm() {
  const { data: session, status: sessionStatus, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: session?.user.username,
      email: session?.user.email,
      firstName: session?.user.firstName,
      lastName: session?.user.lastName,
      gender: session?.user.gender as z.infer<typeof FormSchema>["gender"],
    },
  });

  useEffect(() => {
    if (session?.user) {
      form.reset({
        username: session.user.username,
        email: session.user.email,
        firstName: session.user.firstName,
        lastName: session.user.lastName,
        gender: session.user.gender as z.infer<typeof FormSchema>["gender"],
      });
      setAvatarUrl(session.user.image);
    }
  }, [session, form]);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(body: z.infer<typeof FormSchema>) {
    console.log("onSubmit", { ...body, image: avatarUrl });

    setLoading(true);

    // NOTE: not adding image to payload because dummay api cannot handle it
    fetch(`https://dummyjson.com/users/${session?.user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        /* NOTE: the correct behaviour would be to save the response in the state, 
        since with this dummy api the response never changes I will save the 
        form data directly in the fields */

        // await update({
        //   username: res.username,
        //   email: res.email,
        //   firstName: res.firstName,
        //   lastName: res.lastName,
        //   gender: res.gender,
        //   image: res.image,
        // });

        await update({
          ...session,
          username: body.username,
          email: body.email,
          firstName: body.firstName,
          lastName: body.lastName,
          gender: body.gender,
        });
        toast({
          title: "Update successful: API response",
          description: (
            <div className="text-xs opacity-90">
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {`{
  "username": "${res.username}",
  "email": "${res.email}",
  "firstName": "${res.firstName}",
  "lastName": "${res.lastName}",
  "gender": "${res.gender}",
  "image": "${res.image}",
}`}
                </code>
              </pre>
            </div>
          ),

          duration: 3000,
        });
      })
      .catch((e) =>
        toast({
          variant: "destructive",
          description: e.message,
          duration: 1500,
        }),
      )
      .finally(() => setLoading(false));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-end space-x-6">
          <ValidatedFormField<FormSchemaType>
            name="username"
            label="Username"
            placeholder="emilys"
            formControl={form.control}
          />
          <div className="shrink-0">
            <Avatar
              onClick={handleAvatarClick}
              className="size-20 cursor-pointer md:size-24"
            >
              <AvatarImage src={avatarUrl || ""} alt="profile picture" />
              <AvatarFallback>DN</AvatarFallback>
            </Avatar>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg, image/jpg, image/png, image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <ValidatedFormField<FormSchemaType>
          name="email"
          label="Email"
          inputType="email"
          placeholder="Select a verified email to display"
          formControl={form.control}
        />
        <div className="flex space-x-6">
          <ValidatedFormField<FormSchemaType>
            name="firstName"
            label="First Name"
            placeholder="Emily"
            formControl={form.control}
          />
          <ValidatedFormField<FormSchemaType>
            name="lastName"
            label="Last Name"
            placeholder="Smith"
            formControl={form.control}
          />
        </div>
        <ValidatedFormField<FormSchemaType>
          name="gender"
          label="Gender"
          placeholder="Gender"
          inputType="select"
          selectOptions={["male", "female", "other"]}
          formControl={form.control}
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <AiOutlineLoading size={20} className="mr-4 animate-spin" />
          ) : (
            <span>Update profile</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
