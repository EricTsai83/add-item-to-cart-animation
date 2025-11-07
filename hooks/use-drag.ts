import { useState, useCallback } from "react";
import type { PanInfo } from "framer-motion";
import type { Position } from "@/types";

type UseDragReturn = {
  readonly position: Position;
  readonly handleDragEnd: (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => void;
};

/**
 * Hook for managing drag functionality
 * Handles position state and drag end events for draggable elements
 *
 * @param initialPosition - Initial position of the draggable element
 * @returns Drag state and handlers
 */
export const useDrag = (
  initialPosition: Position = { x: 0, y: 0 },
): UseDragReturn => {
  const [position, setPosition] = useState<Position>(initialPosition);

  /**
   * Handle drag end event
   * Updates position based on drag offset
   */
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
      setPosition({ x: info.offset.x, y: info.offset.y });
    },
    [],
  );

  return {
    position,
    handleDragEnd,
  };
};
