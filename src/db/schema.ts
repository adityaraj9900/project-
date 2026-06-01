import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

/* ─── Users ──────────────────────────────────────────── */
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role", { enum: ["super-admin", "mentor", "student", "client"] }).notNull().default("student"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

/* ─── Profiles ───────────────────────────────────────── */
export const profiles = sqliteTable("profiles", {
  userId: text("user_id").primaryKey().references(() => users.id),
  phone: text("phone"),
  city: text("city"),
  github: text("github"),
  linkedin: text("linkedin"),
  portfolio: text("portfolio"),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
});

/* ─── Programs ───────────────────────────────────────── */
export const programs = sqliteTable("programs", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  level: text("level").notNull(),
  duration: text("duration").notNull(),
  summary: text("summary").notNull(),
  syllabus: text("syllabus", { mode: "json" }).$type<string[]>().notNull(),
  stack: text("stack", { mode: "json" }).$type<string[]>().notNull(),
  benefits: text("benefits", { mode: "json" }).$type<string[]>().notNull(),
  roadmap: text("roadmap", { mode: "json" }).$type<string[]>(),
});

/* ─── Applications ───────────────────────────────────── */
export const applications = sqliteTable("applications", {
  id: text("id").primaryKey(),
  studentId: text("student_id").notNull().references(() => users.id),
  programId: text("program_id").notNull().references(() => programs.id),
  status: text("status", { enum: ["pending", "approved", "rejected"] }).notNull().default("pending"),
  motivation: text("motivation"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

/* ─── Enrollments ────────────────────────────────────── */
export const enrollments = sqliteTable("enrollments", {
  id: text("id").primaryKey(),
  studentId: text("student_id").notNull().references(() => users.id),
  programId: text("program_id").notNull().references(() => programs.id),
  batchId: text("batch_id"),
  progress: integer("progress").notNull().default(0),
  status: text("status", { enum: ["active", "completed", "paused"] }).notNull().default("active"),
  startDate: text("start_date"),
  endDate: text("end_date"),
});

/* ─── Tasks ──────────────────────────────────────────── */
export const tasks = sqliteTable("tasks", {
  id: text("id").primaryKey(),
  programId: text("program_id").notNull().references(() => programs.id),
  title: text("title").notNull(),
  description: text("description"),
  deadline: text("deadline"),
  points: integer("points").notNull().default(100),
});

/* ─── Submissions ────────────────────────────────────── */
export const submissions = sqliteTable("submissions", {
  id: text("id").primaryKey(),
  taskId: text("task_id").notNull().references(() => tasks.id),
  studentId: text("student_id").notNull().references(() => users.id),
  githubUrl: text("github_url"),
  liveUrl: text("live_url"),
  fileUrl: text("file_url"),
  status: text("status", { enum: ["pending", "submitted", "review", "approved", "revision_needed"] }).notNull().default("submitted"),
  feedback: text("feedback"),
  pointsEarned: integer("points_earned"),
  submittedAt: text("submitted_at").notNull().default(sql`(datetime('now'))`),
});

/* ─── Certificates ───────────────────────────────────── */
export const certificates = sqliteTable("certificates", {
  id: text("id").primaryKey(),
  certificateNo: text("certificate_no").notNull().unique(),
  studentId: text("student_id").notNull().references(() => users.id),
  programId: text("program_id").notNull().references(() => programs.id),
  status: text("status", { enum: ["pending", "approved", "revoked"] }).notNull().default("pending"),
  issuedAt: text("issued_at"),
  pdfUrl: text("pdf_url"),
});

/* ─── Offer Letters ──────────────────────────────────── */
export const offerLetters = sqliteTable("offer_letters", {
  id: text("id").primaryKey(),
  studentId: text("student_id").notNull().references(() => users.id),
  programId: text("program_id").notNull().references(() => programs.id),
  issuedAt: text("issued_at").notNull().default(sql`(datetime('now'))`),
  content: text("content"),
  pdfUrl: text("pdf_url"),
  mentorName: text("mentor_name"),
  adminName: text("admin_name"),
  startDate: text("start_date"),
  duration: text("duration"),
});

/* ─── LORs ───────────────────────────────────────────── */
export const lors = sqliteTable("lors", {
  id: text("id").primaryKey(),
  studentId: text("student_id").notNull().references(() => users.id),
  programId: text("program_id").notNull().references(() => programs.id),
  mentorId: text("mentor_id").references(() => users.id),
  issuedAt: text("issued_at").notNull().default(sql`(datetime('now'))`),
  content: text("content"),
  pdfUrl: text("pdf_url"),
});

/* ─── Leads ──────────────────────────────────────────── */
export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  serviceId: text("service_id"),
  budget: text("budget"),
  status: text("status", { enum: ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"] }).notNull().default("New"),
  message: text("message"),
  notes: text("notes"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

/* ─── Projects ───────────────────────────────────────── */
export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  clientId: text("client_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  serviceId: text("service_id"),
  progress: integer("progress").notNull().default(0),
  status: text("status", { enum: ["Planning", "In Progress", "Review", "Delivered"] }).notNull().default("Planning"),
  budget: real("budget"),
  team: text("team", { mode: "json" }).$type<string[]>(),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

/* ─── Milestones ─────────────────────────────────────── */
export const milestones = sqliteTable("milestones", {
  id: text("id").primaryKey(),
  projectId: text("project_id").notNull().references(() => projects.id),
  title: text("title").notNull(),
  dueDate: text("due_date"),
  status: text("status", { enum: ["pending", "completed", "approved"] }).notNull().default("pending"),
  amount: real("amount"),
});

/* ─── Payments (clients only) ────────────────────────── */
export const payments = sqliteTable("payments", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  purpose: text("purpose"),
  amount: real("amount").notNull(),
  status: text("status", { enum: ["pending", "approved", "rejected"] }).notNull().default("pending"),
  proof: text("proof"),
  razorpayOrderId: text("razorpay_order_id"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

/* ─── Blogs ──────────────────────────────────────────── */
export const blogs = sqliteTable("blogs", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  author: text("author"),
  category: text("category"),
  coverUrl: text("cover_url"),
  published: integer("published", { mode: "boolean" }).notNull().default(false),
  publishedAt: text("published_at"),
});

/* ─── Announcements ──────────────────────────────────── */
export const announcements = sqliteTable("announcements", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  audience: text("audience", { enum: ["all", "students", "clients", "mentors"] }).notNull().default("all"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

/* ─── Resources ──────────────────────────────────────── */
export const resources = sqliteTable("resources", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type", { enum: ["link", "pdf", "video", "guide"] }).notNull(),
  url: text("url").notNull(),
  programId: text("program_id").references(() => programs.id),
});

/* ─── Messages ───────────────────────────────────────── */
export const messages = sqliteTable("messages", {
  id: text("id").primaryKey(),
  fromId: text("from_id").notNull().references(() => users.id),
  toId: text("to_id"),
  projectId: text("project_id").references(() => projects.id),
  body: text("body").notNull(),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

/* ─── Services ───────────────────────────────────────── */
export const services = sqliteTable("services", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  priceFrom: real("price_from"),
  summary: text("summary"),
  deliverables: text("deliverables", { mode: "json" }).$type<string[]>(),
  timeline: text("timeline"),
  description: text("description"),
});

/* ─── Testimonials ───────────────────────────────────── */
export const testimonials = sqliteTable("testimonials", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role"),
  quote: text("quote").notNull(),
  type: text("type", { enum: ["client", "intern"] }),
  avatarUrl: text("avatar_url"),
});

/* ─── FAQs ───────────────────────────────────────────── */
export const faqs = sqliteTable("faqs", {
  id: text("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  order: integer("order").notNull().default(0),
});

/* ─── Settings ───────────────────────────────────────── */
export const settings = sqliteTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

/* ─── Team ───────────────────────────────────────────── */
export const team = sqliteTable("team", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  linkedin: text("linkedin"),
  github: text("github"),
  order: integer("order").notNull().default(0),
});
