import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Niki Kotecha — PhD Researcher in AI",
  description:
    "Niki Kotecha — PhD Researcher in AI at Imperial College London. Multi-Agent Reinforcement Learning, Graph Neural Networks, Complex Decision-Making.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
