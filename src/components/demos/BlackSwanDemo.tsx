"use client";

import { useState } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type CouncilMember = {
  name: string;
  score: number;
  reasoning: string;
};

type Article = {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  excerpt: string;
  tags: string[];
  region: string;
  councilScore: number;
  passed: boolean;
  topic: "sanctions" | "trade" | "supply-chain" | "macro";
  councilMembers: CouncilMember[];
  chairmanSynthesis: string;
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const ARTICLES: Article[] = [
  {
    id: "1",
    title: "OFAC Issues Emergency Designations Against Three Iranian Petrochemical Networks",
    source: "Reuters",
    publishedAt: "2 hours ago",
    excerpt:
      "The U.S. Treasury's OFAC designated three Iranian petrochemical networks and associated shipping entities for facilitating hundreds of millions in oil revenue transfers that benefit the IRGC.",
    tags: ["OFAC", "Iran", "Petrochemical"],
    region: "Middle East",
    councilScore: 8.7,
    passed: true,
    topic: "sanctions",
    councilMembers: [
      { name: "Sanctions Policy", score: 9.5, reasoning: "Direct OFAC emergency action naming specific entities. High compliance exposure for any firm with Iran petrochemical supply chain touchpoints." },
      { name: "Trade & Export Controls", score: 8.2, reasoning: "Secondary sanctions risk elevated — any third-country entity transacting with designated networks now faces U.S. exposure." },
      { name: "Supply Chain", score: 8.8, reasoning: "Petrochemical feedstock supply chains through Gulf region potentially disrupted. Rerouting via intermediaries now higher risk." },
      { name: "Financial Intelligence", score: 9.1, reasoning: "Wire transfer correspondent banking exposure. Named shipping entities likely used for sanctions evasion through obscured payments." },
      { name: "Legal & Compliance", score: 9.3, reasoning: "Immediate compliance action required for any client with Iran-adjacent petrochemical suppliers. SDN list update has same-day legal effect." },
      { name: "Geopolitical Risk", score: 8.0, reasoning: "Escalatory signal in Iran-U.S. tensions. Likely timed with nuclear negotiation posture." },
      { name: "Energy & Commodities", score: 9.2, reasoning: "Direct impact on Iranian crude export revenue mechanisms. Spot price volatility likely in affected grades." },
      { name: "Tech & Dual-Use", score: 6.1, reasoning: "Marginal relevance — no technology transfer components mentioned, though future designations may expand scope." },
      { name: "Corporate Intelligence", score: 8.4, reasoning: "Competitor petrochemical firms with Gulf operations will be reviewing exposure. Market opportunity for compliant suppliers." },
      { name: "Regional Specialist", score: 8.9, reasoning: "Iran's IRGC-linked petrochemical networks are deeply embedded in regional supply chains. Designation scope likely broader than named entities." },
    ],
    chairmanSynthesis:
      "This OFAC emergency designation is a high-priority alert. Nine of ten council members scored this above 8.0, reflecting unanimous agreement on direct sanctions compliance exposure. The action targets IRGC-linked petrochemical revenue networks and carries same-day SDN legal effect. Any client with petrochemical supply chains touching the Gulf region should conduct immediate counterparty screening. Secondary sanctions risk means third-country intermediaries are also exposed. The Regional Specialist flags that the designation scope is likely broader than named entities — expect follow-on designations within 30–60 days.",
  },
  {
    id: "2",
    title: "BIS Adds 23 Chinese Semiconductor Entities to Entity List Over Military End-Use Concerns",
    source: "Wall Street Journal",
    publishedAt: "5 hours ago",
    excerpt:
      "The Bureau of Industry and Security expanded the Entity List by 23 Chinese firms, citing advanced semiconductor manufacturing capabilities with potential military applications under the FDPR and EAR controls framework.",
    tags: ["BIS", "China", "Semiconductors", "Entity List"],
    region: "East Asia",
    councilScore: 8.4,
    passed: true,
    topic: "trade",
    councilMembers: [
      { name: "Sanctions Policy", score: 7.2, reasoning: "Not a sanctions action per se, but Entity List designation creates similar compliance obligations for export licensing." },
      { name: "Trade & Export Controls", score: 9.7, reasoning: "Core export control action. EAR licensing requirements now apply to all exports to these 23 entities. FDPR applies to foreign-produced items with U.S.-origin technology." },
      { name: "Supply Chain", score: 8.1, reasoning: "Semiconductor supply chain disruption significant. Any firm sourcing from or selling to listed entities must immediately re-evaluate contracts." },
      { name: "Financial Intelligence", score: 7.8, reasoning: "Deal financing and payment terms for transactions involving listed entities now require heightened due diligence." },
      { name: "Legal & Compliance", score: 9.4, reasoning: "Immediate export licensing audit required. Violation of EAR restrictions carries criminal penalties up to 20 years imprisonment." },
      { name: "Geopolitical Risk", score: 8.6, reasoning: "Signals continued U.S.–China technology decoupling. Escalation likely to prompt retaliatory Chinese export controls on rare earths." },
      { name: "Energy & Commodities", score: 4.5, reasoning: "Limited direct relevance to energy sector unless clients have semiconductor-dependent energy infrastructure." },
      { name: "Tech & Dual-Use", score: 9.8, reasoning: "Highest relevance — advanced semiconductor manufacturing with military dual-use potential. FDPR has extraterritorial reach affecting non-U.S. firms." },
      { name: "Corporate Intelligence", score: 8.3, reasoning: "Competitors now face same compliance burden. First-movers to qualify alternative suppliers gain strategic advantage." },
      { name: "Regional Specialist", score: 8.9, reasoning: "Chinese government likely views this as provocation. Expect PRC Ministry of Commerce countermeasure announcement within 72 hours." },
    ],
    chairmanSynthesis:
      "A significant trade control escalation with broad technology sector implications. The Tech & Dual-Use council member scores this 9.8 — the highest in this batch — citing FDPR extraterritorial reach that affects non-U.S. firms with U.S.-origin technology in their products. Legal & Compliance concurs with a 9.4, flagging immediate export licensing audit requirements. The Regional Specialist warns of retaliatory PRC countermeasures within 72 hours. For clients in semiconductor supply chains or with Chinese manufacturing partners, this requires urgent counterparty screening against the updated Entity List.",
  },
  {
    id: "3",
    title: "EU Adopts 14th Sanctions Package Targeting Russian Shadow Fleet and LNG Re-exports",
    source: "Financial Times",
    publishedAt: "1 day ago",
    excerpt:
      "The European Union formally adopted its 14th package of Russia sanctions, focusing on oil price cap enforcement, shadow fleet vessel designations, and new restrictions on LNG re-export via European terminals.",
    tags: ["EU Sanctions", "Russia", "LNG", "Shadow Fleet"],
    region: "Europe / Russia",
    councilScore: 8.1,
    passed: true,
    topic: "sanctions",
    councilMembers: [
      { name: "Sanctions Policy", score: 9.0, reasoning: "14th package introduces novel LNG re-export restrictions and expands vessel designation scope. Compliance teams must update maritime counterparty lists." },
      { name: "Trade & Export Controls", score: 8.3, reasoning: "Re-export provisions affect EU-based LNG terminal operators who have been facilitating Russian gas reshipment to Asia." },
      { name: "Supply Chain", score: 7.9, reasoning: "Maritime logistics disruption from shadow fleet designations. Affected vessels will attempt flag-of-convenience switching." },
      { name: "Financial Intelligence", score: 8.7, reasoning: "Oil price cap enforcement mechanisms tightened. Banks providing trade finance for Russian oil above cap now face direct liability." },
      { name: "Legal & Compliance", score: 8.9, reasoning: "EU legal effect immediate upon publication in Official Journal. Non-EU subsidiaries of EU companies also covered." },
      { name: "Geopolitical Risk", score: 8.2, reasoning: "Package signals sustained EU resolve on Ukraine. Russia's shadow fleet response will test enforcement capacity." },
      { name: "Energy & Commodities", score: 9.1, reasoning: "LNG re-export restrictions will affect European energy security. Asia-Pacific buyers may face supply constraints. Spot market impact expected." },
      { name: "Tech & Dual-Use", score: 5.2, reasoning: "Technology export items in package are incremental. No major new dual-use additions." },
      { name: "Corporate Intelligence", score: 7.6, reasoning: "European energy traders and shipping intermediaries will scramble to divest shadow fleet exposure. M&A activity likely in non-sanctioned maritime assets." },
      { name: "Regional Specialist", score: 8.4, reasoning: "Russia will accelerate domestic LNG fleet development and deepen China/India relationship for shadow fleet management." },
    ],
    chairmanSynthesis:
      "The 14th EU sanctions package introduces meaningful new enforcement mechanisms beyond prior packages. The Energy & Commodities council member scores this 9.1, highlighting LNG re-export restrictions as the most operationally significant provision — European terminal operators facilitating Russian gas reshipment to Asia are directly in scope. Financial Intelligence (8.7) flags tightened oil price cap enforcement with direct bank liability. For clients in maritime shipping, energy trading, or European terminal operations, this requires immediate counterparty review against the new vessel designation list.",
  },
  {
    id: "4",
    title: "Red Sea Disruption Enters 5th Month; Lloyd's War Risk Premium Rises to 0.6%",
    source: "Lloyd's List",
    publishedAt: "4 hours ago",
    excerpt:
      "Houthi attacks in the Red Sea continued for a fifth consecutive month, with Lloyd's Market Association raising war risk premiums to 0.6% of vessel value. Maersk and MSC continue routing via the Cape of Good Hope, adding 12–14 days to Europe–Asia transit.",
    tags: ["Red Sea", "Shipping", "War Risk", "Houthi"],
    region: "Middle East / Suez",
    councilScore: 7.2,
    passed: true,
    topic: "supply-chain",
    councilMembers: [
      { name: "Sanctions Policy", score: 6.3, reasoning: "Houthi designation as Specially Designated Global Terrorist means any material support to them — including port services — carries sanctions risk." },
      { name: "Trade & Export Controls", score: 6.8, reasoning: "Routing changes affect transit times for controlled goods. Export license validity periods may be impacted by extended transit." },
      { name: "Supply Chain", score: 9.4, reasoning: "5 months of disruption is now structural. Cape routing adds 12–14 days and significantly higher fuel/insurance costs. Clients should update lead time assumptions permanently." },
      { name: "Financial Intelligence", score: 7.9, reasoning: "War risk premium increase to 0.6% represents material cost increase for cargo owners. Trade finance terms being renegotiated." },
      { name: "Legal & Compliance", score: 6.9, reasoning: "Force majeure clause activation risk for contracts specifying Suez routing. Legal teams should audit affected contracts." },
      { name: "Geopolitical Risk", score: 8.2, reasoning: "Persistent disruption signals Houthi capability to sustain campaign. U.S./UK strikes have not deterred. Escalation to broader Red Sea conflict remains a risk." },
      { name: "Energy & Commodities", score: 7.8, reasoning: "LNG tanker rerouting significantly increases Asian energy import costs. Oil price support from higher shipping costs." },
      { name: "Tech & Dual-Use", score: 4.2, reasoning: "Technology goods in transit face delays but no specific dual-use concerns." },
      { name: "Corporate Intelligence", score: 7.1, reasoning: "Shipping capacity tightness creating pricing power for carriers. Inventory build strategies being accelerated by importers." },
      { name: "Regional Specialist", score: 8.4, reasoning: "Houthi campaign likely to persist through current Yemen peace process timeline. Iran's strategic calculus benefits from continued disruption." },
    ],
    chairmanSynthesis:
      "Persistent Red Sea disruption is now a structural supply chain risk, not a transient event. The Supply Chain council member scores this 9.4 — highest in this batch — noting that 5 months of continuous disruption means clients should update lead time and inventory assumptions permanently. The Regional Specialist (8.4) assesses Houthi campaign persistence as likely through current peace process timelines. Financial Intelligence flags war risk premium increases creating material cost impact. For clients with Asia–Europe supply chains, this article warrants a supply chain strategy review, not just operational monitoring.",
  },
  {
    id: "5",
    title: "Kazakhstan Announces $2.3B Trans-Caspian Corridor Investment to Bypass Russian Rail",
    source: "Bloomberg",
    publishedAt: "2 days ago",
    excerpt:
      "Kazakhstan's government confirmed a $2.3 billion investment in the Trans-Caspian International Transport Route to double cargo capacity, positioning the corridor as the primary alternative to Russian rail for Central Asian trade flows.",
    tags: ["Kazakhstan", "Logistics", "Trade Route", "Russia Bypass"],
    region: "Central Asia",
    councilScore: 6.3,
    passed: true,
    topic: "supply-chain",
    councilMembers: [
      { name: "Sanctions Policy", score: 5.1, reasoning: "Indirect sanctions relevance — corridor development driven partly by need to avoid Russian sanctions exposure for trans-shipment cargo." },
      { name: "Trade & Export Controls", score: 6.8, reasoning: "New routing options reduce Russian chokepoint risk for exports to Central Asian markets. Compliance teams should update approved routing documentation." },
      { name: "Supply Chain", score: 8.9, reasoning: "Strategically significant supply chain diversification. Trans-Caspian capacity expansion directly addresses Russia-bypass demand from European exporters." },
      { name: "Financial Intelligence", score: 5.9, reasoning: "$2.3B investment creates financing opportunities and suggests corridor is commercially viable in the medium term." },
      { name: "Legal & Compliance", score: 4.7, reasoning: "No immediate compliance obligations. Routing documentation updates recommended for clients currently certified on Russian rail." },
      { name: "Geopolitical Risk", score: 7.2, reasoning: "Significant geopolitical signal — Kazakhstan deepening economic independence from Russia. Moscow will apply pressure through energy pricing." },
      { name: "Energy & Commodities", score: 6.5, reasoning: "Corridor expansion enables Kazakhstani oil export diversification away from Russian pipeline infrastructure." },
      { name: "Tech & Dual-Use", score: 3.1, reasoning: "No technology transfer components of note." },
      { name: "Corporate Intelligence", score: 7.4, reasoning: "First-mover logistics providers to establish Trans-Caspian capacity will gain significant competitive advantage as route matures." },
      { name: "Regional Specialist", score: 8.1, reasoning: "This accelerates Central Asian geopolitical realignment. Russia's leverage over Kazakhstan is materially weakened by viable alternative routing." },
    ],
    chairmanSynthesis:
      "This article scores above threshold primarily on supply chain and geopolitical grounds. The Supply Chain council member scores this 8.9, noting that the Trans-Caspian expansion directly addresses Russia-bypass demand from European exporters. The Regional Specialist (8.1) contextualises this as accelerating Central Asian geopolitical realignment with lasting implications for Russia's regional leverage. For clients with Central Asian supply chains or logistics operations, this is a strategic planning input: routing diversification away from Russian rail is now commercially viable and state-backed.",
  },
  {
    id: "6",
    title: "IMF Revises Global Growth Forecast to 2.8%, Cites Trade Fragmentation",
    source: "IMF Press Release",
    publishedAt: "3 days ago",
    excerpt:
      "The International Monetary Fund lowered its 2025 global growth projection to 2.8%, down from 3.2%, attributing the revision to accelerating trade fragmentation, elevated interest rates, and geopolitical uncertainty.",
    tags: ["IMF", "Macroeconomics", "Growth Forecast"],
    region: "Global",
    councilScore: 4.2,
    passed: false,
    topic: "macro",
    councilMembers: [
      { name: "Sanctions Policy", score: 3.1, reasoning: "No direct sanctions content. General macro backdrop only." },
      { name: "Trade & Export Controls", score: 5.2, reasoning: "Trade fragmentation narrative aligns with export control trends but contains no actionable intelligence." },
      { name: "Supply Chain", score: 4.8, reasoning: "Growth downgrade implies reduced demand. Relevant for capacity planning but not an operational risk signal." },
      { name: "Financial Intelligence", score: 5.9, reasoning: "Interest rate and growth projections relevant for financing cost models but widely known and priced in." },
      { name: "Legal & Compliance", score: 2.1, reasoning: "No compliance implications." },
      { name: "Geopolitical Risk", score: 5.4, reasoning: "Geopolitical uncertainty cited but this is a lagging macro indicator, not a forward risk signal." },
      { name: "Energy & Commodities", score: 4.3, reasoning: "Demand implications for energy commodities but already priced into forward curves." },
      { name: "Tech & Dual-Use", score: 3.2, reasoning: "Minimal tech-specific relevance." },
      { name: "Corporate Intelligence", score: 4.9, reasoning: "Growth downgrade relevant for market sizing but widely reported across all outlets." },
      { name: "Regional Specialist", score: 3.8, reasoning: "Global macro — no region-specific actionable intelligence." },
    ],
    chairmanSynthesis:
      "This article does not meet the relevance threshold for your client profile. While the IMF growth revision reflects the macro environment relevant to your business, it contains no actionable geopolitical risk intelligence — it is a lagging indicator of trends already priced into market expectations. Council member scores cluster in the 3–5 range with no domain specialist finding direct operational relevance. Filtered out to reduce noise in your intelligence feed.",
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function scoreColor(score: number) {
  if (score >= 8) return "#dc2626";
  if (score >= 6) return "#d97706";
  return "#6b7280";
}

function scoreBg(score: number) {
  if (score >= 8) return "#fef2f2";
  if (score >= 6) return "#fffbeb";
  return "#f9fafb";
}

function scoreBorder(score: number) {
  if (score >= 8) return "#fecaca";
  if (score >= 6) return "#fde68a";
  return "#e5e7eb";
}

// ─── COUNCIL PANEL ────────────────────────────────────────────────────────────

function CouncilPanel({ article }: { article: Article }) {
  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        marginTop: "1rem",
        paddingTop: "1.25rem",
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "1.5rem",
      }}
    >
      {/* Score summary */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <div
          style={{
            background: scoreBg(article.councilScore),
            border: `1px solid ${scoreBorder(article.councilScore)}`,
            borderRadius: "var(--radius-sm)",
            padding: "0.75rem 1.25rem",
            display: "flex",
            alignItems: "baseline",
            gap: "0.4rem",
          }}
        >
          <span
            style={{
              fontSize: "1.8rem",
              fontWeight: 700,
              color: scoreColor(article.councilScore),
              fontFamily: "var(--mono)",
              lineHeight: 1,
            }}
          >
            {article.councilScore.toFixed(1)}
          </span>
          <span style={{ fontSize: "0.85rem", color: scoreColor(article.councilScore), opacity: 0.7 }}>/10</span>
        </div>
        <div
          style={{
            padding: "0.45rem 1rem",
            borderRadius: 100,
            fontSize: "0.8rem",
            fontWeight: 600,
            background: article.passed ? "#f0fdf4" : "#f9fafb",
            color: article.passed ? "#16a34a" : "#6b7280",
            border: `1px solid ${article.passed ? "#bbf7d0" : "#e5e7eb"}`,
          }}
        >
          {article.passed ? "✓ Threshold passed (≥ 6.0)" : "✗ Filtered — below threshold"}
        </div>
      </div>

      {/* Two-column council scores */}
      <div>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.7rem",
            color: "var(--accent)",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "0.9rem",
          }}
        >
          10-Member Council Scores
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "0.85rem",
          }}
        >
          {article.councilMembers.map((m) => (
            <div
              key={m.name}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                padding: "0.85rem 1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text)" }}>{m.name}</span>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: scoreColor(m.score),
                  }}
                >
                  {m.score.toFixed(1)}
                </span>
              </div>
              <div
                style={{
                  height: 3,
                  background: "var(--border)",
                  borderRadius: 2,
                  overflow: "hidden",
                  marginBottom: "0.55rem",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${m.score * 10}%`,
                    background: scoreColor(m.score),
                    borderRadius: 2,
                    transition: "width 0.6s ease",
                  }}
                />
              </div>
              <div style={{ fontSize: "0.775rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                {m.reasoning}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chairman synthesis */}
      <div
        style={{
          background: "var(--accent-soft)",
          border: "1px solid var(--accent-light)",
          borderRadius: "var(--radius-sm)",
          padding: "1.25rem 1.5rem",
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.7rem",
            color: "var(--accent)",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "0.75rem",
          }}
        >
          Chairman Synthesis
        </div>
        <div style={{ fontSize: "0.875rem", color: "var(--text)", lineHeight: 1.8 }}>
          {article.chairmanSynthesis}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function BlackSwanDemo() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filters = [
    { key: "all", label: "All Articles" },
    { key: "sanctions", label: "Sanctions" },
    { key: "trade", label: "Trade & Export" },
    { key: "supply-chain", label: "Supply Chain" },
    { key: "macro", label: "Macro" },
  ];

  const filtered =
    activeFilter === "all" ? ARTICLES : ARTICLES.filter((a) => a.topic === activeFilter);

  const passedCount = filtered.filter((a) => a.passed).length;

  return (
    <div style={{ fontFamily: "var(--sans)" }}>
      {/* ── Header ── */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div className="section-eyebrow">geopolitical risk intelligence</div>
        <h2
          style={{
            fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            marginBottom: "0.7rem",
          }}
        >
          BlackSwan Intelligence Platform
        </h2>
        <p className="section-lead" style={{ marginBottom: "1.75rem" }}>
          A council of 10 AI specialists — sanctions lawyers, trade experts, supply chain analysts —
          continuously screens thousands of articles and surfaces only what&apos;s material to your risk
          profile. Click any article below to see the full council reasoning.
        </p>

        {/* Stats */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {[
            { label: "Articles screened today", value: "1,847" },
            { label: "Passed threshold (≥ 6.0)", value: "73" },
            { label: "Council members", value: "10" },
            { label: "Cost vs. manual review", value: "−91%" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "var(--bg-soft)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                padding: "0.8rem 1.25rem",
                minWidth: 130,
              }}
            >
              <div
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                  fontFamily: "var(--mono)",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: "0.74rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Filters ── */}
      <div
        style={{
          display: "flex",
          gap: "0.45rem",
          flexWrap: "wrap",
          marginBottom: "1.25rem",
          alignItems: "center",
        }}
      >
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: 100,
              fontSize: "0.8rem",
              fontWeight: 500,
              cursor: "pointer",
              border: "1px solid",
              fontFamily: "var(--sans)",
              transition: "all 0.18s ease",
              background: activeFilter === f.key ? "var(--accent)" : "var(--bg-soft)",
              color: activeFilter === f.key ? "#fff" : "var(--text-muted)",
              borderColor: activeFilter === f.key ? "var(--accent)" : "var(--border)",
            }}
          >
            {f.label}
          </button>
        ))}
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "var(--mono)",
            fontSize: "0.72rem",
            color: "var(--text-light)",
          }}
        >
          {passedCount} of {filtered.length} passed
        </span>
      </div>

      {/* ── Article list ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filtered.map((article) => {
          const isExpanded = expandedId === article.id;
          return (
            <div
              key={article.id}
              style={{
                background: "var(--bg-card)",
                border: "1px solid",
                borderColor: isExpanded ? "var(--accent)" : article.passed ? "var(--border)" : "var(--border)",
                borderRadius: "var(--radius)",
                padding: "1.25rem 1.5rem",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                opacity: article.passed ? 1 : 0.65,
              }}
            >
              {/* Article header row */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : article.id)}
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem",
                    marginBottom: "0.6rem",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "0.96rem",
                        lineHeight: 1.45,
                        color: "var(--text)",
                        marginBottom: "0.3rem",
                      }}
                    >
                      {article.title}
                    </div>
                    <div
                      style={{
                        fontSize: "0.775rem",
                        color: "var(--text-light)",
                        fontFamily: "var(--mono)",
                      }}
                    >
                      {article.source} · {article.publishedAt} · {article.region}
                    </div>
                  </div>

                  {/* Score badge */}
                  <div
                    style={{
                      flexShrink: 0,
                      background: scoreBg(article.councilScore),
                      border: `1px solid ${scoreBorder(article.councilScore)}`,
                      borderRadius: "var(--radius-sm)",
                      padding: "0.4rem 0.7rem",
                      textAlign: "center",
                      minWidth: 58,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: scoreColor(article.councilScore),
                        fontFamily: "var(--mono)",
                        lineHeight: 1,
                      }}
                    >
                      {article.councilScore.toFixed(1)}
                    </div>
                    <div
                      style={{
                        fontSize: "0.6rem",
                        color: scoreColor(article.councilScore),
                        fontWeight: 600,
                        marginTop: "0.2rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {article.passed ? "passed" : "filtered"}
                    </div>
                  </div>
                </div>

                {/* Excerpt */}
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    marginBottom: "0.8rem",
                  }}
                >
                  {article.excerpt}
                </div>

                {/* Tags + expand hint */}
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", alignItems: "center" }}>
                  {article.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                  <span
                    style={{
                      marginLeft: "auto",
                      fontFamily: "var(--mono)",
                      fontSize: "0.72rem",
                      color: isExpanded ? "var(--accent)" : "var(--text-light)",
                      transition: "color 0.2s",
                    }}
                  >
                    {isExpanded ? "↑ hide analysis" : "↓ view council analysis"}
                  </span>
                </div>
              </div>

              {/* Expanded council panel */}
              {isExpanded && <CouncilPanel article={article} />}
            </div>
          );
        })}
      </div>

      {/* ── Demo note ── */}
      <div
        style={{
          marginTop: "2.5rem",
          padding: "1rem 1.25rem",
          background: "var(--bg-soft)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
        }}
      >
        <div style={{ fontSize: "0.78rem", color: "var(--text-light)", lineHeight: 1.75 }}>
          <strong style={{ color: "var(--text-muted)" }}>Demo note:</strong> All articles, scores, and
          council analyses shown are simulated examples representative of real output. In production,
          BlackSwan ingests 1,800+ articles daily from NewsAPI, GDELT, RSS feeds, and Treasury.gov —
          scoring each against a client&apos;s risk profile using a 10-persona LLM council with a 3-stage
          deliberation process (individual analysis → peer ranking → chairman synthesis).
        </div>
      </div>
    </div>
  );
}
