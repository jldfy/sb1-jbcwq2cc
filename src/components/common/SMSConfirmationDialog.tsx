import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from './Button';
import { ModalHeader } from './ModalHeader';

interface SMSConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function SMSConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
}: SMSConfirmationDialogProps) {
  const defaultMessage = "Bonjour, votre traitement est disponible à la pharmacie. Vous pouvez venir le récupérer aux horaires d'ouverture. Merci de votre confiance.";
  const [message, setMessage] = useState(defaultMessage);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      // Focus the textarea and move cursor to the end
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-gray-900/50 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          <div className="relative overflow-hidden rounded-xl bg-white shadow-2xl">
            <ModalHeader title="Confirmation d'envoi du SMS" onClose={onClose} />

            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-indigo-600 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-3">
                    Le SMS suivant sera envoyé au patient pour l'informer que son traitement est disponible :
                  </p>
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-lg border-gray-200 text-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
                    rows={4}
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Vous pouvez modifier le message avant l'envoi.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="secondary"
                  onClick={onClose}
                >
                  Annuler
                </Button>
                <Button
                  onClick={onConfirm}
                  disabled={!message.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Confirmer et envoyer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}