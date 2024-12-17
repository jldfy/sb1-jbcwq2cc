import type { Prescription, Renewal } from '../types';
import { RenewalStatus } from '../types/renewal';
import { mockPrescriptions, mockRenewals } from '../data/mockData';

export async function getPrescriptions(): Promise<Prescription[]> {
  // TODO: Replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockPrescriptions;
}

export async function getRenewals(): Promise<Renewal[]> {
  // TODO: Replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockRenewals;
}

export async function updateRenewalStatus(
  renewalId: string,
  status: RenewalStatus
): Promise<Renewal> {
  // TODO: Replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const renewal = mockRenewals.find(r => r.id === renewalId);
  if (!renewal) {
    throw new Error('Renewal not found');
  }
  return {
    ...renewal,
    status,
  };
}

export async function addRenewalNote(
  renewalId: string,
  content: string,
  userId: string
): Promise<Renewal> {
  // TODO: Replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const renewal = mockRenewals.find(r => r.id === renewalId);
  if (!renewal) {
    throw new Error('Renewal not found');
  }
  
  const user = mockRenewals[0].assignedTo; // Mock user for now
  const newNote = {
    id: crypto.randomUUID(),
    content,
    createdAt: new Date(),
    createdBy: user,
  };
  
  return {
    ...renewal,
    notes: [...renewal.notes, newNote],
  };
}