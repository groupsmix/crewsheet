import { ImageResponse } from "next/og";

export const alt = "CrewSheet — Run your cleaning business from one Google Sheet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #f0fdf4 0%, #fafaf7 50%, #ecfdf5 100%)",
          padding: "70px 80px",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "#059669",
              color: "white",
              borderRadius: 12,
              fontWeight: 800,
              fontSize: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            CS
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#0a0a0a" }}>CrewSheet</div>
        </div>

        <div
          style={{
            marginTop: 60,
            fontSize: 78,
            lineHeight: 1.04,
            fontWeight: 700,
            color: "#0a0a0a",
            letterSpacing: -2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Run your cleaning business</span>
          <span style={{ color: "#047857" }}>from one Google Sheet.</span>
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "#404040",
            maxWidth: 980,
            lineHeight: 1.3,
          }}
        >
          DIY $97 · Done-for-you $497 · One-time, paid once · 1/5 the cost of Jobber.
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 50,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#525252",
          }}
        >
          <span>crewsheet.app</span>
          <span style={{ display: "flex", gap: 12 }}>
            <Pill>Google Sheets</Pill>
            <Pill>Glide</Pill>
            <Pill>Apps Script</Pill>
            <Pill>Stripe</Pill>
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}

function Pill({ children }: { children: string }) {
  return (
    <span
      style={{
        background: "white",
        border: "1px solid #d4d4d4",
        borderRadius: 999,
        padding: "8px 16px",
        fontSize: 18,
        color: "#262626",
      }}
    >
      {children}
    </span>
  );
}
