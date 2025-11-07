"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { animationConfigs, type ConfigName } from "@/config/animation-config";
import { useCartAnimation } from "@/hooks/use-cart-animation";
import { useDrag } from "@/hooks/use-drag";
import { CartButton } from "@/components/cart-button";
import { ProductContainer } from "@/components/product-container";
import { CartItemAnimation } from "@/components/cart-item-animation";
import { AnimationConfigSelector } from "@/components/animation-config-selector";

const INITIAL_CONFIG = "original" satisfies ConfigName;
const PRODUCT_IMAGE_SRC = "/item.jpg";
const INITIAL_POSITION = { x: 0, y: 0 };

export default function Home() {
  const [selectedConfig, setSelectedConfig] =
    useState<ConfigName>(INITIAL_CONFIG);
  const config = animationConfigs[selectedConfig];
  const { cartRef, productImageRef, animationDataList, addToCart } =
    useCartAnimation(config);
  const cartDrag = useDrag(INITIAL_POSITION);
  const productDrag = useDrag(INITIAL_POSITION);

  return (
    <div className="min-h-screen w-screen relative overflow-hidden bg-white">
      <CartButton
        ref={cartRef}
        position={cartDrag.position}
        onDragEnd={cartDrag.handleDragEnd}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Cart Animation Demo
          </h1>
          <p className="text-sm md:text-base text-gray-600 mb-4">
            Drag products or cart, click products to add to cart
          </p>
          <AnimationConfigSelector
            selectedConfig={selectedConfig}
            onConfigChange={setSelectedConfig}
          />
        </div>

        <ProductContainer
          productImageRef={productImageRef}
          position={productDrag.position}
          onDragEnd={productDrag.handleDragEnd}
          onClick={addToCart}
          imageSrc={PRODUCT_IMAGE_SRC}
          imageAlt="Product"
        />

        <AnimatePresence>
          {animationDataList.map((animationData) => (
            <CartItemAnimation
              key={animationData.id}
              animationData={animationData}
              config={config}
              imageSrc={PRODUCT_IMAGE_SRC}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
