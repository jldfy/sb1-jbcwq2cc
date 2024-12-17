import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormFieldProps {
  label: string;
  icon?: LucideIcon;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, icon: Icon, required, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        {Icon && <Icon className="h-4 w-4 text-gray-400" />}
        <span>{label}</span>
        {required && (
          <span className="text-red-500">*</span>
        )}
      </label>
      {children}
    </div>
  );
}