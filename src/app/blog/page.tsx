import Nav from "@/components/Nav";
import Link from "next/link";

export const metadata = {
  title: "Blog — Niki Kotecha",
  description: "Writing on multi-agent systems, LLMs, and the future of machine coordination.",
};

const posts = [
  {
    slug: "multi-agent-systems",
    title: "The Intelligence Was Never in the Individual",
    date: "April 2025",
    readTime: "6 min",
    excerpt:
      "Ant colonies, immune systems, markets — nature keeps solving hard problems the same way: not by making individuals smarter, but by making coordination richer. What that means for how we build AI.",
    tags: ["Multi-Agent Systems", "Philosophy"],
  },
  {
    slug: "enterprise-llm-coordination",
    title: "A Thousand Teams, One Goal",
    date: "April 2025",
    readTime: "7 min",
    excerpt:
      "The economics of LLMs mean enterprises can now run hundreds of AI teams in parallel. The bottleneck isn't capability — it's coordination. Why MARL is the right frame for thinking about what comes next.",
    tags: ["LLMs", "MARL", "Enterprise AI"],
  },
];

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 60 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 2.5rem 6rem" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "var(--mono)",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              textDecoration: "none",
              marginBottom: "2.5rem",
            }}
          >
            ← Home
          </Link>

          <div className="section-eyebrow">writing</div>
          <h1
            style={{
              fontSize: "clamp(1.9rem, 3vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              marginBottom: "0.6rem",
            }}
          >
            Blog
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--text-muted)",
              lineHeight: 1.8,
              marginBottom: "3.5rem",
              maxWidth: 520,
            }}
          >
            Thinking out loud on multi-agent systems, machine coordination, and what it might mean
            to build truly intelligent organisations.
          </p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {posts.map((post, i) => (
              <div key={post.slug}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ padding: "2rem 0" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginBottom: "0.65rem",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "0.72rem",
                          color: "var(--text-light)",
                        }}
                      >
                        {post.date}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "0.72rem",
                          color: "var(--text-light)",
                        }}
                      >
                        {post.readTime} read
                      </span>
                    </div>
                    <h2
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 650,
                        color: "var(--text)",
                        letterSpacing: "-0.015em",
                        lineHeight: 1.4,
                        marginBottom: "0.55rem",
                      }}
                    >
                      {post.title}
                    </h2>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-muted)",
                        lineHeight: 1.75,
                        marginBottom: "0.9rem",
                      }}
                    >
                      {post.excerpt}
                    </p>
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", alignItems: "center" }}>
                      {post.tags.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                      <span
                        style={{
                          marginLeft: "auto",
                          fontFamily: "var(--mono)",
                          fontSize: "0.72rem",
                          color: "var(--accent)",
                        }}
                      >
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
                {i < posts.length - 1 && (
                  <div style={{ height: 1, background: "var(--border)" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
