import FadeUp from "./FadeUp";

const jobs = [
  {
    date: "Feb 2025 – Jul 2025",
    badge: "AI Research",
    role: "AI Researcher",
    company: "Ergodic AI — Remote / London, UK",
    bullets: [
      "Developed autonomous LLM-based agents for multi-step problem-solving and planning",
      "Built multi-agent frameworks for distributed decision-making and task delegation",
      "Engineered synthetic datasets with embedded causal structures for model robustness",
      "Translated research into deployable solutions in collaboration with cross-functional teams",
      "End-to-end implementation in Python, PyTorch, HPC and GPU workflows",
    ],
  },
  {
    date: "Oct 2023 – Jul 2025",
    badge: "Venture Capital",
    role: "Associate",
    company: "Creator Fund — London, UK",
    bullets: [
      "Conducted technical due diligence and market research on 20+ early-stage AI, robotics, and biotech startups",
      "Evaluated 3 pre-seed startups for product-market fit, technical feasibility, and defensibility",
      "Advised internal investment committee, contributing to £2M in potential investments",
      "Identified emerging trends in deep-tech sectors to inform strategic planning",
    ],
  },
];

export default function Experience() {
  return (
    <div className="container" id="experience">
      <div className="section-eyebrow">experience</div>
      <h2
        style={{
          fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          marginBottom: "0.7rem",
        }}
      >
        Where I&apos;ve Worked
      </h2>
      <p className="section-lead">
        Industry experience spanning AI research and venture capital, bridging
        cutting-edge research with real-world deployment.
      </p>
      <FadeUp>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 1,
              background: "var(--border)",
            }}
          />
          {jobs.map((j, i) => (
            <div
              key={i}
              style={{
                paddingLeft: "2rem",
                paddingBottom: i < jobs.length - 1 ? "2.75rem" : 0,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -5,
                  top: 5,
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  border: "2px solid var(--bg)",
                  boxShadow: "0 0 0 2px var(--accent)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.35rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.73rem",
                    color: "var(--text-light)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {j.date}
                </span>
                <span className="badge">{j.badge}</span>
              </div>
              <div
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  marginBottom: "0.15rem",
                }}
              >
                {j.role}
              </div>
              <div
                style={{
                  fontSize: "0.88rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                  marginBottom: "0.75rem",
                }}
              >
                {j.company}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.45rem",
                }}
              >
                {j.bullets.map((b, bi) => (
                  <li
                    key={bi}
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-muted)",
                      paddingLeft: "1.3rem",
                      position: "relative",
                      lineHeight: 1.65,
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        color: "var(--accent)",
                        fontSize: "0.78rem",
                      }}
                    >
                      →
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </FadeUp>
    </div>
  );
}
