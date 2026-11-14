import type { Metadata } from "next";
import { Inter, DM_Serif_Display, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { CartProvider, CartDrawer } from "@/components/cart";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "YUNSI 云丝 — 把云穿在身上",
    template: "%s | YUNSI 云丝",
  },
  description:
    "太湖流域手工缫丝，十九姆米桑蚕丝。一件衬衫，从一颗蚕茧开始。YUNSI 云丝，讲究日常的丝绸。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-CN"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${dmSerif.variable} ${notoSerifSC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
