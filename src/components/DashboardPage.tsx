import React from 'react';
import { usePrescriptions } from '../context/PrescriptionContext';
import { DashboardStats } from './dashboard/DashboardStats';
import { PrescriptionChart } from './dashboard/PrescriptionChart';
import { StatusDistribution } from './dashboard/StatusDistribution';
import { RecentActivity } from './dashboard/RecentActivity';

export function DashboardPage() {
  const { prescriptions } = usePrescriptions();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
      
      <DashboardStats prescriptions={prescriptions} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Évolution des ordonnances
          </h2>
          <PrescriptionChart />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Distribution par statut
          </h2>
          <StatusDistribution />
        </div>
      </div>

      <RecentActivity prescriptions={prescriptions} />
    </div>
  );
}