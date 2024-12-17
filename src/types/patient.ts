import { z } from 'zod';

export const patientSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  birthDate: z.string(),
  phoneNumber: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres"),
});

export type Patient = z.infer<typeof patientSchema>;