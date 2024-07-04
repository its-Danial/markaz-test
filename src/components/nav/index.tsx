"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Nav() {
  const { data: session, status } = useSession();
  console.log("session --->", session);

  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background/95 px-8 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-16">
      <Link href="/">
        <Image
          src="/black-logo.png"
          alt="company logo"
          width={50}
          height={50}
        />
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer shadow" asChild>
          <Avatar>
            <AvatarImage
              src={session?.user.image}
              alt={session?.user.firstName}
            />
            <AvatarFallback>DN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile" className="w-full">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => signOut()}
            className="cursor-pointer"
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
