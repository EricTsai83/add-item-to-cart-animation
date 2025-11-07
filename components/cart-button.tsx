import { forwardRef } from "react";
import { motion, type PanInfo } from "framer-motion";
import type { Position } from "@/types";
import { CartIcon } from "./cart-icon";

type CartButtonProps = {
  readonly position: Position;
  readonly onDragEnd: (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => void;
};

/**
 * Draggable cart button component with enhanced styling
 */
export const CartButton = forwardRef<HTMLButtonElement, CartButtonProps>(
  ({ position, onDragEnd }, ref) => {
    return (
      <motion.button
        ref={ref}
        className="fixed top-6 right-6 w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 p-0 cursor-grab active:cursor-grabbing select-none z-50 transition-shadow duration-200 flex items-center justify-center group"
        aria-label="購物車 - 可拖動"
        drag
        dragMomentum={false}
        dragConstraints={false}
        style={{ x: position.x, y: position.y }}
        onDragEnd={onDragEnd}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <CartIcon className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors duration-200" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
        </div>
      </motion.button>
    );
  },
);

CartButton.displayName = "CartButton";
