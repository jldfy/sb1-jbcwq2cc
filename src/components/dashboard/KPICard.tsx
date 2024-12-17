import React from 'react';
import { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend: number;
  trendColor?: string;
}

export function KPICard({ title, value, icon: Icon, trend, trendColor = 'text-green-500' }: KPICardProps) {
  const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown;
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-indigo-50 rounded-lg">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
        <div className={`flex items-center ${trendColor}`}>
          <TrendIcon className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">{Math.abs(trend)}%</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}