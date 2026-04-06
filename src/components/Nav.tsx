"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "/#about", label: "about" },
  { href: "/#experience", label: "experience" },
  { href: "/#projects", label: "projects" },
  { href: "/#demos", label: "demos" },
  { href: "/#education", label: "education" },
  { href: "/blog", label: "blog" },
  { href: "/#contact", label: "contact" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll("[id]");
      let current = "";
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 80)
          current = s.id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2.5rem",
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "var(--text)",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          nk<span style={{ color: "var(--accent)" }}>.</span>dev
        </Link>

        <ul
          style={{
            display: "flex",
            gap: "2rem",
            listStyle: "none",
          }}
          className="hidden md:flex"
        >
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.83rem",
                  fontWeight: 500,
                  color:
                    active === l.href.replace("/#", "")
                      ? "var(--accent)"
                      : "var(--text-muted)",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  transition: "color 0.2s",
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
          }}
          className="flex md:hidden"
        >
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "var(--text)",
              borderRadius: 2,
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "var(--text)",
              borderRadius: 2,
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "var(--text)",
              borderRadius: 2,
            }}
          />
        </button>
      </nav>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 60,
            left: 0,
            right: 0,
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(14px)",
            borderBottom: "1px solid var(--border)",
            padding: "1.5rem 2.5rem",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
