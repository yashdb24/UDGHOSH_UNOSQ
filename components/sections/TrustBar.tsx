"use client";

import React from "react";

export function TrustBar() {
  return (
    <div className="w-full py-8 flex justify-center items-center bg-bg-primary">
      <div className="font-jetbrains text-[11.2px] text-slate-500 flex items-center gap-3">
        <span>Organized by Udghosh</span>
        <span className="h-1 w-1 rounded-full bg-slate-500 opacity-50"></span>
        <span>IIT Kanpur</span>
      </div>
    </div>
  );
}
