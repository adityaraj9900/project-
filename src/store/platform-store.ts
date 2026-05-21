"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { seed } from "@/lib/data";
import { today, uid } from "@/lib/utils";
import type { Application, Database, Lead, Payment, Role, Submission, SupportTicket, User } from "@/types";

type Toast = { id: string; type: "success" | "error" | "info"; message: string };

type PlatformStore = {
  db: Database;
  currentUser: User | null;
  theme: "dark" | "light";
  toasts: Toast[];
  login: (email: string) => boolean;
  signup: (user: Pick<User, "name" | "email" | "role">) => void;
  logout: () => void;
  toggleTheme: () => void;
  toast: (message: string, type?: Toast["type"]) => void;
  dismissToast: (id: string) => void;
  applyProgram: (payload: { name: string; email: string; programId: string; motivation: string }) => void;
  setApplicationStatus: (id: string, status: Application["status"]) => void;
  submitTask: (payload: Pick<Submission, "taskId" | "github" | "liveUrl" | "fileName">) => void;
  reviewSubmission: (id: string, status: Submission["status"], feedback: string) => void;
  uploadPayment: (payload: Pick<Payment, "purpose" | "amount" | "proof">) => void;
  setPaymentStatus: (id: string, status: Payment["status"]) => void;
  createLead: (payload: Omit<Lead, "id" | "status">) => void;
  setLeadStatus: (id: string, status: Lead["status"]) => void;
  createTicket: (subject: string, body: string) => void;
  updateAnyRecord: (collection: keyof Database, id: string, patch: Record<string, unknown>) => void;
};

const roleHome: Record<Role, string> = {
  "super-admin": "/admin",
  admin: "/admin",
  mentor: "/mentor",
  student: "/student",
  client: "/client",
  guest: "/"
};

export const getRoleHome = (role: Role) => roleHome[role] ?? "/";

export const usePlatformStore = create<PlatformStore>()(
  persist(
    (set, get) => ({
      db: seed,
      currentUser: null,
      theme: "dark",
      toasts: [],
      login: (email) => {
        const user = get().db.users.find((item) => item.email.toLowerCase() === email.toLowerCase());
        if (!user) {
          get().toast("No account found for that email.", "error");
          return false;
        }
        set({ currentUser: user });
        get().toast(`Welcome back, ${user.name}.`, "success");
        return true;
      },
      signup: (user) => {
        const created: User = { id: uid("u"), ...user };
        set((state) => ({ db: { ...state.db, users: [...state.db.users, created] }, currentUser: created }));
        get().toast("Account created. Profile setup is ready inside your dashboard.", "success");
      },
      logout: () => {
        set({ currentUser: null });
        get().toast("Signed out securely.", "info");
      },
      toggleTheme: () => set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
      toast: (message, type = "info") => set((state) => ({ toasts: [...state.toasts, { id: uid("toast"), type, message }] })),
      dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
      applyProgram: (payload) => {
        let user = get().db.users.find((item) => item.email.toLowerCase() === payload.email.toLowerCase());
        const updates: Partial<Database> = {};
        if (!user) {
          user = { id: uid("u"), name: payload.name, email: payload.email, role: "student" };
          updates.users = [...get().db.users, user];
        }
        const application: Application = {
          id: uid("app"),
          studentId: user.id,
          programId: payload.programId,
          status: "pending",
          motivation: payload.motivation,
          createdAt: today()
        };
        set((state) => ({ db: { ...state.db, ...updates, applications: [...state.db.applications, application] }, currentUser: user }));
        get().toast("Application submitted and visible to admin.", "success");
      },
      setApplicationStatus: (id, status) => {
        set((state) => ({ db: { ...state.db, applications: state.db.applications.map((item) => (item.id === id ? { ...item, status } : item)) } }));
        get().toast(`Application marked ${status}.`, "success");
      },
      submitTask: (payload) => {
        const user = get().currentUser;
        if (!user) return get().toast("Please login before submitting work.", "error");
        const submission: Submission = {
          id: uid("sub"),
          studentId: user.id,
          status: "review",
          feedback: "Awaiting mentor review.",
          submittedAt: today(),
          ...payload
        };
        set((state) => ({ db: { ...state.db, submissions: [...state.db.submissions, submission] } }));
        get().toast("Submission sent to mentor review.", "success");
      },
      reviewSubmission: (id, status, feedback) => {
        set((state) => ({ db: { ...state.db, submissions: state.db.submissions.map((item) => (item.id === id ? { ...item, status, feedback } : item)) } }));
        get().toast("Feedback saved.", "success");
      },
      uploadPayment: (payload) => {
        const user = get().currentUser;
        if (!user) return get().toast("Please login before uploading payment proof.", "error");
        const payment: Payment = { id: uid("pay"), userId: user.id, status: "pending", createdAt: today(), ...payload };
        set((state) => ({ db: { ...state.db, payments: [...state.db.payments, payment] } }));
        get().toast("Payment proof uploaded for admin approval.", "success");
      },
      setPaymentStatus: (id, status) => {
        set((state) => ({ db: { ...state.db, payments: state.db.payments.map((item) => (item.id === id ? { ...item, status } : item)) } }));
        get().toast(`Payment marked ${status}.`, "success");
      },
      createLead: (payload) => {
        set((state) => ({ db: { ...state.db, leads: [...state.db.leads, { id: uid("lead"), status: "New", ...payload }] } }));
        get().toast("Inquiry received. It is now in the admin lead pipeline.", "success");
      },
      setLeadStatus: (id, status) => {
        set((state) => ({ db: { ...state.db, leads: state.db.leads.map((item) => (item.id === id ? { ...item, status } : item)) } }));
        get().toast(`Lead moved to ${status}.`, "success");
      },
      createTicket: (subject, body) => {
        const user = get().currentUser;
        if (!user) return get().toast("Login required to create a ticket.", "error");
        const ticket: SupportTicket = { id: uid("ticket"), userId: user.id, subject, status: "pending", messages: [{ id: uid("msg"), authorId: user.id, body, createdAt: today() }] };
        set((state) => ({ db: { ...state.db, supportTickets: [...state.db.supportTickets, ticket] } }));
        get().toast("Support ticket created.", "success");
      },
      updateAnyRecord: (collection, id, patch) => {
        set((state) => {
          const list = state.db[collection] as Array<Record<string, unknown>>;
          return { db: { ...state.db, [collection]: list.map((item) => (item.id === id || item.key === id ? { ...item, ...patch } : item)) } };
        });
        get().toast("Record updated.", "success");
      }
    }),
    { name: "orbit-platform-store", partialize: (state) => ({ db: state.db, currentUser: state.currentUser, theme: state.theme }) }
  )
);
