"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Topology ────────────────────────────────────────────────────────────────
const NODE_DEFS = [
  { id: "s1", type: "supplier" as const, label: "Supplier A", x: 95, y: 105, capacity: 200, threshold: 70, upTo: 160, prodRate: 28 },
  { id: "s2", type: "supplier" as const, label: "Supplier B", x: 95, y: 255, capacity: 200, threshold: 70, upTo: 160, prodRate: 35 },
  { id: "s3", type: "supplier" as const, label: "Supplier C", x: 95, y: 405, capacity: 200, threshold: 70, upTo: 160, prodRate: 25 },
  { id: "d1", type: "dc"       as const, label: "DC North",  x: 355, y: 105, capacity: 150, threshold: 45, upTo: 115 },
  { id: "d2", type: "dc"       as const, label: "DC Central",x: 355, y: 255, capacity: 150, threshold: 45, upTo: 115 },
  { id: "d3", type: "dc"       as const, label: "DC South",  x: 355, y: 405, capacity: 150, threshold: 45, upTo: 115 },
  { id: "r1", type: "retailer" as const, label: "Store 1",   x: 615, y: 70,  capacity: 100, threshold: 28, upTo: 80, demandMean: 12 },
  { id: "r2", type: "retailer" as const, label: "Store 2",   x: 615, y: 185, capacity: 100, threshold: 28, upTo: 80, demandMean: 15 },
  { id: "r3", type: "retailer" as const, label: "Store 3",   x: 615, y: 330, capacity: 100, threshold: 28, upTo: 80, demandMean: 10 },
  { id: "r4", type: "retailer" as const, label: "Store 4",   x: 615, y: 445, capacity: 100, threshold: 28, upTo: 80, demandMean: 13 },
] as const;

const EDGE_DEFS = [
  { id: "s1-d1", from: "s1", to: "d1" }, { id: "s1-d2", from: "s1", to: "d2" },
  { id: "s2-d1", from: "s2", to: "d1" }, { id: "s2-d2", from: "s2", to: "d2" }, { id: "s2-d3", from: "s2", to: "d3" },
  { id: "s3-d2", from: "s3", to: "d2" }, { id: "s3-d3", from: "s3", to: "d3" },
  { id: "d1-r1", from: "d1", to: "r1" }, { id: "d1-r2", from: "d1", to: "r2" },
  { id: "d2-r2", from: "d2", to: "r2" }, { id: "d2-r3", from: "d2", to: "r3" },
  { id: "d3-r3", from: "d3", to: "r3" }, { id: "d3-r4", from: "d3", to: "r4" },
] as const;

// ─── Types ────────────────────────────────────────────────────────────────────
type NodeId = typeof NODE_DEFS[number]["id"];

interface NodeState {
  inventory: number;
  disrupted: boolean;
  disruptTicks: number;
  shockTicks: number;
  totalDemand: number;
  totalFulfilled: number;
}

interface Particle {
  id: string;
  edgeId: string;
  progress: number;
  amount: number;
}

interface SimEvent {
  tick: number;
  msg: string;
  kind: "info" | "warn" | "danger";
}

interface SimState {
  nodes: Record<string, NodeState>;
  particles: Particle[];
  tick: number;
  rewardHistory: number[];
  events: SimEvent[];
}

// ─── Init ─────────────────────────────────────────────────────────────────────
function initState(): SimState {
  const nodes: Record<string, NodeState> = {};
  for (const n of NODE_DEFS) {
    nodes[n.id] = {
      inventory: n.type === "supplier" ? 145 : n.type === "dc" ? 98 : 62,
      disrupted: false,
      disruptTicks: 0,
      shockTicks: 0,
      totalDemand: 0,
      totalFulfilled: 0,
    };
  }
  return { nodes, particles: [], tick: 0, rewardHistory: [80], events: [] };
}

// ─── Box-Muller normal sample ─────────────────────────────────────────────────
function randNormal(mean: number, std: number) {
  const u = 1 - Math.random();
  const v = Math.random();
  return Math.max(0, mean + std * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v));
}

// ─── Health colour ────────────────────────────────────────────────────────────
function healthColour(inv: number, cap: number, disrupted: boolean) {
  if (disrupted) return "#9ca3af";
  const r = inv / cap;
  if (r > 0.55) return "#22c55e";
  if (r > 0.28) return "#f59e0b";
  return "#ef4444";
}

