import React from 'react';
import { usePrescriptions } from '../../context/PrescriptionContext';

export function StatusDistribution() {
  const { prescriptions } = usePrescriptions();

  const statusCounts = {
    new: prescriptions.filter(p => p.status === 'new').length,
    'in-progress': prescriptions.filter(p => p.status === 'in-progress').length,
    completed: prescriptions.filter(p => p.status === 'completed').length,
    pending: prescriptions.filter(p => p.status === 'pending').length,
  };

  const statusLabels = {
    new: 'Nouvelles',
    'in-progress': 'En cours',
    completed: 'Terminées',
    pending: 'En attente',
  };

  const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);

  const statusColors = {
    new: 'bg-blue-500',
    'in-progress': 'bg-yellow-500',
    completed: 'bg-green-500',
    pending: 'bg-red-500',
  };

  return (
    <div className="space-y-4">
      {Object.entries(statusCounts).map(([status, count]) => (
        <div key={status} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{statusLabels[status as keyof typeof statusLabels]}</span>
            <span className="text-gray-900 font-medium">
              {((count / total) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${statusColors[status as keyof typeof statusColors]} transition-all duration-500`}
              style={{ width: `${(count / total) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}