import React from 'react';

interface InitialsProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Initials({ name, size = 'md', className = '' }: InitialsProps) {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base',
  };

  return (
    <div
      className={`
        flex items-center justify-center
        rounded-full
        bg-indigo-100 text-indigo-700 font-medium
        ${sizeClasses[size]}
        ${className}
      `}
      title={name}
    >
      {initials}
    </div>
  );
}