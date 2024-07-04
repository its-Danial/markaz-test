import { cn } from "@/lib/utils";
import { AiOutlineLoading } from "react-icons/ai";

export default function Loader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex h-[50vh] w-full items-center justify-center px-4",
        className,
      )}
      {...props}
    >
      <AiOutlineLoading size={50} className="animate-spin" />
    </div>
  );
}
