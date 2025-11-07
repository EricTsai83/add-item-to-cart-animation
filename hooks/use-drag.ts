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

const DEFAULT_POSITION = { x: 0, y: 0 } satisfies Position;

/**
 * Drag Hook
 * Manages position state of draggable elements
 */
export const useDrag = (
  initialPosition: Position = DEFAULT_POSITION,
): UseDragReturn => {
  const [position, setPosition] = useState<Position>(initialPosition);

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
