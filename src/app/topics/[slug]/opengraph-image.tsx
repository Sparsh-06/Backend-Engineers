import { ImageResponse } from "next/og";
import { getTopicBySlug } from "@/data/topics";

export const alt = "Backend Engineer topic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = { slug: string };

export default async function Image({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  const phase = topic?.phase ?? "Backend Engineer";
  const title = topic?.title ?? "Backend Engineering";
  const groupTitle = topic?.groupTitle ?? "backendengineer.in";
  const keywords = (topic?.keywords ?? []).slice(0, 3);

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

        {/* Top bar */}
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

        {/* Breadcrumb trail, echoing the topic page header */}
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
          <span style={{ display: "flex", color: "#ff4d00" }}>Topics</span>
          <span style={{ display: "flex", color: "rgba(0,0,0,0.3)" }}>·</span>
          <span style={{ display: "flex", color: "rgba(0,0,0,0.55)" }}>{groupTitle}</span>
        </div>

        {/* Phase + title block */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
          <span
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#ff4d00",
              marginBottom: 18,
            }}
          >
            {phase}
          </span>
          <span
            style={{
              display: "flex",
              fontSize: 66,
              fontWeight: 700,
              letterSpacing: -2.5,
              lineHeight: 1.05,
              color: "#000",
              maxWidth: 980,
            }}
          >
            {title}
          </span>
        </div>

        {/* Keyword tag row, echoing the topic page's #keyword tags */}
        <div
          style={{
            display: "flex",
            borderTop: "1px solid rgba(0,0,0,0.15)",
            paddingTop: 24,
            gap: 14,
          }}
        >
          {keywords.length > 0 ? (
            keywords.map((keyword) => (
              <span
                key={keyword}
                style={{
                  display: "flex",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "rgba(0,0,0,0.45)",
                }}
              >
                #{keyword}
              </span>
            ))
          ) : (
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
              backendengineer.in
            </span>
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
