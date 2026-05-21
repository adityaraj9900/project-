"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { applicationSchema, leadSchema, loginSchema, paymentSchema, signupSchema, submissionSchema, ticketSchema } from "@/lib/schemas";
import { Button, Field, inputClass } from "@/components/ui/primitives";
import { getRoleHome, usePlatformStore } from "@/store/platform-store";

export function LoginForm() {
  const router = useRouter();
  const { login, db } = usePlatformStore();
  const form = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema), defaultValues: { email: "student@orbitlabs.dev", password: "password" } });
  const submit = form.handleSubmit((values) => {
    if (login(values.email)) {
      const user = db.users.find((item) => item.email === values.email);
      router.push(getRoleHome(user?.role ?? "student"));
    }
  });
  return (
    <form onSubmit={submit} className="grid gap-4">
      <Field label="Email" error={form.formState.errors.email?.message}><input className={inputClass} {...form.register("email")} /></Field>
      <Field label="Password" error={form.formState.errors.password?.message}><input className={inputClass} type="password" {...form.register("password")} /></Field>
      <Button type="submit">Login</Button>
      <div className="rounded-2xl bg-white/8 p-4 text-sm text-white/60">Demo: admin@orbitlabs.dev, mentor@orbitlabs.dev, student@orbitlabs.dev, client@orbitlabs.dev. Password can be any 6+ chars.</div>
    </form>
  );
}

export function SignupForm() {
  const router = useRouter();
  const signup = usePlatformStore((state) => state.signup);
  const form = useForm<z.infer<typeof signupSchema>>({ resolver: zodResolver(signupSchema), defaultValues: { role: "student" } });
  const submit = form.handleSubmit((values) => {
    signup({ name: values.name, email: values.email, role: values.role });
    router.push(getRoleHome(values.role));
  });
  return (
    <form onSubmit={submit} className="grid gap-4">
      <Field label="Name" error={form.formState.errors.name?.message}><input className={inputClass} {...form.register("name")} /></Field>
      <Field label="Email" error={form.formState.errors.email?.message}><input className={inputClass} {...form.register("email")} /></Field>
      <Field label="Role" error={form.formState.errors.role?.message}>
        <select className={inputClass} {...form.register("role")}><option value="student">Student</option><option value="client">Client</option><option value="mentor">Mentor</option></select>
      </Field>
      <Field label="Password" error={form.formState.errors.password?.message}><input className={inputClass} type="password" {...form.register("password")} /></Field>
      <Button type="submit">Create account</Button>
    </form>
  );
}

export function ApplicationForm() {
  const programs = usePlatformStore((state) => state.db.programs);
  const applyProgram = usePlatformStore((state) => state.applyProgram);
  const form = useForm<z.infer<typeof applicationSchema>>({ resolver: zodResolver(applicationSchema), defaultValues: { programId: programs[0]?.id } });
  const submit = form.handleSubmit((values) => {
    applyProgram(values);
    form.reset({ programId: programs[0]?.id, name: "", email: "", motivation: "" });
  });
  return (
    <form onSubmit={submit} className="grid gap-4">
      <Field label="Full name" error={form.formState.errors.name?.message}><input className={inputClass} {...form.register("name")} /></Field>
      <Field label="Email" error={form.formState.errors.email?.message}><input className={inputClass} {...form.register("email")} /></Field>
      <Field label="Program" error={form.formState.errors.programId?.message}><select className={inputClass} {...form.register("programId")}>{programs.map((program) => <option key={program.id} value={program.id}>{program.title}</option>)}</select></Field>
      <Field label="Why should we select you?" error={form.formState.errors.motivation?.message}><textarea className={inputClass} rows={5} {...form.register("motivation")} /></Field>
      <Button type="submit">Submit application</Button>
    </form>
  );
}

