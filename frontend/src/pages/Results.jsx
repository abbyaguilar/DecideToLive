// frontend/src/pages/Results.jsx

import React, { useMemo, useState } from "react";
import { fetchSchema } from "../api.js";

const LIFE_INSURANCE_URL = "https://life-insuance-app.vercel.app/";

function colorToChip(color) {
    if (color === "green")
        return {
            bg: "rgba(205,191,168,0.35)",
            border: "rgba(18,18,18,0.14)",
            text: "Protective",
        };
    if (color === "yellow")
        return {
            bg: "rgba(205,191,168,0.18)",
            border: "rgba(18,18,18,0.10)",
            text: "Mixed",
        };
    return {
        bg: "rgba(205,191,168,0.08)",
        border: "rgba(18,18,18,0.14)",
        text: "Risk associated",
    };
}

export default function Results({ result, onRestart }) {
    const [schema, setSchema] = useState(null);

    // ✅ Fix mobile column squeeze: stack layout under 900px
    const [isNarrow, setIsNarrow] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.innerWidth < 900;
    });

    React.useEffect(() => {
        fetchSchema().then(setSchema).catch(() => setSchema(null));
    }, []);

    React.useEffect(() => {
        if (typeof window === "undefined") return;
        const onResize = () => setIsNarrow(window.innerWidth < 900);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const evidenceMap = useMemo(() => {
        const map = {};
        if (!schema?.sections) return map;
        for (const s of schema.sections) map[s.id] = s.evidence || [];
        return map;
    }, [schema]);

    const [active, setActive] = useState(result?.sections?.[0]?.id || "health");

    const activeSection = useMemo(() => {
        return (result.sections || []).find((s) => s.id === active) || null;
    }, [active, result]);

    return (
        <div style={styles.wrap}>
            <div style={styles.headerCard}>
                <div style={styles.headerTop}>
                    <div>
                        <div style={styles.kicker}>Results</div>
                        <h2 style={styles.h2}>Your overview</h2>
                    </div>
                    <button onClick={onRestart} style={styles.ghost}>
                        Restart
                    </button>
                </div>

                <div style={{ ...styles.bandRow, ...(isNarrow ? styles.bandRowMobile : null) }}>
                    <div style={styles.dotWrap}>
                        <div style={styles.dotLabel}>Overall indicator</div>
                        <div style={styles.barTrack}>
                            <div style={{ ...styles.barFill, width: `${result.overall.dot}%` }} />
                            <div style={{ ...styles.dot, left: `calc(${result.overall.dot}% - 7px)` }} />
                        </div>
                        <div style={styles.dotMeta}>{result.overall.dot} of 100</div>
                    </div>

                    <div style={styles.summaryWrap}>
                        <div style={styles.summaryTitle}>Summary</div>
                        <div style={styles.summaryText}>{result.overall.summary}</div>
                        <div style={styles.disclaimer}>{result.overall.disclaimer}</div>
                    </div>
                </div>
            </div>

            <div style={{ ...styles.grid, ...(isNarrow ? styles.gridMobile : null) }}>
                <nav style={{ ...styles.nav, ...(isNarrow ? styles.navMobile : null) }}>
                    <div style={styles.navTitle}>Sections</div>
                    {(result.sections || []).map((s) => {
                        const chip = colorToChip(s.color);
                        const isActiveItem = s.id === active;
                        return (
                            <button
                                key={s.id}
                                onClick={() => setActive(s.id)}
                                style={{
                                    ...styles.navItem,
                                    ...(isActiveItem ? styles.navItemActive : null),
                                }}
                            >
                                <div style={styles.navRow}>
                                    <div style={styles.navName}>{s.title}</div>
                                    <span
                                        style={{
                                            ...styles.chip,
                                            background: chip.bg,
                                            borderColor: chip.border,
                                        }}
                                    >
                                        {chip.text}
                                    </span>
                                </div>
                                <div style={styles.navHint}>{s.headline}</div>
                            </button>
                        );
                    })}
                </nav>

                <main style={styles.main}>
                    {!activeSection ? (
                        <div style={styles.empty}>No section selected.</div>
                    ) : (
                        <div style={styles.sectionCard}>
                            <div style={{ ...styles.sectionHeader, ...(isNarrow ? styles.sectionHeaderMobile : null) }}>
                                <div>
                                    <div style={styles.kicker}>Section</div>
                                    <h3 style={styles.h3}>{activeSection.title}</h3>
                                </div>
                                <div style={{ ...styles.sectionMeta, ...(isNarrow ? styles.sectionMetaMobile : null) }}>
                                    <div style={styles.metaLabel}>Section score</div>
                                    <div style={styles.metaValue}>
                                        {activeSection.score} of {activeSection.range?.max ?? "?"}
                                    </div>
                                </div>
                            </div>

                            <div style={styles.sectionHeadline}>{activeSection.headline}</div>

                            <div style={styles.subTitle}>Key insights</div>
                            {(activeSection.insights || []).length === 0 ? (
                                <div style={styles.muted}>
                                    No specific insights were generated for this section based on your answers.
                                </div>
                            ) : (
                                <div style={styles.insights}>
                                    {(activeSection.insights || []).map((ins, idx) => (
                                        <div key={idx} style={styles.insightCard}>
                                            <div style={styles.insightTopic}>{ins.topic}</div>
                                            <div style={styles.insightFact}>{ins.fact}</div>
                                            <div style={styles.insightNote}>{ins.note}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div style={styles.subTitle}>Evidence</div>
                            {(evidenceMap[activeSection.id] || []).length === 0 ? (
                                <div style={styles.muted}>Evidence links for this section are not available yet.</div>
                            ) : (
                                <div style={styles.evidenceList}>
                                    {(evidenceMap[activeSection.id] || []).map((e) => (
                                        <a
                                            key={e.url}
                                            href={e.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={styles.evidenceLink}
                                        >
                                            {e.title}
                                        </a>
                                    ))}
                                </div>
                            )}

                            {/* Keep your existing pivot; add funnel under it */}
                            <div style={styles.pivotStack}>
                                <div style={styles.pivot}>
                                    <div style={styles.pivotText}>{result.pivot.text}</div>
                                    <button onClick={onRestart} style={styles.primary}>
                                        {result.pivot.cta_label}
                                    </button>
                                </div>

                                <div style={styles.funnelCard}>
                                    <div style={styles.funnelTop}>
                                        <div>
                                            <div style={styles.funnelKicker}>Optional next step</div>
                                            <div style={styles.funnelTitle}>
                                                See protection options for the life you’re planning
                                            </div>
                                        </div>
                                        <span style={styles.funnelChip}>Educational</span>
                                    </div>

                                    <div style={styles.funnelBody}>
                                        If you want, you can explore a quick life insurance estimate using my simple calculator. It’s
                                        designed to help you compare term vs whole life vs retirement-style scenarios.
                                        <span style={styles.funnelMuted}>
                                            {" "}
                                            Not a quote, not approval, and not financial advice.
                                        </span>
                                    </div>

                                    <div style={{ ...styles.funnelActions, ...(isNarrow ? styles.funnelActionsMobile : null) }}>
                                        <a href={LIFE_INSURANCE_URL} target="_blank" rel="noreferrer" style={styles.funnelButton}>
                                            Learn more
                                        </a>
                                        <div style={styles.funnelNote}>Opens in a new tab • 30 seconds • No account needed</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

const styles = {
    wrap: { paddingTop: 6 },

    headerCard: {
        borderRadius: 18,
        border: "1px solid var(--border)",
        background: "var(--panel)",
        boxShadow: "var(--shadow)",
        padding: 18,
    },

    headerTop: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
        marginBottom: 14,
    },

    kicker: {
        fontSize: 12,
        letterSpacing: 0.5,
        textTransform: "uppercase",
        color: "var(--muted)",
    },

    h2: { margin: "6px 0 0", fontSize: 26, letterSpacing: -0.4 },

    ghost: {
        background: "rgba(255,255,255,0.7)",
        border: "1px solid rgba(18,18,18,0.10)",
        borderRadius: 12,
        padding: "10px 14px",
        cursor: "pointer",
    },

    bandRow: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 14,
        alignItems: "start",
    },

    // ✅ Mobile: stack overview cards
    bandRowMobile: {
        gridTemplateColumns: "1fr",
    },

    dotWrap: {
        padding: 14,
        borderRadius: 16,
        border: "1px solid rgba(18,18,18,0.08)",
        background: "rgba(250, 249, 246, 0.65)",
    },

    dotLabel: { fontSize: 12, color: "var(--muted)", marginBottom: 10 },

    barTrack: {
        position: "relative",
        height: 12,
        borderRadius: 999,
        background: "rgba(18,18,18,0.08)",
        overflow: "hidden",
    },

    barFill: {
        height: "100%",
        borderRadius: 999,
        background: "rgba(205,191,168,1)",
    },

    dot: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 14,
        height: 14,
        borderRadius: 999,
        background: "rgba(18,18,18,0.92)",
    },

    dotMeta: { marginTop: 10, fontSize: 12.5, color: "rgba(18,18,18,0.75)" },

    summaryWrap: {
        padding: 14,
        borderRadius: 16,
        border: "1px solid rgba(18,18,18,0.08)",
        background: "rgba(255,255,255,0.6)",
    },

    summaryTitle: { fontSize: 12, color: "var(--muted)", marginBottom: 8 },
    summaryText: { fontSize: 14.5, lineHeight: 1.55, color: "rgba(18,18,18,0.88)" },
    disclaimer: { marginTop: 10, fontSize: 12, color: "var(--muted)", lineHeight: 1.45 },

    grid: {
        marginTop: 14,
        display: "grid",
        gridTemplateColumns: "320px 1fr",
        gap: 14,
        alignItems: "start",
    },

    // ✅ Mobile: stack nav + content (fixes skinny right column)
    gridMobile: {
        gridTemplateColumns: "1fr",
    },

    nav: {
        position: "sticky",
        top: 18,
        borderRadius: 18,
        border: "1px solid var(--border)",
        background: "rgba(255,255,255,0.6)",
        boxShadow: "0 10px 24px rgba(18,18,18,0.06)",
        padding: 12,
    },

    // ✅ Mobile: remove sticky when stacked
    navMobile: {
        position: "relative",
        top: "auto",
    },

    navTitle: {
        fontSize: 12,
        letterSpacing: 0.5,
        textTransform: "uppercase",
        color: "var(--muted)",
        marginBottom: 10,
        paddingLeft: 6,
    },

    navItem: {
        width: "100%",
        textAlign: "left",
        borderRadius: 14,
        border: "1px solid rgba(18,18,18,0.10)",
        background: "rgba(250, 249, 246, 0.65)",
        padding: 12,
        marginBottom: 10,
        cursor: "pointer",
    },

    navItemActive: {
        border: "1px solid rgba(18,18,18,0.18)",
        background: "rgba(205,191,168,0.25)",
    },

    navRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 },
    navName: { fontSize: 13.5, fontWeight: 650, color: "rgba(18,18,18,0.9)" },
    navHint: { marginTop: 6, fontSize: 12, color: "var(--muted)", lineHeight: 1.4 },

    chip: {
        fontSize: 11,
        border: "1px solid rgba(18,18,18,0.10)",
        padding: "5px 8px",
        borderRadius: 999,
        color: "rgba(18,18,18,0.85)",
        whiteSpace: "nowrap",
    },

    main: {
        borderRadius: 18,
        border: "1px solid var(--border)",
        background: "var(--panel)",
        boxShadow: "var(--shadow)",
        padding: 18,
        minWidth: 0,
    },

    empty: { color: "var(--muted)" },

    sectionCard: { minWidth: 0 },

    sectionHeader: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
        marginBottom: 10,
    },

    sectionHeaderMobile: {
        alignItems: "stretch",
    },

    h3: { margin: "6px 0 0", fontSize: 22, letterSpacing: -0.2 },

    sectionMeta: {
        borderRadius: 14,
        border: "1px solid rgba(18,18,18,0.10)",
        background: "rgba(250, 249, 246, 0.65)",
        padding: 12,
        minWidth: 170,
        textAlign: "right",
    },

    sectionMetaMobile: {
        minWidth: "auto",
        width: "100%",
        textAlign: "left",
    },

    metaLabel: { fontSize: 12, color: "var(--muted)" },
    metaValue: { marginTop: 6, fontSize: 16, fontWeight: 700, color: "rgba(18,18,18,0.9)" },

    sectionHeadline: {
        marginTop: 10,
        fontSize: 14.5,
        color: "rgba(18,18,18,0.86)",
        lineHeight: 1.55,
    },

    subTitle: {
        marginTop: 16,
        fontSize: 12,
        letterSpacing: 0.5,
        textTransform: "uppercase",
        color: "var(--muted)",
    },

    muted: { marginTop: 10, color: "var(--muted)", lineHeight: 1.55, fontSize: 13.5 },

    insights: { marginTop: 10, display: "flex", flexDirection: "column", gap: 10 },

    insightCard: {
        borderRadius: 16,
        border: "1px solid rgba(18,18,18,0.08)",
        background: "rgba(255,255,255,0.6)",
        padding: 14,
    },

    insightTopic: { fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.4 },
    insightFact: { marginTop: 8, fontSize: 14.5, color: "rgba(18,18,18,0.9)", lineHeight: 1.55 },
    insightNote: { marginTop: 8, fontSize: 12.5, color: "var(--muted)", lineHeight: 1.45 },

    evidenceList: { marginTop: 10, display: "flex", flexDirection: "column", gap: 8 },
    evidenceLink: {
        display: "inline-block",
        padding: 10,
        borderRadius: 14,
        border: "1px solid rgba(18,18,18,0.10)",
        background: "rgba(250, 249, 246, 0.65)",
        color: "rgba(18,18,18,0.86)",
        textDecoration: "none",
    },

    pivotStack: {
        marginTop: 18,
        display: "flex",
        flexDirection: "column",
        gap: 12,
    },

    pivot: {
        borderRadius: 16,
        border: "1px solid rgba(18,18,18,0.08)",
        background: "rgba(250, 249, 246, 0.65)",
        padding: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
    },

    pivotText: { fontSize: 13.5, color: "rgba(18,18,18,0.82)", lineHeight: 1.5, maxWidth: 520 },

    primary: {
        background: "var(--btn)",
        color: "var(--btnText)",
        border: "1px solid rgba(18,18,18,0.12)",
        boxShadow: "0 10px 22px rgba(18,18,18,0.14)",
        padding: "10px 14px",
        borderRadius: 12,
        cursor: "pointer",
    },

    funnelCard: {
        borderRadius: 16,
        border: "1px solid rgba(18,18,18,0.08)",
        background: "rgba(255,255,255,0.65)",
        padding: 14,
        boxShadow: "0 12px 26px rgba(18,18,18,0.06)",
    },

    funnelTop: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
    },

    funnelKicker: {
        fontSize: 12,
        letterSpacing: 0.5,
        textTransform: "uppercase",
        color: "var(--muted)",
    },

    funnelTitle: {
        marginTop: 6,
        fontSize: 15,
        fontWeight: 750,
        color: "rgba(18,18,18,0.92)",
        letterSpacing: -0.1,
    },

    funnelChip: {
        fontSize: 11,
        border: "1px solid rgba(18,18,18,0.10)",
        padding: "5px 8px",
        borderRadius: 999,
        background: "rgba(205,191,168,0.25)",
        color: "rgba(18,18,18,0.78)",
        whiteSpace: "nowrap",
    },

    funnelBody: {
        marginTop: 10,
        fontSize: 13.5,
        color: "rgba(18,18,18,0.82)",
        lineHeight: 1.55,
        maxWidth: 720,
    },

    funnelMuted: { color: "var(--muted)" },

    funnelActions: {
        marginTop: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
    },

    // ✅ Mobile: make button full-width and note wrap under it
    funnelActionsMobile: {
        flexDirection: "column",
        alignItems: "stretch",
    },

    funnelButton: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        background: "rgba(18,18,18,0.92)",
        color: "white",
        border: "1px solid rgba(18,18,18,0.14)",
        boxShadow: "0 10px 22px rgba(18,18,18,0.12)",
        padding: "10px 14px",
        borderRadius: 12,
        cursor: "pointer",
        width: "auto",
    },

    funnelNote: {
        fontSize: 12,
        color: "var(--muted)",
    },
};
