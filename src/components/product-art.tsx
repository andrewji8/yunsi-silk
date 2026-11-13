import { useId } from "react";

/**
 * 程序化丝缎 SVG 图案 —— 每个商品由 slug + 颜色确定性生成，
 * 无二进制图片依赖。颜色名映射到 YUNSI 原创色板。
 */
const COLOR_MAP: Record<string, [string, string]> = {
  雾白: ["#f3efe4", "#d9d3c2"],
  月白: ["#f6f3ea", "#ddd6c4"],
  晨雾: ["#e9e6da", "#cfc9b8"],
  河青: ["#5f7a6d", "#3c5648"],
  墨玉绿: ["#2f4d3d", "#1d3128"],
  金桂: ["#caa14f", "#a67f37"],
  藕粉: ["#e3c4bd", "#c99f97"],
  藕: ["#e0bdb4", "#c79f95"],
  燕麦: ["#e7ddca", "#cbbd9f"],
  默认: ["#dfe6e1", "#b9c4bb"],
};

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % 1000;
}

export function ProductArt({
  slug,
  color = "默认",
  ratio = 3 / 4,
  label,
}: {
  slug: string;
  color?: string;
  ratio?: number;
  label?: string;
}) {
  const [c1, c2] = COLOR_MAP[color] ?? COLOR_MAP["默认"];
  const seed = hashSeed(slug + color);
  const gid = useId().replace(/:/g, "");
  const w = 100;
  const h = Math.round((100 / ratio) * 1) ;

  // 确定性生成 4 条流动的丝绸曲线
  const strands = Array.from({ length: 4 }, (_, i) => {
    const base = 20 + i * (h / 4) + (seed % 7);
    const amp = 8 + ((seed >> (i + 1)) % 9);
    return `M0 ${base} C 30 ${base - amp}, 60 ${base + amp}, ${w} ${base - amp / 2}`;
  });

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={label ?? "YUNSI 云丝商品图"}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`g-${gid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={w} height={h} fill={`url(#g-${gid})`} />
      {strands.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth={i % 2 ? 0.6 : 1.2}
        />
      ))}
      {/* 丝绸高光 */}
      <ellipse
        cx={w * 0.35}
        cy={h * 0.3}
        rx={w * 0.5}
        ry={h * 0.18}
        fill="rgba(255,255,255,0.16)"
      />
    </svg>
  );
}
