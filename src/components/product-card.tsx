"use client";

import Link from "next/link";
import { useCart } from "./cart";
import { ProductArt } from "./product-art";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const off =
    Math.round((1 - product.priceCny / product.originalPriceCny) * 100);

  return (
    <div className="group flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative overflow-hidden rounded-img bg-line"
      >
        <div className="aspect-[3/4] w-full transition-transform duration-500 group-hover:scale-[1.03]">
          <ProductArt
            slug={product.slug}
            color={product.colors[0]}
            label={product.altText}
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
            onClick={() => add(product)}
            className="rounded-pill bg-primary px-5 py-2 text-surface transition-opacity hover:opacity-90"
          >
            加入购物车
          </button>
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c}
                title={c}
                className="h-4 w-4 rounded-full border border-line"
                style={{
                  background: `linear-gradient(135deg, ${
                    {
                      雾白: "#f3efe4", 月白: "#f6f3ea", 晨雾: "#e9e6da",
                      河青: "#5f7a6d", 墨玉绿: "#2f4d3d", 金桂: "#caa14f",
                      藕粉: "#e3c4bd", 藕: "#e0bdb4", 燕麦: "#e7ddca",
                    }[c] ?? "#dfe6e1"
                  }, ${
                    {
                      雾白: "#d9d3c2", 月白: "#ddd6c4", 晨雾: "#cfc9b8",
                      河青: "#3c5648", 墨玉绿: "#1d3128", 金桂: "#a67f37",
                      藕粉: "#c99f97", 藕: "#c79f95", 燕麦: "#cbbd9f",
                    }[c] ?? "#b9c4bb"
                  })`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
