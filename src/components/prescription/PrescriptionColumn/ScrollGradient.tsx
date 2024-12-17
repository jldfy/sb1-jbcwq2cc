import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ScrollGradientProps {
  position: 'top' | 'bottom';
}

export function ScrollGradient({ position }: ScrollGradientProps) {
  const Icon = position === 'top' ? ChevronUp : ChevronDown;
  
  return (
    <div 
      className={`
        absolute ${position === 'top' ? 'top-0' : 'bottom-0'} 
        left-0 right-2 h-8 
        bg-gradient-to-${position === 'top' ? 'b' : 't'} 
        from-gray-50 to-transparent z-20 
        pointer-events-none 
        flex items-${position === 'top' ? 'start' : 'end'} 
        justify-center
      `}
    >
      <Icon className="h-6 w-6 text-gray-400" />
    </div>
  );
}