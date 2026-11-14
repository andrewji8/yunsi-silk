"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./cart";
import { ProductImage } from "./product-image";
import {
  colorVariantImage,
  hasColorVariant,
  type Product,
} from "@/data/products";

const COLOR_SWATCH: Record<string, [string, string]> = {
  雾白: ["#f3efe4", "#d9d3c2"],
  月白: ["#f6f3ea", "#ddd6c4"],
  晨雾: ["#e9e6da", "#cfc9b8"],
  河青: ["#5f7a6d", "#3c5648"],
  墨玉绿: ["#2f4d3d", "#1d3128"],
  金桂: ["#caa14f", "#a67f37"],
  藕粉: ["#e3c4bd", "#c99f97"],
  藕: ["#e0bdb4", "#c79f95"],
  燕麦: ["#e7ddca", "#cbbd9f"],
};

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [color, setColor] = useState(product.colors[0]);
  const off = Math.round(
    1 - product.priceCny / product.originalPriceCny
  );

  return (
    <div className="group flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative overflow-hidden rounded-img bg-line"
      >
        <div className="aspect-[3/4] w-full overflow-hidden transition-transform duration-500 group-hover:scale-[1.03]">
          {/* 卡片主图随所选颜色切换（有变体图时） */}
          <ProductImage
            image={colorVariantImage(product.slug, color)}
            slug={product.slug}
            color={color}
            ratio={3 / 4}
            label={`${product.name}（${color}）`}
          />
        </div>
        {off > 0 && (
          <span className="absolute left-3 top-3 rounded-pill bg-primary/90 px-3 py-1 text-xs text-surface">
            -{off}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <p className="text-xs tracking-widest text-mute">{product.category}</p>
        <Link
          href={`/product/${product.slug}`}
          className="mt-1 font-medium text-ink hover:text-primary"
        >
          {product.name}
        </Link>
        <p className="mt-1 line-clamp-1 text-sm text-mute">{product.shortDesc}</p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-lg text-primary">
            ¥{product.priceCny}
          </span>
          {off > 0 && (
            <span className="text-xs text-mute line-through">
              ¥{product.originalPriceCny}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm">
          <button
            onClick={() => add(product, color)}
            className="rounded-pill bg-primary px-5 py-2 text-surface transition-opacity hover:opacity-90"
          >
            加入购物车
          </button>
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((c) => {
              const [c1, c2] = COLOR_SWATCH[c] ?? ["#dfe6e1", "#b9c4bb"];
              const active = color === c;
              return (
                <button
                  key={c}
                  title={c}
                  aria-label={`颜色 ${c}${hasColorVariant(product.slug, c) ? "（有实拍图）" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setColor(c);
                  }}
                  className={`h-4 w-4 rounded-full border transition-shadow ${
                    active ? "ring-2 ring-primary ring-offset-1" : ""
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${c1}, ${c2})`,
                    borderColor: active ? "var(--color-primary)" : "var(--color-line, #e5e0d3)",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
