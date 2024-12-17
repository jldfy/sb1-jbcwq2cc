import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DetailFieldProps {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
}

export function DetailField({ icon: Icon, label, value, className = '' }: DetailFieldProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      <p className={`mt-1 text-gray-900 font-medium ${className}`}>{value}</p>
    </div>
  );
}