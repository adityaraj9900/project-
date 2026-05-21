import type { Database } from "@/types";

export const seed: Database = {
  users: [
    { id: "u_admin", name: "Aarav Superadmin", email: "admin@orbitlabs.dev", role: "super-admin" },
    { id: "u_mentor", name: "Maya Mentor", email: "mentor@orbitlabs.dev", role: "mentor" },
    { id: "u_student", name: "Riya Sharma", email: "student@orbitlabs.dev", role: "student" },
    { id: "u_client", name: "Dev Mehta", email: "client@orbitlabs.dev", role: "client" }
  ],
  profiles: [
    { userId: "u_student", phone: "+91 90000 10001", city: "Pune", github: "https://github.com/riya", linkedin: "https://linkedin.com/in/riya", portfolio: "https://riya.dev", bio: "Frontend intern building production dashboards." },
    { userId: "u_client", phone: "+91 90000 10002", city: "Mumbai", bio: "Founder of a logistics SaaS startup." },
    { userId: "u_mentor", phone: "+91 90000 10003", city: "Bengaluru", bio: "Full-stack mentor and product engineer." }
  ],
  programs: [
    {
      id: "p_fullstack",
      slug: "full-stack-product-engineering",
      title: "Full-Stack Product Engineering Internship",
      category: "Engineering",
      level: "Intermediate",
      duration: "12 weeks",
      price: 0,
      certificateFee: 1499,
      summary: "Build SaaS dashboards, APIs, auth flows, payments, and client-ready product modules.",
      syllabus: ["Next.js App Router", "TypeScript architecture", "API contracts", "Database modeling", "Deployment reviews"],
      roadmap: ["Foundation sprint", "Feature sprint", "Client simulation", "Production polish", "Portfolio launch"],
      benefits: ["Real project work", "Mentor reviews", "Certificate verification", "Portfolio case study"],
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind", "Zod"]
    },
    {
      id: "p_ai",
      slug: "ai-automation-systems",
      title: "AI Automation Systems Internship",
      category: "AI",
      level: "Advanced",
      duration: "10 weeks",
      price: 0,
      certificateFee: 1999,
      summary: "Design AI workflows, internal tools, CRM automations, and production-ready prompt systems.",
      syllabus: ["AI product discovery", "Workflow automation", "Vector search basics", "API integration", "Monitoring"],
      roadmap: ["Use-case map", "Prototype", "Integration", "Evaluation", "Client demo"],
      benefits: ["Automation portfolio", "Client-style briefs", "Mentor critique", "Digital certificate"],
      stack: ["OpenAI API", "Node.js", "Next.js", "Supabase", "n8n"]
    },
    {
      id: "p_design",
      slug: "ui-ux-product-design",
      title: "UI/UX Product Design Internship",
      category: "Design",
      level: "Beginner",
      duration: "8 weeks",
      price: 0,
      certificateFee: 999,
      summary: "Research, wireframe, prototype, and hand off premium SaaS interfaces for real clients.",
      syllabus: ["Research", "Information architecture", "Design systems", "Prototype testing", "Developer handoff"],
      roadmap: ["Audit", "Flows", "Components", "Prototype", "Case study"],
      benefits: ["Portfolio-ready work", "Design review", "Live redesign briefs", "Certificate"],
      stack: ["Figma", "FigJam", "Framer", "Design tokens", "Lottie"]
    }
  ],
  batches: [
    { id: "b_alpha", programId: "p_fullstack", name: "Nebula Alpha", mentorId: "u_mentor", startDate: "2026-06-01", endDate: "2026-08-24", seats: 40, active: true },
    { id: "b_quantum", programId: "p_ai", name: "Quantum Builders", mentorId: "u_mentor", startDate: "2026-06-15", endDate: "2026-08-24", seats: 30, active: true }
  ],
  applications: [
    { id: "a_1", studentId: "u_student", programId: "p_fullstack", status: "approved", motivation: "I want to ship real SaaS features and become job-ready.", createdAt: "2026-05-15" },
    { id: "a_2", studentId: "u_student", programId: "p_ai", status: "pending", motivation: "I want to learn AI systems through practical automation projects.", createdAt: "2026-05-18" }
  ],
  enrollments: [
    { id: "e_1", studentId: "u_student", programId: "p_fullstack", batchId: "b_alpha", progress: 68, status: "active" }
  ],
  tasks: [
    { id: "t_1", programId: "p_fullstack", title: "Build a role-aware dashboard shell", deadline: "2026-06-12", points: 100, description: "Create authenticated navigation, analytics cards, and responsive layout." },
    { id: "t_2", programId: "p_fullstack", title: "Implement submission review workflow", deadline: "2026-06-24", points: 120, description: "Build task submission, mentor feedback, and resubmission states." },
    { id: "t_3", programId: "p_ai", title: "Design a lead qualification assistant", deadline: "2026-07-01", points: 150, description: "Map inputs, scoring rubric, automation steps, and evaluation checks." }
  ],
  submissions: [
    { id: "s_1", taskId: "t_1", studentId: "u_student", github: "https://github.com/riya/dashboard", liveUrl: "https://dashboard-demo.vercel.app", fileName: "dashboard-notes.pdf", status: "approved", feedback: "Strong architecture and clean mobile behavior.", submittedAt: "2026-05-17" },
    { id: "s_2", taskId: "t_2", studentId: "u_student", github: "https://github.com/riya/review-flow", liveUrl: "https://review-flow.vercel.app", status: "review", feedback: "Add clearer empty states before approval.", submittedAt: "2026-05-20" }
  ],
  certificates: [
    { id: "c_1", certificateNo: "ORB-FS-2026-0001", studentId: "u_student", programId: "p_fullstack", status: "approved", issuedAt: "2026-05-20", verificationUrl: "/verify?id=ORB-FS-2026-0001" }
  ],
  payments: [
    { id: "pay_1", userId: "u_student", purpose: "Certificate fee", amount: 1499, status: "approved", proof: "upi-proof-riya.png", createdAt: "2026-05-18" },
    { id: "pay_2", userId: "u_client", purpose: "SaaS MVP milestone", amount: 50000, status: "pending", proof: "bank-transfer.pdf", createdAt: "2026-05-19" }
  ],
  services: [
    { id: "svc_website", slug: "website-development", title: "Website Development", category: "Brand", priceFrom: 45000, summary: "Fast, premium marketing and business websites with CMS-ready content sections.", deliverables: ["Site architecture", "Responsive UI", "Forms", "SEO metadata", "Deployment"], timeline: "2-6 weeks" },
    { id: "svc_web", slug: "web-app-development", title: "Web App Development", category: "Engineering", priceFrom: 85000, summary: "Premium dashboards, portals, marketplaces, and internal tools with production-grade delivery.", deliverables: ["Discovery sprint", "UX architecture", "Full-stack build", "Deployment", "Handover"], timeline: "4-10 weeks" },
    { id: "svc_ai", slug: "ai-integration", title: "AI Integration", category: "AI", priceFrom: 65000, summary: "AI copilots, automation systems, document workflows, and custom API integrations.", deliverables: ["Workflow map", "Model integration", "Evaluation layer", "Admin controls"], timeline: "3-8 weeks" },
    { id: "svc_saas", slug: "saas-development", title: "SaaS Development", category: "Product", priceFrom: 150000, summary: "Subscription-ready SaaS with auth, billing placeholders, analytics, and role dashboards.", deliverables: ["MVP scope", "Design system", "Core modules", "Analytics", "Launch support"], timeline: "8-16 weeks" },
    { id: "svc_ecom", slug: "e-commerce-development", title: "E-commerce Development", category: "Commerce", priceFrom: 70000, summary: "High-converting stores, catalog systems, checkout integrations, and admin operations.", deliverables: ["Storefront", "Catalog", "Checkout", "Order dashboard", "SEO setup"], timeline: "4-9 weeks" },
    { id: "svc_mobile", slug: "mobile-app-development", title: "Mobile App Development", category: "Mobile", priceFrom: 120000, summary: "Cross-platform mobile apps with polished onboarding, auth, dashboards, and release support.", deliverables: ["App UX", "React Native build", "API integration", "Testing", "Store-ready assets"], timeline: "6-14 weeks" },
    { id: "svc_crm", slug: "crm-erp-development", title: "CRM/ERP Development", category: "Operations", priceFrom: 140000, summary: "Custom business workflows for teams that need order, finance, inventory, or sales visibility.", deliverables: ["Workflow audit", "Role dashboards", "Reports", "Import/export", "Admin controls"], timeline: "8-16 weeks" },
    { id: "svc_uiux", slug: "ui-ux-design", title: "UI/UX Design", category: "Design", priceFrom: 45000, summary: "Premium product design systems, prototypes, and developer-ready interface specifications.", deliverables: ["Research", "Wireframes", "Design system", "Prototype", "Handoff"], timeline: "2-6 weeks" },
    { id: "svc_landing", slug: "landing-page-design", title: "Landing Page Design", category: "Growth", priceFrom: 30000, summary: "Cinematic landing pages with conversion-focused copy, responsive sections, and launch polish.", deliverables: ["Narrative", "Hero direction", "Responsive UI", "CTA analytics"], timeline: "1-3 weeks" },
    { id: "svc_portfolio", slug: "portfolio-website", title: "Portfolio Website", category: "Brand", priceFrom: 25000, summary: "Personal or studio portfolios with case studies, CMS-ready writing, and premium motion.", deliverables: ["Content map", "Portfolio layout", "Case study pages", "Deployment"], timeline: "1-4 weeks" },
    { id: "svc_business", slug: "business-website", title: "Business Website", category: "Brand", priceFrom: 40000, summary: "Professional websites for service brands, founders, venues, and high-trust companies.", deliverables: ["Pages", "Contact forms", "SEO basics", "Performance checks"], timeline: "2-5 weeks" },
    { id: "svc_automation", slug: "automation-systems", title: "Automation Systems", category: "AI", priceFrom: 55000, summary: "Internal automations for leads, documents, notifications, approvals, and reporting.", deliverables: ["Process map", "Automation build", "Admin logs", "Monitoring"], timeline: "2-7 weeks" },
    { id: "svc_api", slug: "api-development", title: "API Development", category: "Backend", priceFrom: 60000, summary: "Secure APIs for products, integrations, dashboards, mobile apps, and partner systems.", deliverables: ["API design", "Validation", "Auth", "Docs", "Testing"], timeline: "3-8 weeks" },
    { id: "svc_backend", slug: "backend-systems", title: "Backend Systems", category: "Backend", priceFrom: 95000, summary: "Data models, queues, jobs, services, audit logs, and admin-ready backend foundations.", deliverables: ["Schema", "Services", "Jobs", "Observability", "Docs"], timeline: "5-12 weeks" },
    { id: "svc_database", slug: "database-setup", title: "Database Setup", category: "Infrastructure", priceFrom: 35000, summary: "Production-minded schemas, indexes, access patterns, seed data, and migration strategy.", deliverables: ["Schema", "Migrations", "Security rules", "Backups"], timeline: "1-4 weeks" },
    { id: "svc_cloud", slug: "cloud-deployment", title: "Cloud Deployment", category: "Infrastructure", priceFrom: 30000, summary: "Deployment pipelines, environment setup, storage, domains, and release handover.", deliverables: ["Hosting", "Env setup", "Domain", "Monitoring", "Rollback notes"], timeline: "1-3 weeks" },
    { id: "svc_redesign", slug: "website-redesign", title: "Website Redesign", category: "Growth", priceFrom: 50000, summary: "Modernize tired sites with sharper UX, faster pages, better messaging, and premium visuals.", deliverables: ["Audit", "Redesign", "Migration", "QA", "Launch"], timeline: "3-8 weeks" },
    { id: "svc_seo", slug: "seo-setup", title: "SEO Setup", category: "Growth", priceFrom: 20000, summary: "Technical SEO, metadata, sitemap structure, content templates, and performance basics.", deliverables: ["Metadata", "Sitemap", "Schema", "Core Web Vitals"], timeline: "1-3 weeks" },
    { id: "svc_perf", slug: "performance-optimization", title: "Performance Optimization", category: "Engineering", priceFrom: 35000, summary: "Speed audits, bundle reduction, image strategy, rendering fixes, and UX responsiveness.", deliverables: ["Audit", "Fixes", "Benchmarks", "Report"], timeline: "1-4 weeks" },
    { id: "svc_maintenance", slug: "maintenance-support", title: "Maintenance & Support", category: "Support", priceFrom: 15000, summary: "Retainers for updates, monitoring, bug fixes, content edits, and monthly improvements.", deliverables: ["SLA", "Monthly fixes", "Reports", "Support desk"], timeline: "Monthly" }
  ],
  leads: [
    { id: "l_1", name: "Kavya Rao", email: "kavya@fleetzen.in", company: "FleetZen", serviceId: "svc_saas", budget: "₹3L-₹6L", status: "Proposal Sent", message: "We need a logistics customer portal with billing and milestone tracking." }
  ],
  proposals: [{ id: "pr_1", leadId: "l_1", title: "FleetZen Client Portal MVP", amount: 420000, status: "sent" }],
  projects: [
    { id: "proj_1", clientId: "u_client", title: "FleetZen Operations Portal", serviceId: "svc_saas", progress: 56, status: "active", team: ["u_mentor", "u_student"], budget: 420000 }
  ],
  milestones: [
    { id: "m_1", projectId: "proj_1", title: "Discovery and UX flows", dueDate: "2026-05-25", status: "completed" },
    { id: "m_2", projectId: "proj_1", title: "Dashboard MVP", dueDate: "2026-06-08", status: "active" },
    { id: "m_3", projectId: "proj_1", title: "QA and launch", dueDate: "2026-06-22", status: "pending" }
  ],
  blogs: [
    { id: "blog_1", slug: "project-based-internships", title: "Why project-based internships beat passive learning", excerpt: "A practical model for turning students into reliable builders.", content: "Project-based internships compress learning by making students ship, receive critique, and improve against real constraints. Our model pairs mentor oversight with agency-grade briefs so interns learn both craft and communication.", author: "Orbit Labs Team", publishedAt: "2026-05-10", category: "Internships" },
    { id: "blog_2", slug: "client-ready-mvp", title: "What makes an MVP client-ready?", excerpt: "The checks we use before a product leaves the studio.", content: "A client-ready MVP has clear flows, resilient states, analytics, documentation, and a handover path. Visual polish matters, but operational clarity is what keeps a launch alive.", author: "Maya Mentor", publishedAt: "2026-05-12", category: "Agency" }
  ],
  faqs: [
    { id: "faq_1", question: "Are internships paid or free?", answer: "Applications are free. Some cohorts may include a paid certificate or premium review option, with manual UPI and Razorpay placeholders." },
    { id: "faq_2", question: "Do interns work on client projects?", answer: "Selected interns contribute to scoped internal or client-style modules under mentor and admin review." },
    { id: "faq_3", question: "Can clients track delivery?", answer: "Yes. Clients get a dashboard for projects, milestones, invoices, files, messages, and testimonials." }
  ],
  testimonials: [
    { id: "ts_1", name: "Riya Sharma", role: "Full-stack Intern", quote: "The tasks felt like real product work. My portfolio finally has substance.", type: "student" },
    { id: "ts_2", name: "Dev Mehta", role: "SaaS Founder", quote: "They moved like a premium product studio and kept the build transparent.", type: "client" }
  ],
  announcements: [
    { id: "an_1", title: "June cohort opens", body: "New full-stack and AI automation batches start in June.", audience: "all", createdAt: "2026-05-20" }
  ],
  supportTickets: [
    { id: "tk_1", userId: "u_student", subject: "Certificate payment review", status: "pending", messages: [{ id: "msg_1", authorId: "u_student", body: "I uploaded my UPI proof yesterday.", createdAt: "2026-05-19" }] }
  ],
  resources: [
    { id: "r_1", title: "SaaS Dashboard QA Checklist", type: "template", url: "#" },
    { id: "r_2", title: "GitHub Submission Guide", type: "guide", url: "#" }
  ],
  activityLogs: [
    { id: "log_1", actor: "Aarav Superadmin", action: "Approved Riya's application", createdAt: "2026-05-15 10:30" },
    { id: "log_2", actor: "Maya Mentor", action: "Reviewed dashboard submission", createdAt: "2026-05-20 14:10" }
  ],
  invoices: [{ id: "inv_1", projectId: "proj_1", amount: 50000, status: "pending", dueDate: "2026-05-28" }],
  settings: [
    { key: "brandName", value: "Orbit Labs Academy" },
    { key: "upiId", value: "agency@upi" }
  ]
};
