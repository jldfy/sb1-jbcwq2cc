import React, { useState } from 'react';
import { Plus, StickyNote } from 'lucide-react';
import type { Note } from '../../../types';
import { Button } from '../../common/Button';
import { AddNoteForm } from './AddNoteForm';
import { NoteSection } from './NoteSection';

interface NotesPanelProps {
  notes: Note[];
  onAddNote: (content: string) => void;
  formatDate: (date: Date) => string;
}

export function NotesPanel({ notes, onAddNote, formatDate }: NotesPanelProps) {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState('');

  const handleSubmit = () => {
    if (newNote.trim()) {
      onAddNote(newNote.trim());
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <StickyNote className="h-4 w-4" />
          <span>Notes du renouvellement</span>
        </div>
        {!isAddingNote && (
          <Button
            variant="secondary"
            icon={Plus}
            onClick={() => setIsAddingNote(true)}
            className="text-sm"
          >
            Ajouter une note
          </Button>
        )}
      </div>

      {isAddingNote && (
        <AddNoteForm
          value={newNote}
          onChange={setNewNote}
          onSubmit={handleSubmit}
          onCancel={() => {
            setNewNote('');
            setIsAddingNote(false);
          }}
        />
      )}

      <NoteSection notes={notes} formatDate={formatDate} />
    </div>
  );
}