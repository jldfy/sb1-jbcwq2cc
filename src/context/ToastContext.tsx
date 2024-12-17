import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast } from '../components/common/Toast';

interface ToastContextType {
  showToast: (message: string, options?: { type?: 'success' | 'error', onUndo?: () => void }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{
    message: string;
    type?: 'success' | 'error';
    onUndo?: () => void;
  } | null>(null);

  const showToast = useCallback((message: string, options?: { type?: 'success' | 'error', onUndo?: () => void }) => {
    setToast({ message, ...options });

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setToast(null);
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          onUndo={toast.onUndo}
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}