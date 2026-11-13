import Link from "next/link";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { ProductArt } from "@/components/product-art";
import { Newsletter } from "@/components/newsletter";

export default function Home() {
  const newArrivals = PRODUCTS.slice(0, 8);
  const tiles = CATEGORIES.slice(1, 7);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-xs tracking-[0.2em] text-accent">
              HAND-REARED · 6A SILK
            </p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-primary md:text-6xl">
              把云，穿在身上。
            </h1>
            <p className="mt-5 max-w-md text-lg text-mute">
              太湖流域手工缫丝，十九姆米桑蚕丝。一件衬衫，从一颗蚕茧开始。
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                href="/shop"
                className="rounded-pill bg-primary px-7 py-3 text-sm font-medium text-surface hover:opacity-90"
              >
                选购真丝
              </Link>
              <Link
                href="/about"
                className="rounded-pill border border-line bg-surface px-7 py-3 text-sm text-ink hover:text-primary"
              >
                了解工艺 →
              </Link>
            </div>
          </div>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-card bg-line">
            <ProductArt
              slug="hero-silk"
              color="晨雾"
              ratio={4 / 3}
              label="YUNSI 云丝真丝 Hero 图"
            />
          </div>
        </div>
      </section>

      {/* 社会证明条 */}
      <div className="border-y border-line bg-surface">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-12 gap-y-2 px-6 py-5 text-sm text-mute">
          <span>98% 复购好评</span>
          <span>0 塑料包装</span>
          <span>90 天无理由</span>
        </div>
      </div>

      {/* 新品网格 */}
      <section className="section">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl text-ink md:text-4xl">
                这一季，轻一点。
              </h2>
              <p className="mt-2 text-mute">
                12 款新丝，雾白、河青、金桂——素色，但高级。
              </p>
            </div>
            <Link href="/shop" className="text-sm text-primary underline">
              查看全部
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {newArrivals.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 分类磁贴 */}
      <section className="section bg-surface">
        <div className="mx-auto max-w-[1280px] px-6">
          <h2 className="mb-10 font-display text-3xl text-ink">按品类逛逛</h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
            {tiles.map((c) => (
              <Link
                key={c}
                href={`/shop?cat=${encodeURIComponent(c)}`}
                className="group relative overflow-hidden rounded-card bg-line"
              >
                <div className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105">
                  <ProductArt
                    slug={`tile-${c}`}
                    color={c === "床品" ? "晨雾" : c === "围巾" ? "金桂" : "雾白"}
                    ratio={4 / 3}
                    label={`${c} 分类`}
                  />
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent p-5">
                  <span className="text-lg font-medium text-surface">
                    {c}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 品牌故事条 */}
      <section className="section">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl text-ink">一茧一衣，可追溯。</h2>
          <p className="mt-4 text-lg text-mute">
            每张「溯源卡」都能扫出这件衣服用了哪片桑园的茧。我们只用好丝，也只做好设计。
          </p>
          <Link
            href="/about"
            className="mt-8 inline-block rounded-pill border border-primary px-7 py-3 text-sm text-primary"
          >
            看品牌故事
          </Link>
        </div>
      </section>

      {/* 订阅 */}
      <section className="bg-primary py-16 text-surface">
        <div className="mx-auto max-w-xl px-6 text-center">
          <h2 className="font-display text-3xl">节气与新品，先寄给你。</h2>
          <p className="mt-3 text-surface/80">每月一封，讲一件衣服从蚕山到衣橱的路。</p>
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
