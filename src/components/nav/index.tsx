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
import Loader from "../ui/loader";

export default function Nav() {
  const { data: session, status: sessionStatus } = useSession();

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
      {sessionStatus === "loading" ? (
        <Loader size={24} />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <div className="flex space-x-2">
              <Avatar>
                <AvatarImage
                  src={session?.user.image}
                  alt={session?.user.firstName}
                />
                <AvatarFallback>DN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-px text-sm">
                <span className="font-semibold">{`${session?.user.firstName} ${session?.user.lastName}`}</span>
                <span className="from-accent-foreground">
                  {session?.user.username}
                </span>
              </div>
            </div>
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
      )}
    </nav>
  );
}
