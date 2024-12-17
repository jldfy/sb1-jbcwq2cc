import React from 'react';
import { RenewalStatus } from '../../types/renewal';
import { StatusButton } from './StatusButton';
import { getAvailableStatuses } from '../../utils/statusTransitions';

interface StatusActionsProps {
  currentStatus: RenewalStatus;
  onStatusChange: (status: RenewalStatus) => void;
  showText?: boolean;
  className?: string;
  variant?: 'default' | 'compact';
}

export function StatusActions({ 
  currentStatus, 
  onStatusChange,
  showText = false,
  className = '',
  variant = 'default',
}: StatusActionsProps) {
  const availableStatuses = getAvailableStatuses(currentStatus);

  if (availableStatuses.length === 0) return null;

  return (
    <div className={`flex gap-2 ${className}`}>
      {availableStatuses.map((status) => (
        <StatusButton
          key={status}
          targetStatus={status}
          onClick={() => onStatusChange(status)}
          showText={showText}
          variant={variant}
        />
      ))}
    </div>
  );
}