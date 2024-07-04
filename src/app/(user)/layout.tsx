import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";

import Nav from "@/components/nav";
import NextAuthSessionProvider from "@/components/NextAuthSessionProvider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Markaz",
  description: "Markaz Posts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <NextAuthSessionProvider>
          <Nav />
          <main className="min-h-[calc(100vh_-_theme(spacing.16))] bg-muted/40 p-8 md:gap-8 md:p-10 md:px-16">
            {children}
            <Toaster />
          </main>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
