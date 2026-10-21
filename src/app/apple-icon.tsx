import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon for iPhones and iPads: the Jukar mark on paper. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f6f0e4" }}>
        <svg width="132" height="132" viewBox="0 0 40 40">
          <circle cx="20" cy="17.5" r="7.5" fill="#f2b33d" />
          <path d="M3.5 21.5c6-2.6 11.4-2 16.5 1.6V35c-5-3.2-10.4-3.8-16.5-1.4z" fill="#1f3b2d" />
          <path d="M36.5 21.5c-6-2.6-11.4-2-16.5 1.6V35c5-3.2 10.4-3.8 16.5-1.4z" fill="#1f3b2d" />
        </svg>
      </div>
    ),
    size,
  );
}
