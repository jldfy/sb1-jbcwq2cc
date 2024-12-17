import { useState, useEffect, RefObject } from 'react';

interface ScrollState {
  hasTopOverflow: boolean;
  hasBottomOverflow: boolean;
}

export function useScrollState(
  scrollContainerRef: RefObject<HTMLDivElement>,
  dependencies: any[]
): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    hasTopOverflow: false,
    hasBottomOverflow: false,
  });

  const checkScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      setScrollState({
        hasTopOverflow: scrollTop > 0,
        hasBottomOverflow: scrollHeight - (scrollTop + clientHeight) > 1,
      });
    }
  };

  useEffect(() => {
    checkScrollState();
    window.addEventListener('resize', checkScrollState);
    return () => window.removeEventListener('resize', checkScrollState);
  }, [dependencies]);

  return scrollState;
}