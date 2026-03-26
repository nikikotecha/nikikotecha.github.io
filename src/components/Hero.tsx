import FadeUp from "./FadeUp";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "7rem 2.5rem 5rem",
        maxWidth: 1080,
        margin: "0 auto",
      }}
    >
      <FadeUp>
        <div style={{ maxWidth: 680 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--mono)",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--accent)",
              background: "var(--accent-soft)",
              border: "1px solid var(--accent-light)",
              padding: "0.3rem 0.85rem",
              borderRadius: 100,
              marginBottom: "1.75rem",
              letterSpacing: "0.04em",
            }}
          >
            <span style={{ opacity: 0.45 }}>#</span> PhD Researcher · Imperial
            College London
          </div>

          <h1
            style={{
              fontSize: "clamp(3.2rem, 6.5vw, 5.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.04,
              marginBottom: "1.2rem",
            }}
          >
            Niki
            <br />
            Kotecha
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-muted)",
              fontWeight: 400,
              marginBottom: "0.9rem",
              lineHeight: 1.7,
            }}
          >
            <strong style={{ color: "var(--text)", fontWeight: 600 }}>
              Artificial Intelligence
            </strong>{" "}
            · Multi-Agent Systems · Complex Decision-Making
          </p>

          <p
            style={{
              fontSize: "1rem",
              color: "var(--text-muted)",
              lineHeight: 1.85,
              marginBottom: "2.75rem",
              maxWidth: 560,
            }}
          >
            Building scalable autonomous agents for complex system
            decision-making. Research at the intersection of multi-agent
            reinforcement learning, graph neural networks, and game theory.
          </p>

          <div
            style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}
          >
            <a
              href="https://www.linkedin.com/in/niki-kotecha/"
              target="_blank"
              className="btn btn-primary"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://github.com/nikikotecha"
              target="_blank"
              className="btn btn-ghost"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://scholar.google.co.uk/citations?user=Wc-R7-gAAAAJ&hl=en&oi=ao"
              target="_blank"
              className="btn btn-ghost"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
              </svg>
              Scholar
            </a>
            <a href="mailto:nikikotecha6@gmail.com" className="btn btn-ghost">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,12 2,6" />
              </svg>
              Email
            </a>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
