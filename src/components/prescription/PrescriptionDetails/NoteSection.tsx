import React from 'react';
import { StickyNote } from 'lucide-react';
import type { Note } from '../../../types';

interface NoteSectionProps {
  notes: Note[];
  formatDate: (date: Date) => string;
}

export function NoteSection({ notes, formatDate }: NoteSectionProps) {
  if (notes.length === 0) {
    return (
      <p className="text-gray-500 text-sm italic">
        Aucune note pour ce renouvellement
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <div key={note.id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-gray-900 whitespace-pre-wrap">{note.content}</p>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <img
                  src={note.createdBy.avatar}
                  alt={note.createdBy.name}
                  className="h-5 w-5 rounded-full"
                />
                <span>{note.createdBy.name}</span>
                <span>•</span>
                <span>{formatDate(note.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}