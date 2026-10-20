import { ImageResponse } from "next/og";
import { hero, organization } from "@/content/site";

export const alt = `${organization.name} — ${organization.descriptor}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f6f0e4",
          backgroundImage: "repeating-linear-gradient(to bottom, transparent 0, transparent 55px, #d3dde3 55px, #d3dde3 56px)",
          color: "#1f3b2d",
          borderLeft: "10px solid #b4502d",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 40 40">
            <circle cx="20" cy="18" r="7.5" fill="#f2b33d" />
            <path d="M3.5 21.5c6-2.6 11.4-2 16.5 1.6V35c-5-3.2-10.4-3.8-16.5-1.4z" fill="#1f3b2d" />
            <path d="M36.5 21.5c-6-2.6-11.4-2-16.5 1.6V35c5-3.2 10.4-3.8 16.5-1.4z" fill="#1f3b2d" />
          </svg>
          <div style={{ fontSize: 52, fontStyle: "italic", fontWeight: 600 }}>jukar</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 86, lineHeight: 1.04, letterSpacing: -2, maxWidth: 980 }}>
            {`${hero.headline.before} ${hero.headline.emphasis}`}
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#4b4d45" }}>{organization.descriptor}</div>
        </div>
      </div>
    ),
    size,
  );
}
