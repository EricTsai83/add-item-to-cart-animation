import Image from "next/image";
import { motion } from "framer-motion";
import type { AnimationData } from "@/types";
import type { AnimationConfig } from "@/config/animation-config";
import {
  generatePathKeyframes,
  calculateParabolaYAnimation,
  calculateRotationDirection,
} from "@/utils/animation-helpers";

type CartItemAnimationProps = {
  readonly animationData: AnimationData;
  readonly config: AnimationConfig;
  readonly imageSrc: string;
};

/**
 * Cart item animation component
 * Displays animation effect of product flying from product position to cart
 */
export const CartItemAnimation = ({
  animationData,
  config,
  imageSrc,
}: CartItemAnimationProps) => {
  const baseTransition = {
    duration: config.speed,
    delay: config.delay,
  };

  const customPath = generatePathKeyframes(
    config.pathType,
    animationData.distanceX,
    animationData.distanceY,
    config.pathHeight,
    50,
    config.spiralTurns ?? 2,
  );

  const hasParabola = config.pathType === "parabola" && config.pathHeight > 0;

  const yAnimation = hasParabola
    ? [
        ...calculateParabolaYAnimation(
          animationData.distanceY,
          config.pathHeight,
        ),
      ]
    : customPath !== null
    ? [...customPath.y]
    : animationData.distanceY;

  const xAnimation =
    customPath !== null ? [...customPath.x] : animationData.distanceX;

  const rotation = config.rotation ?? 0;
  const rotationDirection = calculateRotationDirection(animationData.distanceX);
  const blurValue = config.blur ?? 0;
  const scaleEnabled = config.scale ?? true;
  const fadeEnabled = config.fade ?? true;

  return (
    <motion.div
      className="fixed grid place-items-center pointer-events-none z-9999"
      initial={{ x: 0, y: 0, opacity: 1 }}
      animate={{
        x: xAnimation,
        y: yAnimation,
        opacity: fadeEnabled ? [1, 1, 0.9, 0.7, 0] : 1,
      }}
      exit={{ opacity: 0 }}
      transition={{
        x: {
          ...baseTransition,
          ease: config.xEasing,
          times: customPath !== null ? customPath.times : undefined,
        },
        y: {
          ...baseTransition,
          ease: config.yEasing,
          times: hasParabola
            ? [0, 0.5, 1]
            : customPath !== null
            ? customPath.times
            : undefined,
        },
        opacity: fadeEnabled
          ? {
              duration: config.speed * 0.8,
              delay: config.delay,
              times: [0, 0.2, 0.5, 0.8, 1],
            }
          : undefined,
      }}
      style={{
        left: animationData.left,
        top: animationData.top,
        width: animationData.width,
        height: animationData.height,
        willChange: "transform",
      }}
    >
      <motion.div
        className="aspect-square relative overflow-hidden shadow-lg"
        initial={{
          width: "100%",
          borderRadius: "12px",
          rotate: 0,
          filter: "blur(0px)",
        }}
        animate={{
          width: scaleEnabled ? "32px" : "100%",
          borderRadius: scaleEnabled ? "50%" : "12px",
          rotate: rotation * rotationDirection,
          filter: `blur(${blurValue}px)`,
          boxShadow: [
            "0 10px 25px rgba(0, 0, 0, 0.2)",
            "0 5px 15px rgba(0, 0, 0, 0.3)",
            "0 2px 8px rgba(0, 0, 0, 0.2)",
          ],
        }}
        transition={{
          ...baseTransition,
          ease: config.scaleEasing,
          rotate: { ...baseTransition, ease: config.scaleEasing },
          boxShadow: {
            ...baseTransition,
            times: [0, 0.5, 1],
          },
          filter: {
            duration: config.speed,
            delay: config.delay,
            ease: "easeOut",
          },
        }}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover"
          style={{ borderRadius: "inherit" }}
          draggable={false}
          unoptimized
        />
      </motion.div>
    </motion.div>
  );
};
