import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — AI Engineer & Data Science`;
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
          background: "#14110e",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 2,
              background: "#ff6b2c",
              color: "#14110e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ color: "#a89a89", fontSize: 24, letterSpacing: 4 }}>
            PORTFOLIO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#f4ede3",
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
              color: "#ff6b2c",
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
            color: "#a89a89",
            fontSize: 28,
          }}
        >
          <div style={{ display: "flex" }}>
            AI Engineer · Data · Machine Learning
          </div>
          <div style={{ display: "flex" }}>{profile.location}</div>
        </div>
      </div>
    ),
    size,
  );
}
