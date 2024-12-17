import type { Renewal, Note } from '../types';
import { RenewalStatus } from '../types/renewal';
import { mockUsers } from './mockUsers';
import { mockPrescriptions } from './mockPrescriptions';
import { addDays } from '../utils/date';

function createNote(content: string, createdBy = mockUsers[0], date = new Date()): Note {
  return {
    id: crypto.randomUUID(),
    content,
    createdAt: date,
    createdBy,
  };
}

export const mockRenewals: Renewal[] = mockPrescriptions.flatMap(prescription => {
  const renewals: Renewal[] = [];
  
  for (let i = 1; i <= prescription.totalRenewals; i++) {
    let status: RenewalStatus;
    let notes: Note[] = [];
    
    // Determine status and notes based on prescription
    if (prescription.id === '1') {
      // First prescription: mix of statuses
      if (i === 1) {
        status = RenewalStatus.COLLECTED;
        notes = [
          createNote('Renouvellement effectué sans problème', mockUsers[0], addDays(new Date(), -30)),
          createNote('Patient satisfait du traitement', mockUsers[1], addDays(new Date(), -29)),
        ];
      } else if (i === 2) {
        status = RenewalStatus.PREPARED;
        notes = [
          createNote('Préparation terminée, en attente du patient', mockUsers[1], addDays(new Date(), -1)),
        ];
      } else if (i === 3) {
        status = RenewalStatus.IN_PROGRESS;
        notes = [
          createNote('Début de la préparation', mockUsers[2], new Date()),
        ];
      } else {
        status = RenewalStatus.UPCOMING;
      }
    } else if (prescription.id === '2') {
      // Second prescription: early stages
      if (i === 1) {
        status = RenewalStatus.TO_PREPARE;
        notes = [
          createNote('À préparer en priorité', mockUsers[1], new Date()),
        ];
      } else {
        status = RenewalStatus.UPCOMING;
      }
    } else if (prescription.id === '3') {
      // Third prescription: mix of statuses
      if (i === 1) {
        status = RenewalStatus.IN_PROGRESS;
        notes = [
          createNote('Préparation en cours', mockUsers[2], new Date()),
          createNote('Vérification des dosages requise', mockUsers[0], addDays(new Date(), -1)),
        ];
      } else if (i === 2) {
        status = RenewalStatus.TO_PREPARE;
      } else {
        status = RenewalStatus.UPCOMING;
      }
    } else if (prescription.id === '4' || prescription.id === '5') {
      // Completed prescriptions: all renewals collected
      status = RenewalStatus.COLLECTED;
      const completionDate = addDays(new Date(), -((prescription.totalRenewals - i + 1) * prescription.duration));
      notes = [
        createNote(
          'Renouvellement récupéré par le patient',
          mockUsers[0],
          completionDate
        ),
        createNote(
          'Traitement bien toléré',
          mockUsers[1],
          addDays(completionDate, 1)
        ),
      ];
    } else {
      status = RenewalStatus.UPCOMING;
    }

    renewals.push({
      id: crypto.randomUUID(),
      prescriptionId: prescription.id,
      renewalNumber: i,
      dueDate: addDays(prescription.startDate, (i - 1) * prescription.duration),
      status,
      assignedTo: prescription.assignedTo,
      notes,
    });
  }

  return renewals;
});