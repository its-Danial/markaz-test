import { cn } from "@/lib/utils";

export default function Divider({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("h-px w-full shrink-0 bg-border", className)}
      {...props}
    />
  );
}
