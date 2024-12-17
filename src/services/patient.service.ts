import type { Patient } from '../types/patient';
import { mockPatients } from '../data/mockPatients';

export async function getPatients(): Promise<Patient[]> {
  // TODO: Replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockPatients;
}

export async function getPatient(id: string): Promise<Patient | undefined> {
  // TODO: Replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockPatients.find(p => p.id === id);
}

export async function createPatient(patient: Omit<Patient, 'id'>): Promise<Patient> {
  // TODO: Replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const newPatient = {
    ...patient,
    id: crypto.randomUUID(),
  };
  return newPatient;
}

export async function updatePatient(id: string, patient: Omit<Patient, 'id'>): Promise<Patient> {
  // TODO: Replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    ...patient,
    id,
  };
}

export async function deletePatient(id: string): Promise<void> {
  // TODO: Replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 500));
}