import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  icon: Icon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors';
  const variantStyles = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {children}
    </button>
  );
}