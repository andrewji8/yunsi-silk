import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { ProductArt } from "@/components/product-art";

const COLLECTIONS = [
  {
    slug: "shangri-la-sanctuary",
    name: "云上居所 · 床品系列",
    desc: "四件套、枕套、盖毯——把丝滑铺进卧室。",
    color: "晨雾",
    filter: "床品",
  },
  {
    slug: "everyday-luxury",
    name: "日常讲究 · 衣饰系列",
    desc: "衬衫、罩衫、和服袍——通勤与度假皆可。",
    color: "雾白",
    filter: "衬衫",
  },
  {
    slug: "gift-of-silk",
    name: "送礼有心 · 礼盒系列",
    desc: "含刻字刺绣的乔迁、婚庆礼盒。",
    color: "金桂",
    filter: "礼盒",
  },
];

export default function Collections() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-12">
      <h1 className="font-display text-4xl text-primary">系列</h1>
      <p className="mt-2 max-w-xl text-mute">
        围绕「日常讲究」的三个系列，按你的场景挑。
      </p>

      <div className="mt-10 space-y-16">
        {COLLECTIONS.map((c) => {
          const items =
            c.filter === "全部"
              ? PRODUCTS
              : PRODUCTS.filter((p) => p.category === c.filter);
          return (
            <section key={c.slug}>
              <div className="mb-6 flex items-center gap-5">
                <div className="h-14 w-14 overflow-hidden rounded-img bg-line">
                  <ProductArt
                    slug={c.slug}
                    color={c.color}
                    ratio={1}
                    label={c.name}
                  />
                </div>
                <div>
                  <h2 className="font-display text-2xl text-ink">{c.name}</h2>
                  <p className="text-sm text-mute">{c.desc}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
                {items.slice(0, 4).map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
              <Link
                href={`/shop?cat=${encodeURIComponent(c.filter)}`}
                className="mt-6 inline-block text-sm text-primary underline"
              >
                查看{c.filter}全部 →
              </Link>
            </section>
          );
        })}
      </div>
    </div>
  );
}
