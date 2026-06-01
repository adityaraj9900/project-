"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle2, ArrowLeft, Clock, BadgeIndianRupee } from "lucide-react";
import { Section, Reveal, GoldCard, Badge, Button, GoldDivider, SectionHeader } from "@/components/ui/primitives";

const SERVICES = [
  { slug: "website-development", title: "Website Development", category: "Brand", priceFrom: 45000, summary: "Fast, premium marketing and business websites with CMS-ready content sections.", deliverables: ["Site architecture", "Responsive UI", "Contact forms", "SEO metadata", "Deployment & handover"], timeline: "2-6 weeks", description: "We build high-performance marketing websites that look premium and convert visitors. Fully responsive, CMS-ready, and optimised for search from day one." },
  { slug: "web-app-development", title: "Web App Development", category: "Engineering", priceFrom: 85000, summary: "Premium dashboards, portals, marketplaces, and internal tools.", deliverables: ["Discovery sprint", "UX architecture", "Full-stack build", "API integration", "Deployment & handover"], timeline: "4-10 weeks", description: "From complex SaaS dashboards to internal ops tools, we build web apps that your team and customers actually enjoy using." },
  { slug: "ai-integration", title: "AI Integration", category: "AI", priceFrom: 65000, summary: "AI copilots, automation systems, document workflows.", deliverables: ["Workflow mapping", "Model integration", "Evaluation layer", "Admin controls", "Documentation"], timeline: "3-8 weeks", description: "We integrate AI into your product or workflow — whether that's an LLM copilot, document processing, or a full automation pipeline." },
  { slug: "saas-development", title: "SaaS Development", category: "Product", priceFrom: 150000, summary: "Subscription-ready SaaS with auth, billing, analytics, and role dashboards.", deliverables: ["MVP scope doc", "Design system", "Auth + roles", "Core modules", "Analytics + launch"], timeline: "8-16 weeks", description: "End-to-end SaaS development from zero to production-ready — auth, billing placeholders, analytics, role-based dashboards, and launch support." },
  { slug: "e-commerce-development", title: "E-commerce Development", category: "Commerce", priceFrom: 70000, summary: "High-converting stores, catalog systems, checkout integrations.", deliverables: ["Storefront", "Product catalog", "Checkout flow", "Order dashboard", "SEO setup"], timeline: "4-9 weeks", description: "We build e-commerce experiences that convert — from catalog and checkout to order management and post-purchase flows." },
  { slug: "mobile-app-development", title: "Mobile App Development", category: "Mobile", priceFrom: 120000, summary: "Cross-platform mobile apps with polished onboarding, auth, and dashboards.", deliverables: ["App UX design", "React Native build", "API integration", "Testing suite", "Store-ready assets"], timeline: "6-14 weeks", description: "Cross-platform mobile apps built with React Native — pixel-perfect design, native performance, and store-ready delivery." },
  { slug: "ui-ux-design", title: "UI/UX Design", category: "Design", priceFrom: 45000, summary: "Premium design systems, prototypes, and developer-ready specifications.", deliverables: ["User research", "Wireframes", "Design system", "Interactive prototype", "Developer handoff"], timeline: "2-6 weeks", description: "We design interfaces that are as functional as they are beautiful — with systems that scale and specs that developers can actually use." },
  { slug: "landing-page-design", title: "Landing Page Design", category: "Growth", priceFrom: 30000, summary: "Cinematic landing pages with conversion-focused copy and launch polish.", deliverables: ["Narrative structure", "Hero direction", "Responsive UI", "CTA analytics"], timeline: "1-3 weeks", description: "First impressions that convert. We craft landing pages with tight narrative, cinematic visuals, and CTA flows that drive action." },
  { slug: "api-development", title: "API Development", category: "Backend", priceFrom: 60000, summary: "Secure APIs for products, integrations, dashboards, and mobile apps.", deliverables: ["API design doc", "Input validation", "Auth middleware", "Full documentation", "Test coverage"], timeline: "3-8 weeks", description: "Well-documented, secure, and tested APIs — built for scale and designed for developer ergonomics." },
  { slug: "cloud-deployment", title: "Cloud Deployment", category: "Infrastructure", priceFrom: 30000, summary: "Deployment pipelines, environment setup, storage, and domains.", deliverables: ["Hosting setup", "Env config", "Domain + SSL", "Monitoring", "Rollback playbook"], timeline: "1-3 weeks", description: "We handle your deployment — CI/CD, environment config, monitoring, and rollback — so your team can focus on the product." },
  { slug: "seo-setup", title: "SEO Setup", category: "Growth", priceFrom: 20000, summary: "Technical SEO, metadata, sitemap, and Core Web Vitals.", deliverables: ["Metadata audit", "XML sitemap", "Schema markup", "Core Web Vitals fix"], timeline: "1-3 weeks", description: "Technical SEO done right — metadata, sitemaps, structured data, and performance checks that get you indexed properly." },
  { slug: "automation-systems", title: "Automation Systems", category: "AI", priceFrom: 55000, summary: "Internal automations for leads, documents, notifications, and approvals.", deliverables: ["Process mapping", "Automation build", "Admin logs", "Monitoring dashboard"], timeline: "2-7 weeks", description: "Cut manual work with custom automations — lead routing, document generation, approval flows, and notification pipelines." },
  { slug: "website-redesign", title: "Website Redesign", category: "Growth", priceFrom: 50000, summary: "Modernise tired sites with sharper UX, faster pages, and premium visuals.", deliverables: ["Full audit", "New design", "Content migration", "QA", "Launch"], timeline: "3-8 weeks", description: "We take outdated sites and rebuild them with modern design, better performance, and messaging that actually lands." },
  { slug: "backend-systems", title: "Backend Systems", category: "Backend", priceFrom: 95000, summary: "Data models, queues, jobs, services, and audit logs.", deliverables: ["Schema design", "Service layer", "Background jobs", "Observability", "Documentation"], timeline: "5-12 weeks", description: "Robust backend foundations — from data modeling and queuing to audit logs and admin-ready observability." },
  { slug: "database-setup", title: "Database Setup", category: "Infrastructure", priceFrom: 35000, summary: "Production-minded schemas, indexes, access patterns, and migration strategy.", deliverables: ["Schema design", "Migration scripts", "Security rules", "Backup strategy"], timeline: "1-4 weeks", description: "Database design that supports your product long-term — right schema, right indexes, right access patterns." },
  { slug: "performance-optimization", title: "Performance Optimization", category: "Engineering", priceFrom: 35000, summary: "Speed audits, bundle reduction, image strategy, and rendering fixes.", deliverables: ["Performance audit", "Bundle optimisation", "Image strategy", "Benchmark report"], timeline: "1-4 weeks", description: "We find and fix the bottlenecks slowing your product — from JavaScript bundles to image loading to server-side rendering." },
  { slug: "portfolio-website", title: "Portfolio Website", category: "Brand", priceFrom: 25000, summary: "Personal or studio portfolios with case studies and premium motion.", deliverables: ["Content architecture", "Portfolio layout", "Case study pages", "Deployment"], timeline: "1-4 weeks", description: "Stand-out portfolios for designers, developers, agencies, and studios — built to impress clients and recruiters." },
  { slug: "mobile-ui-design", title: "Mobile UI Design", category: "Design", priceFrom: 40000, summary: "Pixel-perfect mobile UI for iOS and Android with Figma handoff.", deliverables: ["Wireframes", "Design system", "Prototype", "Dev handoff pack"], timeline: "2-5 weeks", description: "Mobile-first UI design that translates beautifully to native apps — with complete Figma component libraries and handoff specs." },
  { slug: "crm-erp-development", title: "CRM/ERP Development", category: "Operations", priceFrom: 140000, summary: "Custom business workflows for finance, inventory, order, and sales visibility.", deliverables: ["Workflow audit", "Role dashboards", "Reports", "Import/export", "Admin controls"], timeline: "8-16 weeks", description: "Custom CRM and ERP systems built around your actual workflows — not a generic SaaS that 80% doesn't fit your team." },
  { slug: "maintenance-support", title: "Maintenance & Support", category: "Support", priceFrom: 15000, summary: "Retainers for updates, monitoring, bug fixes, and monthly improvements.", deliverables: ["SLA agreement", "Monthly fixes", "Performance reports", "Support desk"], timeline: "Monthly", description: "Ongoing retainers so your product keeps running smoothly — bug fixes, content updates, dependency upgrades, and monitoring." },
];

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug) ?? SERVICES[0];

  return (
    <main className="bg-[#080808] pt-32 pb-24">
      <div className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <Section>
        <Reveal>
          <Link href="/services" className="mb-8 inline-flex items-center gap-2 text-sm text-[#F5F0E8]/45 hover:text-[#C9A84C] transition-colors">
            <ArrowLeft size={14} /> All services
          </Link>
        </Reveal>

        <Reveal>
          <Badge tone="gold" className="mb-4">{service.category}</Badge>
          <h1 className="mt-3 text-5xl font-black text-[#F5F0E8] md:text-7xl">{service.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-[#F5F0E8]/55 leading-relaxed">{service.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact"><Button variant="gold" size="lg">Get a Quote</Button></Link>
            <Link href="/contact"><Button variant="outline" size="lg">Book a Call</Button></Link>
          </div>
        </Reveal>

        <GoldDivider className="my-14" />

        <div className="grid gap-6 md:grid-cols-3">
          <Reveal delay={0.05}>
            <GoldCard className="col-span-2">
              <h2 className="mb-6 text-2xl font-black text-[#F5F0E8]">What's included</h2>
              <div className="grid gap-3">
                {service.deliverables.map((d) => (
                  <div key={d} className="flex items-center gap-3 text-[#F5F0E8]/75">
                    <CheckCircle2 size={16} className="shrink-0 text-[#C9A84C]" />
                    {d}
                  </div>
                ))}
              </div>
            </GoldCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GoldCard>
              <h2 className="mb-6 text-xl font-black text-[#F5F0E8]">Commercials</h2>
              <div className="grid gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-[#F5F0E8]/45">
                    <BadgeIndianRupee size={14} /> Starting price
                  </div>
                  <div className="mt-1 text-2xl font-black text-[#C9A84C]">
                    ₹{(service.priceFrom / 1000).toFixed(0)}K
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-[#F5F0E8]/45">
                    <Clock size={14} /> Typical timeline
                  </div>
                  <div className="mt-1 font-semibold text-[#F5F0E8]/80">{service.timeline}</div>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/contact">
                  <Button variant="gold" className="w-full justify-center">Start a project</Button>
                </Link>
              </div>
            </GoldCard>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
