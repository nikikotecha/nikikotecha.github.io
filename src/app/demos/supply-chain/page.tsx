"use client";

import Nav from "@/components/Nav";
import SupplyChainSimulator from "@/components/demos/SupplyChainSimulator";
import Link from "next/link";


export default function SupplyChainPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 60 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "3rem 2.5rem 5rem" }}>
          <Link
            href="/#demos"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "var(--mono)",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              textDecoration: "none",
              marginBottom: "2rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            ← Back to demos
          </Link>
          <SupplyChainSimulator />
        </div>
      </main>
    </>
  );
}
