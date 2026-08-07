import { ImageResponse } from "next/og";

export const alt = "Backend Engineer — Backend engineering, explained visually";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const stats: [string, string][] = [
  ["Visual", "mental models"],
  ["No jargon", "by default"],
  ["Always", "free"],
];

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#EEE9E3",
          position: "relative",
          padding: "56px 64px 0 64px",
        }}
      >
        {/* Corner glow, echoing the hero's blur circle */}
        <div
          style={{
            position: "absolute",
            top: -140,
            left: -140,
            width: 460,
            height: 460,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 77, 0, 0.16)",
            display: "flex",
          }}
        />

        {/* Top bar, echoing the navbar mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: "#000" }}>Backend</span>
          <span
            style={{
              display: "flex",
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: "#ff4d00",
            }}
          />
          <span style={{ fontSize: 22, fontWeight: 700, color: "#000" }}>Engineer</span>
        </div>

        {/* Main two-column row */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            gap: 40,
            marginTop: 8,
          }}
        >
          {/* Left: headline + tagline */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1.15 }}>
            <span
              style={{
                display: "flex",
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.5)",
                marginBottom: 18,
              }}
            >
              Backend engineering, explained visually
            </span>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                fontSize: 80,
                fontWeight: 700,
                letterSpacing: -3.5,
                lineHeight: 0.98,
                color: "#000",
              }}
            >
              <span style={{ display: "flex" }}>Make&nbsp;the&nbsp;invisible</span>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 80,
                fontWeight: 400,
                fontStyle: "italic",
                letterSpacing: -3.5,
                lineHeight: 0.98,
                color: "#ff4d00",
              }}
            >
              click.
            </div>
            <span
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 21,
                lineHeight: 1.4,
                color: "rgba(0,0,0,0.6)",
                maxWidth: 460,
              }}
            >
              A library for learning backend engineering and system design.
            </span>
          </div>

          {/* Right: a small, quiet panel echoing the phase curriculum */}

        </div>

        {/* Stat row, echoing the hero's bottom strip */}
        <div
          style={{
            display: "flex",
            borderTop: "1px solid rgba(0,0,0,0.15)",
            paddingTop: 22,
            paddingBottom: 40,
            gap: 56,
          }}
        >
          {stats.map(([stat, label]) => (
            <div key={stat} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ display: "flex", fontSize: 22, fontWeight: 700, color: "#000" }}>
                {stat}
              </span>
              <span
                style={{
                  display: "flex",
                  marginTop: 2,
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: "rgba(0,0,0,0.5)",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
