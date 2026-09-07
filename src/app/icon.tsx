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
          background: "#ff6b2c",
          color: "#14110e",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 0,
          borderRadius: 4,
        }}
      >
        {profile.initials}
      </div>
    ),
    size,
  );
}
