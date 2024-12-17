import { z } from 'zod';

export const prescriptionSchema = z.object({
  id: z.string(),
  uniqueNumber: z.string(),
  prescriptionId: z.string(),
  lgpiNumber: z.string().optional(),
  patientId: z.string(),
  patientName: z.string(),
  startDate: z.date(),
  duration: z.number().min(1),
  totalRenewals: z.number().min(1),
  createdAt: z.date(),
  assignedTo: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    avatar: z.string(),
    role: z.enum(['admin', 'user']),
  }),
});

export type Prescription = z.infer<typeof prescriptionSchema>;

export const renewalSchema = z.object({
  id: z.string(),
  prescriptionId: z.string(),
  renewalNumber: z.number(),
  dueDate: z.date(),
  status: z.enum(['new', 'in-progress', 'completed', 'pending']),
  assignedTo: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    avatar: z.string(),
    role: z.enum(['admin', 'user']),
  }),
});

export type Renewal = z.infer<typeof renewalSchema>;