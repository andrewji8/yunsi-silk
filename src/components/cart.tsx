"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ProductArt } from "./product-art";
import type { Product } from "@/data/products";

export type CartItem = {
  product: Product;
  color: string;
  size: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  add: (p: Product, color?: string, size?: string, qty?: number) => void;
  remove: (i: number) => void;
  setQty: (i: number, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "yunsi-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add = useCallback(
    (p: Product, color?: string, size?: string, qty = 1) => {
      const c = color ?? p.colors[0];
      const s = size ?? p.sizes[0];
      setItems((prev) => {
        const idx = prev.findIndex(
          (it) => it.product.slug === p.slug && it.color === c && it.size === s
        );
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: next[idx].qty + qty };
          return next;
        }
        return [...prev, { product: p, color: c, size: s, qty }];
      });
      setOpen(true);
    },
    []
  );

  const remove = useCallback((i: number) => {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }, []);

  const setQty = useCallback((i: number, qty: number) => {
    setItems((prev) =>
      prev.map((it, idx) => (idx === i ? { ...it, qty: Math.max(1, qty) } : it))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((n, it) => n + it.qty, 0);
    const subtotal = items.reduce(
      (n, it) => n + it.product.priceCny * it.qty,
      0
    );
    return { items, add, remove, setQty, clear, count, subtotal, open, setOpen };
  }, [items, add, remove, setQty, clear, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartDrawer() {
  const { items, setQty, remove, subtotal, count, open, setOpen } = useCart();
  return (
    <aside
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-black/30 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-surface shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-2xl text-primary">
            购物车
            <span className="ml-2 text-sm text-mute">（{count}）</span>
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="rounded-pill border border-line px-4 py-1.5 text-sm text-mute hover:text-ink"
          >
            关闭
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="py-16 text-center text-mute">购物车还是空的</p>
          ) : (
            <ul className="space-y-5">
              {items.map((it, i) => (
                <li key={i} className="flex gap-4">
                  <div className="h-20 w-16 shrink-0 overflow-hidden rounded-img bg-line">
                    <ProductArt
                      slug={it.product.slug}
                      color={it.color}
                      label={it.product.altText}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-ink">{it.product.name}</p>
                    <p className="text-xs text-mute">
                      {it.color} / {it.size}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        onClick={() => setQty(i, it.qty - 1)}
                        className="h-7 w-7 rounded-full border border-line text-mute"
                      >
                        −
                      </button>
                      <span className="text-sm">{it.qty}</span>
                      <button
                        onClick={() => setQty(i, it.qty + 1)}
                        className="h-7 w-7 rounded-full border border-line text-mute"
                      >
                        +
                      </button>
                      <button
                        onClick={() => remove(i)}
                        className="ml-auto text-xs text-mute underline"
                      >
                        移除
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-primary">
                    ¥{it.product.priceCny * it.qty}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-line px-6 py-5">
          <div className="mb-3 flex items-center justify-between text-lg">
            <span className="text-mute">小计</span>
            <span className="font-display text-primary">¥{subtotal}</span>
          </div>
          <button
            disabled={items.length === 0}
            className="w-full rounded-pill bg-primary py-3 text-sm font-medium text-surface disabled:opacity-40"
          >
            去结算（支付宝 / 微信）
          </button>
          <p className="mt-2 text-center text-xs text-mute">
            支持支付宝 · 微信支付，90 天无理由
          </p>
        </div>
      </div>
    </aside>
  );
}
