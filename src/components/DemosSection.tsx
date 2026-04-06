"use client";

import FadeUp from "./FadeUp";
import Link from "next/link";

const demos = [
  {
    href: "/demos/supply-chain",
    title: "MARL Supply Chain Simulator",
    desc: "Watch autonomous agents coordinate inventory across a live supply chain network. Trigger demand shocks and supply disruptions — see how multi-agent RL responds in real time.",
    tags: ["MARL", "Simulation", "Interactive"],
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.8}>
        <circle cx={12} cy={5} r={2} /><circle cx={5} cy={19} r={2} /><circle cx={19} cy={19} r={2} />
        <path d="M12 7v4M12 11l-5 6M12 11l5 6" />
      </svg>
    ),
    status: "live",
  },
  {
    href: "/demos/blackswan",
    title: "BlackSwan Intelligence Platform",
    desc: "A 10-persona AI council screens geopolitical news for consultants — sanctions, trade controls, supply chain risk. Click any article to see every specialist's score and the chairman's synthesis.",
    tags: ["LLM", "Geopolitical Risk", "Multi-Agent"],
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={1.8}>
        <circle cx={12} cy={12} r={3} />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
    status: "live",
  },
];

export default function DemosSection() {
  return (
    <div className="container" id="demos">
      <div className="section-eyebrow">demos</div>
      <h2
        style={{
          fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          marginBottom: "0.7rem",
        }}
      >
        Live Demos
      </h2>
      <p className="section-lead">
        Research made interactive — explore the systems I build by playing with
        them directly in your browser.
      </p>
      <FadeUp>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {demos.map((d, i) => (
            <Link
              key={i}
              href={d.href}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "var(--accent-light)";
                  el.style.boxShadow = "var(--shadow)";
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "var(--border)";
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: "var(--accent-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {d.icon}
                  </div>
                  {d.status === "live" && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        fontFamily: "var(--mono)",
                        fontSize: "0.68rem",
                        fontWeight: 600,
                        color: "#16a34a",
                        background: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        padding: "0.2rem 0.6rem",
                        borderRadius: 100,
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#16a34a",
                          display: "inline-block",
                        }}
                      />
                      live
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    marginBottom: "0.55rem",
                    lineHeight: 1.4,
                    color: "var(--text)",
                  }}
                >
                  {d.title}
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.75,
                    flex: 1,
                    marginBottom: "1.25rem",
                  }}
                >
                  {d.desc}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "auto" }}>
                  {d.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: "1rem",
                    fontFamily: "var(--mono)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  Launch demo →
                </div>
              </div>
            </Link>
          ))}

          {/* Coming soon placeholder */}
          <div
            style={{
              background: "var(--bg-soft)",
              border: "1px dashed var(--border)",
              borderRadius: "var(--radius)",
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 200,
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.75rem",
                color: "var(--text-light)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Coming soon
            </div>
            <div
              style={{
                fontSize: "0.9rem",
                color: "var(--text-muted)",
                textAlign: "center",
                maxWidth: 240,
                lineHeight: 1.7,
              }}
            >
              Game Theory Playground · Polymarket AI Dashboard
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
