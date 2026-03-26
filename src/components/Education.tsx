"use client";

import FadeUp from "./FadeUp";

const edu = [
  {
    school: "Imperial College London",
    degree: "PhD, Artificial Intelligence",
    date: "October 2022 – Present",
    desc: "Scalable Autonomous Agents for Complex System Decision-Making. Research spans multi-agent reinforcement learning, game-theoretic analysis, equilibrium computation, mean field approximation, and LLM integration. Applications in supply chain optimisation and decentralised decision-making.",
  },
  {
    school: "University of Cambridge",
    degree: "MEng / BA, Chemical Engineering",
    date: "October 2018 – July 2022",
    desc: "Core studies in process calculations, fluid mechanics, heat and mass transfer, and biotechnology fundamentals. Strong grounding in systems thinking, sustainability, quantitative modelling, and process optimisation.",
  },
];

export default function Education() {
  return (
    <div className="container" id="education">
      <div className="section-eyebrow">education</div>
      <h2
        style={{
          fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          marginBottom: "2rem",
        }}
      >
        Where I Studied
      </h2>
      <FadeUp>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {edu.map((e, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-soft)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "1.85rem",
                transition: "all 0.2s",
              }}
              onMouseEnter={(el) => {
                el.currentTarget.style.borderColor = "var(--accent-light)";
                el.currentTarget.style.boxShadow = "var(--shadow-sm)";
              }}
              onMouseLeave={(el) => {
                el.currentTarget.style.borderColor = "var(--border)";
                el.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "var(--accent)",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                {e.school}
              </div>
              <div
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  marginBottom: "0.25rem",
                  lineHeight: 1.4,
                }}
              >
                {e.degree}
              </div>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.75rem",
                  color: "var(--text-light)",
                  marginBottom: "0.85rem",
                }}
              >
                {e.date}
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.75,
                }}
              >
                {e.desc}
              </div>
            </div>
          ))}
        </div>
      </FadeUp>
    </div>
  );
}
