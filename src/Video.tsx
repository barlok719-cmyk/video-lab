import React from "react";
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const CYAN = "#00E6D5";
const PINK = "#E000D8";
const WHITE = "#F5F7FA";
const BLACK = "#050609";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

const GlowLine: React.FC<{ top: number; delay?: number; reverse?: boolean }> = ({
  top,
  delay = 0,
  reverse = false,
}) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame - delay, [0, 30, 90], reverse ? [1100, 500, -250] : [-250, 500, 1100], clamp);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: x,
        width: 240,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${reverse ? PINK : CYAN}, transparent)`,
        boxShadow: `0 0 18px ${reverse ? PINK : CYAN}`,
        opacity: 0.8,
      }}
    />
  );
};

export const ICQAd: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const introIn = spring({ frame, fps, config: { damping: 16, stiffness: 110 } });
  const introOut = interpolate(frame, [0, 10, 64, 80], [0, 1, 1, 0], clamp);
  const demoIn = spring({ frame: frame - 72, fps, config: { damping: 18, stiffness: 95 } });
  const demoOut = interpolate(frame, [72, 86, 285, 300], [0, 1, 1, 0], clamp);
  const endIn = spring({ frame: frame - 290, fps, config: { damping: 16, stiffness: 100 } });
  const pulse = 1 + Math.sin(frame / 11) * 0.018;

  const logo = staticFile("logo.jpg");
  const source = staticFile("icq-source-redacted.mp4");

  return (
    <AbsoluteFill style={{ backgroundColor: BLACK, color: WHITE, fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(0,230,213,0.12), transparent 48%), radial-gradient(ellipse at 85% 75%, rgba(224,0,216,0.09), transparent 42%)",
        }}
      />
      <div style={{ position: "absolute", inset: 28, border: "1px solid rgba(0,230,213,0.20)", borderRadius: 30 }} />
      <GlowLine top={310} delay={2} />
      <GlowLine top={1510} delay={16} reverse />

      {/* Intro */}
      <AbsoluteFill style={{ opacity: introOut, justifyContent: "center", alignItems: "center", transform: `scale(${0.92 + introIn * 0.08})` }}>
        <Img src={logo} style={{ width: 210, height: 210, objectFit: "cover", borderRadius: 34, boxShadow: `0 0 55px rgba(0,230,213,0.22), 0 0 70px rgba(224,0,216,0.16)` }} />
        <div style={{ marginTop: 58, fontSize: 62, fontWeight: 800, letterSpacing: 1, textAlign: "center", textShadow: `0 0 24px rgba(0,230,213,0.22)` }}>
          МЫ ИХ <span style={{ color: CYAN }}>ВЕРНУЛИ</span>
        </div>
        <div style={{ marginTop: 20, width: 250, height: 3, background: `linear-gradient(90deg, ${CYAN}, ${PINK})`, borderRadius: 3 }} />
        <div style={{ marginTop: 28, color: "rgba(245,247,250,0.65)", fontSize: 25, letterSpacing: 5 }}>ICQ SMILES</div>
        <div style={{ position: "absolute", bottom: 150, color: "rgba(0,230,213,0.65)", fontSize: 20, letterSpacing: 6 }}>OLD SCHOOL. NEW PLACE.</div>
      </AbsoluteFill>

      {/* App demonstration */}
      <AbsoluteFill style={{ opacity: demoOut, justifyContent: "center", alignItems: "center", transform: `translateY(${(1 - demoIn) * 70}px) scale(${0.94 + demoIn * 0.06})` }}>
        <div style={{ position: "absolute", top: 112, left: 0, right: 0, textAlign: "center", fontSize: 27, color: CYAN, letterSpacing: 6, fontWeight: 700 }}>
          СМОТРИ, КАК ЭТО РАБОТАЕТ
        </div>
        <div style={{ width: 880, height: 1480, borderRadius: 58, padding: 12, background: `linear-gradient(145deg, ${CYAN}, #20232b 38%, ${PINK})`, boxShadow: `0 0 45px rgba(0,230,213,0.17), 0 0 55px rgba(224,0,216,0.12)` }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 47, overflow: "hidden", background: "#000", border: "3px solid #080a0d" }}>
            <OffthreadVideo src={source} muted startFrom={0} endAt={300} playbackRate={1} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 104, padding: "17px 34px", borderRadius: 40, border: `1px solid ${CYAN}`, background: "rgba(5,6,9,0.88)", color: WHITE, fontSize: 27, fontWeight: 700, letterSpacing: 2, boxShadow: `0 0 22px rgba(0,230,213,0.16)` }}>
          В ЛИЧНЫХ СООБЩЕНИЯХ
        </div>
      </AbsoluteFill>

      {/* End card */}
      <AbsoluteFill style={{ opacity: interpolate(frame, [290, 310, 539], [0, 1, 1], clamp), justifyContent: "center", alignItems: "center", transform: `scale(${0.94 + endIn * 0.06})` }}>
        <Img src={logo} style={{ width: 230, height: 230, objectFit: "cover", borderRadius: 38, boxShadow: `0 0 55px rgba(0,230,213,0.22), 0 0 70px rgba(224,0,216,0.18)` }} />
        <div style={{ marginTop: 56, textAlign: "center", fontSize: 54, lineHeight: 1.2, fontWeight: 800 }}>
          ICQ-СМАЙЛЫ
          <div style={{ color: CYAN }}>В ЛИЧНЫХ СООБЩЕНИЯХ</div>
        </div>
        <div style={{ marginTop: 58, padding: "18px 42px", borderRadius: 50, border: `2px solid ${PINK}`, color: WHITE, fontSize: 42, fontWeight: 800, letterSpacing: 2, boxShadow: `0 0 28px rgba(224,0,216,0.2)` }}>
          @ultratiktok
        </div>
        <div style={{ marginTop: 30, fontSize: 20, color: "rgba(245,247,250,0.55)", letterSpacing: 5 }}>TIKTOK ULTRA MOD</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
