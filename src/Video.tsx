import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const LaboratoryVideo: React.FC = () => {
  const frame = useCurrentFrame();

  const introOpacity = interpolate(frame, [0, 18, 42], [0, 1, 1], {
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(frame, [35, 65, 250, 285], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = 1 + Math.sin(frame / 13) * 0.025;
  const scanY = (frame * 8) % 1920;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#080b10",
        color: "#e9f0f5",
        fontFamily: "Arial, Helvetica, sans-serif",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 42%, rgba(19,64,77,0.42) 0%, rgba(8,11,16,0) 58%), linear-gradient(145deg, #101820 0%, #07090d 72%)",
        }}
      />

      <AbsoluteFill
        style={{
          opacity: 0.18,
          backgroundImage:
            "linear-gradient(rgba(130,190,200,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(130,190,200,0.15) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: scanY,
          left: 0,
          right: 0,
          height: 3,
          background: "rgba(93, 220, 220, 0.24)",
          boxShadow: "0 0 24px rgba(93,220,220,0.35)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 100,
          left: 72,
          right: 72,
          display: "flex",
          justifyContent: "space-between",
          color: "#6e9ba4",
          fontSize: 22,
          letterSpacing: 5,
          opacity: introOpacity,
        }}
      >
        <span>ARCHIVE / 42</span>
        <span>REC ●</span>
      </div>

      <div
        style={{
          position: "absolute",
          top: 350,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: titleOpacity,
          transform: `scale(${pulse})`,
        }}
      >
        <div
          style={{
            width: 650,
            height: 650,
            border: "2px solid rgba(89, 207, 211, 0.55)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 90px rgba(47,180,190,0.12), inset 0 0 80px rgba(47,180,190,0.08)",
          }}
        >
          <div
            style={{
              width: 500,
              height: 500,
              border: "1px solid rgba(89, 207, 211, 0.25)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                color: "#73d5d5",
                fontSize: 30,
                letterSpacing: 12,
                marginBottom: 26,
              }}
            >
              CLASSIFIED
            </div>
            <div
              style={{
                fontSize: 92,
                fontWeight: 800,
                letterSpacing: -4,
                textShadow: "0 0 35px rgba(90,220,220,0.25)",
              }}
            >
              LAB_42
            </div>
            <div
              style={{
                width: 170,
                height: 3,
                background: "#70d1d1",
                marginTop: 32,
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 1120,
          left: 90,
          right: 90,
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            color: "#70d1d1",
            fontSize: 25,
            letterSpacing: 8,
            marginBottom: 22,
          }}
        >
          EXPERIMENT № 001
        </div>
        <div style={{ fontSize: 43, fontWeight: 700, lineHeight: 1.2 }}>
          THE SYSTEM
          <br />
          IS RUNNING
        </div>
        <div
          style={{
            marginTop: 34,
            width: "100%",
            height: 2,
            background: "rgba(112,209,209,0.25)",
          }}
        >
          <div
            style={{
              width: `${Math.min(100, (frame / 270) * 100)}%`,
              height: "100%",
              background: "#70d1d1",
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 72,
          right: 72,
          display: "flex",
          justifyContent: "space-between",
          color: "#55717a",
          fontSize: 19,
          letterSpacing: 4,
          opacity: introOpacity,
        }}
      >
        <span>DO NOT DISTURB</span>
        <span>42.001</span>
      </div>
    </AbsoluteFill>
  );
};
