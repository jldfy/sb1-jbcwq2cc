import React from 'react';
import type { Prescription, Renewal } from '../../../types';
import { PrescriptionInfo } from './PrescriptionInfo';
import { StatusSection } from './StatusSection';
import { NotesPanel } from './NotesPanel';

interface PrescriptionDetailsProps {
  prescription: Prescription;
  renewal?: Renewal;
  onStatusChange?: (status: typeof renewal.status) => void;
  onAddNote?: (content: string) => void;
}

export function PrescriptionDetails({
  prescription,
  renewal,
  onStatusChange,
  onAddNote,
}: PrescriptionDetailsProps) {
  const formatNoteDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {renewal && (
        <StatusSection
          currentStatus={renewal.status}
          onStatusChange={onStatusChange}
        />
      )}

      <PrescriptionInfo prescription={prescription} renewal={renewal} />

      {renewal && onAddNote && (
        <NotesPanel
          notes={renewal.notes}
          onAddNote={onAddNote}
          formatDate={formatNoteDate}
        />
      )}
    </div>
  );
}