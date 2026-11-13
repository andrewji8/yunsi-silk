"use client";

import { useState } from "react";
import { ProductArt } from "./product-art";

/**
 * M3 图片管线：优先显示真实图片（本地 public/ 或 Supabase Storage URL），
 * 图片缺失或加载失败时自动回退到程序化 SVG 丝缎，保证任何情况下都有图。
 */
export function ProductImage({
  image,
  slug,
  color = "默认",
  ratio = 3 / 4,
  label,
  eager = false,
}: {
  image?: string;
  slug: string;
  color?: string;
  ratio?: number;
  label?: string;
  eager?: boolean;
}) {
  const [error, setError] = useState(false);

  if (!image || error) {
    return (
      <div className="h-full w-full">
        <ProductArt slug={slug} color={color} ratio={ratio} label={label} />
      </div>
    );
  }

  return (
    // 用原生 <img> 而非 next/image：需 onError 回退到 SVG，且图源混合本地
    // public/ 与 Supabase Storage 外链（next/image 需额外 remotePatterns 配置）。
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt={label ?? "YUNSI 云丝商品图"}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className="h-full w-full object-cover"
      onError={() => setError(true)}
    />
  );
}