// ─── Simulation tick ──────────────────────────────────────────────────────────
function stepSim(prev: SimState): SimState {
  const nodes = { ...prev.nodes } as Record<string, NodeState>;
  for (const id in nodes) nodes[id] = { ...nodes[id] };

  const newParticles: Particle[] = prev.particles
    .map((p) => ({ ...p, progress: p.progress + 0.028 }))
    .filter((p) => p.progress < 1);
  const events: SimEvent[] = [...prev.events.slice(-18)];

  // 1. Suppliers produce
  for (const n of NODE_DEFS.filter((n) => n.type === "supplier")) {
    const ns = nodes[n.id];
    if (ns.disrupted) {
      ns.disruptTicks--;
      if (ns.disruptTicks <= 0) {
        ns.disrupted = false;
        events.push({ tick: prev.tick, msg: `${n.label} back online`, kind: "info" });
      }
    } else {
      ns.inventory = Math.min(n.capacity, ns.inventory + n.prodRate);
    }
  }

  // 2. DCs replenish from suppliers
  for (const dc of NODE_DEFS.filter((n) => n.type === "dc")) {
    const dcs = nodes[dc.id];
    if (dcs.inventory < dc.threshold) {
      const orderQty = dc.upTo - dcs.inventory;
      const upstream = EDGE_DEFS
        .filter((e) => e.to === dc.id)
        .map((e) => ({ e, sup: NODE_DEFS.find((n) => n.id === e.from)! }))
        .filter(({ sup }) => !nodes[sup.id].disrupted && nodes[sup.id].inventory > 5)
        .sort((a, b) => nodes[b.sup.id].inventory - nodes[a.sup.id].inventory);

      if (upstream.length > 0) {
        const perSup = Math.ceil(orderQty / upstream.length);
        for (const { e, sup } of upstream) {
          const supNode = nodes[sup.id];
          const shipped = Math.min(perSup, supNode.inventory, dc.capacity - dcs.inventory);
          if (shipped > 0) {
            supNode.inventory -= shipped;
            dcs.inventory = Math.min(dc.capacity, dcs.inventory + shipped);
            newParticles.push({
              id: `p-${e.id}-${prev.tick}-${Math.random().toString(36).slice(2)}`,
              edgeId: e.id,
              progress: 0,
              amount: shipped,
            });
          }
        }
      }
    }
  }

  // 3. Demand at retailers + replenishment from DCs
  let tickDemand = 0, tickFulfilled = 0;
  for (const r of NODE_DEFS.filter((n) => n.type === "retailer")) {
    const rs = nodes[r.id];
    if (rs.shockTicks > 0) rs.shockTicks--;
    const mult = rs.shockTicks > 0 ? 2.6 : 1;
    const demand = Math.round(randNormal(r.demandMean * mult, r.demandMean * 0.3));
    const fulfilled = Math.min(demand, rs.inventory);
    rs.inventory = Math.max(0, rs.inventory - demand);
    rs.totalDemand += demand;
    rs.totalFulfilled += fulfilled;
    tickDemand += demand;
    tickFulfilled += fulfilled;
    if (fulfilled < demand) {
      events.push({ tick: prev.tick, msg: `Stockout at ${r.label} (${demand - fulfilled} units short)`, kind: "danger" });
    }

    // Replenish
    if (rs.inventory < r.threshold) {
      const orderQty = r.upTo - rs.inventory;
      const upstream = EDGE_DEFS
        .filter((e) => e.to === r.id)
        .map((e) => ({ e, dc: NODE_DEFS.find((n) => n.id === e.from)! }))
        .filter(({ dc }) => nodes[dc.id].inventory > 0)
        .sort((a, b) => nodes[b.dc.id].inventory - nodes[a.dc.id].inventory);

      if (upstream.length > 0) {
        const { e, dc } = upstream[0];
        const dcNode = nodes[dc.id];
        const shipped = Math.min(orderQty, dcNode.inventory, r.capacity - rs.inventory);
        if (shipped > 0) {
          dcNode.inventory -= shipped;
          rs.inventory = Math.min(r.capacity, rs.inventory + shipped);
          newParticles.push({
            id: `p-${e.id}-${prev.tick}-${Math.random().toString(36).slice(2)}`,
            edgeId: e.id,
            progress: 0,
            amount: shipped,
          });
        }
      }
    }
  }

  const serviceLvl = tickDemand > 0 ? (tickFulfilled / tickDemand) * 100 : 100;
  const holdCost = Object.values(nodes).reduce((s, n) => s + n.inventory * 0.08, 0);
  const reward = serviceLvl - holdCost * 0.4;
  const rewardHistory = [...prev.rewardHistory, Math.max(0, Math.min(100, reward))].slice(-40);

  return {
    nodes,
    particles: newParticles.slice(0, 50),
    tick: prev.tick + 1,
    rewardHistory,
    events,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SupplyChainSimulator() {
  const [sim, setSim] = useState<SimState>(initState);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(650);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastAnimRef = useRef(0);

  // rAF loop: advance particle progress smoothly
  useEffect(() => {
    function frame(ts: number) {
      if (ts - lastAnimRef.current > 14) {
        lastAnimRef.current = ts;
        setSim((prev) => {
          if (prev.particles.length === 0) return prev;
          const next = prev.particles
            .map((p) => ({ ...p, progress: p.progress + 0.022 }))
            .filter((p) => p.progress < 1);
          return { ...prev, particles: next };
        });
      }
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // Simulation interval
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSim(stepSim), speed);
    return () => clearInterval(id);
  }, [running, speed]);

  const triggerShock = useCallback(() => {
    const targets = NODE_DEFS.filter((n) => n.type === "retailer");
    const target = targets[Math.floor(Math.random() * targets.length)];
    setSim((prev) => ({
      ...prev,
      nodes: { ...prev.nodes, [target.id]: { ...prev.nodes[target.id], shockTicks: 9 } },
      events: [...prev.events.slice(-18), { tick: prev.tick, msg: `Demand shock hit ${target.label}!`, kind: "warn" }],
    }));
  }, []);

  const triggerDisruption = useCallback(() => {
    const targets = NODE_DEFS.filter((n) => n.type === "supplier");
    const target = targets[Math.floor(Math.random() * targets.length)];
    setSim((prev) => ({
      ...prev,
      nodes: { ...prev.nodes, [target.id]: { ...prev.nodes[target.id], disrupted: true, disruptTicks: 14 } },
      events: [...prev.events.slice(-18), { tick: prev.tick, msg: `${target.label} supply disrupted!`, kind: "danger" }],
    }));
  }, []);

  const reset = useCallback(() => {
    setSim(initState());
    setRunning(false);
    setSelectedId(null);
  }, []);

  // ─── Derived ──────────────────────────────────────────────────────────────
  const nodeMap = Object.fromEntries(NODE_DEFS.map((n) => [n.id, n]));

  const allRetailers = NODE_DEFS.filter((n) => n.type === "retailer");
  const totDemand = allRetailers.reduce((s, r) => s + sim.nodes[r.id].totalDemand, 0);
  const totFulfilled = allRetailers.reduce((s, r) => s + sim.nodes[r.id].totalFulfilled, 0);
  const overallSL = totDemand > 0 ? ((totFulfilled / totDemand) * 100).toFixed(1) : "—";

  const stockoutCount = sim.events.filter((e) => e.kind === "danger").length;

  const avgReward =
    sim.rewardHistory.length > 1
      ? (sim.rewardHistory.slice(-10).reduce((a, b) => a + b, 0) / Math.min(10, sim.rewardHistory.length)).toFixed(1)
      : "—";

  // Sparkline
  const SLK_W = 180, SLK_H = 36;
  const rh = sim.rewardHistory;
  const mn = Math.min(...rh), mx = Math.max(...rh, mn + 1);
  const sparkPts = rh.map((v, i) => {
    const x = (i / Math.max(rh.length - 1, 1)) * SLK_W;
    const y = SLK_H - ((v - mn) / (mx - mn)) * SLK_H;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  const selectedDef = selectedId ? nodeMap[selectedId] : null;
  const selectedState = selectedId ? sim.nodes[selectedId] : null;

  // ─── Edge midpoint for particle position ──────────────────────────────────
  function particlePos(edgeId: string, progress: number) {
    const edge = EDGE_DEFS.find((e) => e.id === edgeId);
    if (!edge) return { x: 0, y: 0 };
    const from = nodeMap[edge.from];
    const to = nodeMap[edge.to];
    return {
      x: from.x + (to.x - from.x) * progress,
      y: from.y + (to.y - from.y) * progress,
    };
  }

  const btnBase: React.CSSProperties = {
    fontFamily: "var(--mono)",
    fontSize: "0.75rem",
    fontWeight: 600,
    padding: "0.45rem 0.9rem",
    borderRadius: 6,
    border: "1px solid var(--border)",
    cursor: "pointer",
    transition: "all 0.15s",
    letterSpacing: "0.02em",
  };

  const typeLabel = (t: string) =>
    t === "supplier" ? "Supplier" : t === "dc" ? "Distribution Centre" : "Retailer";

  return (
    <div style={{ fontFamily: "var(--sans)", color: "var(--text)" }}>
      {/* ─── Header ──── */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div className="section-eyebrow" style={{ marginBottom: "0.4rem" }}>interactive demo</div>
        <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: "0.5rem" }}>
          MARL Supply Chain Simulator
        </h2>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", maxWidth: 640, lineHeight: 1.7 }}>
          10 autonomous agents (3 suppliers → 3 distribution centres → 4 stores) each running an independent
          order-up-to policy. Each agent observes only its own inventory — no central controller.
          Hit <strong>Run</strong>, then try injecting disruptions.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: "1.25rem", alignItems: "start" }}>
        {/* ─── SVG Network ─── */}
        <div
          style={{
            background: "var(--bg-soft)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            overflow: "hidden",
          }}
        >
          <svg viewBox="0 0 750 520" width="100%" style={{ display: "block" }}>
            {/* Layer labels */}
            {[
              { x: 95, label: "Suppliers" },
              { x: 355, label: "Distribution" },
              { x: 615, label: "Retail" },
            ].map(({ x, label }) => (
              <text key={x} x={x} y={22} textAnchor="middle" fontSize={10}
                fontFamily="JetBrains Mono, monospace" fill="#9ca3af" letterSpacing="0.08em"
                style={{ textTransform: "uppercase" }}>
                {label.toUpperCase()}
              </text>
            ))}

            {/* Edges */}
            {EDGE_DEFS.map((e) => {
              const from = nodeMap[e.from];
              const to = nodeMap[e.to];
              const hasFlow = sim.particles.some((p) => p.edgeId === e.id);
              return (
                <line key={e.id}
                  x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke={hasFlow ? "#6366f1" : "#e4e4ee"}
                  strokeWidth={hasFlow ? 1.8 : 1.2}
                  strokeDasharray={hasFlow ? undefined : "4 3"}
                  opacity={hasFlow ? 0.7 : 0.6}
                />
              );
            })}

            {/* Particles */}
            {sim.particles.map((p) => {
              const pos = particlePos(p.edgeId, p.progress);
              return (
                <circle key={p.id} cx={pos.x} cy={pos.y} r={4}
                  fill="#6366f1" opacity={0.85} />
              );
            })}

            {/* Nodes */}
            {NODE_DEFS.map((n) => {
              const ns = sim.nodes[n.id];
              const color = healthColour(ns.inventory, n.capacity, ns.disrupted);
              const ratio = ns.inventory / n.capacity;
              const r = n.type === "supplier" ? 30 : n.type === "dc" ? 27 : 24;
              const isSelected = selectedId === n.id;
              const hasShock = ns.shockTicks > 0;

              return (
                <g key={n.id} style={{ cursor: "pointer" }}
                  onClick={() => setSelectedId(selectedId === n.id ? null : n.id)}>
                  {/* Selection ring */}
                  {isSelected && (
                    <circle cx={n.x} cy={n.y} r={r + 7}
                      fill="none" stroke="#6366f1" strokeWidth={2} opacity={0.4} />
                  )}
                  {/* Shock ring */}
                  {hasShock && (
                    <circle cx={n.x} cy={n.y} r={r + 5}
                      fill="none" stroke="#f59e0b" strokeWidth={2} opacity={0.6}
                      strokeDasharray="4 2" />
                  )}
                  {/* Main circle */}
                  <circle cx={n.x} cy={n.y} r={r}
                    fill="white" stroke={color} strokeWidth={2.5} />
                  {/* Inventory fill arc approximation */}
                  <circle cx={n.x} cy={n.y} r={r - 5}
                    fill={color} opacity={Math.max(0.12, ratio * 0.35)} />
                  {/* Inventory bar below circle */}
                  <rect x={n.x - r + 2} y={n.y + r + 5}
                    width={(2 * r - 4) * ratio} height={4}
                    rx={2} fill={color} opacity={0.8} />
                  <rect x={n.x - r + 2} y={n.y + r + 5}
                    width={2 * r - 4} height={4}
                    rx={2} fill="none" stroke={color} strokeWidth={0.8} opacity={0.4} />
                  {/* Type initial */}
                  <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="middle"
                    fontSize={n.type === "supplier" ? 12 : 11}
                    fontFamily="JetBrains Mono, monospace" fontWeight="600"
                    fill={color}>
                    {n.type === "supplier" ? "S" : n.type === "dc" ? "DC" : "R"}
                  </text>
                  {/* Label */}
                  <text x={n.x} y={n.y + r + 16}
                    textAnchor="middle" fontSize={9}
                    fontFamily="Inter, sans-serif" fill="#5c5f72">
                    {n.label}
                  </text>
                  {/* Inventory number */}
                  <text x={n.x} y={n.y + r + 27}
                    textAnchor="middle" fontSize={8.5}
                    fontFamily="JetBrains Mono, monospace" fill={color} fontWeight="600">
                    {Math.round(ns.inventory)}/{n.capacity}
                  </text>
                  {/* Disrupted overlay */}
                  {ns.disrupted && (
                    <text x={n.x} y={n.y - r - 6}
                      textAnchor="middle" fontSize={8}
                      fontFamily="JetBrains Mono, monospace" fill="#ef4444">
                      DISRUPTED
                    </text>
                  )}
                </g>
              );
            })}

            {/* Tick counter */}
            <text x={725} y={512} textAnchor="end" fontSize={9}
              fontFamily="JetBrains Mono, monospace" fill="#9ca3af">
              t={sim.tick}
            </text>
          </svg>
        </div>

        {/* ─── Control Panel ─── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {/* Run / Pause */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => setRunning((v) => !v)}
              style={{
                ...btnBase,
                flex: 1,
                background: running ? "#fef2f2" : "var(--accent)",
                color: running ? "#ef4444" : "#fff",
                border: running ? "1px solid #fecaca" : "1px solid var(--accent-dark)",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              {running ? "⏸ Pause" : "▶ Run"}
            </button>
            <button
              onClick={reset}
              style={{ ...btnBase, background: "var(--bg-soft)", color: "var(--text-muted)" }}
              title="Reset simulation"
            >
              ↺
            </button>
          </div>

          {/* Speed */}
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "0.35rem", letterSpacing: "0.04em" }}>
              SPEED
            </div>
            <div style={{ display: "flex", gap: "0.35rem" }}>
              {[["Slow", 1000], ["Med", 600], ["Fast", 250]] .map(([label, val]) => (
                <button key={val}
                  onClick={() => setSpeed(val as number)}
                  style={{
                    ...btnBase,
                    flex: 1,
                    fontSize: "0.68rem",
                    padding: "0.35rem 0",
                    background: speed === val ? "var(--accent-soft)" : "var(--bg-soft)",
                    color: speed === val ? "var(--accent)" : "var(--text-muted)",
                    border: speed === val ? "1px solid var(--accent-light)" : "1px solid var(--border)",
                    justifyContent: "center",
                    display: "flex",
                  }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "0.35rem", letterSpacing: "0.04em" }}>
              INJECT EVENT
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <button onClick={triggerShock}
                style={{
                  ...btnBase,
                  background: "#fffbeb",
                  color: "#92400e",
                  border: "1px solid #fde68a",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  justifyContent: "center",
                  width: "100%",
                }}>
                ⚡ Demand Shock
              </button>
              <button onClick={triggerDisruption}
                style={{
                  ...btnBase,
                  background: "#fef2f2",
                  color: "#991b1b",
                  border: "1px solid #fecaca",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  justifyContent: "center",
                  width: "100%",
                }}>
                💥 Supply Disruption
              </button>
            </div>
          </div>

          {/* Legend */}
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.75rem" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "0.45rem", letterSpacing: "0.04em" }}>
              INVENTORY HEALTH
            </div>
            {[
              ["#22c55e", "> 55%  healthy"],
              ["#f59e0b", "28–55%  low"],
              ["#ef4444", "< 28%  critical"],
              ["#9ca3af", "disrupted"],
            ].map(([col, lbl]) => (
              <div key={col} style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.3rem" }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: col, flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", color: "var(--text-muted)" }}>{lbl}</span>
              </div>
            ))}
          </div>

          {/* Selected node detail */}
          {selectedDef && selectedState && (
            <div style={{
              borderTop: "1px solid var(--border)",
              paddingTop: "0.75rem",
            }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: "0.7rem", color: "var(--accent)", marginBottom: "0.5rem", letterSpacing: "0.04em" }}>
                {selectedDef.label.toUpperCase()}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
                <div><strong>Type:</strong> {typeLabel(selectedDef.type)}</div>
                <div><strong>Stock:</strong> {Math.round(selectedState.inventory)}/{selectedDef.capacity}</div>
                {"demandMean" in selectedDef && (
                  <div><strong>Avg demand:</strong> {selectedDef.demandMean}/tick</div>
                )}
                {"prodRate" in selectedDef && (
                  <div><strong>Prod rate:</strong> {(selectedDef as typeof NODE_DEFS[0]).prodRate}/tick</div>
                )}
                <div><strong>Threshold:</strong> {selectedDef.threshold}</div>
                <div><strong>Order-up-to:</strong> {selectedDef.upTo}</div>
                {selectedState.totalDemand > 0 && (
                  <div><strong>Fill rate:</strong> {((selectedState.totalFulfilled / selectedState.totalDemand) * 100).toFixed(1)}%</div>
                )}
                {selectedState.disrupted && (
                  <div style={{ color: "#ef4444" }}>Disrupted: {selectedState.disruptTicks} ticks left</div>
                )}
                {selectedState.shockTicks > 0 && (
                  <div style={{ color: "#f59e0b" }}>Shock: {selectedState.shockTicks} ticks left</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Metrics row ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "1rem" }}>
        {[
          { label: "System Service Level", value: `${overallSL}%`, sub: "demand fulfilled" },
          { label: "Stockout Events", value: String(stockoutCount), sub: "this session" },
          { label: "Avg Reward (last 10)", value: avgReward, sub: "service − holding cost" },
        ].map((m) => (
          <div key={m.label} style={{
            background: "var(--bg-soft)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            padding: "1rem 1.25rem",
          }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.35rem" }}>
              {m.label}
            </div>
            <div style={{ fontSize: "1.7rem", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)" }}>
              {m.value}
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", color: "var(--text-light)", marginTop: "0.2rem" }}>
              {m.sub}
            </div>
          </div>
        ))}
      </div>

      {/* ─── Reward sparkline + event log ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
        <div style={{
          background: "var(--bg-soft)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
          padding: "1rem 1.25rem",
        }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
            Reward History
          </div>
          <svg width="100%" viewBox={`0 0 ${SLK_W} ${SLK_H + 4}`} style={{ overflow: "visible" }}>
            <polyline points={sparkPts} fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            {rh.length > 0 && (() => {
              const lastX = ((rh.length - 1) / Math.max(rh.length - 1, 1)) * SLK_W;
              const lastY = SLK_H - ((rh[rh.length - 1] - mn) / (mx - mn)) * SLK_H;
              return <circle cx={lastX} cy={lastY} r={3} fill="var(--accent)" />;
            })()}
          </svg>
        </div>

        <div style={{
          background: "var(--bg-soft)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
          padding: "1rem 1.25rem",
          maxHeight: 130,
          overflowY: "auto",
        }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
            Event Log
          </div>
          {sim.events.length === 0 ? (
            <div style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", color: "var(--text-light)" }}>No events yet — hit Run to start.</div>
          ) : (
            [...sim.events].reverse().map((ev, i) => (
              <div key={i} style={{
                fontFamily: "var(--mono)",
                fontSize: "0.7rem",
                color: ev.kind === "danger" ? "#dc2626" : ev.kind === "warn" ? "#d97706" : "#16a34a",
                marginBottom: "0.3rem",
                lineHeight: 1.5,
              }}>
                <span style={{ color: "#9ca3af" }}>t{ev.tick} </span>{ev.msg}
              </div>
            ))
          )}
        </div>
      </div>

      {/* ─── Explainer ─── */}
      <div style={{
        marginTop: "1rem",
        padding: "1rem 1.25rem",
        background: "var(--accent-soft)",
        border: "1px solid var(--accent-light)",
        borderRadius: "var(--radius-sm)",
        fontSize: "0.82rem",
        color: "var(--text-muted)",
        lineHeight: 1.75,
      }}>
        <strong style={{ color: "var(--accent)" }}>How it works:</strong> Each agent independently
        follows a learned <em>(s, S)</em> inventory policy — order up to level <em>S</em> whenever
        stock drops below threshold <em>s</em>. Demand is stochastic (normal distribution). Suppliers
        produce at a fixed rate each tick. No central controller — this is decentralised MARL.{" "}
        <strong>Click any node</strong> to inspect its state. Use the event buttons to stress-test the system.
      </div>
    </div>
  );
}
