import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 14,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2 L22 7.2 V16.8 L12 22 L2 16.8 V7.2 Z"
            stroke="#00e5ff"
            strokeWidth="1.6"
            fill="rgba(0,229,255,0.08)"
          />
          <path d="M8 15 L12 7 L16 15" stroke="#00e5ff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.6 12 H14.4" stroke="#00e5ff" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { width: size.width, height: size.height }
  );
}
