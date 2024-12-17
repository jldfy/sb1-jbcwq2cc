import { RenewalStatus } from '../types/renewal';

export function getAvailableStatuses(status: RenewalStatus): RenewalStatus[] {
  switch (status) {
    case RenewalStatus.UPCOMING:
      return [
        RenewalStatus.TO_PREPARE,
        RenewalStatus.IN_PROGRESS,
        RenewalStatus.PREPARED,
      ];
    case RenewalStatus.TO_PREPARE:
      return [RenewalStatus.IN_PROGRESS, RenewalStatus.PREPARED];
    case RenewalStatus.IN_PROGRESS:
      return [RenewalStatus.PREPARED];
    case RenewalStatus.PREPARED:
      return [RenewalStatus.COLLECTED];
    default:
      return [];
  }
}

export function canTransitionToStatus(currentStatus: RenewalStatus, newStatus: RenewalStatus): boolean {
  const availableStatuses = getAvailableStatuses(currentStatus);
  return availableStatuses.includes(newStatus);
}