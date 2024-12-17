import React from 'react';
import { X, AlertCircle, CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
  onUndo?: () => void;
}

export function Toast({ message, type = 'success', onClose, onUndo }: ToastProps) {
  return (
    <div className="fixed top-4 right-4 left-4 sm:left-auto sm:w-96 z-[200]">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <div className="flex items-start gap-3">
          {type === 'success' ? (
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          )}
          
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900">{message}</p>
          </div>

          <div className="flex items-center gap-2">
            {onUndo && (
              <button
                onClick={onUndo}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Annuler
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}