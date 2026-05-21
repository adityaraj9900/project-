"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toasts } from "@/components/ui/toasts";
import { usePlatformStore } from "@/store/platform-store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const theme = usePlatformStore((state) => state.theme);
  const isDashboard = ["/student", "/admin", "/mentor", "/client"].some((path) => pathname?.startsWith(path));

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  return (
    <>
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer />}
      <Toasts />
    </>
  );
}
