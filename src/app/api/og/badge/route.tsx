import { ImageResponse } from "next/og";
import { badgeById, plateValue, type PlateTier } from "@/lib/badges";

export const runtime = "edge";

/** Same hex-shield + bevel path used by BadgePlate.tsx (176x176 viewBox),
 * rendered here as raw SVG rather than CSS clip-path — satori (the
 * ImageResponse renderer) renders embedded SVG directly, which reproduces
 * the exact plate shape instead of an approximation. */
const HEX_PATH = "M88 4 L164 46 V134 L88 176 L12 134 V46 Z";
const BEVEL_PATH = "M88 12 L156 50 V130 L88 168 L20 130 V50 Z";

const TIER_GRADIENT_STOPS: Record<PlateTier, [string, string, string]> = {
  copper: ["#f0b487", "#c97b3d", "#6e3d1c"],
  bronze: ["#ffcf8a", "#d99a4e", "#7a4a1e"],
  silver: ["#ffffff", "#c3ccd9", "#6b7482"],
  gold: ["#fff2c2", "#f0b840", "#8a5c10"],
  holo: ["#baf9ff", "#00e5ff", "#9b5de5"],
  rank: ["#ffe6a8", "#e0a13a", "#9b5de5"],
  target: ["#c8faff", "#12b8d6", "#054450"],
};

const TIER_ACCENT: Record<PlateTier, string> = {
  copper: "#e2915a",
  bronze: "#d99a4e",
  silver: "#cfd7e3",
  gold: "#ffcf5a",
  holo: "#7ff2ff",
  rank: "#e0a13a",
  target: "#12b8d6",
};

function formatDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") ?? "";
  const badge = badgeById(slug);

  if (!badge) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#08090d",
            color: "#8b93a8",
            fontSize: 32,
          }}
        >
          Badge not found
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  const name = searchParams.get("name") || "AlgoVerse User";
  const date = formatDate(searchParams.get("date"));
  const value = plateValue(badge);
  const accent = TIER_ACCENT[badge.tier];
  const [g1, g2, g3] = TIER_GRADIENT_STOPS[badge.tier];
  const plateSize = 300;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 18% 15%, rgba(0,229,255,0.10), transparent 45%), radial-gradient(circle at 85% 80%, rgba(155,93,229,0.10), transparent 45%), #08090d",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 64, padding: "0 80px" }}>
          {/* Hex-shield plate — same path as BadgePlate.tsx. Satori (the OG
             renderer) doesn't support <text> inside embedded SVG, so the
             center value is a plain HTML div overlaid on top instead. */}
          <div style={{ position: "relative", width: plateSize, height: plateSize, display: "flex", flexShrink: 0 }}>
            <svg width={plateSize} height={plateSize} viewBox="0 0 176 176">
              <defs>
                <linearGradient id="plate" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={g1} />
                  <stop offset="45%" stopColor={g2} />
                  <stop offset="100%" stopColor={g3} />
                </linearGradient>
                <radialGradient id="dome" cx="50%" cy="38%" r="65%">
                  <stop offset="0%" stopColor="#182238" />
                  <stop offset="100%" stopColor="#050710" />
                </radialGradient>
              </defs>
              <path d={HEX_PATH} fill="url(#plate)" />
              <path d={BEVEL_PATH} fill="#0a0b10" />
              <path d={BEVEL_PATH} fill="none" stroke={accent} strokeWidth={1} opacity={0.4} />
              <circle cx="88" cy="82" r="40" fill="url(#dome)" />
              <circle cx="88" cy="82" r="40" fill="none" stroke={accent} strokeWidth={1.6} opacity={0.7} />
            </svg>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: plateSize * 0.44,
                width: plateSize,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#eef1f8",
                fontWeight: 900,
                fontSize: value.length > 3 ? 34 : 44,
              }}
            >
              {value}
            </div>
          </div>

          {/* Certificate text */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 640 }}>
            <span
              style={{
                fontSize: 16,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#00e5ff",
                fontWeight: 600,
              }}
            >
              Verified Credential · AlgoVerse
            </span>
            <span
              style={{
                fontSize: 64,
                fontWeight: 900,
                letterSpacing: 1,
                color: accent,
                lineHeight: 1.05,
              }}
            >
              {badge.name}
            </span>
            <span style={{ fontSize: 22, color: "#c7cbd6", fontWeight: 500 }}>
              {badge.description}
            </span>
            <span
              style={{
                marginTop: 18,
                fontSize: 18,
                color: "#8b93a8",
                display: "flex",
                gap: 10,
              }}
            >
              <span style={{ color: "#eef1f8", fontWeight: 700 }}>{name}</span>
              {date && <span>· earned {date}</span>}
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
