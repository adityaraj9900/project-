import Link from "next/link";
import { Section, Reveal, GoldCard, Badge, SectionHeader } from "@/components/ui/primitives";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";

async function getBlogs() {
  return db.select().from(blogs).where(eq(blogs.published, true)).all();
}

export default async function BlogPage() {
  const posts = await getBlogs();
  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <Section>
        <Reveal><SectionHeader eyebrow="Resources" title="Playbooks for builders." subtitle="Practical writing from the Orbitix studio — for interns, clients, and engineers." /></Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <div key={post.id}>
              <GoldCard>
                <Badge tone="gold">{post.category}</Badge>
                <h2 className="mt-4 text-xl font-black text-[#F5F0E8]">{post.title}</h2>
                <p className="mt-2 text-sm text-[#F5F0E8]/55">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-[#F5F0E8]/35">{post.author} · {post.publishedAt}</span>
                  <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-[#C9A84C] hover:text-[#E8C97A] transition-colors">Read →</Link>
                </div>
              </GoldCard>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
