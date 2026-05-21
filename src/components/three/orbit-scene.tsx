"use client";

import dynamic from "next/dynamic";

export const OrbitScene = dynamic(() => import("./scene").then((mod) => mod.Scene), {
  ssr: false,
  loading: () => <div className="h-[420px] animate-pulse rounded-[2rem] bg-white/8" />
});
