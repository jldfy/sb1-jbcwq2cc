import React from 'react';
import type { Prescription } from '../../types';
import { formatDate } from '../../utils/date';

interface RecentActivityProps {
  prescriptions: Prescription[];
}

export function RecentActivity({ prescriptions }: RecentActivityProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Activité récente
        </h2>
      </div>
      <div className="divide-y divide-gray-200">
        {prescriptions.slice(0, 5).map((prescription) => (
          <div key={prescription.id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={prescription.assignedTo.avatar}
                    alt={prescription.assignedTo.name}
                  />
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {prescription.patientName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {prescription.medication} - {prescription.dosage}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {formatDate(prescription.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}