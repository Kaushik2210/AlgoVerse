import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AlgoVerse — Learn Algorithms Visually";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 20% 20%, rgba(0,229,255,0.16), transparent 45%), radial-gradient(circle at 85% 80%, rgba(155,93,229,0.16), transparent 45%), #08090d",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "10px 28px",
            borderRadius: 999,
            border: "1px solid rgba(0,229,255,0.35)",
            background: "rgba(0,229,255,0.06)",
            color: "#00e5ff",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 36,
          }}
        >
          Data Structures &amp; Algorithms
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 128,
            fontWeight: 800,
            letterSpacing: 2,
            color: "#f5f7fa",
          }}
        >
          ALGO<span style={{ color: "#00e5ff" }}>VERSE</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 30,
            color: "#8b93a8",
            maxWidth: 880,
            textAlign: "center",
          }}
        >
          A real step-through visualizer, 38 topics, and 635+ solved LeetCode problems
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=86400" },
    }
  );
}
