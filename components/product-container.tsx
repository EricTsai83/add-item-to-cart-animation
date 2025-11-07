import Image from "next/image";
import { motion, type PanInfo } from "framer-motion";
import type { Position } from "@/types";

type ProductContainerProps = {
  readonly productImageRef: React.RefObject<HTMLDivElement | null>;
  readonly position: Position;
  readonly onDragEnd: (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => void;
  readonly onClick: () => void;
  readonly imageSrc?: string;
  readonly imageAlt?: string;
};

/**
 * Draggable product container component
 */
export const ProductContainer = ({
  productImageRef,
  position,
  onDragEnd,
  onClick,
  imageSrc = "/item.jpg",
  imageAlt = "商品",
}: ProductContainerProps) => {
  return (
    <motion.div
      className="w-[160px] h-[160px] cursor-grab active:cursor-grabbing z-10 select-none"
      drag
      dragMomentum={false}
      dragConstraints={false}
      style={{ x: position.x, y: position.y }}
      onDragEnd={onDragEnd}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        ref={productImageRef}
        className="relative w-full h-full bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-200 p-3 cursor-pointer group"
        onClick={onClick}
        whileHover={{ borderColor: "rgb(59, 130, 246)" }}
      >
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-50">
          <Image
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={imageSrc}
            alt={imageAlt}
            width={200}
            height={200}
            draggable={false}
            unoptimized
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-sm font-semibold text-white drop-shadow-lg px-3 py-1.5 bg-black/50 rounded-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            點擊加入購物車
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
