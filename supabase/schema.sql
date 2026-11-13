-- YUNSI 云丝 Supabase schema
-- 在 Supabase SQL Editor 运行。启用 RLS；anon 只读 products/collections/journal。

-- 商品
create table if not exists products (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  category text not null,
  price_cny integer not null,
  original_price_cny integer,
  colors text[] not null default '{}',
  sizes text[] not null default '{}',
  material text,
  weight text,
  short_desc text,
  alt_text text,
  created_at timestamptz default now()
);

-- 系列
create table if not exists collections (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  description text,
  filter_category text,
  accent_color text
);

-- 日志
create table if not exists journal (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  summary text,
  body jsonb,          -- [{heading, body}]
  cta text,
  published_at timestamptz default now()
);

-- 订单
create table if not exists orders (
  id bigint generated always as identity primary key,
  customer_email text,
  customer_name text,
  items jsonb not null,       -- [{slug, color, size, qty, unit_price}]
  total_cny integer not null,
  status text not null default 'pending',   -- pending/paid/shipped/delivered/refunded
  channel text,                 -- alipay / wechat / stripe
  paid_at timestamptz,
  created_at timestamptz default now()
);

alter table products enable row level security;
alter table collections enable row level security;
alter table journal enable row level security;
alter table orders enable row level security;

-- 公开可读（商品/系列/日志）
create policy "public_read_products" on products for select using (true);
create policy "public_read_collections" on collections for select using (true);
create policy "public_read_journal" on journal for select using (true);

-- 订单：仅认证用户可见自己的；service_role（API）可写
create policy "auth_read_own_orders" on orders for select
  using (auth.jwt() ->> 'email' = customer_email);
create policy "service_write_orders" on orders for insert
  with check (true);
create policy "service_update_orders" on orders for update using (true);

-- 种子（对应 products.csv / JOURNAL / COLLECTIONS，12 SKU + 3 系列 + 3 日志）
insert into products (slug, name, category, price_cny, original_price_cny, colors, sizes, material, weight, short_desc, alt_text) values
 ('yunsi-silk-shirt-mist-white','云丝衬衫·雾白','衬衫',899,1299,'{雾白,墨玉绿,藕粉}','{155,160,165,170}','100% 桑蚕长丝','19 姆米','轻薄挺括的桑蚕丝衬衫，雾白如晨雾，通勤与度假皆宜。','雾白色桑蚕丝衬衫平铺'),
 ('yunsi-silk-shirt-river','云丝衬衫·河青','衬衫',899,1299,'{河青,雾白}','{M,L,XL}','100% 桑蚕长丝','19 姆米','如河水般清透的青调衬衫，手工缫丝，一巾一衣。','河青色桑蚕丝衬衫'),
 ('yunsi-silk-slip-dress','云丝吊带裙·月白','连衣裙',1299,1899,'{月白,藕粉,墨玉绿}','{S,M,L}','100% 桑蚕长丝','22 姆米','垂坠感极佳的吊带长裙，睡与穿之间。','月白色桑蚕丝吊带裙'),
 ('yunsi-silk-duvet-set','云丝四件套·晨雾','床品',1599,2399,'{晨雾,月白}','{1.5m,1.8m}','100% 桑蚕长丝','60 支 22 姆米','四季可用的丝滑四件套，贴肤即凉。','晨雾色真丝四件套床品'),
 ('yunsi-silk-pijama','云丝睡衣·燕麦','睡衣',799,1199,'{燕麦,藕粉}','{M,L}','100% 桑蚕长丝','19 姆米','家居服，柔软亲肤，燕麦暖调。','燕麦色真丝睡衣套装'),
 ('yunsi-silk-scarf-cashmere','云丝方巾·金桂','围巾',499,699,'{金桂,墨玉绿,雾白}','{90cm,140cm}','100% 桑蚕长丝','8 姆米','可作披肩、围巾、包饰的真丝方巾。','金桂色真丝方巾叠放'),
 ('yunsi-silk-eyemask','云丝眼罩','配饰',299,399,'{月白,藕粉,墨玉绿}','{均码}','100% 桑蚕长丝','12 姆米','助眠真丝眼罩，桑蚕丝养肤。','月白色真丝助眠眼罩'),
 ('yunsi-silk-pillowcase','云丝枕套·蚕丝蛋白','床品',499,699,'{月白,晨雾}','{均码}','100% 桑蚕长丝','19 姆米','含天然蚕丝蛋白，护发护脸。','真丝枕套特写'),
 ('yunsi-silk-blouse-nuance','云丝罩衫·藕','衬衫',999,1499,'{藕,雾白}','{M,L,XL}','100% 桑蚕长丝','19 姆米','微透罩衫，叠穿单品。','藕粉色真丝罩衫'),
 ('yunsi-silk-kimono','云丝和服袍·金桂','外套',1099,1599,'{金桂,墨玉绿}','{M,L}','100% 桑蚕长丝','19 姆米','可外出的丝质开衫，机场酒店皆宜。','金桂色真丝开衫和服袍'),
 ('yunsi-silk-giftbox','云丝礼品盒·定制','礼盒',1999,2899,'{雾白,金桂}','{均码}','100% 桑蚕长丝','多件组合','含刻字 / 刺绣的乔迁婚庆礼盒。','真丝礼盒开启特写'),
 ('yunsi-silk-throw','云丝盖毯·晨雾','床品',1399,1999,'{晨雾,月白}','{130cm×160cm}','100% 桑蚕长丝','22 姆米','沙发披搭盖毯，轻暖不闷。','晨雾色真丝盖毯搭于沙发')
