import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: {
    default: "ORBITIX — Premium IT Services & Free Internship Programs",
    template: "%s | ORBITIX",
  },
  description:
    "Orbitix is a premium IT services agency delivering world-class digital products — and runs free internship programs where students ship real work.",
  keywords: ["IT services", "internship", "web development", "AI", "UI UX", "free internship India"],
  openGraph: {
    title: "ORBITIX — Premium IT Services & Free Internship Programs",
    description: "We build the tech. We train the builders. Free internships. World-class delivery.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
