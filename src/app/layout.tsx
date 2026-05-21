import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = {
  title: {
    default: "Orbit Labs Academy | Internship Ecosystem + Software Agency",
    template: "%s | Orbit Labs Academy"
  },
  description: "We build digital products for clients and train interns through real project-based work.",
  keywords: ["internship platform", "software agency", "project based internship", "Next.js agency"],
  openGraph: {
    title: "Orbit Labs Academy",
    description: "Project-based internships powered by a premium software development agency.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
