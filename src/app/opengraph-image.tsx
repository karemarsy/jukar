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
          padding: "72px 84px",
          background: "#f7f4ed",
          backgroundImage: "repeating-linear-gradient(to bottom, transparent 0, transparent 55px, #dbe3f7 55px, #dbe3f7 56px)",
          color: "#142b4a",
          borderLeft: "12px solid #4268f5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="66" height="66" viewBox="0 0 40 40">
            <circle cx="20" cy="17.5" r="7.5" fill="#f3c969" />
            <path d="M3.5 21.5c6-2.6 11.4-2 16.5 1.6V35c-5-3.2-10.4-3.8-16.5-1.4z" fill="#142b4a" />
            <path d="M36.5 21.5c-6-2.6-11.4-2-16.5 1.6V35c5-3.2 10.4-3.8 16.5-1.4z" fill="#142b4a" />
          </svg>
          <div style={{ fontSize: 54, fontStyle: "italic" }}>jukar</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 1.02, letterSpacing: -2, maxWidth: 1000 }}>
            {`${hero.headline.before} ${hero.headline.emphasis}`}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 30, fontSize: 30, color: "#565f72" }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#f3c969" }} />
            {organization.descriptor}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
