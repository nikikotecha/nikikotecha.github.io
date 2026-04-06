"use client";

import FadeUp from "./FadeUp";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={13} height={13}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const projects = [
  {
    icon: (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={2}>
        <circle cx={12} cy={5} r={2} /><circle cx={5} cy={19} r={2} /><circle cx={19} cy={19} r={2} />
        <path d="M12 7v4M12 11l-5 6M12 11l5 6" />
      </svg>
    ),
    title: "MARL & GNNs for Inventory Management",
    desc: "Optimised supply chain inventory decisions using multi-agent RL and graph neural networks for agent coordination. Benchmarked PPO and DDPG algorithms in dynamic supply chain environments.",
    tags: ["PyTorch", "Ray RLLib", "PyG", "MARL", "HPC / GPU"],
    href: "https://github.com/nikikotecha/MultiAgentRL_InventoryControl",
  },
  {
    icon: (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={2}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "MORSE — Multi-Objective RL via Strategy Evolution",
    desc: "Combined NSGA-II evolutionary algorithms with RL to generate a Pareto front of policies for supply chain optimisation. Integrates CVaR for risk-sensitive decision-making under disruptions.",
    tags: ["PyTorch", "NSGA-II", "CVaR", "Pareto Optimisation", "GPU"],
    href: "https://github.com/nikikotecha/MORSE",
  },
  {
    icon: (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={2}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx={9} cy={7} r={4} />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Weighted Mean Field MARL with Importance Sampling",
    desc: "Theoretical framework inspired by importance sampling to correct temporal distribution shifts in large mean-field multi-agent systems. Demonstrated improved coordination and decision-making in high-dimensional environments.",
    tags: ["Mean Field Theory", "Importance Sampling", "PyTorch", "MARL"],
    href: "https://github.com/nikikotecha/dynamic-mfrl-is",
  },
  {
    icon: (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={2}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6.29 6.29l1.42-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        <path d="M14.05 2a9 9 0 0 1 8 7.94M14.05 6A5 5 0 0 1 18 10" />
      </svg>
    ),
    title: "Automated AI Customer Discovery & Outreach",
    desc: "End-to-end agentic pipeline for customer discovery and outreach — from zero to a qualified, personalised email in a single FastAPI call. Built to automate the manual work of early-stage customer discovery.",
    bullets: [
      "LLM-generated search queries to surface leads matching a target ICP",
      "Web scraping + SerpAPI enrichment to build rich lead profiles",
      "Relevance scoring against user-defined customer criteria",
      "Personalised email drafting grounded in each lead's context",
      "LinkedIn profile discovery surfaced alongside each lead",
      "Deployed on Azure OpenAI; modular pipeline swappable per use case",
    ],
    tags: ["FastAPI", "Azure OpenAI", "LLM Agents", "SerpAPI", "Python"],
    href: "https://github.com/nikikotecha/automated-outreach",
  },
  {
    icon: (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={2}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: "Transformer Hawkes Process for Polymarket",
    desc: "Applied transformer-based Hawkes process models to prediction market data from Polymarket. Models temporal event dependencies and information flow to better understand and predict market dynamics.",
    tags: ["Transformers", "Hawkes Process", "Prediction Markets", "PyTorch", "Time Series"],
    href: "https://github.com/nikikotecha/transformer_hawkes_process_polymarket",
  },
];

export default function Projects() {
  return (
    <div className="container" id="projects">
      <div className="section-eyebrow">research &amp; projects</div>
      <h2
        style={{
          fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          marginBottom: "0.7rem",
        }}
      >
        What I&apos;ve Built
      </h2>
      <p className="section-lead">
        Research projects at the frontier of multi-agent systems, reinforcement
        learning, and complex optimisation.
      </p>
      <FadeUp>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {projects.map((p, i) => (
            <ProjectCard key={i} {...p} />
          ))}
        </div>
      </FadeUp>
    </div>
  );
}

function ProjectCard({
  icon,
  title,
  desc,
  bullets: _bullets,
  tags,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  bullets?: string[];
  tags: string[];
  href: string;
}) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.25s ease",
        position: "relative",
        overflow: "hidden",
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
          width: 38,
          height: 38,
          borderRadius: 9,
          background: "var(--accent-soft)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: "1rem",
          fontWeight: 600,
          marginBottom: "0.55rem",
          lineHeight: 1.4,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "0.875rem",
          color: "var(--text-muted)",
          lineHeight: 1.75,
          marginBottom: "1.25rem",
          flex: 1,
        }}
      >
        {desc}
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "auto" }}
      >
        {tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
      <a
        href={href}
        target="_blank"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          marginTop: "1rem",
          fontFamily: "var(--mono)",
          fontSize: "0.75rem",
          fontWeight: 500,
          color: "var(--accent)",
          textDecoration: "none",
          letterSpacing: "0.01em",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        <GithubIcon /> View on GitHub
      </a>
    </div>
  );
}
