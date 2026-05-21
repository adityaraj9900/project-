"use client";

import Link from "next/link";
import { usePlatformStore } from "@/store/platform-store";
import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { PremiumCard } from "@/components/ui/primitives";

export default function Page() {
  const blogs = usePlatformStore((state) => state.db.blogs);
  return <SimpleMarketingPage eyebrow="Resources" title="Playbooks for interns and clients." body="Practical writing from the academy and agency floor."><div className="grid gap-5 md:grid-cols-2">{blogs.map((blog) => <PremiumCard key={blog.id}><p className="text-sm text-aurora">{blog.category} · {blog.publishedAt}</p><h2 className="mt-3 text-2xl font-bold">{blog.title}</h2><p className="mt-3 text-white/62">{blog.excerpt}</p><Link href={`/blog/${blog.slug}`} className="mt-5 inline-block text-aurora">Read article</Link></PremiumCard>)}</div></SimpleMarketingPage>;
}
