import { RenewalStatus } from '../types/renewal';

export function getStatusChangeAnimation(oldStatus: RenewalStatus, newStatus: RenewalStatus): string {
  const statusOrder = Object.values(RenewalStatus);
  const oldIndex = statusOrder.indexOf(oldStatus);
  const newIndex = statusOrder.indexOf(newStatus);
  
  // Moving forward in the process
  if (newIndex > oldIndex) {
    return 'status-progress';
  }
  
  // Moving backward in the process
  if (newIndex < oldIndex) {
    return 'status-regress';
  }
  
  return '';
}