on conflict (slug) do nothing;

insert into collections (slug, name, description, filter_category, accent_color) values
 ('shangri-la-sanctuary','云上居所 · 床品系列','四件套、枕套、盖毯——把丝滑铺进卧室。','床品','晨雾'),
 ('everyday-luxury','日常讲究 · 衣饰系列','衬衫、罩衫、和服袍——通勤与度假皆可。','衬衫','雾白'),
 ('gift-of-silk','送礼有心 · 礼盒系列','含刻字刺绣的乔迁、婚庆礼盒。','礼盒','金桂')
on conflict (slug) do nothing;

insert into journal (slug, title, summary, body, cta) values
 ('momme-explained','姆米是什么？19 姆米和 30 姆米差在哪','买真丝最怕看不懂参数。',[{"heading":"姆米（mm）是什么","body":"9000 根丝束一米的重量（克）。数字越大，丝越多、布越厚。"},{"heading":"常见区间","body":"8 姆米适合方巾，19 姆米适合衬衫，30 姆米适合礼服。"},{"heading":"选购建议","body":"日常衬衫选 19–22 姆米，贴肤不闷、挺括有型。"}],'看看我们的 19 姆米衬衫'),
 ('real-vs-fake-silk','真丝和「仿真丝」，怎么一眼分清','三个小实验，一分钟辨真假。',[{"heading":"烧","body":"真丝是羽毛味、灰黑色；化纤是塑料味、硬球。"},{"heading":"静电","body":"真丝几乎不粘手。"},{"heading":"看吊牌成分","body":"认准 100% 桑蚕丝 / 柞蚕丝。"}],'只用好丝，看我们的溯源卡'),
 ('silk-care-guide','真丝护理指南：洗、晾、存，一次讲透','冷水、阴干、香樟子。',[{"heading":"洗","body":"冷水 + 中性丝毛净，手洗 3 分钟内，别拧。"},{"heading":"晾","body":"反面、阴凉、平铺或半挂。"},{"heading":"存","body":"避光、防蛀，桑蚕丝怕樟脑丸，用雪松木。"}],'配一条丝质盖毯，给衣柜加层保护')
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- M3 商品图：Supabase Storage 公共桶 product-images
--   1) 在 Supabase Dashboard → Storage 新建公共桶 product-images
--   2) 上传 public/products/*.png 到该桶（与本地 seed 同名）
--   3) 前端 productImageSrc() 检测到 NEXT_PUBLIC_SUPABASE_URL 后自动切到该桶
--      （见 src/data/products.ts）
--   下方 RLS 允许 anon 读取该桶（公共可读），写入仅 service_role。
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

create policy "public_read_product_images" on storage.objects for select
  using (bucket_id = 'product-images');

create policy "service_write_product_images" on storage.objects for insert
  to service_role with check (bucket_id = 'product-images');
