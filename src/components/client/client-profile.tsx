"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserCircle, Phone, MapPin, Save } from "lucide-react";
import { GoldCard } from "@/components/ui/primitives";

interface ProfileForm {
  name: string;
  email: string;
  phone: string;
  city: string;
  bio: string;
}

export function ClientProfile() {
  const { data: session, update } = useSession();
  const [form, setForm] = useState<ProfileForm>({ name: "", email: "", phone: "", city: "", bio: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/client/me").then((r) => r.json()).then((d) => {
      setForm({
        name: d.user?.name ?? "",
        email: d.user?.email ?? "",
        phone: "",
        city: "",
        bio: "",
      });
    });
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/student/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    await update({ name: form.name });
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6">
      <GoldCard className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.08)] text-2xl font-black text-[#C9A84C]">
          {(form.name || session?.user?.name || "C")[0].toUpperCase()}
        </div>
        <div>
          <p className="font-black text-[#F5F0E8]">{form.name || session?.user?.name}</p>
          <p className="text-xs text-[#F5F0E8]/40">{form.email || session?.user?.email}</p>
        </div>
      </GoldCard>

      <GoldCard>
        <h3 className="mb-5 flex items-center gap-2 font-black text-[#F5F0E8]">
          <UserCircle size={16} className="text-[#C9A84C]" /> Contact Details
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { key: "name", label: "Full Name", placeholder: "Your full name" },
            { key: "email", label: "Email", placeholder: "your@email.com", readOnly: true },
            { key: "phone", label: "Phone", placeholder: "+91 98765 43210" },
            { key: "city", label: "City", placeholder: "Mumbai, Delhi..." },
          ].map(({ key, label, placeholder, readOnly }) => (
            <div key={key}>
              <label className="mb-1.5 block text-xs font-semibold text-[#F5F0E8]/45">{label}</label>
              <input
                className="w-full rounded-xl border border-[rgba(201,168,76,0.15)] bg-[rgba(201,168,76,0.04)] px-4 py-2.5 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/20 focus:outline-none focus:border-[rgba(201,168,76,0.4)]"
                placeholder={placeholder}
                value={(form as any)[key]}
                readOnly={readOnly}
                onChange={(e) => !readOnly && setForm({ ...form, [key]: e.target.value })}
              />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <label className="mb-1.5 block text-xs font-semibold text-[#F5F0E8]/45">Company / Bio</label>
          <textarea
            rows={3}
            className="w-full resize-none rounded-xl border border-[rgba(201,168,76,0.15)] bg-[rgba(201,168,76,0.04)] px-4 py-2.5 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/20 focus:outline-none focus:border-[rgba(201,168,76,0.4)]"
            placeholder="Tell us about your company..."
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="mt-5 flex items-center gap-2 rounded-xl bg-[#C9A84C] px-6 py-2.5 text-sm font-bold text-[#080808] transition-all hover:bg-[#E8C97A] disabled:opacity-60"
        >
          <Save size={14} />
          {saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
        </button>
      </GoldCard>
    </div>
  );
}
