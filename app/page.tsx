"use client";

import { AnimatePresence } from "framer-motion";
import { defaultAnimationConfig } from "@/config/animation-config";
import { useCartAnimation } from "@/hooks/use-cart-animation";
import { useDrag } from "@/hooks/use-drag";
import { CartButton } from "@/components/cart-button";
import { ProductContainer } from "@/components/product-container";
import { CartItemAnimation } from "@/components/cart-item-animation";

export default function Home() {
  const config = defaultAnimationConfig;

  // Cart animation hook - handles add to cart animation logic
  const { cartRef, productImageRef, animationDataList, addToCart } =
    useCartAnimation(config);

  // Drag hooks - handle drag functionality independently
  const cartDrag = useDrag({ x: 0, y: 0 });
  const productDrag = useDrag({ x: 0, y: 0 });

  return (
    <div className="min-h-screen w-screen relative overflow-hidden bg-white">
      {/* 購物車按鈕 - 放在最外層確保可見 */}
      <CartButton
        ref={cartRef}
        position={cartDrag.position}
        onDragEnd={cartDrag.handleDragEnd}
      />

      {/* 主內容區域 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        {/* 標題區域 */}
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            購物車動畫演示
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            拖動商品或購物車，點擊商品添加到購物車
          </p>
        </div>

        {/* 商品容器 */}
        <ProductContainer
          productImageRef={productImageRef}
          position={productDrag.position}
          onDragEnd={productDrag.handleDragEnd}
          onClick={addToCart}
        />

        {/* 動畫中的商品元素 */}
        <AnimatePresence>
          {animationDataList.map((animationData) => (
            <CartItemAnimation
              key={animationData.id}
              animationData={animationData}
              config={config}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
