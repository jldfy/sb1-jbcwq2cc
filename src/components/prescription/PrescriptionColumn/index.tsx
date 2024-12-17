import React, { useRef } from 'react';
import type { Renewal } from '../../../types';
import { RenewalStatus } from '../../../types/renewal';
import { ColumnHeader } from './ColumnHeader';
import { ScrollGradient } from './ScrollGradient';
import { RenewalList } from './RenewalList';
import { useScrollState } from '../hooks/useScrollState';
import { useDragAndDrop } from '../hooks/useDragAndDrop';

interface PrescriptionColumnProps {
  title: string;
  status: RenewalStatus;
  renewals: Renewal[];
  onRenewalClick: (renewal: Renewal) => void;
}

export function PrescriptionColumn({
  title,
  status,
  renewals,
  onRenewalClick,
}: PrescriptionColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { hasTopOverflow, hasBottomOverflow } = useScrollState(scrollContainerRef, [renewals]);

  return (
    <div
      ref={containerRef}
      className="flex-1 min-w-[250px] max-w-[280px] rounded-lg p-4 relative bg-gray-50"
    >
      <ColumnHeader title={title} status={status} count={renewals.length} />

      <div className="relative">
        {hasTopOverflow && <ScrollGradient position="top" />}
        
        <div 
          ref={scrollContainerRef}
          className="space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        >
          {renewals.map((renewal) => (
            <div key={renewal.id}>
              <PrescriptionCard
                renewal={renewal}
                onClick={onRenewalClick}
              />
            </div>
          ))}
        </div>

        {hasBottomOverflow && <ScrollGradient position="bottom" />}
      </div>
    </div>
  );
}