import React from 'react';
import { statusIcons } from '../../utils/statusIcons';
import type { Renewal, Prescription } from '../../types';

interface RenewalEventProps {
  renewal: Renewal;
  prescription: Prescription;
  onClick: (renewal: Renewal) => void;
}

export function RenewalEvent({ renewal, prescription, onClick }: RenewalEventProps) {
  const StatusIcon = statusIcons[renewal.status];

  return (
    <div 
      onClick={() => onClick(renewal)}
      className="group relative bg-white rounded-sm shadow-sm border border-gray-200 p-1.5 hover:shadow-md transition-shadow cursor-pointer text-xs"
    >
      <div className="flex items-center gap-1.5">
        <StatusIcon 
          className={`h-3.5 w-3.5 text-indigo-600 flex-shrink-0 ${renewal.status === 'in_progress' ? 'transform -rotate-45' : ''}`} 
        />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate">
            {prescription.patientName}
          </p>
        </div>
      </div>
    </div>
  );
}