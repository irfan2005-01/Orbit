import { ImageResponse } from "next/og";
import { BRAND_CONFIG } from "@/data/psyctech";

export const alt = "Orbite — Student Innovation & Product Ecosystem | LAEC Bidar";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#162323",
          padding: "70px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          border: "2px solid rgba(188, 128, 106, 0.35)",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "15px",
              color: "#BC806A",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            LINGARAJ APPA ENGINEERING COLLEGE, BIDAR
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "14px",
              color: "#806B64",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            EST. {BRAND_CONFIG.estYear}
          </div>
        </div>

        {/* Center Headline & Brand */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "76px",
              fontWeight: 700,
              color: "#EFE7E4",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              lineHeight: 1,
              marginBottom: "18px",
            }}
          >
            {BRAND_CONFIG.name.toUpperCase()}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "36px",
              fontWeight: 400,
              color: "#EFE7E4",
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
              marginBottom: "16px",
            }}
          >
            We don’t just build projects. We build people who build things.
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "20px",
              color: "#B59289",
              maxWidth: "880px",
              lineHeight: 1.4,
            }}
          >
            Bridging academic curriculum with real-world product engineering, R&D systems, and national hackathons.
          </div>
        </div>

        {/* Bottom Metadata & Status Pill */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(72, 74, 67, 0.55)",
            paddingTop: "24px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "8px",
                height: "8px",
                borderRadius: "999px",
                backgroundColor: "#BC806A",
                marginRight: "10px",
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: "15px",
                color: "#BC806A",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              COHORT 2026–27 ONBOARDING OPEN
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "15px",
              color: "#806B64",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            APPLIED R&D • STUDENT COMMUNITY
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
