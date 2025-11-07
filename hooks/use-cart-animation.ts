import { useState, useRef, useCallback, useEffect } from "react";
import type { AnimationData } from "@/types";
import type { AnimationConfig } from "@/config/animation-config";

type UseCartAnimationReturn = {
  readonly cartRef: React.RefObject<HTMLButtonElement | null>;
  readonly productImageRef: React.RefObject<HTMLDivElement | null>;
  readonly animationDataList: readonly AnimationData[];
  readonly addToCart: () => void;
};

/**
 * Calculate the center point coordinates of an element
 */
const calculateElementCenter = (
  rect: DOMRect,
): { readonly x: number; readonly y: number } => {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
};

/**
 * Generate unique animation ID
 */
const generateAnimationId = (): string => {
  return `${Date.now()}-${Math.random()}`;
};

/**
 * Cart animation Hook
 * Manages animation effects when products are added to cart
 */
export const useCartAnimation = (
  config: AnimationConfig,
): UseCartAnimationReturn => {
  const [animationDataList, setAnimationDataList] = useState<
    readonly AnimationData[]
  >([]);
  const cartRef = useRef<HTMLButtonElement>(null);
  const productImageRef = useRef<HTMLDivElement>(null);
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    const timeoutMap = timeoutRefs.current;
    return () => {
      timeoutMap.forEach((timeout) => {
        clearTimeout(timeout);
      });
      timeoutMap.clear();
    };
  }, []);

  const addToCart = useCallback((): void => {
    const cartElement = cartRef.current;
    const productElement = productImageRef.current;

    if (!cartElement || !productElement) {
      return;
    }

    const cartRect = cartElement.getBoundingClientRect();
    const productRect = productElement.getBoundingClientRect();

    const cartCenter = calculateElementCenter(cartRect);
    const productCenter = calculateElementCenter(productRect);

    const animationId = generateAnimationId();
    const newAnimationData: AnimationData = {
      id: animationId,
      left: productRect.left,
      top: productRect.top,
      width: productRect.width,
      height: productRect.height,
      distanceX: cartCenter.x - productCenter.x,
      distanceY: cartCenter.y - productCenter.y,
    };

    setAnimationDataList((prev) => [...prev, newAnimationData]);

    const timeoutDuration = (config.speed + config.delay) * 1000;
    const timeout = setTimeout(() => {
      setAnimationDataList((prev) =>
        prev.filter((data) => data.id !== animationId),
      );
      timeoutRefs.current.delete(animationId);
    }, timeoutDuration);

    timeoutRefs.current.set(animationId, timeout);
  }, [config.speed, config.delay]);

  return {
    cartRef,
    productImageRef,
    animationDataList,
    addToCart,
  };
};
