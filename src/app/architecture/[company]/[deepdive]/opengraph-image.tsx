import { ImageResponse } from "next/og";
import { getDeepDive } from "@/data/architecture-deep-dives";
import { getArchitectureProfile } from "@/data/architecture-profiles";

export const alt = "Backend Engineer - How they scaled it";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = { company: string; deepdive: string };

export default async function Image({ params }: { params: Promise<Params> }) {
  const { company, deepdive } = await params;
  const deepDive = getDeepDive(company, deepdive);
  const profile = getArchitectureProfile(company);

  const companyName = profile?.company ?? "Backend Engineer";
  const title = deepDive?.title ?? "How they scaled it";
  const tagline = deepDive?.tagline ?? "A deep dive into real engineering";

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
          padding: "56px 64px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -150,
            right: -150,
            width: 480,
            height: 480,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 77, 0, 0.14)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: "#000" }}>Backend</span>
          <span
            style={{
              display: "flex",
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: "#ff4d00",
            }}
          />
          <span style={{ fontSize: 20, fontWeight: 700, color: "#000" }}>Engineer</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 44,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          <span style={{ display: "flex", color: "#ff4d00" }}>Deep dive</span>
          <span style={{ display: "flex", color: "rgba(0,0,0,0.3)" }}>·</span>
          <span style={{ display: "flex", color: "rgba(0,0,0,0.55)" }}>{companyName}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
          <span
            style={{
              display: "flex",
              fontSize: 54,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.08,
              color: "#000",
              maxWidth: 1000,
            }}
          >
            {title}
          </span>
          <span
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 24,
              color: "#ff4d00",
              maxWidth: 900,
            }}
          >
            {tagline}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            borderTop: "1px solid rgba(0,0,0,0.15)",
            paddingTop: 24,
            gap: 14,
          }}
        >
          <span
            style={{
              display: "flex",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.45)",
            }}
          >
            backendengineer.in/architecture
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
