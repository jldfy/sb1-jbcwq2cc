import { useState, useCallback } from 'react';
import { RenewalStatus } from '../../../types/renewal';
import { canTransitionToStatus } from '../../../utils/statusUtils';

interface DragState {
  dropIndex: number | null;
  draggedStatus: RenewalStatus | null;
  isTransitionForbidden: boolean;
}

export function useDragAndDrop(columnStatus: RenewalStatus) {
  const [state, setState] = useState<DragState>({
    dropIndex: null,
    draggedStatus: null,
    isTransitionForbidden: false,
  });

  const handleDragStart = useCallback((e: React.DragEvent, status: RenewalStatus) => {
    e.dataTransfer.setData('text/plain', status);
    setState(prev => ({
      ...prev,
      draggedStatus: status,
    }));
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const draggedStatus = state.draggedStatus;
    if (draggedStatus) {
      const isForbidden = !canTransitionToStatus(draggedStatus, columnStatus);
      setState(prev => ({
        ...prev,
        isTransitionForbidden: isForbidden,
        dropIndex: isForbidden ? null : 0,
      }));
    }
  }, [state.draggedStatus, columnStatus]);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (state.isTransitionForbidden) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const midPoint = rect.top + rect.height / 2;
    
    setState(prev => ({
      ...prev,
      dropIndex: e.clientY < midPoint ? index : index + 1,
    }));
  }, [state.isTransitionForbidden]);

  const handleDragLeave = useCallback((e: React.DragEvent, containerRef: React.RefObject<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        setState(prev => ({
          ...prev,
          dropIndex: null,
          isTransitionForbidden: false,
        }));
      }
    }
  }, []);

  const handleDrop = useCallback(() => {
    setState({
      dropIndex: null,
      draggedStatus: null,
      isTransitionForbidden: false,
    });
  }, []);

  return {
    ...state,
    handleDragStart,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}