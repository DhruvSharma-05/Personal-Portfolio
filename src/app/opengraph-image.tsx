import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — Web Analyst & Data Science`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time, so the social card can never drift out of sync with
 * the profile content the way a hand-exported PNG does.
 */
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
          background: "#09090b",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "#d6ff3f",
              color: "#0a0a0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ color: "#a1a1ac", fontSize: 24, letterSpacing: 4 }}>
            PORTFOLIO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#fafafa",
              fontSize: 128,
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: -4,
              textTransform: "uppercase",
            }}
          >
            {profile.firstName}
          </div>
          <div
            style={{
              color: "#d6ff3f",
              fontSize: 128,
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: -4,
              textTransform: "uppercase",
            }}
          >
            {profile.lastName}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#a1a1ac",
            fontSize: 28,
          }}
        >
          <div style={{ display: "flex" }}>
            Web Analyst · Data Science · UI/UX
          </div>
          <div style={{ display: "flex" }}>{profile.location}</div>
        </div>
      </div>
    ),
    size,
  );
}
