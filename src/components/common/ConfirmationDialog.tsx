import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from './Button';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-gray-900/50 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          <div className="relative overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="relative bg-indigo-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-white" />
                  <h2 className="text-xl font-semibold text-white">{title}</h2>
                </div>
                <button
                  onClick={onCancel}
                  className="rounded-full p-1 text-white/80 hover:bg-white/20 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600">{message}</p>

              <div className="mt-6 flex justify-end gap-3">
                <Button
                  variant="secondary"
                  onClick={onCancel}
                >
                  {cancelLabel}
                </Button>
                <Button
                  onClick={onConfirm}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  {confirmLabel}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}