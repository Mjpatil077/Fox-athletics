import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md z-[9998] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        
        {/* Sleek Minimalist Ring Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border border-neutral-800 rounded-full" />
          <div className="absolute inset-0 border-t-2 border-r-2 border-bright-orange rounded-full animate-spin" style={{ animationDuration: "0.8s" }} />
          <div className="absolute inset-2 border border-neutral-800 rounded-full" />
          <div className="absolute inset-2 border-b-2 border-l-2 border-neon-green rounded-full animate-spin" style={{ animationDuration: "1.2s", animationDirection: "reverse" }} />
        </div>

        {/* Text */}
        <div className="text-center space-y-2">
          <p className="font-mono text-[10px] text-white tracking-[0.4em] uppercase animate-pulse">
            Loading
          </p>
          <div className="flex justify-center gap-1">
            <div className="w-1 h-1 bg-bright-orange rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-1 h-1 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>

      </div>
    </div>
  );
}
