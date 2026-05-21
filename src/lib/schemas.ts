import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(["student", "client", "mentor"]),
  password: z.string().min(6)
});

export const applicationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  programId: z.string().min(1),
  motivation: z.string().min(20)
});

export const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  serviceId: z.string().min(1),
  budget: z.string().min(1),
  message: z.string().min(20)
});

export const submissionSchema = z.object({
  taskId: z.string().min(1),
  github: z.string().url(),
  liveUrl: z.string().url(),
  fileName: z.string().optional()
});

export const paymentSchema = z.object({
  purpose: z.string().min(2),
  amount: z.number().min(0),
  proof: z.string().min(3)
});

export const ticketSchema = z.object({
  subject: z.string().min(4),
  body: z.string().min(10)
});