export function LeadForm() {
  const services = usePlatformStore((state) => state.db.services);
  const createLead = usePlatformStore((state) => state.createLead);
  const form = useForm<z.infer<typeof leadSchema>>({ resolver: zodResolver(leadSchema), defaultValues: { serviceId: services[0]?.id, budget: "₹1L-₹3L" } });
  const submit = form.handleSubmit((values) => {
    createLead(values);
    form.reset({ serviceId: services[0]?.id, budget: "₹1L-₹3L", name: "", email: "", company: "", message: "" });
  });
  return (
    <form onSubmit={submit} className="grid gap-4">
      <Field label="Name" error={form.formState.errors.name?.message}><input className={inputClass} {...form.register("name")} /></Field>
      <Field label="Email" error={form.formState.errors.email?.message}><input className={inputClass} {...form.register("email")} /></Field>
      <Field label="Company" error={form.formState.errors.company?.message}><input className={inputClass} {...form.register("company")} /></Field>
      <Field label="Service" error={form.formState.errors.serviceId?.message}><select className={inputClass} {...form.register("serviceId")}>{services.map((service) => <option key={service.id} value={service.id}>{service.title}</option>)}</select></Field>
      <Field label="Budget" error={form.formState.errors.budget?.message}><select className={inputClass} {...form.register("budget")}><option>₹50K-₹1L</option><option>₹1L-₹3L</option><option>₹3L-₹6L</option><option>₹6L+</option></select></Field>
      <Field label="Project brief" error={form.formState.errors.message?.message}><textarea rows={5} className={inputClass} {...form.register("message")} /></Field>
      <Button type="submit">Send inquiry</Button>
    </form>
  );
}

export function SubmissionForm() {
  const tasks = usePlatformStore((state) => state.db.tasks);
  const submitTask = usePlatformStore((state) => state.submitTask);
  const form = useForm<z.infer<typeof submissionSchema>>({ resolver: zodResolver(submissionSchema), defaultValues: { taskId: tasks[0]?.id } });
  const submit = form.handleSubmit((values) => {
    submitTask(values);
    form.reset({ taskId: tasks[0]?.id, github: "", liveUrl: "", fileName: "" });
  });
  return (
    <form onSubmit={submit} className="grid gap-4">
      <Field label="Task" error={form.formState.errors.taskId?.message}><select className={inputClass} {...form.register("taskId")}>{tasks.map((task) => <option key={task.id} value={task.id}>{task.title}</option>)}</select></Field>
      <Field label="GitHub URL" error={form.formState.errors.github?.message}><input className={inputClass} {...form.register("github")} /></Field>
      <Field label="Live project URL" error={form.formState.errors.liveUrl?.message}><input className={inputClass} {...form.register("liveUrl")} /></Field>
      <Field label="File upload placeholder" error={form.formState.errors.fileName?.message}><input className={inputClass} placeholder="submission.pdf" {...form.register("fileName")} /></Field>
      <Button type="submit">Submit work</Button>
    </form>
  );
}

export function PaymentForm() {
  const uploadPayment = usePlatformStore((state) => state.uploadPayment);
  const form = useForm<z.infer<typeof paymentSchema>>({ resolver: zodResolver(paymentSchema), defaultValues: { purpose: "Certificate fee", amount: 1499 } });
  const submit = form.handleSubmit((values) => {
    uploadPayment(values);
    form.reset({ purpose: "Certificate fee", amount: 1499, proof: "" });
  });
  return (
    <form onSubmit={submit} className="grid gap-4">
      <Field label="Purpose" error={form.formState.errors.purpose?.message}><input className={inputClass} {...form.register("purpose")} /></Field>
      <Field label="Amount" error={form.formState.errors.amount?.message}><input className={inputClass} type="number" {...form.register("amount", { valueAsNumber: true })} /></Field>
      <Field label="UPI/Razorpay proof placeholder" error={form.formState.errors.proof?.message}><input className={inputClass} placeholder="upi-proof.png" {...form.register("proof")} /></Field>
      <div className="rounded-2xl border border-dashed border-aurora/35 p-5 text-sm text-white/60">UPI QR placeholder: agency@upi. Razorpay key comes from env when connected.</div>
      <Button type="submit">Upload payment proof</Button>
    </form>
  );
}

export function TicketForm() {
  const createTicket = usePlatformStore((state) => state.createTicket);
  const form = useForm<z.infer<typeof ticketSchema>>({ resolver: zodResolver(ticketSchema) });
  const submit = form.handleSubmit((values) => {
    createTicket(values.subject, values.body);
    form.reset({ subject: "", body: "" });
  });
  return (
    <form onSubmit={submit} className="grid gap-4">
      <Field label="Subject" error={form.formState.errors.subject?.message}><input className={inputClass} {...form.register("subject")} /></Field>
      <Field label="Message" error={form.formState.errors.body?.message}><textarea rows={4} className={inputClass} {...form.register("body")} /></Field>
      <Button type="submit">Create support ticket</Button>
    </form>
  );
}
