import { useState, useRef, useCallback } from "react";
import type { AnimationData } from "@/types";
import type { AnimationConfig } from "@/config/animation-config";

type UseCartAnimationReturn = {
  readonly cartRef: React.RefObject<HTMLButtonElement | null>;
  readonly productImageRef: React.RefObject<HTMLDivElement | null>;
  readonly animationDataList: readonly AnimationData[];
  readonly addToCart: () => Promise<void>;
};

/**
 * Hook for managing add-to-cart animation
 * Handles animation calculations and UI state for product flying to cart
 *
 * This hook is independent of drag functionality and can be used
 * in projects that don't require dragging features.
 *
 * @param config - Animation configuration settings
 * @returns Animation refs, state, and handlers
 */
export const useCartAnimation = (
  config: AnimationConfig,
): UseCartAnimationReturn => {
  const [animationDataList, setAnimationDataList] = useState<
    readonly AnimationData[]
  >([]);
  const cartRef = useRef<HTMLButtonElement>(null);
  const productImageRef = useRef<HTMLDivElement>(null);

  /**
   * Trigger add to cart animation
   * Calculates positions and animates product flying to cart
   * Supports multiple simultaneous animations
   */
  const addToCart = useCallback(async (): Promise<void> => {
    const cartElement = cartRef.current;
    const productElement = productImageRef.current;

    if (!cartElement || !productElement) {
      return;
    }

    const cartRect = cartElement.getBoundingClientRect();
    const productRect = productElement.getBoundingClientRect();

    const cartCenter = {
      x: cartRect.left + cartRect.width / 2,
      y: cartRect.top + cartRect.height / 2,
    };

    const productCenter = {
      x: productRect.left + productRect.width / 2,
      y: productRect.top + productRect.height / 2,
    };

    const distanceX = cartCenter.x - productCenter.x;
    const distanceY = cartCenter.y - productCenter.y;

    const animationId = `${Date.now()}-${Math.random()}`;
    const newAnimationData: AnimationData = {
      id: animationId,
      left: productRect.left,
      top: productRect.top,
      width: productRect.width,
      height: productRect.height,
      distanceX,
      distanceY,
    };

    // Add new animation to the list
    setAnimationDataList((prev) => [...prev, newAnimationData]);

    // Wait for animation to complete, then remove it
    const animationDuration = (config.speed + config.delay) * 1000;
    await new Promise<void>((resolve) =>
      setTimeout(resolve, animationDuration),
    );

    // Remove this animation from the list
    setAnimationDataList((prev) =>
      prev.filter((data) => data.id !== animationId),
    );
  }, [config.speed, config.delay]);

  return {
    cartRef,
    productImageRef,
    animationDataList,
    addToCart,
  };
};
