import Nav from "@/components/Nav";
import Link from "next/link";

export const metadata = {
  title: "Against End-to-End Agents — Niki Kotecha",
  description:
    "The pitch for fully autonomous agents is compelling. The reality is systems that fail silently, can't be debugged, and don't ship. A defence of the boring alternative.",
};

export default function AgainstEndToEndPost() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 60 }}>
        <article style={{ maxWidth: 680, margin: "0 auto", padding: "3rem 2.5rem 6rem" }}>
          <Link
            href="/blog"
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
            ← Blog
          </Link>

          <div style={{ marginBottom: "3rem" }}>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", color: "var(--text-light)" }}>
                February 2025
              </span>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", color: "var(--text-light)" }}>
                7 min read
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                color: "var(--text)",
                marginBottom: "1.25rem",
              }}
            >
              Against End-to-End Agents
            </h1>
            <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.8, fontStyle: "italic" }}>
              The pitch for fully autonomous agents is genuinely compelling. One system, one goal,
              figure the rest out yourself. The reality is systems that fail silently, accumulate
              errors across steps, and are nearly impossible to improve. A defence of the boring
              alternative.
            </p>
          </div>

          <div style={{ fontSize: "1.02rem", lineHeight: 1.9, color: "var(--text)" }}>
            <p style={{ marginBottom: "1.5rem" }}>
              There is a certain elegance to the end-to-end agent pitch. You give a system a goal.
              It plans, acts, observes, adjusts, and eventually delivers. No rigid pipeline, no
              hand-coded transitions, no human deciding upfront which steps matter. Just a capable
              model with access to tools and enough context to figure things out. It&apos;s how we
              imagine intelligence working, because it&apos;s roughly how human cognition looks from
              the outside.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              I&apos;ve built systems close to this description and watched them work impressively in
              demos. I&apos;ve also watched them fail in production in ways that were nearly impossible
              to diagnose, let alone fix. The demo-to-production gap in agentic AI is not primarily
              a capability problem. It&apos;s an architecture problem. And the architecture that causes
              the most grief, consistently, is the one that tries to do everything in one place.
            </p>

            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 650,
                letterSpacing: "-0.02em",
                marginTop: "2.5rem",
                marginBottom: "1rem",
                color: "var(--text)",
              }}
            >
              How errors compound
            </h2>

            <p style={{ marginBottom: "1.5rem" }}>
              An end-to-end agent making ten sequential decisions, each with a 90% chance of being
              correct, delivers a fully correct result about 35% of the time. That&apos;s not a
              failure rate most production systems can tolerate. And 90% per step is optimistic —
              real tasks involve ambiguous instructions, tools that behave unexpectedly, and edge
              cases the model has never seen.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              The compounding is bad enough. What makes it worse is that errors in autonomous
              pipelines tend not to be loud. The system doesn&apos;t crash. It produces something that
              looks plausible — a well-formatted output, a confident summary, a completed task that
              is subtly but importantly wrong. Silent failures are the most dangerous kind, because
              you don&apos;t know to look for them. You find out later, when a decision has already been
              made downstream on the basis of bad information.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              Human organisations have an informal immune response to this. People notice when
              something seems off. They ask questions, push back, flag inconsistencies. This
              happens at every hand-off, organically, without anyone designing it in. An autonomous
              agent has no equivalent mechanism unless you build one explicitly — and building it
              explicitly means decomposing the task into stages with checkpoints, which is exactly
              what a modular pipeline does.
            </p>

            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 650,
                letterSpacing: "-0.02em",
                marginTop: "2.5rem",
                marginBottom: "1rem",
                color: "var(--text)",
              }}
            >
              The Unix lesson
            </h2>

            <p style={{ marginBottom: "1.5rem" }}>
              Software engineering learned this lesson fifty years ago and keeps having to relearn
              it. The Unix philosophy — small tools that do one thing well, composable via clean
              interfaces — won not because it was theoretically elegant but because it worked. Tools
              built this way were debuggable. You could pipe data between them and inspect it at
              every stage. When something broke, you knew exactly where.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              The same logic applies to agent pipelines. A system broken into well-defined stages,
              with observable inputs and outputs at each boundary, is a system you can reason about.
              You can test each stage in isolation. You can swap one stage out without touching the
              others. When the output is wrong, you can trace it back to the stage that produced the
              bad intermediate result, fix that stage, and know what you changed.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              An end-to-end agent is a monolith. When it fails, the failure is somewhere in the
              chain of decisions the model made internally, which you have partial visibility into
              at best. Improving it means changing the system prompt and re-running everything,
              hoping the change helped without introducing a new problem elsewhere. This is not a
              sustainable engineering process.
            </p>

            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 650,
                letterSpacing: "-0.02em",
                marginTop: "2.5rem",
                marginBottom: "1rem",
                color: "var(--text)",
              }}
            >
              The right role for autonomy
            </h2>

            <p style={{ marginBottom: "1.5rem" }}>
              None of this means autonomous behaviour is bad or that agents shouldn&apos;t make
              decisions. The point is that autonomy should be scoped. Each component in a pipeline
              can and should have latitude within its domain — a research agent should decide how
              to formulate searches, a synthesis agent should decide how to weight conflicting
              sources. What they shouldn&apos;t do is reinterpret their role, decide the overall task
              has changed, or skip steps because they think they know better.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              This mirrors how well-functioning human organisations work. Good teams have clear
              ownership of domains and genuine autonomy within them. The coordination layer — what
              gets handed off, in what form, to whom — is defined and relatively stable. Chaos
              enters when people start working outside their domain, making decisions that belong to
              someone else, or quietly changing the shape of what they hand over.
            </p>

            <p
              style={{
                marginBottom: "1.5rem",
                paddingLeft: "1.5rem",
                borderLeft: "3px solid var(--accent-light)",
                color: "var(--text-muted)",
                fontStyle: "italic",
              }}
            >
              Autonomy within a module. Contracts between modules. That&apos;s the design pattern
              that actually ships.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              The irony is that modular pipelines often end up being more capable than end-to-end
              agents on complex tasks, not just more reliable. Because you can make each module
              genuinely good at its specific job — give it the right context, the right tools, the
              right output format — rather than asking one system to be good at everything
              simultaneously. Specialisation is real, even for LLMs.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              I still think the fully autonomous agent is an interesting research direction. The
              question of how a system learns to decompose novel tasks, recover from errors, and
              adapt its own strategy in real time is genuinely hard and worth working on. But as an
              engineering choice for systems that need to work reliably today, it&apos;s the wrong
              default. Start with the boring pipeline. Make each stage embarrassingly simple.
              Define the interfaces carefully. Add autonomy where the evidence says it helps. The
              demos will be less impressive. The systems will actually run.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
