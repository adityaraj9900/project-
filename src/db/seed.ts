import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import bcrypt from "bcryptjs";
import path from "path";

const DB_PATH = path.resolve(process.cwd(), "orbitix.db");
const sqlite = new Database(DB_PATH);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");
const db = drizzle(sqlite, { schema });

async function seed() {
  console.log("Seeding Orbitix database…");

  // ─── Users ──────────────────────────────────────────────
  const adminHash = await bcrypt.hash("admin123", 10);
  const mentorHash = await bcrypt.hash("mentor123", 10);
  const studentHash = await bcrypt.hash("student123", 10);
  const clientHash = await bcrypt.hash("client123", 10);

  db.insert(schema.users).values([
    { id: "u_admin", name: "Aarav Superadmin", email: "admin@orbitix.in", passwordHash: adminHash, role: "super-admin" },
    { id: "u_mentor", name: "Maya Mentor", email: "mentor@orbitix.in", passwordHash: mentorHash, role: "mentor" },
    { id: "u_student", name: "Riya Sharma", email: "student@orbitix.in", passwordHash: studentHash, role: "student" },
    { id: "u_client", name: "Dev Mehta", email: "client@orbitix.in", passwordHash: clientHash, role: "client" },
  ]).onConflictDoNothing().run();

  // ─── Profiles ────────────────────────────────────────────
  db.insert(schema.profiles).values([
    { userId: "u_student", phone: "+91 90000 10001", city: "Pune", github: "https://github.com/riya", linkedin: "https://linkedin.com/in/riya", portfolio: "https://riya.dev", bio: "Frontend intern building production dashboards." },
    { userId: "u_client", phone: "+91 90000 10002", city: "Mumbai", bio: "Founder of a logistics SaaS startup." },
    { userId: "u_mentor", phone: "+91 90000 10003", city: "Bengaluru", bio: "Full-stack mentor and product engineer." },
    { userId: "u_admin", city: "Delhi", bio: "Founder of Orbitix IT Solutions." },
  ]).onConflictDoNothing().run();

  // ─── Programs ─────────────────────────────────────────────
  db.insert(schema.programs).values([
    {
      id: "p_fullstack",
      slug: "full-stack-product-engineering",
      title: "Full-Stack Product Engineering",
      category: "Engineering",
      level: "Intermediate",
      duration: "12 weeks",
      summary: "Build SaaS dashboards, APIs, auth flows, and client-ready product modules on real briefs.",
      syllabus: ["Next.js App Router", "TypeScript architecture", "API contracts", "Database modeling", "Deployment reviews"],
      roadmap: ["Foundation sprint", "Feature sprint", "Client simulation", "Production polish", "Portfolio launch"],
      benefits: ["Real project work", "Mentor reviews", "Certificate", "Portfolio case study"],
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind", "Zod"],
    },
    {
      id: "p_ai",
      slug: "ai-automation-systems",
      title: "AI Automation Systems",
      category: "AI",
      level: "Advanced",
      duration: "10 weeks",
      summary: "Design AI workflows, CRM automations, and production-ready prompt systems.",
      syllabus: ["AI product discovery", "Workflow automation", "Vector search basics", "API integration", "Monitoring"],
      roadmap: ["Use-case map", "Prototype", "Integration", "Evaluation", "Client demo"],
      benefits: ["Automation portfolio", "Client-style briefs", "Mentor critique", "Digital certificate"],
      stack: ["OpenAI API", "Node.js", "Next.js", "Supabase", "n8n"],
    },
    {
      id: "p_design",
      slug: "ui-ux-product-design",
      title: "UI/UX Product Design",
      category: "Design",
      level: "Beginner",
      duration: "8 weeks",
      summary: "Research, wireframe, prototype, and hand off premium SaaS interfaces for real clients.",
      syllabus: ["Research", "Information architecture", "Design systems", "Prototype testing", "Developer handoff"],
      roadmap: ["Audit", "Flows", "Components", "Prototype", "Case study"],
      benefits: ["Portfolio-ready work", "Design review", "Live redesign briefs", "Certificate"],
      stack: ["Figma", "FigJam", "Framer", "Design tokens", "Lottie"],
    },
  ]).onConflictDoNothing().run();

  // ─── Applications ─────────────────────────────────────────
  db.insert(schema.applications).values([
    { id: "a_1", studentId: "u_student", programId: "p_fullstack", status: "approved", motivation: "I want to ship real SaaS features and become job-ready.", createdAt: "2026-05-15" },
    { id: "a_2", studentId: "u_student", programId: "p_ai", status: "pending", motivation: "I want to learn AI systems through practical automation projects.", createdAt: "2026-05-18" },
  ]).onConflictDoNothing().run();

  // ─── Enrollments ──────────────────────────────────────────
  db.insert(schema.enrollments).values([
    { id: "e_1", studentId: "u_student", programId: "p_fullstack", batchId: "b_alpha", progress: 68, status: "active", startDate: "2026-06-01" },
  ]).onConflictDoNothing().run();

  // ─── Tasks ────────────────────────────────────────────────
  db.insert(schema.tasks).values([
    { id: "t_1", programId: "p_fullstack", title: "Build a role-aware dashboard shell", deadline: "2026-06-12", points: 100, description: "Create authenticated navigation, analytics cards, and responsive layout." },
    { id: "t_2", programId: "p_fullstack", title: "Implement submission review workflow", deadline: "2026-06-24", points: 120, description: "Build task submission, mentor feedback, and resubmission states." },
    { id: "t_3", programId: "p_ai", title: "Design a lead qualification assistant", deadline: "2026-07-01", points: 150, description: "Map inputs, scoring rubric, automation steps, and evaluation checks." },
  ]).onConflictDoNothing().run();

  // ─── Submissions ──────────────────────────────────────────
  db.insert(schema.submissions).values([
    { id: "s_1", taskId: "t_1", studentId: "u_student", githubUrl: "https://github.com/riya/dashboard", liveUrl: "https://dashboard-demo.vercel.app", status: "approved", feedback: "Strong architecture and clean mobile behavior.", pointsEarned: 100, submittedAt: "2026-05-17" },
    { id: "s_2", taskId: "t_2", studentId: "u_student", githubUrl: "https://github.com/riya/review-flow", liveUrl: "https://review-flow.vercel.app", status: "review", feedback: "Add clearer empty states before approval.", submittedAt: "2026-05-20" },
  ]).onConflictDoNothing().run();

  // ─── Certificates ─────────────────────────────────────────
  db.insert(schema.certificates).values([
    { id: "c_1", certificateNo: "ORB-FS-2026-0001", studentId: "u_student", programId: "p_fullstack", status: "approved", issuedAt: "2026-05-20" },
  ]).onConflictDoNothing().run();

  // ─── Offer Letters ────────────────────────────────────────
  db.insert(schema.offerLetters).values([
    { id: "ol_1", studentId: "u_student", programId: "p_fullstack", issuedAt: "2026-05-16", mentorName: "Maya Mentor", adminName: "Aarav Superadmin", startDate: "2026-06-01", duration: "12 weeks" },
  ]).onConflictDoNothing().run();

  // ─── Services ─────────────────────────────────────────────
  db.insert(schema.services).values([
    { id: "svc_website", slug: "website-development", title: "Website Development", category: "Brand", priceFrom: 45000, summary: "Fast, premium marketing and business websites with CMS-ready content sections.", deliverables: ["Site architecture", "Responsive UI", "Forms", "SEO metadata", "Deployment"], timeline: "2-6 weeks" },
    { id: "svc_web", slug: "web-app-development", title: "Web App Development", category: "Engineering", priceFrom: 85000, summary: "Premium dashboards, portals, marketplaces, and internal tools with production-grade delivery.", deliverables: ["Discovery sprint", "UX architecture", "Full-stack build", "Deployment", "Handover"], timeline: "4-10 weeks" },
    { id: "svc_ai", slug: "ai-integration", title: "AI Integration", category: "AI", priceFrom: 65000, summary: "AI copilots, automation systems, document workflows, and custom API integrations.", deliverables: ["Workflow map", "Model integration", "Evaluation layer", "Admin controls"], timeline: "3-8 weeks" },
    { id: "svc_saas", slug: "saas-development", title: "SaaS Development", category: "Product", priceFrom: 150000, summary: "Subscription-ready SaaS with auth, billing, analytics, and role dashboards.", deliverables: ["MVP scope", "Design system", "Core modules", "Analytics", "Launch support"], timeline: "8-16 weeks" },
    { id: "svc_ecom", slug: "e-commerce-development", title: "E-commerce Development", category: "Commerce", priceFrom: 70000, summary: "High-converting stores, catalog systems, checkout integrations, and admin operations.", deliverables: ["Storefront", "Catalog", "Checkout", "Order dashboard", "SEO setup"], timeline: "4-9 weeks" },
    { id: "svc_mobile", slug: "mobile-app-development", title: "Mobile App Development", category: "Mobile", priceFrom: 120000, summary: "Cross-platform mobile apps with polished onboarding, auth, dashboards, and release support.", deliverables: ["App UX", "React Native build", "API integration", "Testing", "Store-ready assets"], timeline: "6-14 weeks" },
    { id: "svc_crm", slug: "crm-erp-development", title: "CRM/ERP Development", category: "Operations", priceFrom: 140000, summary: "Custom business workflows for teams that need order, finance, inventory, or sales visibility.", deliverables: ["Workflow audit", "Role dashboards", "Reports", "Import/export", "Admin controls"], timeline: "8-16 weeks" },
    { id: "svc_uiux", slug: "ui-ux-design", title: "UI/UX Design", category: "Design", priceFrom: 45000, summary: "Premium product design systems, prototypes, and developer-ready interface specifications.", deliverables: ["Research", "Wireframes", "Design system", "Prototype", "Handoff"], timeline: "2-6 weeks" },
    { id: "svc_landing", slug: "landing-page-design", title: "Landing Page Design", category: "Growth", priceFrom: 30000, summary: "Cinematic landing pages with conversion-focused copy, responsive sections, and launch polish.", deliverables: ["Narrative", "Hero direction", "Responsive UI", "CTA analytics"], timeline: "1-3 weeks" },
    { id: "svc_mobile2", slug: "mobile-ui-design", title: "Mobile UI Design", category: "Design", priceFrom: 40000, summary: "Pixel-perfect mobile UI for iOS and Android apps with Figma handoff.", deliverables: ["Wireframes", "Design system", "Prototype", "Dev handoff"], timeline: "2-5 weeks" },
    { id: "svc_api", slug: "api-development", title: "API Development", category: "Backend", priceFrom: 60000, summary: "Secure APIs for products, integrations, dashboards, mobile apps, and partner systems.", deliverables: ["API design", "Validation", "Auth", "Docs", "Testing"], timeline: "3-8 weeks" },
    { id: "svc_cloud", slug: "cloud-deployment", title: "Cloud Deployment", category: "Infrastructure", priceFrom: 30000, summary: "Deployment pipelines, environment setup, storage, domains, and release handover.", deliverables: ["Hosting", "Env setup", "Domain", "Monitoring", "Rollback notes"], timeline: "1-3 weeks" },
    { id: "svc_seo", slug: "seo-setup", title: "SEO Setup", category: "Growth", priceFrom: 20000, summary: "Technical SEO, metadata, sitemap structure, content templates, and performance basics.", deliverables: ["Metadata", "Sitemap", "Schema", "Core Web Vitals"], timeline: "1-3 weeks" },
    { id: "svc_automation", slug: "automation-systems", title: "Automation Systems", category: "AI", priceFrom: 55000, summary: "Internal automations for leads, documents, notifications, approvals, and reporting.", deliverables: ["Process map", "Automation build", "Admin logs", "Monitoring"], timeline: "2-7 weeks" },
    { id: "svc_redesign", slug: "website-redesign", title: "Website Redesign", category: "Growth", priceFrom: 50000, summary: "Modernize tired sites with sharper UX, faster pages, better messaging, and premium visuals.", deliverables: ["Audit", "Redesign", "Migration", "QA", "Launch"], timeline: "3-8 weeks" },
    { id: "svc_backend", slug: "backend-systems", title: "Backend Systems", category: "Backend", priceFrom: 95000, summary: "Data models, queues, jobs, services, audit logs, and admin-ready backend foundations.", deliverables: ["Schema", "Services", "Jobs", "Observability", "Docs"], timeline: "5-12 weeks" },
    { id: "svc_db", slug: "database-setup", title: "Database Setup", category: "Infrastructure", priceFrom: 35000, summary: "Production-minded schemas, indexes, access patterns, seed data, and migration strategy.", deliverables: ["Schema", "Migrations", "Security rules", "Backups"], timeline: "1-4 weeks" },
    { id: "svc_perf", slug: "performance-optimization", title: "Performance Optimization", category: "Engineering", priceFrom: 35000, summary: "Speed audits, bundle reduction, image strategy, rendering fixes, and UX responsiveness.", deliverables: ["Audit", "Fixes", "Benchmarks", "Report"], timeline: "1-4 weeks" },
    { id: "svc_portfolio", slug: "portfolio-website", title: "Portfolio Website", category: "Brand", priceFrom: 25000, summary: "Personal or studio portfolios with case studies, CMS-ready writing, and premium motion.", deliverables: ["Content map", "Portfolio layout", "Case study pages", "Deployment"], timeline: "1-4 weeks" },
    { id: "svc_maintenance", slug: "maintenance-support", title: "Maintenance & Support", category: "Support", priceFrom: 15000, summary: "Retainers for updates, monitoring, bug fixes, content edits, and monthly improvements.", deliverables: ["SLA", "Monthly fixes", "Reports", "Support desk"], timeline: "Monthly" },
  ]).onConflictDoNothing().run();

  // ─── Leads ────────────────────────────────────────────────
  db.insert(schema.leads).values([
    { id: "l_1", name: "Kavya Rao", email: "kavya@fleetzen.in", company: "FleetZen", serviceId: "svc_saas", budget: "₹3L-₹6L", status: "Proposal Sent", message: "We need a logistics customer portal with billing and milestone tracking." },
  ]).onConflictDoNothing().run();

  // ─── Projects ─────────────────────────────────────────────
  db.insert(schema.projects).values([
    { id: "proj_1", clientId: "u_client", title: "FleetZen Operations Portal", serviceId: "svc_saas", progress: 56, status: "In Progress", team: ["u_mentor", "u_student"], budget: 420000 },
  ]).onConflictDoNothing().run();

  // ─── Milestones ───────────────────────────────────────────
  db.insert(schema.milestones).values([
    { id: "m_1", projectId: "proj_1", title: "Discovery and UX flows", dueDate: "2026-05-25", status: "completed", amount: 105000 },
    { id: "m_2", projectId: "proj_1", title: "Dashboard MVP", dueDate: "2026-06-08", status: "pending", amount: 157500 },
    { id: "m_3", projectId: "proj_1", title: "QA and launch", dueDate: "2026-06-22", status: "pending", amount: 157500 },
  ]).onConflictDoNothing().run();

  // ─── Payments (clients only) ──────────────────────────────
  db.insert(schema.payments).values([
    { id: "pay_1", userId: "u_client", purpose: "Discovery milestone", amount: 105000, status: "approved", createdAt: "2026-05-20" },
  ]).onConflictDoNothing().run();

  // ─── Blogs ────────────────────────────────────────────────
  db.insert(schema.blogs).values([
    { id: "blog_1", slug: "project-based-internships", title: "Why project-based internships beat passive learning", excerpt: "A practical model for turning students into reliable builders.", content: "Project-based internships compress learning by making students ship, receive critique, and improve against real constraints. Our model pairs mentor oversight with agency-grade briefs so interns learn both craft and communication.", author: "Orbitix Team", category: "Internships", published: true, publishedAt: "2026-05-10" },
    { id: "blog_2", slug: "client-ready-mvp", title: "What makes an MVP client-ready?", excerpt: "The checks we use before a product leaves the studio.", content: "A client-ready MVP has clear flows, resilient states, analytics, documentation, and a handover path. Visual polish matters, but operational clarity is what keeps a launch alive.", author: "Maya Mentor", category: "Agency", published: true, publishedAt: "2026-05-12" },
  ]).onConflictDoNothing().run();

  // ─── FAQs ─────────────────────────────────────────────────
  db.insert(schema.faqs).values([
    { id: "faq_1", question: "Are internships paid?", answer: "Internships at Orbitix are 100% free. There are no fees, no certificate charges, and no hidden costs for students or interns. Zero. Always.", order: 1 },
    { id: "faq_2", question: "Do interns work on client projects?", answer: "Selected interns contribute to scoped internal or client-style modules under mentor and admin review.", order: 2 },
    { id: "faq_3", question: "Can clients track delivery?", answer: "Yes. Clients get a dedicated portal with project timeline, milestones, invoice downloads, messages, and file sharing.", order: 3 },
    { id: "faq_4", question: "How long are the programs?", answer: "Programs run 8–12 weeks depending on the track. Full-Stack is 12 weeks, AI Automation is 10 weeks, and UI/UX is 8 weeks.", order: 4 },
    { id: "faq_5", question: "Will I get a certificate?", answer: "Yes. After completing all tasks and mentor review, you receive a verifiable digital certificate at no cost.", order: 5 },
  ]).onConflictDoNothing().run();

  // ─── Testimonials ─────────────────────────────────────────
  db.insert(schema.testimonials).values([
    { id: "ts_1", name: "Riya Sharma", role: "Full-Stack Intern", quote: "The tasks felt like real product work. My portfolio finally has substance.", type: "intern" },
    { id: "ts_2", name: "Dev Mehta", role: "SaaS Founder", quote: "They moved like a premium product studio and kept the build transparent.", type: "client" },
    { id: "ts_3", name: "Arjun Kapoor", role: "AI Automation Intern", quote: "I shipped an actual automation system. No tutorial could have taught me this.", type: "intern" },
    { id: "ts_4", name: "Priya Nair", role: "E-commerce Brand, CEO", quote: "The team delivered 3 weeks ahead of schedule. Exceptional quality.", type: "client" },
    { id: "ts_5", name: "Sneha Patel", role: "UI/UX Intern", quote: "Real design briefs, real feedback, real portfolio. This is how you learn.", type: "intern" },
    { id: "ts_6", name: "Rohit Verma", role: "EdTech Startup, CTO", quote: "Orbitix rebuilt our entire dashboard. It now drives our sales demos.", type: "client" },
  ]).onConflictDoNothing().run();

  // ─── Announcements ────────────────────────────────────────
  db.insert(schema.announcements).values([
    { id: "an_1", title: "June cohort is now open!", body: "New batches for Full-Stack, AI Automation, and UI/UX start June 1. Apply now — seats are limited.", audience: "all", createdAt: "2026-05-20" },
  ]).onConflictDoNothing().run();

  // ─── Resources ────────────────────────────────────────────
  db.insert(schema.resources).values([
    { id: "r_1", title: "SaaS Dashboard QA Checklist", type: "guide", url: "#", programId: "p_fullstack" },
    { id: "r_2", title: "GitHub Submission Guide", type: "guide", url: "#" },
    { id: "r_3", title: "AI Workflow Primer", type: "pdf", url: "#", programId: "p_ai" },
  ]).onConflictDoNothing().run();

  // ─── Settings ─────────────────────────────────────────────
  db.insert(schema.settings).values([
    { key: "brandName", value: "Orbitix IT Solutions" },
    { key: "adminEmail", value: "admin@orbitix.in" },
    { key: "whatsappNumber", value: "919876543210" },
    { key: "upiId", value: "orbitix@upi" },
    { key: "razorpayEnabled", value: "false" },
  ]).onConflictDoNothing().run();

  // ─── Team ─────────────────────────────────────────────────
  db.insert(schema.team).values([
    { id: "team_1", name: "Aarav Sharma", role: "Founder & CEO", bio: "Full-stack product engineer with 8 years building SaaS products.", order: 1 },
    { id: "team_2", name: "Maya Patel", role: "Lead Mentor & CTO", bio: "Senior engineer and mentor obsessed with clean architecture.", order: 2 },
    { id: "team_3", name: "Rohan Verma", role: "Design Lead", bio: "Product designer specialising in premium B2B interfaces.", order: 3 },
  ]).onConflictDoNothing().run();

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
