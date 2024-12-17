import React from 'react';
import { X } from 'lucide-react';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-white/80 hover:bg-white/20 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}