"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toasts } from "@/components/ui/toasts";
import { WhatsAppWidget } from "@/components/widgets/whatsapp-widget";
import { ChatWidget } from "@/components/widgets/chat-widget";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = ["/student", "/admin", "/mentor", "/client", "/auth"].some(
    (path) => pathname?.startsWith(path)
  );

  return (
    <>
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer />}
      <Toasts />
      {!isDashboard && <WhatsAppWidget />}
      {!isDashboard && <ChatWidget />}
    </>
  );
}
