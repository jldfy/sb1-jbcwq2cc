import React from 'react';
import { RenewalStatus } from '../../types/renewal';
import { StatusButton } from './StatusButton';

interface StatusActionsProps {
  currentStatus: RenewalStatus;
  onStatusChange: (status: RenewalStatus) => void;
  showText?: boolean;
  className?: string;
}

export function StatusActions({ 
  currentStatus, 
  onStatusChange,
  showText = false,
  className = '' 
}: StatusActionsProps) {
  const getAvailableStatuses = (status: RenewalStatus): RenewalStatus[] => {
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
  };

  const availableStatuses = getAvailableStatuses(currentStatus);

  if (availableStatuses.length === 0) return null;

  return (
    <div className={`flex ${showText ? 'flex-col' : 'justify-end'} gap-2 ${className}`}>
      {availableStatuses.map((status) => (
        <StatusButton
          key={status}
          targetStatus={status}
          onClick={() => onStatusChange(status)}
          showText={showText}
        />
      ))}
    </div>
  );
}