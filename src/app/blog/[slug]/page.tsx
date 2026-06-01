import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section, Reveal, GoldCard, Badge } from "@/components/ui/primitives";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post] = db.select().from(blogs).where(eq(blogs.slug, params.slug)).limit(1).all();
  if (!post) return notFound();
  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <Section>
        <Reveal>
          <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-[#F5F0E8]/45 hover:text-[#C9A84C] transition-colors"><ArrowLeft size={14} /> All posts</Link>
          <Badge tone="gold">{post.category}</Badge>
          <h1 className="mt-4 text-5xl font-black text-[#F5F0E8]">{post.title}</h1>
          <p className="mt-3 text-sm text-[#F5F0E8]/45">{post.author} · {post.publishedAt}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <GoldCard className="mt-10 prose-sm max-w-none">
            <p className="text-[#F5F0E8]/70 leading-relaxed text-base">{post.content}</p>
          </GoldCard>
        </Reveal>
      </Section>
    </main>
  );
}
