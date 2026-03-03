import { Loader } from "lucide-react";

export default function LoadingBlog() {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <Loader className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg font-medium text-muted-foreground animate-pulse">
          Loading blogs...
        </p>
      </div>
    </div>
  );
}