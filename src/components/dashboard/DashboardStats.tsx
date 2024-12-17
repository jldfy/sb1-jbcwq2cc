import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Hourglass, 
  Pill
} from 'lucide-react';
import { KPICard } from './KPICard';
import type { Prescription } from '../../types';

interface DashboardStatsProps {
  prescriptions: Prescription[];
}

export function DashboardStats({ prescriptions }: DashboardStatsProps) {
  const totalPrescriptions = prescriptions.length;
  const activeRenewals = prescriptions.filter(p => p.status === 'in-progress').length;
  const completedToday = prescriptions.filter(p => {
    const today = new Date();
    const prescDate = new Date(p.dueDate);
    return p.status === 'completed' && 
           prescDate.getDate() === today.getDate() &&
           prescDate.getMonth() === today.getMonth() &&
           prescDate.getFullYear() === today.getFullYear();
  }).length;
  const pendingUrgent = prescriptions.filter(p => {
    const dueDate = new Date(p.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return p.status === 'pending' && diffDays <= 2;
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard
        title="Total des ordonnances"
        value={totalPrescriptions}
        icon={Pill}
        trend={+8}
      />
      <KPICard
        title="Renouvellements actifs"
        value={activeRenewals}
        icon={Hourglass}
        trend={+2}
      />
      <KPICard
        title="Terminées aujourd'hui"
        value={completedToday}
        icon={CheckCircle2}
        trend={+5}
      />
      <KPICard
        title="Urgentes en attente"
        value={pendingUrgent}
        icon={AlertCircle}
        trend={-1}
        trendColor="text-red-500"
      />
    </div>
  );
}