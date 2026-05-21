export type Role = "super-admin" | "admin" | "mentor" | "student" | "client" | "guest";
export type Status = "draft" | "pending" | "approved" | "rejected" | "active" | "completed" | "revoked" | "paid" | "failed" | "review";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
};

export type Profile = {
  userId: string;
  phone: string;
  city: string;
  resume?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  bio: string;
};

export type Program = {
  id: string;
  slug: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  certificateFee: number;
  summary: string;
  syllabus: string[];
  roadmap: string[];
  benefits: string[];
  stack: string[];
};

export type Batch = {
  id: string;
  programId: string;
  name: string;
  mentorId: string;
  startDate: string;
  endDate: string;
  seats: number;
  active: boolean;
};

export type Application = {
  id: string;
  studentId: string;
  programId: string;
  status: Status;
  motivation: string;
  createdAt: string;
};

export type Enrollment = {
  id: string;
  studentId: string;
  programId: string;
  batchId: string;
  progress: number;
  status: Status;
};

export type Task = {
  id: string;
  programId: string;
  title: string;
  deadline: string;
  points: number;
  description: string;
};

export type Submission = {
  id: string;
  taskId: string;
  studentId: string;
  github: string;
  liveUrl: string;
  fileName?: string;
  status: Status;
  feedback: string;
  submittedAt: string;
};

export type Certificate = {
  id: string;
  certificateNo: string;
  studentId: string;
  programId: string;
  status: Status;
  issuedAt: string;
  verificationUrl: string;
};

export type Payment = {
  id: string;
  userId: string;
  purpose: string;
  amount: number;
  status: Status;
  proof?: string;
  createdAt: string;
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  category: string;
  priceFrom: number;
  summary: string;
  deliverables: string[];
  timeline: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  company: string;
  serviceId: string;
  budget: string;
  status: "New" | "Contacted" | "Proposal Sent" | "Won" | "Lost";
  message: string;
};

export type Proposal = {
  id: string;
  leadId: string;
  title: string;
  amount: number;
  status: "draft" | "sent" | "approved";
};

export type Project = {
  id: string;
  clientId: string;
  title: string;
  serviceId: string;
  progress: number;
  status: Status;
  team: string[];
  budget: number;
};

export type Milestone = {
  id: string;
  projectId: string;
  title: string;
  dueDate: string;
  status: Status;
};

export type Blog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  type: "student" | "client";
};

export type Announcement = {
  id: string;
  title: string;
  body: string;
  audience: Role | "all";
  createdAt: string;
};

export type SupportTicket = {
  id: string;
  userId: string;
  subject: string;
  status: Status;
  messages: { id: string; authorId: string; body: string; createdAt: string }[];
};

export type Resource = {
  id: string;
  title: string;
  type: "guide" | "video" | "template" | "repo";
  url: string;
};

export type ActivityLog = {
  id: string;
  actor: string;
  action: string;
  createdAt: string;
};

export type Invoice = {
  id: string;
  projectId: string;
  amount: number;
  status: Status;
  dueDate: string;
};

export type Setting = {
  key: string;
  value: string;
};

export type Database = {
  users: User[];
  profiles: Profile[];
  programs: Program[];
  batches: Batch[];
  applications: Application[];
  enrollments: Enrollment[];
  tasks: Task[];
  submissions: Submission[];
  certificates: Certificate[];
  payments: Payment[];
  services: Service[];
  leads: Lead[];
  proposals: Proposal[];
  projects: Project[];
  milestones: Milestone[];
  blogs: Blog[];
  faqs: Faq[];
  testimonials: Testimonial[];
  announcements: Announcement[];
  supportTickets: SupportTicket[];
  resources: Resource[];
  activityLogs: ActivityLog[];
  invoices: Invoice[];
  settings: Setting[];
};
