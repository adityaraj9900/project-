"use client";

import { usePlatformStore } from "@/store/platform-store";
import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { PremiumCard } from "@/components/ui/primitives";

export default function Page() {
  const testimonials = usePlatformStore((state) => state.db.testimonials);
  return <SimpleMarketingPage eyebrow="Testimonials" title="Proof from students and clients." body="Stories from the people using the ecosystem."><div className="grid gap-5 md:grid-cols-2">{testimonials.map((item) => <PremiumCard key={item.id}><p className="text-xl">“{item.quote}”</p><p className="mt-5 font-bold">{item.name}</p><p className="text-white/45">{item.role}</p></PremiumCard>)}</div></SimpleMarketingPage>;
}
