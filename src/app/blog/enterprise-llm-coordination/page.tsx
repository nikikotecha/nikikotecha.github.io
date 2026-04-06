import Nav from "@/components/Nav";
import Link from "next/link";

export const metadata = {
  title: "A Thousand Teams, One Goal — Niki Kotecha",
  description:
    "The economics of LLMs mean enterprises can now run hundreds of AI teams in parallel. The bottleneck isn't capability — it's coordination.",
};

export default function EnterpriseLLMPost() {
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
              transition: "color 0.2s",
            }}
          >
            ← Blog
          </Link>

          {/* Header */}
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.72rem",
                  color: "var(--text-light)",
                }}
              >
                April 2025
              </span>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.72rem",
                  color: "var(--text-light)",
                }}
              >
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
              A Thousand Teams, One Goal
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--text-muted)",
                lineHeight: 1.8,
                fontStyle: "italic",
              }}
            >
              The economics of LLMs mean enterprises can now run hundreds of AI teams in parallel.
              The bottleneck isn&apos;t capability anymore. It&apos;s coordination.
            </p>
          </div>

          {/* Body */}
          <div
            style={{
              fontSize: "1.02rem",
              lineHeight: 1.9,
              color: "var(--text)",
            }}
          >
            <p style={{ marginBottom: "1.5rem" }}>
              The standard framing of enterprise AI adoption goes something like this: companies
              deploy AI tools, individuals become more productive, headcount growth slows. It&apos;s a
              story about augmentation — the same organisational structure, running faster. I think
              that framing is already becoming obsolete, and the companies that treat it as the
              destination will be outrun by the ones who see it as a starting point.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              The more interesting shift isn&apos;t about individual productivity. It&apos;s about what
              becomes possible when the cost of deploying a capable reasoning agent drops to near
              zero. When spinning up a new &quot;team&quot; — even a temporary, task-specific one — takes
              seconds, not quarters. That changes what organisations can structurally attempt.
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
              The human organisation was always a coordination machine
            </h2>

            <p style={{ marginBottom: "1.5rem" }}>
              A company of a thousand people is not primarily a collection of a thousand skilled
              individuals. It&apos;s a coordination system for getting those individuals to work toward a
              shared goal without needing every person to talk to every other person. The org chart,
              the quarterly goal-setting process, the weekly status update — these are all
              coordination protocols, not particularly elegant ones, but they work well enough that
              companies can function at scale.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              The deep inefficiency in this system is that the coordination overhead is substantial.
              A significant fraction of every knowledge worker&apos;s time goes not to the actual work,
              but to aligning with others about what the work is. Status meetings, handoff
              documents, context-setting. Anthropologists have estimated that in some organisations,
              coordination costs consume 60–70% of working time. We accept this because
              the alternative — everyone acting independently — produces chaos.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              LLM agents don&apos;t automatically solve this. But they change the problem space in
              interesting ways. An LLM agent can maintain context across a long task without
              forgetting what it decided two hours ago. It can produce a consistent output format
              that downstream agents can parse reliably. It can be given a precise role with clear
              boundaries, and stay in that role, without the drift you get from human teams under
              pressure. These properties make certain kinds of coordination cheaper.
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
              What a thousand parallel teams actually look like
            </h2>

            <p style={{ marginBottom: "1.5rem" }}>
              Imagine a financial services firm running a new product launch. Historically, this
              involves a programme manager, a cross-functional team, weeks of sequential
              work where each function hands off to the next. What does that look like when you can
              spin up specialised agent teams in parallel — a regulatory analysis team, a competitor
              benchmarking team, a customer segmentation team, a draft messaging team — all running
              simultaneously, all feeding structured outputs into a synthesis layer?
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              The calendar compression alone is significant. But the deeper change is that you can
              now run the process many times. Not once, sequentially, then ship. But dozens of
              times, in parallel, across different hypotheses, and let the results compete. That&apos;s a
              different mode of working, closer to evolutionary search than waterfall planning.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              The practical question is: how do you make a thousand agents pull in the same
              direction? And this is where I think the standard playbook — give each agent a
              detailed system prompt and hope for the best — starts to break down at scale.
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
              Why MARL is the right frame
            </h2>

            <p style={{ marginBottom: "1.5rem" }}>
              Multi-agent reinforcement learning (MARL) is the research area that has spent the
              longest thinking carefully about exactly this problem: how do you get a population of
              learning agents to coordinate toward a shared goal, without central control, in
              environments that are too complex for any individual agent to fully model?
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              The key insight from MARL isn&apos;t any single algorithm — it&apos;s the way the problem is
              framed. Agents learn not just from the outcomes of their own actions, but from
              observing the behaviour of other agents in their environment. The population as a
              whole encodes knowledge that no individual agent holds. Emergent coordination arises
              from agents discovering that certain policies work well together, not from being told
              to cooperate.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              Applied to enterprise LLM systems, this suggests a different design philosophy than
              prompt engineering and rigid orchestration. Instead of writing a detailed script for
              every agent, you define reward signals — what does good output look like at the system
              level? — and let agents adapt their behaviour to the other agents they work alongside.
              The sales analyst agent learns what the product agent tends to miss. The risk agent
              learns to flag things that tend to derail the compliance agent downstream. Coordination
              emerges from repeated interaction, not from upfront specification.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              This is not yet how most agentic systems are built. Most are scripted pipelines, and
              scripted pipelines are brittle. They work well when the task is well-defined and the
              environment is stable. They fail when the task changes slightly, or when an upstream
              agent produces something unexpected. Learning coordination — agents that adapt to each
              other — is more robust, but harder to build and harder to explain to stakeholders.
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
              The open problems
            </h2>

            <p style={{ marginBottom: "1.5rem" }}>
              A few things remain genuinely unsolved, and I&apos;m not going to pretend otherwise.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              Credit assignment in knowledge work is hard. When a hundred agents collaborate on an
              analysis and the analysis turns out to be wrong, which agent was responsible? In
              physical control tasks, MARL has good tools for this. In open-ended reasoning tasks,
              it&apos;s much murkier. Without clean credit assignment, learning signals are noisy, and
              the system can&apos;t improve in a targeted way.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              Hallucination cascade is a real risk. LLMs produce confident-sounding wrong answers.
              In a pipeline where agent B receives agent A&apos;s output as ground truth, errors
              propagate and compound. Human teams have an informal error-correction mechanism: people
              notice when something seems off and push back. Encoding that scepticism — healthy
              disagreement, not just blind acceptance of upstream outputs — into agentic systems is an
              open design problem.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              And there&apos;s a question of what the right level of agent autonomy is for a given
              enterprise context. Some decisions need a human in the loop. The system needs to know
              which ones, and when to stop and ask rather than proceed and guess.
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
              The enterprise of 2030 probably doesn&apos;t look like a company with AI tools. It looks
              like a coordination protocol with a few humans setting direction at the top.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              I don&apos;t think we know exactly what that looks like yet. But the companies asking the
              right questions now — not &quot;how do we add AI to our current workflows&quot; but &quot;what
              workflows become possible that weren&apos;t before&quot; — are the ones most likely to end up
              building it.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
