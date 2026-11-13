# YUNSI 云丝

一个**完全原创**的丝绸电商站概念项目（Next.js + Supabase）。
设计语言仅参考高端丝绸电商的通用版式（宽留白 / 大图 Hero / 商品网格 / 胶囊按钮），
**不包含任何第三方品牌（含 LilySilk）的受保护内容**——配色、文案、商品、图片均为原创。

> 配套策划案：`D:\rust\projects\silk-atelier-plan`（品牌 / 设计令牌 / 产品目录 / 路线图）。

---

## 技术栈

- **Next.js 16**（App Router + TypeScript + Turbopack）
- **Tailwind CSS v4**（`globals.css` 内 `@theme` 设计令牌）
- **Supabase**（Postgres + Storage，可选——未配置时自动降级为本地 seed）
- 商品图：AI 生成的静物摄影（`public/products/`），程序化 SVG 丝缎作为回退

## 设计令牌（原创）

| 角色 | 色值 | 说明 |
|---|---|---|
| 主色 | `#274435` 墨玉绿 | 品牌 / CTA / 链接 |
| 强调 | `#b48a3c` 金 | 点缀 / 高端标签 |
| 背景 | `#f7f4ec` 象牙白 | 页面底 |
| 卡片 | `#fffdf7` 暖白 | 浮层 |

字体：`DM Serif Display`（标题）+ `Inter`（正文）+ `Noto Serif SC`（中文），全部免费可商用。

## 快速开始

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # 生产构建（24 页静态预渲染）
npm run lint
```

无需任何配置即可运行：商品数据来自 `src/data/products.ts` 种子，
商品图来自 `public/products/*.png`。

## 图片管线（M3）

```
public/products/<slug>.png          ← 本地 seed 图（AI 生成，13 张）
        │
        ▼  ProductImage 组件（src/components/product-image.tsx）
真实图优先，onError 自动回退到程序化 SVG 丝缎（src/components/product-art.tsx）
        │
        ▼  配置 Supabase 后（src/data/products.ts → productImageSrc / heroImageSrc）
自动切到 Supabase Storage 公共桶 product-images/
```

- **本地演示**：不配 `.env.local` 时，图片走 `public/products/`，缺图回退 SVG。
- **生产切 Supabase**：
  1. Supabase Dashboard → Storage 新建**公共**桶 `product-images`
  2. 把 `public/products/*.png` 上传进去（同名）
  3. 运行 `supabase/schema.sql`（已含 `product-images` 桶 + RLS：anon 读、service_role 写）
  4. 在 `.env.local` 填 `NEXT_PUBLIC_SUPABASE_URL`，`productImageSrc()` 自动改用 Storage URL

## 目录结构

```
src/
  app/                  # 页面（App Router）
    page.tsx            # 首页（Hero + 新品 + 分类磁贴 + 故事 + 订阅）
    shop/               # 商店（筛选 + 排序）
    product/[slug]/     # 商品详情（画廊 + 颜色尺码 + 手风琴 + 相关推荐）
    collections/        # 系列
    about/              # 关于
    journal/            # 日志（列表 + 详情）
    not-found.tsx       # 404
  components/
    header.tsx footer.tsx
    cart.tsx            # 购物车抽屉（localStorage 持久化）
    product-card.tsx    # 商品卡片
    product-image.tsx   # 图片管线（真实图 + SVG 回退）
    product-art.tsx     # 程序化 SVG 丝缎
    newsletter.tsx      # 订阅（client）
  data/products.ts      # 12 SKU 种子 + 图片解析 + 系列/日志/关于内容
  lib/supabase.ts       # Supabase 客户端（未配置时优雅降级）
public/products/        # 13 张 AI 生成商品图（含 hero）
supabase/schema.sql     # 表结构 + RLS + 种子 + product-images 存储桶
.env.example            # 环境模板（复制为 .env.local）
```

## 数据层（Supabase）

`supabase/schema.sql` 建 4 表：`products` / `collections` / `journal` / `orders`，
全部启用 RLS：商品/系列/日志公开可读，订单仅本人可读 + service_role 可写。
含 12 SKU + 3 系列 + 3 日志种子（`on conflict do nothing`，可重复执行）。

## 支付（M4，占位）

`.env.example` 已备好支付宝 / 微信支付配置位。结算按钮当前为演示态，
接入 `alipay-sdk` / 微信支付 v3 后即可收真实款项（见策划案 roadmap M4）。

## 合规

本项目所有视觉素材与文案均为原创。请勿将任何第三方品牌内容混入本仓库。

## License

MIT（代码）。商品图与文案为项目原创资产。
