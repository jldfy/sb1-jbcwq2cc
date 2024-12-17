import React, { useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Renewal } from '../../types';
import { RenewalStatus } from '../../types/renewal';
import { RenewalCard } from './RenewalCard';
import { ColumnHeader } from './ColumnHeader';

interface RenewalColumnProps {
  title: string;
  status: RenewalStatus;
  renewals: Renewal[];
  onRenewalClick: (renewal: Renewal) => void;
}

export function RenewalColumn({
  title,
  status,
  renewals,
  onRenewalClick,
}: RenewalColumnProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hasTopOverflow, setHasTopOverflow] = React.useState(false);
  const [hasBottomOverflow, setHasBottomOverflow] = React.useState(false);

  const checkScrollState = React.useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      setHasTopOverflow(scrollTop > 0);
      setHasBottomOverflow(scrollHeight - (scrollTop + clientHeight) > 1);
    }
  }, []);

  React.useEffect(() => {
    checkScrollState();
    window.addEventListener('resize', checkScrollState);
    return () => window.removeEventListener('resize', checkScrollState);
  }, [checkScrollState, renewals]);

  return (
    <div className="flex-1 min-w-[250px] max-w-[280px] bg-gray-50 rounded-lg p-4">
      <ColumnHeader title={title} status={status} count={renewals.length} />

      <div className="relative">
        {hasTopOverflow && (
          <div className="absolute top-0 left-0 right-2 h-8 bg-gradient-to-b from-gray-50 to-transparent z-10 pointer-events-none flex items-start justify-center">
            <ChevronUp className="h-6 w-6 text-gray-400" />
          </div>
        )}
        
        <div 
          ref={scrollContainerRef}
          onScroll={checkScrollState}
          className="space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        >
          {renewals.map((renewal) => (
            <RenewalCard
              key={renewal.id}
              renewal={renewal}
              onClick={onRenewalClick}
            />
          ))}
        </div>

        {hasBottomOverflow && (
          <div className="absolute bottom-0 left-0 right-2 h-8 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none flex items-end justify-center">
            <ChevronDown className="h-6 w-6 text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
}