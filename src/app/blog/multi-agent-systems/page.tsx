import Nav from "@/components/Nav";
import Link from "next/link";

export const metadata = {
  title: "The Intelligence Was Never in the Individual — Niki Kotecha",
  description:
    "Ant colonies, immune systems, markets — nature keeps solving hard problems the same way: not by making individuals smarter, but by making coordination richer.",
};

export default function MultiAgentPost() {
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
              The Intelligence Was Never in the Individual
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--text-muted)",
                lineHeight: 1.8,
                fontStyle: "italic",
              }}
            >
              Ant colonies, immune systems, markets — nature keeps solving hard problems the same
              way. Not by making individuals smarter. By making coordination richer.
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
              There are roughly 250,000 neurons in a honeybee&apos;s brain. A lone bee cannot plan,
              cannot reason through novel problems, cannot hold a mental map of more than a few
              landmarks. By any measure, it is not an intelligent creature. Yet a honeybee colony
              reliably selects the optimal site for a new hive out of twenty or thirty candidates,
              running what amounts to a distributed democratic vote using nothing more than the waggle
              dance. No bee understands the decision. No bee is in charge. The intelligence is
              entirely a property of the interaction.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              I keep coming back to this when I think about AI systems, because I suspect we have
              inherited the wrong intuition from our own cognitive experience. We are individual
              intelligences — singular, self-aware, used to reasoning serially through problems. Our
              instinct is to make things smarter by making the individual more capable. Bigger model,
              more parameters, longer context. The implicit endpoint of this thinking is a single
              system that is smart enough to figure everything out on its own.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              Nature doesn&apos;t agree. Almost every hard problem in biology — pattern recognition
              in the immune system, adaptation in evolution, price discovery in markets — gets solved
              by populations of simple agents interacting under local rules, not by a central
              intelligence reasoning over global state. The sophistication is in the protocol, not
              the participant.
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
              Stigmergy and the environment as memory
            </h2>

            <p style={{ marginBottom: "1.5rem" }}>
              Ant colonies solve the travelling salesman problem — or close enough to it — every day.
              They find near-optimal paths to food sources across complex terrain with no individual
              ant holding a map of the environment. The trick is stigmergy: ants modify the
              environment as they move through it (via pheromone trails), and other ants respond to
              those modifications. The environment becomes a shared memory, a communication medium, a
              coordination mechanism all at once. Nobody broadcasts; everyone reads.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              What strikes me about this is how alien it is to how we build software. We obsess over
              message passing — direct communication between agents through explicit channels. But the
              more powerful coordination mechanism might be indirect: agents writing to a shared world
              state, and other agents reading from it, with no direct knowledge of who wrote what. The
              &quot;who&quot; doesn&apos;t matter. What matters is that the environment encodes history, and
              history shapes future behaviour.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              This is essentially what a market does. No buyer and seller need to coordinate
              directly. The price signal is the pheromone trail — it encodes the aggregate behaviour
              of millions of prior interactions, and everyone responds to it without understanding
              its provenance.
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
              The case against the big brain
            </h2>

            <p style={{ marginBottom: "1.5rem" }}>
              There&apos;s a practical argument here too, not just a philosophical one. A single capable
              agent is a single point of failure. A single point of reasoning. It can only hold so
              much context, explore so many hypotheses in parallel, consider so many conflicting
              perspectives at once. When the problem is genuinely complex — when the solution space
              is vast and the right answer depends on integrating knowledge from many domains — a
              single agent has structural disadvantages that more capability can&apos;t fully overcome.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              I don&apos;t think this means individual model capability doesn&apos;t matter — it clearly does.
              But I suspect the scaling law that matters most in the next few years isn&apos;t &quot;bigger
              model&quot; but &quot;better coordination.&quot; A team of specialists with a well-designed protocol
              will consistently outperform a generalist working alone on the kinds of problems we
              actually care about.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              We see hints of this already. Chain-of-thought prompting works partly because it forces
              a single model to serialise its reasoning — to act, in a limited way, like a sequence
              of agents building on each other&apos;s outputs. Mixture-of-experts architectures
              essentially partition a large model into specialised sub-networks that activate
              selectively. These are early, internal versions of multi-agent coordination.
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
              What we don&apos;t know yet
            </h2>

            <p style={{ marginBottom: "1.5rem" }}>
              The hard unsolved questions are about emergence and error. Ant colonies are robust
              because individual ants are cheap, errors are local, and the feedback loop between
              behaviour and pheromone signal is tight and honest. In multi-agent AI systems, none of
              those things are obviously guaranteed. A confident hallucination passed from one agent
              to the next can cascade faster than any pheromone trail. A poorly designed reward
              signal can cause coordination to collapse into redundancy or conflict.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              The immune system deals with this through negative selection — learning to ignore
              self-signals, to not react to everything. There might be an analogue for AI: agents that
              learn not just what to respond to, but what to filter, when to defer, when to
              disagree. That feels like the interesting design problem to me. Not making each agent
              more capable, but making the collective more reliable.
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
              The goal was never to build a smarter ant. It was always to build a better colony.
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              I find this genuinely exciting — not because it makes the problem easier, but because
              it shifts the question. If intelligence is a property of interaction, then the most
              important design decisions aren&apos;t about model architecture. They&apos;re about communication
              protocols, role structure, feedback mechanisms. About who talks to whom, when, and
              what happens when they disagree. That&apos;s a different kind of engineering problem, and I
              think it&apos;s the one that matters most right now.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
