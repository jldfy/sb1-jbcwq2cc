import { RenewalStatus } from '../types/renewal';

export function canTransitionToStatus(currentStatus: RenewalStatus, newStatus: RenewalStatus): boolean {
  // Can only transition to COLLECTED from PREPARED
  if (newStatus === RenewalStatus.COLLECTED) {
    return currentStatus === RenewalStatus.PREPARED;
  }

  // All other transitions are allowed
  return true;
}