import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../common/Button';

interface AddNoteFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function AddNoteForm({ value, onChange, onSubmit, onCancel }: AddNoteFormProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 min-h-[100px]"
        placeholder="Ajouter une nouvelle note..."
      />
      <div className="flex justify-end gap-2">
        <Button
          variant="secondary"
          onClick={onCancel}
        >
          Annuler
        </Button>
        <Button
          icon={Plus}
          onClick={onSubmit}
          disabled={!value.trim()}
        >
          Ajouter
        </Button>
      </div>
    </div>
  );
}