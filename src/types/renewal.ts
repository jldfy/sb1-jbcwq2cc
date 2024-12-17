import { z } from 'zod';

export enum RenewalStatus {
  UPCOMING = 'upcoming',
  TO_PREPARE = 'to_prepare',
  IN_PROGRESS = 'in_progress',
  PREPARED = 'prepared',
  COLLECTED = 'collected',
}

export const renewalSchema = z.object({
  id: z.string(),
  prescriptionId: z.string(),
  renewalNumber: z.number().min(1),
  dueDate: z.date(),
  status: z.nativeEnum(RenewalStatus),
  assignedTo: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    avatar: z.string(),
  }),
  notes: z.array(z.object({
    id: z.string(),
    content: z.string(),
    createdAt: z.date(),
    createdBy: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      avatar: z.string(),
    }),
  })),
});

export type Renewal = z.infer<typeof renewalSchema>;