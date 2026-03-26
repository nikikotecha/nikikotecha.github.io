import Nav from "@/components/Nav";
import DemosSection from "@/components/DemosSection";
import Link from "next/link";

export const metadata = {
  title: "Demos — Niki Kotecha",
  description: "Live interactive demos: MARL supply chain simulator and more.",
};

export default function DemosPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 60 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "3rem 2.5rem 5rem" }}>
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
              marginBottom: "2rem",
            }}
          >
            ← Home
          </Link>
          <DemosSection />
        </div>
      </main>
    </>
  );
}
