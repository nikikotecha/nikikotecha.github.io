import Nav from "@/components/Nav";
import Link from "next/link";

export const metadata = {
  title: "The Attention Problem — Niki Kotecha",
  description:
    "LLMs are expensive because attention scales quadratically. That's not just an infrastructure cost — it's a coordination bottleneck in disguise.",
};

export default function AttentionProblemPost() {
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
                March 2025
              </span>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", color: "var(--text-light)" }}>
                6 min read
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
              The Attention Problem
            </h1>
            <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.8, fontStyle: "italic" }}>
              LLMs are expensive because attention scales quadratically with sequence length. Most
              people treat this as an infrastructure problem. It&apos;s actually a coordination problem
              in disguise — and it shapes everything about how you should architect multi-agent systems.
            </p>
          </div>

          <div style={{ fontSize: "1.02rem", lineHeight: 1.9, color: "var(--text)" }}>
            <p style={{ marginBottom: "1.5rem" }}>
              The transformer architecture that underpins every major LLM has one well-known
              weakness: the cost of the self-attention mechanism grows quadratically with the number
              of tokens in the context. Double the context length, quadruple the compute. This is
              why running a model over a 100k-token context is not ten times more expensive than
              running it over 10k tokens — it&apos;s closer to a hundred times more expensive.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              The standard response to this is an infrastructure one: use more efficient attention
              variants, cache KV states aggressively, route long contexts to cheaper models. All
              reasonable. But I think the deeper implication is architectural, not operational. The
              quadratic cost of attention is telling you something fundamental about how information
              should flow through a multi-agent system — and most people building those systems
              aren&apos;t listening.
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
              What attention actually does
            </h2>

            <p style={{ marginBottom: "1.5rem" }}>
              Attention lets every token in a sequence look at every other token and decide how much
              to weight it. This is what gives transformers their power — the model can relate any
              piece of information to any other piece, regardless of position. But this all-to-all
              communication is exactly what makes it expensive. Every new token you add to the
              context doesn&apos;t just cost one unit of attention — it costs one unit of attention
              multiplied by every token already there.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              In network terms, this is a fully connected graph. Every node talks to every other
              node. Communication overhead scales as O(n²). Any distributed systems engineer will
              immediately recognise this as a design pattern that breaks at scale. The reason we
              don&apos;t build distributed systems this way isn&apos;t just cost — it&apos;s that you can&apos;t reason
              about a fully connected system. The interactions are too many, the emergent behaviour
              too unpredictable, the failure modes too entangled.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              The brain solved this problem a long time ago. Neurons do not have synapses with every
              other neuron in the brain. The connectivity is sparse and structured — organised into
              local clusters with long-range projections between them. Information travels up
              hierarchies, gets compressed, gets routed to the right place. The visual cortex
              doesn&apos;t send raw pixel data to the prefrontal cortex; it sends edges, then shapes,
              then objects, then concepts. Each stage compresses and abstracts before passing
              anything along.
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
              The naive multi-agent architecture
            </h2>

            <p style={{ marginBottom: "1.5rem" }}>
              The most common pattern I see in multi-agent LLM systems is something like this: each
              agent produces a full natural language response, which gets concatenated into a growing
              shared context, which every subsequent agent reads in full. The context window becomes
              a shared inbox that everyone reads from the beginning every time they need to act.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              This is the fully connected graph problem recreated in software. Every agent is
              attending to everything every other agent has ever said. The costs compound with every
              step. More importantly, the signal-to-noise ratio collapses. Agents spend attention
              budget on conversational filler, redundant context-setting, outputs that aren&apos;t
              relevant to their specific task. The model attends to it all equally — or tries to —
              and the quality of reasoning degrades accordingly.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              This is not a hypothetical concern. In the systems I&apos;ve built, the single clearest
              predictor of output quality degradation is context bloat. Not model size. Not prompt
              quality. Context bloat.
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
              Sparse, structured communication
            </h2>

            <p style={{ marginBottom: "1.5rem" }}>
              The architectural implication is that agent-to-agent communication should not be
              verbose prose. It should be compressed, structured, and task-relevant. An agent should
              not hand off its entire reasoning trace to the next agent in the pipeline — it should
              hand off the conclusions that the next agent needs, in a format the next agent can
              parse efficiently.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              This sounds obvious but conflicts with how most people actually build these systems,
              because verbose prose is easy and structured output requires upfront design. You have
              to think about what each agent actually needs from its predecessors, and constrain the
              handoff accordingly. That&apos;s more work. It also means you can&apos;t just chain together a
              set of general-purpose agents and hope emergence takes care of the rest.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              The other implication is hierarchical aggregation. If you have ten agents producing
              outputs, you probably don&apos;t want all ten outputs concatenated into the context of an
              eleventh agent. You want a summary layer — a distillation step that compresses the
              ten outputs into something that fits cleanly, losing as little relevant information as
              possible. This is what the brain&apos;s hierarchical organisation is doing. It&apos;s also what
              good human meeting facilitation does: you don&apos;t read the minutes of every prior
              meeting before deciding anything, you work from summaries.
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
              Quadratic attention cost is the system telling you it wasn&apos;t designed for all-to-all
              communication. The architecture should reflect that.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              None of this makes multi-agent systems easy to build well. It actually makes them
              harder — sparse, structured communication requires you to understand the information
              dependencies between agents before you write a line of code. But the systems that do
              this are meaningfully more reliable, cheaper to run, and easier to reason about when
              something goes wrong. The quadratic cost of attention is, in this sense, a useful
              constraint. It punishes lazy design early, before you&apos;re running at scale.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
