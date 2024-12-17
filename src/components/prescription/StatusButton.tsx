import React from 'react';
import { RenewalStatus } from '../../types/renewal';
import { useTranslation } from 'react-i18next';
import { statusIcons } from '../../utils/statusIcons';

interface StatusButtonProps {
  targetStatus: RenewalStatus;
  onClick: () => void;
  showText?: boolean;
  className?: string;
}

export function StatusButton({ 
  targetStatus, 
  onClick, 
  showText = false,
  className = '' 
}: StatusButtonProps) {
  const { t } = useTranslation();
  const Icon = statusIcons[targetStatus];

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`
        group relative
        p-2 rounded-lg
        bg-indigo-50 text-indigo-600 
        hover:bg-indigo-100
        transition-colors duration-200
        ${showText ? 'flex items-center gap-2 px-3' : ''}
        ${className}
      `}
    >
      <Icon className="h-4 w-4" />
      {showText ? (
        <span className="text-sm font-medium">
          {t(`status.${targetStatus}`)}
        </span>
      ) : (
        <div className="
          absolute left-1/2 -translate-x-1/2 bottom-full mb-2
          px-2 py-1 rounded bg-gray-800 text-white text-xs
          opacity-0 group-hover:opacity-100
          pointer-events-none
          transition-opacity duration-150
          whitespace-nowrap
          z-10
        ">
          {t(`status.${targetStatus}`)}
          <div className="
            absolute left-1/2 -translate-x-1/2 top-full
            border-4 border-transparent
            border-t-gray-800
          "/>
        </div>
      )}
    </button>
  );
}