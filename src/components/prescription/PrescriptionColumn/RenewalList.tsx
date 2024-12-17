import React from 'react';
import type { Renewal } from '../../../types';
import { PrescriptionCard } from '../PrescriptionCard';
import { DragPlaceholder } from '../DragPlaceholder';

interface RenewalListProps {
  renewals: Renewal[];
  dropIndex: number | null;
  isTransitionForbidden: boolean;
  onDragStart: (e: React.DragEvent, renewal: Renewal) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onRenewalClick: (renewal: Renewal) => void;
}

export function RenewalList({
  renewals,
  dropIndex,
  isTransitionForbidden,
  onDragStart,
  onDragOver,
  onRenewalClick,
}: RenewalListProps) {
  return (
    <>
      {renewals.map((renewal, index) => (
        <React.Fragment key={renewal.id}>
          {dropIndex === index && !isTransitionForbidden && <DragPlaceholder />}
          <div onDragOver={(e) => !isTransitionForbidden && onDragOver(e, index)}>
            <PrescriptionCard
              renewal={renewal}
              onDragStart={onDragStart}
              onClick={onRenewalClick}
            />
          </div>
        </React.Fragment>
      ))}
      {dropIndex === renewals.length && !isTransitionForbidden && <DragPlaceholder />}
    </>
  );
}