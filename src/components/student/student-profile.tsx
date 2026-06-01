"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserCircle, Code2, Briefcase, Globe, MapPin, Phone, Save, KeyRound } from "lucide-react";
import { GoldCard } from "@/components/ui/primitives";

interface Profile {
  name: string;
  email: string;
  phone: string;
  city: string;
  github: string;
  linkedin: string;
  portfolio: string;
  bio: string;
}

const EMPTY: Profile = { name: "", email: "", phone: "", city: "", github: "", linkedin: "", portfolio: "", bio: "" };

export function StudentProfile() {
  const { data: session, update } = useSession();
  const [form, setForm] = useState<Profile>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState("");

  useEffect(() => {
    fetch("/api/student/me").then((r) => r.json()).then((d) => {
      setForm({
        name: d.user?.name ?? "",
        email: d.user?.email ?? "",
        phone: d.profile?.phone ?? "",
        city: d.profile?.city ?? "",
        github: d.profile?.github ?? "",
        linkedin: d.profile?.linkedin ?? "",
        portfolio: d.profile?.portfolio ?? "",
        bio: d.profile?.bio ?? "",
      });
    });
  }, []);

  async function saveProfile() {
    setSaving(true);
    setSaved(false);
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

  async function changePassword() {
    if (pwForm.next !== pwForm.confirm) { setPwMsg("Passwords don't match"); return; }
    if (pwForm.next.length < 8) { setPwMsg("Password must be at least 8 characters"); return; }
    setPwSaving(true);
    setPwMsg("");
    const res = await fetch("/api/student/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current: pwForm.current, next: pwForm.next }),
    });
    const data = await res.json();
    setPwSaving(false);
    if (data.ok) {
      setPwMsg("Password changed successfully!");
      setPwForm({ current: "", next: "", confirm: "" });
    } else {
      setPwMsg(data.error ?? "Failed to change password");
    }
  }

  function field(key: keyof Profile, label: string, placeholder: string, icon?: React.ReactNode) {
    return (
      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#F5F0E8]/45">
          {icon} {label}
        </label>
        <input
          className="w-full rounded-xl border border-[rgba(201,168,76,0.15)] bg-[rgba(201,168,76,0.04)] px-4 py-2.5 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/20 focus:outline-none focus:border-[rgba(201,168,76,0.4)]"
          placeholder={placeholder}
          value={(form as any)[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          readOnly={key === "email"}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <GoldCard className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.08)] text-2xl font-black text-[#C9A84C]">
          {(form.name || session?.user?.name || "S")[0].toUpperCase()}
        </div>
        <div>
          <p className="font-black text-[#F5F0E8]">{form.name || session?.user?.name || "Intern"}</p>
          <p className="text-xs text-[#F5F0E8]/40">{form.email || session?.user?.email}</p>
          {form.city && <p className="mt-0.5 text-xs text-[#F5F0E8]/35">{form.city}</p>}
        </div>
      </GoldCard>

      {/* Profile form */}
      <GoldCard>
        <h3 className="mb-5 flex items-center gap-2 font-black text-[#F5F0E8]">
          <UserCircle size={16} className="text-[#C9A84C]" /> Personal Info
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {field("name", "Full Name", "Your full name")}
          {field("email", "Email", "your@email.com")}
          {field("phone", "Phone", "+91 98765 43210", <Phone size={11} />)}
          {field("city", "City", "Mumbai, Delhi...", <MapPin size={11} />)}
          {field("github", "GitHub", "https://github.com/username", <Code2 size={11} />)}
          {field("linkedin", "LinkedIn", "https://linkedin.com/in/username", <Briefcase size={11} />)}
          {field("portfolio", "Portfolio", "https://yoursite.com", <Globe size={11} />)}
        </div>
        <div className="mt-4">
          <label className="mb-1.5 block text-xs font-semibold text-[#F5F0E8]/45">Bio</label>
          <textarea
            rows={3}
            className="w-full resize-none rounded-xl border border-[rgba(201,168,76,0.15)] bg-[rgba(201,168,76,0.04)] px-4 py-2.5 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/20 focus:outline-none focus:border-[rgba(201,168,76,0.4)]"
            placeholder="A short bio about yourself..."
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </div>
        <button
          onClick={saveProfile}
          disabled={saving}
          className="mt-5 flex items-center gap-2 rounded-xl bg-[#C9A84C] px-6 py-2.5 text-sm font-bold text-[#080808] transition-all hover:bg-[#E8C97A] disabled:opacity-60"
        >
          <Save size={14} />
          {saved ? "Saved!" : saving ? "Saving..." : "Save Profile"}
        </button>
      </GoldCard>

      {/* Change password */}
      <GoldCard>
        <h3 className="mb-5 flex items-center gap-2 font-black text-[#F5F0E8]">
          <KeyRound size={16} className="text-[#C9A84C]" /> Change Password
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { key: "current", label: "Current Password" },
            { key: "next", label: "New Password" },
            { key: "confirm", label: "Confirm New" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="mb-1.5 block text-xs font-semibold text-[#F5F0E8]/45">{label}</label>
              <input
                type="password"
                className="w-full rounded-xl border border-[rgba(201,168,76,0.15)] bg-[rgba(201,168,76,0.04)] px-4 py-2.5 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/20 focus:outline-none focus:border-[rgba(201,168,76,0.4)]"
                placeholder="••••••••"
                value={(pwForm as any)[key]}
                onChange={(e) => setPwForm({ ...pwForm, [key]: e.target.value })}
              />
            </div>
          ))}
        </div>
        {pwMsg && (
          <p className={`mt-3 text-xs ${pwMsg.includes("success") ? "text-emerald-400" : "text-red-400"}`}>{pwMsg}</p>
        )}
        <button
          onClick={changePassword}
          disabled={pwSaving}
          className="mt-5 flex items-center gap-2 rounded-xl border border-[rgba(201,168,76,0.25)] px-5 py-2.5 text-sm font-bold text-[#C9A84C] transition-all hover:bg-[rgba(201,168,76,0.08)] disabled:opacity-60"
        >
          <KeyRound size={14} />
          {pwSaving ? "Changing..." : "Change Password"}
        </button>
      </GoldCard>
    </div>
  );
}
