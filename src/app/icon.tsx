import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Generated favicon — the previous site pointed at a favicon.ico that did not exist. */
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
          background: "#d6ff3f",
          color: "#0a0a0b",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: -1,
          borderRadius: 14,
        }}
      >
        {profile.initials}
      </div>
    ),
    size,
  );
}
