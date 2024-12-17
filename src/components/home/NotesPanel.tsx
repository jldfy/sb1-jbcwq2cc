import React from 'react';
import { StickyNote, Plus } from 'lucide-react';
import type { Note } from '../../types';
import { Button } from '../common/Button';

interface NotesPanelProps {
  notes: Note[];
  onAddNote: () => void;
  isAddingNote: boolean;
  setIsAddingNote: (value: boolean) => void;
  newNote: string;
  setNewNote: (value: string) => void;
}

export function NotesPanel({
  notes,
  onAddNote,
  isAddingNote,
  setIsAddingNote,
  newNote,
  setNewNote,
}: NotesPanelProps) {
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
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 min-h-[100px]"
            placeholder="Ajouter une nouvelle note..."
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setNewNote('');
                setIsAddingNote(false);
              }}
            >
              Annuler
            </Button>
            <Button
              icon={Plus}
              onClick={onAddNote}
              disabled={!newNote.trim()}
            >
              Ajouter
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {notes.length === 0 ? (
          <p className="text-gray-500 text-sm italic">
            Aucune note pour ce renouvellement
          </p>
        ) : (
          notes.map((note) => (
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
                    <span>{formatNoteDate(note.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}