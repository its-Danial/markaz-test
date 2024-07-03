import { AiOutlineLoading } from "react-icons/ai";

export default function Loader() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <AiOutlineLoading size={50} className="animate-spin" />
    </div>
  );
}
