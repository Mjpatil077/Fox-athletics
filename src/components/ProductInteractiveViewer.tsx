"use client";

import React from "react";

interface ProductInteractiveViewerProps {
  imageSrc: string;
  colorHex?: string;
  isLimited?: boolean;
  stockLeft?: number;
  zoomScale?: number;
}

export default function ProductInteractiveViewer({
  imageSrc,
  colorHex,
  isLimited,
  stockLeft,
  zoomScale,
}: ProductInteractiveViewerProps) {
  return (
    <div
      className="relative bg-neutral-900 border border-neutral-800 w-full h-full min-h-[400px] flex items-center justify-center overflow-hidden select-none"
    >
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      {/* Dynamic Background Glow */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full opacity-20 filter blur-[80px] pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: colorHex || "#39ff14" }}
      />

      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        <img
          src={imageSrc}
          alt="Product Detail"
          className="max-h-[75%] max-w-[75%] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
        />
      </div>

      {isLimited && (
        <span className="absolute top-6 left-6 bg-bright-orange text-black font-bebas text-xs px-3 py-1.5 tracking-wider uppercase font-bold z-10 select-none pointer-events-none shadow-lg">
          LIMITED DROP - {stockLeft} PAIRS LEFT
        </span>
      )}
    </div>
  );
}
