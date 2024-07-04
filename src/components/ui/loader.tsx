import { cn } from "@/lib/utils";
import { AiOutlineLoading } from "react-icons/ai";

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export default function Loader({ size, className, ...props }: LoaderProps) {
  return (
    <div
      className={cn("flex items-center justify-center px-4", className)}
      {...props}
    >
      <AiOutlineLoading size={size ?? 50} className="animate-spin" />
    </div>
  );
}
