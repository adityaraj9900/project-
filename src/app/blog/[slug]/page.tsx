"use client";

import { useParams } from "next/navigation";
import { usePlatformStore } from "@/store/platform-store";
import { SimpleMarketingPage } from "@/components/sections/public-sections";
import { PremiumCard } from "@/components/ui/primitives";

export default function Page() {
  const blog = usePlatformStore((state) => state.db.blogs.find((item) => item.slug === String(useParams().slug)) ?? state.db.blogs[0]);
  return <SimpleMarketingPage eyebrow={blog.category} title={blog.title} body={blog.excerpt}><PremiumCard className="prose prose-invert max-w-none"><p className="text-white/70">{blog.content}</p><p className="mt-8 text-sm text-white/45">By {blog.author} · {blog.publishedAt}</p></PremiumCard></SimpleMarketingPage>;
}
