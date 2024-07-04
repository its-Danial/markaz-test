import { cn } from "@/lib/utils";
import Link from "next/link";

type SettingsNavProps = {};

export default function SettingsNav(props: SettingsNavProps) {
  const navLink = [
    { label: "Profile", link: "/profile" },
    { label: "Appearance", link: "/profile" },
    { label: "Notifications", link: "/profile" },
  ];
  return (
    <aside className="lg:w-1/5">
      <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
        {navLink.map((link, index) => (
          <Link
            key={index}
            className={cn(
              "inline-flex h-9 items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-200 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
              link.label === "Profile" && "bg-gray-200",
            )}
            href={link.link}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
