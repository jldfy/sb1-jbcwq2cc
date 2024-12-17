import React, { useState } from 'react';
import { RenewalStatus } from '../../types/renewal';
import { useTranslation } from 'react-i18next';
import { statusIcons } from '../../utils/statusIcons';
import { SMSConfirmationDialog } from './SMSConfirmationDialog';

interface StatusButtonProps {
  targetStatus: RenewalStatus;
  onClick: () => void;
  showText?: boolean;
  className?: string;
  variant?: 'default' | 'compact';
}

export function StatusButton({ 
  targetStatus, 
  onClick, 
  showText = false,
  className = '',
  variant = 'default',
}: StatusButtonProps) {
  const { t } = useTranslation();
  const Icon = statusIcons[targetStatus];
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (targetStatus === RenewalStatus.PREPARED) {
      setShowConfirmation(true);
    } else {
      onClick();
    }
  };

  const buttonStyles = variant === 'compact'
    ? `
      group relative
      p-1.5 rounded
      bg-white text-gray-500
      hover:bg-gray-100
      border border-gray-200
      shadow-sm hover:shadow
      transition-all duration-200
      ${showText ? 'flex items-center gap-2 px-2' : ''}
      ${className}
    `
    : `
      group relative
      p-2 rounded-lg
      bg-indigo-50 text-indigo-600 
      hover:bg-indigo-100
      transition-colors duration-200
      ${showText ? 'flex items-center gap-2 px-3' : ''}
      ${className}
    `;

  return (
    <>
      <button
        onClick={handleClick}
        className={buttonStyles}
      >
        <Icon 
          className={`h-4 w-4 ${targetStatus === RenewalStatus.IN_PROGRESS ? 'transform -rotate-45' : ''}`}
        />
        {showText ? (
          <span className="text-sm font-medium">
            {t(`status.${targetStatus}`)}
          </span>
        ) : (
          <div className="
            absolute left-1/2 -translate-x-1/2 bottom-full mb-1
            px-2 py-1 rounded bg-gray-800 text-white text-xs
            opacity-0 group-hover:opacity-100
            pointer-events-none
            transition-opacity duration-75
            whitespace-nowrap
            z-10
          ">
            {t(`status.${targetStatus}`)}
          </div>
        )}
      </button>

      <SMSConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={() => {
          setShowConfirmation(false);
          onClick();
        }}
      />
    </>
  );
}