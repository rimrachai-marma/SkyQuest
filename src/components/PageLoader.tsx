// "use client";

import { Loader2 } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="h-full w-full fixed flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 mb-40">
        <Loader2 className="w-10 h-10 animate-spin text-gray-800" />
        <span className="text-sm font-medium text-gray-600">Loading...</span>
      </div>
    </div>
  );
}
