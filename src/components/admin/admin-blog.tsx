"use client";

import { useEffect, useState } from "react";
import { GoldCard, Button, Badge, inputClass, Field } from "@/components/ui/primitives";
import { Plus, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";

type Post = { id: string; slug: string; title: string; category?: string | null; published: boolean; publishedAt?: string | null };

export function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: "", category: "", excerpt: "", content: "" });

  useEffect(() => {
    fetch("/api/admin/blog").then(r => r.json()).then(d => { setPosts(d.posts ?? []); setLoading(false); });
  }, []);

  async function createPost() {
    const res = await fetch("/api/admin/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const d = await res.json();
    setPosts(prev => [d.post, ...prev]);
    setCreating(false);
    setForm({ title: "", category: "", excerpt: "", content: "" });
  }

  async function togglePublish(id: string, published: boolean) {
    await fetch("/api/admin/blog", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, published: !published }) });
    setPosts(prev => prev.map(p => p.id === id ? { ...p, published: !published } : p));
  }

  return (
    <GoldCard>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-black text-[#F5F0E8]">Blog CMS</h2>
        <Button variant="gold" size="sm" onClick={() => setCreating(!creating)}><Plus size={14} /> New post</Button>
      </div>

      {creating && (
        <div className="mb-6 rounded-xl border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.04)] p-5">
          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Title"><input className={inputClass} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></Field>
              <Field label="Category"><input className={inputClass} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} /></Field>
            </div>
            <Field label="Excerpt"><input className={inputClass} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} /></Field>
            <Field label="Content"><textarea rows={6} className={inputClass + " resize-none"} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} /></Field>
            <div className="flex gap-3">
              <Button variant="gold" onClick={createPost}>Publish post</Button>
              <Button variant="ghost" onClick={() => setCreating(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {loading ? <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#C9A84C]" /></div> : (
        <div className="grid gap-3">
          {posts.map(p => (
            <div key={p.id} className="flex items-center justify-between gap-3 rounded-xl border border-[rgba(201,168,76,0.1)] px-4 py-3">
              <div>
                <div className="font-medium text-[#F5F0E8]/90">{p.title}</div>
                <div className="flex gap-2 mt-1">
                  {p.category && <Badge tone="gold">{p.category}</Badge>}
                  <Badge tone={p.published ? "success" : "default"}>{p.published ? "Published" : "Draft"}</Badge>
                </div>
              </div>
              <button onClick={() => togglePublish(p.id, p.published)} className="flex items-center gap-1.5 text-xs text-[#F5F0E8]/45 hover:text-[#C9A84C] transition-colors">
                {p.published ? <EyeOff size={14} /> : <Eye size={14} />}
                {p.published ? "Unpublish" : "Publish"}
              </button>
            </div>
          ))}
        </div>
      )}
    </GoldCard>
  );
}
