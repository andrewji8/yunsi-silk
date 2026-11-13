export type Product = {
  slug: string;
  name: string;
  category: string;
  priceCny: number;
  originalPriceCny: number;
  colors: string[];
  sizes: string[];
  material: string;
  weight: string;
  shortDesc: string;
  altText: string;
};

/** 商品图文件名：去掉 slug 的 "yunsi-silk-" 前缀。 */
export const imageSlug = (slug: string) => slug.replace(/^yunsi-silk-/, "");

/**
 * 解析商品图 src（M3 图片管线）：
 *  - 配置了 NEXT_PUBLIC_SUPABASE_STORAGE_BASE / NEXT_PUBLIC_SUPABASE_URL 时，
 *    指向 Supabase Storage 公共桶 product-images/
 *  - 否则回退到本地 seed 图 public/products/<file>.png
 * NEXT_PUBLIC_* 前后端皆可读，client/server 组件都能用。
 */
export function productImageSrc(slug: string): string {
  const file = `${imageSlug(slug)}.png`;
  const base =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BASE ??
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (base) {
    return `${base.replace(/\/$/, "")}/storage/v1/object/public/product-images/${file}`;
  }
  return `/products/${file}`;
}

export const heroImageSrc = (): string =>
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BASE
    ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BASE.replace(/\/$/, "")}/product-images/hero.png`
    : "/products/hero.png";

export type JournalPost = {
  slug: string;
  title: string;
  summary: string;
  sections: { heading: string; body: string }[];
  cta: string;
};

/**
 * 产品目录种子（对应 silk-atelier-plan/products.csv，12 SKU）。
 * 上线前由 Supabase products 表替代；未配置 Supabase 时页面用本种子渲染。
 * 文案为原创草稿，产地/参数按真实供应链填写。
 */
export const PRODUCTS: Product[] = [
  { slug: "yunsi-silk-shirt-mist-white", name: "云丝衬衫·雾白", category: "衬衫", priceCny: 899, originalPriceCny: 1299, colors: ["雾白", "墨玉绿", "藕粉"], sizes: ["155", "160", "165", "170"], material: "100% 桑蚕长丝", weight: "19 姆米", shortDesc: "轻薄挺括的桑蚕丝衬衫，雾白如晨雾，通勤与度假皆宜。", altText: "雾白色桑蚕丝衬衫平铺" },
  { slug: "yunsi-silk-shirt-river", name: "云丝衬衫·河青", category: "衬衫", priceCny: 899, originalPriceCny: 1299, colors: ["河青", "雾白"], sizes: ["M", "L", "XL"], material: "100% 桑蚕长丝", weight: "19 姆米", shortDesc: "如河水般清透的青调衬衫，手工缫丝，一巾一衣。", altText: "河青色桑蚕丝衬衫" },
  { slug: "yunsi-silk-slip-dress", name: "云丝吊带裙·月白", category: "连衣裙", priceCny: 1299, originalPriceCny: 1899, colors: ["月白", "藕粉", "墨玉绿"], sizes: ["S", "M", "L"], material: "100% 桑蚕长丝", weight: "22 姆米", shortDesc: "垂坠感极佳的吊带长裙，睡与穿之间。", altText: "月白色桑蚕丝吊带裙" },
  { slug: "yunsi-silk-duvet-set", name: "云丝四件套·晨雾", category: "床品", priceCny: 1599, originalPriceCny: 2399, colors: ["晨雾", "月白"], sizes: ["1.5m", "1.8m"], material: "100% 桑蚕长丝", weight: "60 支 22 姆米", shortDesc: "四季可用的丝滑四件套，贴肤即凉。", altText: "晨雾色真丝四件套床品" },
  { slug: "yunsi-silk-pijama", name: "云丝睡衣·燕麦", category: "睡衣", priceCny: 799, originalPriceCny: 1199, colors: ["燕麦", "藕粉"], sizes: ["M", "L"], material: "100% 桑蚕长丝", weight: "19 姆米", shortDesc: "家居服，柔软亲肤，燕麦暖调。", altText: "燕麦色真丝睡衣套装" },
  { slug: "yunsi-silk-scarf-cashmere", name: "云丝方巾·金桂", category: "围巾", priceCny: 499, originalPriceCny: 699, colors: ["金桂", "墨玉绿", "雾白"], sizes: ["90cm", "140cm"], material: "100% 桑蚕长丝", weight: "8 姆米", shortDesc: "可作披肩、围巾、包饰的真丝方巾。", altText: "金桂色真丝方巾叠放" },
  { slug: "yunsi-silk-eyemask", name: "云丝眼罩", category: "配饰", priceCny: 299, originalPriceCny: 399, colors: ["月白", "藕粉", "墨玉绿"], sizes: ["均码"], material: "100% 桑蚕长丝", weight: "12 姆米", shortDesc: "助眠真丝眼罩，桑蚕丝养肤。", altText: "月白色真丝助眠眼罩" },
  { slug: "yunsi-silk-pillowcase", name: "云丝枕套·蚕丝蛋白", category: "床品", priceCny: 499, originalPriceCny: 699, colors: ["月白", "晨雾"], sizes: ["均码"], material: "100% 桑蚕长丝", weight: "19 姆米", shortDesc: "含天然蚕丝蛋白，护发护脸。", altText: "真丝枕套特写" },
  { slug: "yunsi-silk-blouse-nuance", name: "云丝罩衫·藕", category: "衬衫", priceCny: 999, originalPriceCny: 1499, colors: ["藕", "雾白"], sizes: ["M", "L", "XL"], material: "100% 桑蚕长丝", weight: "19 姆米", shortDesc: "微透罩衫，叠穿单品。", altText: "藕粉色真丝罩衫" },
  { slug: "yunsi-silk-kimono", name: "云丝和服袍·金桂", category: "外套", priceCny: 1099, originalPriceCny: 1599, colors: ["金桂", "墨玉绿"], sizes: ["M", "L"], material: "100% 桑蚕长丝", weight: "19 姆米", shortDesc: "可外出的丝质开衫，机场酒店皆宜。", altText: "金桂色真丝开衫和服袍" },
  { slug: "yunsi-silk-giftbox", name: "云丝礼品盒·定制", category: "礼盒", priceCny: 1999, originalPriceCny: 2899, colors: ["雾白", "金桂"], sizes: ["均码"], material: "100% 桑蚕长丝", weight: "多件组合", shortDesc: "含刻字 / 刺绣的乔迁婚庆礼盒。", altText: "真丝礼盒开启特写" },
  { slug: "yunsi-silk-throw", name: "云丝盖毯·晨雾", category: "床品", priceCny: 1399, originalPriceCny: 1999, colors: ["晨雾", "月白"], sizes: ["130cm×160cm"], material: "100% 桑蚕长丝", weight: "22 姆米", shortDesc: "沙发披搭盖毯，轻暖不闷。", altText: "晨雾色真丝盖毯搭于沙发" },
];

export const CATEGORIES = ["全部", "衬衫", "连衣裙", "床品", "睡衣", "围巾", "配饰", "外套", "礼盒"];

export const getCategories = () => CATEGORIES;

export const JOURNAL: JournalPost[] = [
  {
    slug: "momme-explained",
    title: "姆米是什么？19 姆米和 30 姆米差在哪",
    summary: "买真丝最怕看不懂参数。一文讲清「姆米」到底指什么，以及它如何决定一件衬衫的垂坠感与价格。",
    sections: [
      { heading: "姆米（mm）是什么", body: "9000 根丝束一米的重量（克）。数字越大，丝越多、布越厚。" },
      { heading: "常见区间", body: "8 姆米适合方巾，19 姆米适合衬衫，30 姆米适合礼服。" },
      { heading: "选购建议", body: "日常衬衫选 19–22 姆米，贴肤不闷、挺括有型。" },
    ],
    cta: "看看我们的 19 姆米衬衫",
  },
  {
    slug: "real-vs-fake-silk",
    title: "真丝和「仿真丝」，怎么一眼分清",
    summary: "莫代尔、冰丝、粘胶都在冒充「丝滑感」。三个小实验，一分钟辨真假。",
    sections: [
      { heading: "烧", body: "真丝是羽毛味、灰黑色；化纤是塑料味、硬球。" },
      { heading: "静电", body: "真丝几乎不粘手。" },
      { heading: "看吊牌成分", body: "认准 100% 桑蚕丝 / 柞蚕丝，警惕「聚酯纤维 95% + 氨纶 5%」。" },
    ],
    cta: "只用好丝，看我们的溯源卡",
  },
  {
    slug: "silk-care-guide",
    title: "真丝护理指南：洗、晾、存，一次讲透",
    summary: "真丝娇气但不麻烦。冷水、阴干、香樟子，三件事做对，一件穿十年。",
    sections: [
      { heading: "洗", body: "冷水 + 中性丝毛净，手洗 3 分钟内，别拧。" },
      { heading: "晾", body: "反面、阴凉、平铺或半挂。" },
      { heading: "存", body: "避光、防蛀，桑蚕丝怕樟脑丸，用雪松木。" },
    ],
    cta: "配一条丝质盖毯，给衣柜加层保护",
  },
];

export const ABOUT_PARAGRAPHS: { title: string; body: string }[] = [
  { title: "我们从哪里来", body: "YUNSI 云丝，始于太湖流域的一片桑园。我们把「好丝绸」拆成三个问题：丝从哪里来、怎么变成衣、凭什么让你放心。答案是：手工缫丝、传统机杼、和一张可以扫码的溯源卡。" },
  { title: "工艺", body: "蚕茧在 100°C 的水中缫丝，一根生丝并 16–20 根茧丝，全程手工理绪；19 姆米衬衫用传统方巾机，一天只织 3 米；无氯漂、低温染色，色牢度按 4 级测；每件熨整两次，最后一道是手检，针距 3.5cm。" },
  { title: "可持续", body: "蚕茧是蛋白质纤维，埋进土里 6 个月就能降解。我们承诺：包装零塑料、旧衣回收、每 100 件订单植一片桑苗。" },
  { title: "给你的一句话", body: "丝绸不是奢侈品，是把「日常」做讲究一点。一件能穿很多年的衬衫，比十件快时尚更划算。" },
];
