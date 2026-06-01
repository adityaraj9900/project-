"use client";

import { useEffect, useState } from "react";
import { GoldCard, Button, inputClass, Field } from "@/components/ui/primitives";
import { Loader2, Save } from "lucide-react";

export function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings").then(r => r.json()).then(d => { setSettings(d.settings ?? {}); setLoading(false); });
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/admin/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading) return <GoldCard><div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#C9A84C]" /></div></GoldCard>;

  return (
    <GoldCard>
      <h2 className="mb-6 text-lg font-black text-[#F5F0E8]">Platform settings</h2>
      <div className="grid gap-5 max-w-lg">
        {[
          { key: "brandName", label: "Brand name" },
          { key: "adminEmail", label: "Admin email" },
          { key: "whatsappNumber", label: "WhatsApp number (with country code)" },
          { key: "upiId", label: "UPI ID" },
        ].map(({ key, label }) => (
          <Field key={key} label={label}>
            <input className={inputClass} value={settings[key] ?? ""} onChange={e => setSettings(prev => ({ ...prev, [key]: e.target.value }))} />
          </Field>
        ))}
        <Button variant="gold" onClick={save} disabled={saving}>
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saved ? "Saved!" : "Save settings"}
        </Button>
      </div>
    </GoldCard>
  );
}
