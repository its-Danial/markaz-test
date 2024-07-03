import { Inter as FontSans } from "next/font/google";
import "../globals.css";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <div className="flex h-screen w-full items-center justify-center px-4">
          {children}
        </div>
      </body>
    </html>
  );
}
