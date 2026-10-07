import { z } from "zod";

export const leadFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  title: z.string().min(2, "Title is required"),
  value: z.number().min(0, "Value cannot be negative"),
  score: z.number().min(0).max(100).default(80),
  notes: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export const customerFormSchema = z.object({
  name: z.string().min(2, "Customer name is required"),
  company: z.string().min(2, "Company is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  arr: z.number().min(0, "ARR cannot be negative"),
  healthCategory: z.enum(["Healthy", "Monitor", "At Risk", "Critical"]).default("Healthy"),
  nextBestAction: z.string().min(5, "Next best action is required"),
});

export type CustomerFormData = z.infer<typeof customerFormSchema>;

export const dealFormSchema = z.object({
  title: z.string().min(3, "Deal title is required"),
  company: z.string().min(2, "Company name is required"),
  customerName: z.string().min(2, "Contact person is required"),
  amount: z.number().min(1000, "Amount must be at least ₹1,000"),
  stage: z.enum(["DISCOVERY", "PROPOSAL", "NEGOTIATION", "CLOSED WON", "CLOSED LOST"]),
  risk: z.enum(["LOW", "MEDIUM", "HIGH"]).default("LOW"),
  closeDate: z.string().min(1, "Close date required"),
  probability: z.number().min(0).max(100).default(50),
});

export type DealFormData = z.infer<typeof dealFormSchema>;

export const emailComposerSchema = z.object({
  to: z.string().email("Valid recipient email required"),
  cc: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message cannot be empty"),
});

export type EmailComposerData = z.infer<typeof emailComposerSchema>;

export const aiAgentTaskSchema = z.object({
  prompt: z.string().min(10, "Please describe the task with at least 10 characters"),
});

export type AIAgentTaskData = z.infer<typeof aiAgentTaskSchema>;
