import React from 'react';
import { useTranslation } from 'react-i18next';
import { RenewalStatus } from '../../types/renewal';
import { statusIcons } from '../../utils/statusIcons';
import { StatusActions } from '../common/StatusActions';
import { getAvailableStatuses } from '../../utils/statusTransitions';

interface StatusSectionProps {
  currentStatus: RenewalStatus;
  onStatusChange: (status: RenewalStatus) => void;
}

export function StatusSection({ currentStatus, onStatusChange }: StatusSectionProps) {
  const { t } = useTranslation();
  const StatusIcon = statusIcons[currentStatus];
  const availableStatuses = getAvailableStatuses(currentStatus);

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StatusIcon 
            className={`h-5 w-5 text-indigo-600 ${currentStatus === RenewalStatus.IN_PROGRESS ? 'transform -rotate-45' : ''}`} 
          />
          <span className="font-medium text-gray-900">
            {t(`status.${currentStatus}`)}
          </span>
        </div>

        {availableStatuses.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Changer pour :</span>
            <div className="flex gap-2">
              <StatusActions
                currentStatus={currentStatus}
                onStatusChange={onStatusChange}
                showText={true}
                className="flex-row"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}