import Image from "next/image";
import { motion } from "framer-motion";
import type { AnimationData } from "@/types";
import type { AnimationConfig } from "@/config/animation-config";

type CartItemAnimationProps = {
  readonly animationData: AnimationData;
  readonly config: AnimationConfig;
  readonly imageSrc?: string;
};

/**
 * Animation component that shows the product flying to the cart with enhanced visuals
 */
export const CartItemAnimation = ({
  animationData,
  config,
  imageSrc = "/item.jpg",
}: CartItemAnimationProps) => {
  const baseTransition = {
    duration: config.speed,
    delay: config.delay,
  };

  return (
    <motion.div
      className="fixed grid place-items-center pointer-events-none z-9999"
      initial={{ x: 0, y: 0, opacity: 1 }}
      animate={{
        x: animationData.distanceX,
        y: animationData.distanceY,
        opacity: [1, 1, 0.9, 0.8],
      }}
      exit={{ opacity: 0 }}
      transition={{
        ...baseTransition,
        ease: config.xEasing,
        opacity: {
          duration: config.speed * 0.8,
          delay: config.delay,
          times: [0, 0.3, 0.7, 1],
        },
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
        }}
        animate={{
          width: "32px",
          borderRadius: "50%",
          rotate: animationData.distanceX < 0 ? -360 : 360,
          boxShadow: [
            "0 10px 25px rgba(0, 0, 0, 0.2)",
            "0 5px 15px rgba(0, 0, 0, 0.3)",
            "0 2px 8px rgba(0, 0, 0, 0.2)",
          ],
        }}
        transition={{
          ...baseTransition,
          ease: config.scaleEasing,
          rotate: {
            ...baseTransition,
            ease: "easeInOut",
          },
          boxShadow: {
            ...baseTransition,
            times: [0, 0.5, 1],
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
        {/* 光暈效果 */}
        <motion.div
          className="absolute inset-0 bg-linear-to-br from-blue-400/30 to-purple-400/30 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0.3, 0] }}
          transition={{
            ...baseTransition,
            times: [0, 0.2, 0.6, 1],
          }}
        />
      </motion.div>
    </motion.div>
  );
};
