import React from "react";

export default function LiquidBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#FAF8F5] dark:bg-[#0B0B0C] text-slate-950 dark:text-white transition-colors duration-500">
      {/* Bold retro dot grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.15]" 
        style={{
          backgroundImage: "radial-gradient(currentColor 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px"
        }}
      />
      <div 
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.06]" 
        style={{
          backgroundImage: "radial-gradient(currentColor 3px, transparent 3px)",
          backgroundSize: "96px 96px"
        }}
      />
      {/* Subtle grid line overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
    </div>
  );
}

