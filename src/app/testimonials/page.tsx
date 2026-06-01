import { Section, Reveal, GoldCard, SectionHeader } from "@/components/ui/primitives";
import { db } from "@/db";
import { testimonials } from "@/db/schema";

async function getTestimonials() {
  return db.select().from(testimonials).all();
}

export default async function TestimonialsPage() {
  const items = await getTestimonials();
  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <Section>
        <Reveal><SectionHeader eyebrow="Testimonials" title="What people say." subtitle="Stories from interns and clients across Orbitix programs and projects." /></Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.07}>
              <GoldCard>
                <p className="text-lg text-[#F5F0E8]/75 leading-relaxed">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.08)] font-bold text-[#C9A84C]">{t.name[0]}</div>
                  <div>
                    <div className="font-semibold text-[#F5F0E8]/90">{t.name}</div>
                    <div className="text-xs text-[#F5F0E8]/40">{t.role}</div>
                  </div>
                </div>
              </GoldCard>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
