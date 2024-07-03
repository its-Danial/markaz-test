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
    <header className="sticky top-0 flex h-16 items-center border-b bg-background px-8 md:px-16">
      <nav className="flex w-full items-center justify-between">
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
    </header>
  );
}
