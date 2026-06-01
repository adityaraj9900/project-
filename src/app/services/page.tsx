"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, Reveal, GoldCard, Badge, Button, SectionHeader, GoldDivider } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const SERVICES = [
  { id: "svc_website", slug: "website-development", title: "Website Development", category: "Brand", priceFrom: 45000, summary: "Fast, premium marketing and business websites with CMS-ready content sections.", timeline: "2-6 weeks" },
  { id: "svc_web", slug: "web-app-development", title: "Web App Development", category: "Engineering", priceFrom: 85000, summary: "Premium dashboards, portals, marketplaces, and internal tools with production-grade delivery.", timeline: "4-10 weeks" },
  { id: "svc_ai", slug: "ai-integration", title: "AI Integration", category: "AI", priceFrom: 65000, summary: "AI copilots, automation systems, document workflows, and custom API integrations.", timeline: "3-8 weeks" },
  { id: "svc_saas", slug: "saas-development", title: "SaaS Development", category: "Product", priceFrom: 150000, summary: "Subscription-ready SaaS with auth, billing, analytics, and role dashboards.", timeline: "8-16 weeks" },
  { id: "svc_ecom", slug: "e-commerce-development", title: "E-commerce Development", category: "Commerce", priceFrom: 70000, summary: "High-converting stores, catalog systems, checkout integrations, and admin operations.", timeline: "4-9 weeks" },
  { id: "svc_mobile", slug: "mobile-app-development", title: "Mobile App Development", category: "Mobile", priceFrom: 120000, summary: "Cross-platform mobile apps with polished onboarding, auth, dashboards, and release support.", timeline: "6-14 weeks" },
  { id: "svc_crm", slug: "crm-erp-development", title: "CRM/ERP Development", category: "Operations", priceFrom: 140000, summary: "Custom business workflows for teams that need order, finance, inventory, or sales visibility.", timeline: "8-16 weeks" },
  { id: "svc_uiux", slug: "ui-ux-design", title: "UI/UX Design", category: "Design", priceFrom: 45000, summary: "Premium product design systems, prototypes, and developer-ready interface specifications.", timeline: "2-6 weeks" },
  { id: "svc_landing", slug: "landing-page-design", title: "Landing Page Design", category: "Growth", priceFrom: 30000, summary: "Cinematic landing pages with conversion-focused copy, responsive sections, and launch polish.", timeline: "1-3 weeks" },
  { id: "svc_api", slug: "api-development", title: "API Development", category: "Backend", priceFrom: 60000, summary: "Secure APIs for products, integrations, dashboards, mobile apps, and partner systems.", timeline: "3-8 weeks" },
  { id: "svc_cloud", slug: "cloud-deployment", title: "Cloud Deployment", category: "Infrastructure", priceFrom: 30000, summary: "Deployment pipelines, environment setup, storage, domains, and release handover.", timeline: "1-3 weeks" },
  { id: "svc_seo", slug: "seo-setup", title: "SEO Setup", category: "Growth", priceFrom: 20000, summary: "Technical SEO, metadata, sitemap structure, content templates, and performance basics.", timeline: "1-3 weeks" },
  { id: "svc_automation", slug: "automation-systems", title: "Automation Systems", category: "AI", priceFrom: 55000, summary: "Internal automations for leads, documents, notifications, approvals, and reporting.", timeline: "2-7 weeks" },
  { id: "svc_redesign", slug: "website-redesign", title: "Website Redesign", category: "Growth", priceFrom: 50000, summary: "Modernize tired sites with sharper UX, faster pages, better messaging, and premium visuals.", timeline: "3-8 weeks" },
  { id: "svc_backend", slug: "backend-systems", title: "Backend Systems", category: "Backend", priceFrom: 95000, summary: "Data models, queues, jobs, services, audit logs, and admin-ready backend foundations.", timeline: "5-12 weeks" },
  { id: "svc_db", slug: "database-setup", title: "Database Setup", category: "Infrastructure", priceFrom: 35000, summary: "Production-minded schemas, indexes, access patterns, seed data, and migration strategy.", timeline: "1-4 weeks" },
  { id: "svc_perf", slug: "performance-optimization", title: "Performance Optimization", category: "Engineering", priceFrom: 35000, summary: "Speed audits, bundle reduction, image strategy, rendering fixes, and UX responsiveness.", timeline: "1-4 weeks" },
  { id: "svc_portfolio", slug: "portfolio-website", title: "Portfolio Website", category: "Brand", priceFrom: 25000, summary: "Personal or studio portfolios with case studies, CMS-ready writing, and premium motion.", timeline: "1-4 weeks" },
  { id: "svc_mobile2", slug: "mobile-ui-design", title: "Mobile UI Design", category: "Design", priceFrom: 40000, summary: "Pixel-perfect mobile UI for iOS and Android apps with Figma handoff.", timeline: "2-5 weeks" },
  { id: "svc_maintenance", slug: "maintenance-support", title: "Maintenance & Support", category: "Support", priceFrom: 15000, summary: "Retainers for updates, monitoring, bug fixes, content edits, and monthly improvements.", timeline: "Monthly" },
];

const CATS = ["All", "Engineering", "AI", "Product", "Brand", "Design", "Growth", "Mobile", "Commerce", "Operations", "Backend", "Infrastructure", "Support"];

export default function ServicesPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? SERVICES : SERVICES.filter((s) => s.category === filter);

  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <Section>
        <Reveal>
          <SectionHeader eyebrow="Agency services" title="What we build" subtitle="From websites and SaaS platforms to AI integrations, backend systems, and e-commerce — 20 services, one premium studio." />
        </Reveal>

        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all",
                  filter === c
                    ? "border-[rgba(201,168,76,0.5)] bg-[rgba(201,168,76,0.12)] text-[#C9A84C]"
                    : "border-[rgba(201,168,76,0.1)] text-[#F5F0E8]/45 hover:border-[rgba(201,168,76,0.25)] hover:text-[#F5F0E8]/75"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((svc, i) => (
            <Reveal key={svc.id} delay={i * 0.04}>
              <Link href={`/services/${svc.slug}`}>
                <GoldCard className="flex h-full flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <Badge tone="gold">{svc.category}</Badge>
                    <ArrowRight size={15} className="text-[#C9A84C]/50" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#F5F0E8]">{svc.title}</h3>
                    <p className="mt-1.5 text-sm text-[#F5F0E8]/50">{svc.summary}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-[rgba(201,168,76,0.1)] pt-3">
                    <span className="text-xs text-[#F5F0E8]/35">{svc.timeline}</span>
                    <span className="font-bold text-[#C9A84C]">₹{(svc.priceFrom / 1000).toFixed(0)}K+</span>
                  </div>
                </GoldCard>
              </Link>
            </Reveal>
          ))}
        </div>

        <GoldDivider className="my-16" />

        <Reveal>
          <div className="text-center">
            <h3 className="text-2xl font-black text-[#F5F0E8]">Ready to get started?</h3>
            <p className="mt-2 text-[#F5F0E8]/50">Tell us what you need and we'll send a tailored proposal.</p>
            <div className="mt-6">
              <Link href="/contact"><Button variant="gold" size="lg">Get a Free Quote</Button></Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
