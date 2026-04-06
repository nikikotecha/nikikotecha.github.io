import FadeUp from "./FadeUp";
import Image from "next/image";

export default function About() {
  return (
    <div className="container" id="about">
      <div className="section-eyebrow">about</div>
      <h2
        style={{
          fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          marginBottom: "0.7rem",
        }}
      >
        Who I Am
      </h2>
      <FadeUp>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "3.5rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: 580 }}>
            <p
              style={{
                color: "var(--text-muted)",
                lineHeight: 1.9,
                fontSize: "1.02rem",
                marginBottom: "1.25rem",
              }}
            >
              I&apos;m a PhD researcher at{" "}
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                Imperial College London
              </strong>{" "}
              working at the intersection of machine learning, game theory, and
              complex systems. My research focuses on building scalable
              autonomous agents capable of making decisions in high-dimensional,
              uncertain, multi-agent environments.
            </p>
            <p
              style={{
                color: "var(--text-muted)",
                lineHeight: 1.9,
                fontSize: "1.02rem",
                marginBottom: "1.25rem",
              }}
            >
              Before my PhD, I read Chemical Engineering at{" "}
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                Cambridge
              </strong>{" "}
              (MEng/BA), which gave me a strong foundation in systems thinking,
              optimisation, and quantitative modelling — skills I now apply to
              multi-agent RL and decision-making.
            </p>
            <p
              style={{
                color: "var(--text-muted)",
                lineHeight: 1.9,
                fontSize: "1.02rem",
              }}
            >
              Outside research, I&apos;ve worked as an{" "}
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                AI Researcher at Ergodic AI
              </strong>
              , building autonomous LLM-based agents, and as an{" "}
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                Associate at Creator Fund
              </strong>
              , evaluating early-stage deep-tech startups — bridging research
              and the real world.
            </p>
          </div>
          <div style={{ flexShrink: 0 }}>
            <Image
              src="/NikiKotechaheadshot.jpg"
              alt="Niki Kotecha"
              width={190}
              height={190}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "center top",
                border: "3px solid var(--border)",
                boxShadow: "0 8px 32px rgba(99,102,241,0.13)",
                display: "block",
              }}
            />
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
