import React from 'react';
import { Calendar } from 'lucide-react';
import { statusIcons } from '../../../utils/statusIcons';
import { formatTime } from '../../../utils/date';
import type { Renewal } from '../../../types';
import { usePrescriptions } from '../../../context/PrescriptionContext';

interface RenewalEventProps {
  renewal: Renewal;
  onClick: () => void;
}

export function RenewalEvent({ renewal, onClick }: RenewalEventProps) {
  const { prescriptions } = usePrescriptions();
  const prescription = prescriptions.find(p => p.id === renewal.prescriptionId);
  const StatusIcon = statusIcons[renewal.status];

  if (!prescription) return null;

  return (
    <div 
      onClick={onClick}
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
          <div className="flex items-center gap-1 text-gray-500">
            <Calendar className="h-3 w-3" />
            <span>{formatTime(renewal.dueDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}