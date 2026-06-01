"use client";

import { useEffect, useState } from "react";
import { Megaphone, BookOpen, Trophy } from "lucide-react";
import { GoldCard, Badge } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

type Tab = "announcements" | "resources" | "leaderboard";

interface Announcement {
  id: string;
  title: string;
  body: string;
  audience: string;
  createdAt: string;
}

const MOCK_RESOURCES = [
  { id: "r1", title: "Next.js Official Docs", url: "https://nextjs.org/docs", category: "Documentation" },
  { id: "r2", title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/", category: "Documentation" },
  { id: "r3", title: "Tailwind CSS Docs", url: "https://tailwindcss.com/docs", category: "Documentation" },
  { id: "r4", title: "Drizzle ORM Guide", url: "https://orm.drizzle.team/docs/overview", category: "Backend" },
  { id: "r5", title: "Framer Motion Docs", url: "https://www.framer.com/motion/", category: "Animation" },
  { id: "r6", title: "Recharts Examples", url: "https://recharts.org/en-US/examples", category: "Visualisation" },
];

const MOCK_LEADERBOARD = [
  { rank: 1, name: "Arjun Mehta", program: "Full-Stack", points: 840, badge: "🏆" },
  { rank: 2, name: "Priya Nair", program: "AI Systems", points: 790, badge: "🥈" },
  { rank: 3, name: "Dev Sharma", program: "UI/UX Design", points: 745, badge: "🥉" },
  { rank: 4, name: "Rhea Kapoor", program: "Full-Stack", points: 680, badge: "" },
  { rank: 5, name: "Karan Bose", program: "AI Systems", points: 620, badge: "" },
];

export function StudentCommunity() {
  const [tab, setTab] = useState<Tab>("announcements");
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/student/me")
      .then((r) => r.json())
      .then((d) => {
        setAnnouncements(d.announcements ?? []);
        setLoading(false);
      });
  }, []);

  const TABS = [
    { key: "announcements" as Tab, label: "Announcements", icon: Megaphone },
    { key: "resources" as Tab, label: "Resources", icon: BookOpen },
    { key: "leaderboard" as Tab, label: "Leaderboard", icon: Trophy },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-[rgba(201,168,76,0.12)] bg-[rgba(201,168,76,0.03)] p-1">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition-all",
              tab === key
                ? "bg-[rgba(201,168,76,0.15)] text-[#C9A84C]"
                : "text-[#F5F0E8]/40 hover:text-[#F5F0E8]/70"
            )}
          >
            <Icon size={13} /> <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Announcements */}
      {tab === "announcements" && (
        <div className="space-y-3">
          {loading ? (
            [1, 2].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-xl bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.08)]" />
            ))
          ) : announcements.length === 0 ? (
            <GoldCard>
              <p className="py-6 text-center text-sm text-[#F5F0E8]/45">No announcements yet.</p>
            </GoldCard>
          ) : (
            announcements.map((a) => (
              <GoldCard key={a.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <Megaphone size={15} className="mt-0.5 shrink-0 text-[#C9A84C]" />
                    <div>
                      <p className="font-semibold text-[#F5F0E8]/90">{a.title}</p>
                      <p className="mt-1 text-sm text-[#F5F0E8]/50 leading-relaxed">{a.body}</p>
                    </div>
                  </div>
                  <Badge tone="default">{a.audience}</Badge>
                </div>
                <p className="mt-3 text-xs text-[#F5F0E8]/30">
                  {new Date(a.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </GoldCard>
            ))
          )}
        </div>
      )}

      {/* Resources */}
      {tab === "resources" && (
        <div className="grid gap-3 sm:grid-cols-2">
          {MOCK_RESOURCES.map((r) => (
            <a key={r.id} href={r.url} target="_blank" rel="noreferrer">
              <GoldCard className="h-full">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <BookOpen size={14} className="mt-0.5 shrink-0 text-[#C9A84C]" />
                    <div>
                      <p className="font-semibold text-[#F5F0E8]/90 text-sm">{r.title}</p>
                      <p className="mt-0.5 text-xs text-[#F5F0E8]/40">{r.category}</p>
                    </div>
                  </div>
                </div>
              </GoldCard>
            </a>
          ))}
        </div>
      )}

      {/* Leaderboard */}
      {tab === "leaderboard" && (
        <div className="space-y-3">
          <p className="text-xs text-[#F5F0E8]/35 px-1">Top performers this cohort</p>
          {MOCK_LEADERBOARD.map((entry) => (
            <GoldCard key={entry.rank} hover={false} className={cn("flex items-center gap-4", entry.rank <= 3 && "border-[rgba(201,168,76,0.25)]")}>
              <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black",
                entry.rank === 1 ? "bg-[rgba(201,168,76,0.15)] text-[#C9A84C]"
                : entry.rank === 2 ? "bg-[rgba(180,180,180,0.1)] text-[#F5F0E8]/60"
                : entry.rank === 3 ? "bg-[rgba(180,120,60,0.1)] text-amber-600"
                : "text-[#F5F0E8]/30"
              )}>
                {entry.badge || `#${entry.rank}`}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#F5F0E8]/90 text-sm truncate">{entry.name}</p>
                <p className="text-xs text-[#F5F0E8]/40">{entry.program}</p>
              </div>
              <div className="text-right">
                <p className="font-black text-[#C9A84C]">{entry.points}</p>
                <p className="text-[10px] text-[#F5F0E8]/30">points</p>
              </div>
            </GoldCard>
          ))}
        </div>
      )}
    </div>
  );
}
