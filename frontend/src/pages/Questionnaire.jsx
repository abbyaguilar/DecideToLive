// frontend/src/pages/Questionnaire.jsx

import React, { useMemo, useState, useEffect, useRef } from "react";

export default function Questionnaire({
    schema,
    answers,
    setAnswers,
    onBack,
    onSubmit,
    loading,
}) {
    const sections = schema?.sections || [];
    const [sectionIndex, setSectionIndex] = useState(0);

    // animation state
    const [phase, setPhase] = useState("in"); // in | out
    const [direction, setDirection] = useState("next"); // next | back

    const topRef = useRef(null);

    const current = sections[sectionIndex];

    const totalQuestions = useMemo(() => {
        let count = 0;
        for (const s of sections) count += (s.questions || []).length;
        return count;
    }, [sections]);

    const answeredCount = useMemo(() => Object.keys(answers || {}).length, [answers]);
    const progress = totalQuestions > 0 ? Math.min(1, answeredCount / totalQuestions) : 0;

    const sectionAnswered = useMemo(() => {
        if (!current?.questions) return 0;
        let count = 0;
        for (const q of current.questions) if (answers?.[q.id]) count += 1;
        return count;
    }, [current, answers]);

    const sectionTotal = current?.questions?.length || 0;
    const sectionComplete = sectionTotal > 0 && sectionAnswered === sectionTotal;

    const isLast = sectionIndex === sections.length - 1;
    const isFirst = sectionIndex === 0;

    function updateAnswer(qid, value) {
        setAnswers((prev) => ({ ...(prev || {}), [qid]: value }));
    }

    function scrollToTopSmooth() {
        const node = topRef.current;
        if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function goBack() {
        if (phase === "out") return;

        setDirection("back");
        setPhase("out");

        window.setTimeout(() => {
            if (!isFirst) setSectionIndex((i) => i - 1);
            else onBack();
            setPhase("in");
        }, 180);
    }

    function goNext() {
        if (!sectionComplete) return;
        if (phase === "out") return;
        if (isLast) return;

        setDirection("next");
        setPhase("out");

        window.setTimeout(() => {
            setSectionIndex((i) => i + 1);
            setPhase("in");
        }, 180);
    }

    async function handleSubmit() {
        if (!sectionComplete || loading) return;
        await onSubmit(answers);
    }

    // keep index safe if schema changes
    useEffect(() => {
        if (sectionIndex >= sections.length) setSectionIndex(0);
    }, [sections.length, sectionIndex]);

    // scroll to top on section change
    useEffect(() => {
        scrollToTopSmooth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sectionIndex]);

    if (!current) return null;

    const motionStyle =
        phase === "in"
            ? {
                opacity: 1,
                transform: "translateY(0px)",
                transition: "opacity 220ms ease, transform 220ms ease",
            }
            : {
                opacity: 0,
                transform: direction === "next" ? "translateY(10px)" : "translateY(-10px)",
                transition: "opacity 180ms ease, transform 180ms ease",
            };

    return (
        <div style={styles.wrap}>
            <div ref={topRef} />

            <div style={styles.card}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <div style={styles.kicker}>Assessment</div>
                        <h2 style={styles.h2}>{current.title}</h2>
                        <div style={styles.sub}>
                            Section {sectionIndex + 1} of {sections.length} · Completed {sectionAnswered} of {sectionTotal}
                        </div>
                    </div>

                    <div style={styles.headerRight}>
                        <div style={styles.progressLabel}>{Math.round(progress * 100)}% complete</div>
                        <div style={styles.progressTrack}>
                            <div style={{ ...styles.progressFill, width: `${progress * 100}%` }} />
                        </div>
                    </div>
                </div>

                {/* Stepper */}
                <div style={styles.stepper}>
                    {sections.map((s, i) => {
                        const active = i === sectionIndex;
                        const done = i < sectionIndex;
                        return (
                            <div key={s.id} style={styles.step}>
                                <div
                                    style={{
                                        ...styles.stepDot,
                                        ...(done ? styles.stepDotDone : null),
                                        ...(active ? styles.stepDotActive : null),
                                    }}
                                />
                                <div
                                    style={{
                                        ...styles.stepLabel,
                                        ...(done ? styles.stepLabelDone : null),
                                        ...(active ? styles.stepLabelActive : null),
                                    }}
                                >
                                    {s.title}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{ ...styles.sectionBody, ...motionStyle }}>
                    <div style={styles.questions}>
                        {(current.questions || []).map((q) => (
                            <div key={q.id} style={styles.qCard}>
                                <div style={styles.qLabel}>{q.label}</div>

                                <div style={styles.options}>
                                    {(q.options || []).map((opt) => {
                                        const selected = answers?.[q.id] === opt.value;
                                        return (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() => updateAnswer(q.id, opt.value)}
                                                style={{
                                                    ...styles.optionBtn,
                                                    ...(selected ? styles.optionSelected : null),
                                                }}
                                            >
                                                {opt.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={styles.footer}>
                    <button onClick={goBack} style={styles.ghost}>
                        Back
                    </button>

                    <div style={styles.footerRight}>
                        {!sectionComplete && (
                            <div style={styles.helper}>Answer all questions in this section to continue.</div>
                        )}

                        {!isLast ? (
                            <button
                                onClick={goNext}
                                style={{
                                    ...styles.primary,
                                    opacity: sectionComplete ? 1 : 0.45,
                                    cursor: sectionComplete ? "pointer" : "not-allowed",
                                }}
                                disabled={!sectionComplete}
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                style={{
                                    ...styles.primary,
                                    opacity: sectionComplete && !loading ? 1 : 0.45,
                                    cursor: sectionComplete && !loading ? "pointer" : "not-allowed",
                                }}
                                disabled={!sectionComplete || loading}
                            >
                                {loading ? "Evaluating" : "Submit"}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div style={styles.bottomNote}>
                Educational only. This tool does not provide medical or financial advice and does not predict lifespan.
            </div>
        </div>
    );
}

const styles = {
    wrap: {
        paddingTop: 6,
        paddingBottom: 26,
    },

    card: {
        borderRadius: 18,
        border: "1px solid var(--border)",
        background: "var(--panel)",
        boxShadow: "var(--shadow)",
        padding: 18,
        maxWidth: 860,
        margin: "0 auto",
    },

    header: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 14,
        flexWrap: "wrap",
        marginBottom: 10,
    },

    headerLeft: { minWidth: 260 },
    headerRight: { minWidth: 260, flex: "1 1 320px" },

    kicker: {
        fontSize: 12,
        letterSpacing: 0.5,
        textTransform: "uppercase",
        color: "var(--muted)",
    },

    h2: { margin: "6px 0 0", fontSize: 24, letterSpacing: -0.3 },

    sub: { marginTop: 8, fontSize: 13.5, color: "var(--muted)" },

    progressLabel: {
        fontSize: 12,
        color: "var(--muted)",
        marginBottom: 8,
        textAlign: "right",
    },

    progressTrack: {
        height: 10,
        borderRadius: 999,
        background: "rgba(18,18,18,0.08)",
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        borderRadius: 999,
        background: "rgba(205,191,168,1)",
    },

    /* Stepper */
    stepper: {
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        padding: "10px 0 6px",
        marginBottom: 6,
        borderTop: "1px solid rgba(18,18,18,0.06)",
        borderBottom: "1px solid rgba(18,18,18,0.06)",
    },

    step: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.45)",
        border: "1px solid rgba(18,18,18,0.06)",
    },

    stepDot: {
        width: 10,
        height: 10,
        borderRadius: 999,
        border: "1px solid rgba(18,18,18,0.22)",
        background: "rgba(255,255,255,0.7)",
    },

    stepDotDone: {
        background: "rgba(205,191,168,0.85)",
        border: "1px solid rgba(18,18,18,0.14)",
    },

    stepDotActive: {
        background: "rgba(18,18,18,0.88)",
        border: "1px solid rgba(18,18,18,0.20)",
    },

    stepLabel: {
        fontSize: 12.5,
        color: "rgba(18,18,18,0.72)",
        fontWeight: 450,
        letterSpacing: -0.1,
    },

    stepLabelDone: { color: "rgba(18,18,18,0.80)" },
    stepLabelActive: { color: "rgba(18,18,18,0.92)" },

    sectionBody: {
        willChange: "opacity, transform",
    },

    questions: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
        marginTop: 10,
    },

    qCard: {
        padding: 14,
        borderRadius: 16,
        border: "1px solid rgba(18,18,18,0.08)",
        background: "rgba(255,255,255,0.65)",
    },

    // calm question prompt, not bold
    qLabel: {
        fontSize: 14.5,
        fontWeight: 450,
        marginBottom: 10,
        color: "rgba(18,18,18,0.90)",
        lineHeight: 1.55,
    },

    options: { display: "flex", flexWrap: "wrap", gap: 10 },

    // answers not bold either
    optionBtn: {
        padding: "10px 12px",
        borderRadius: 12,
        border: "1px solid rgba(18,18,18,0.10)",
        background: "rgba(255,255,255,0.85)",
        fontSize: 13.5,
        fontWeight: 450,
    },

    optionSelected: {
        border: "1px solid rgba(18,18,18,0.18)",
        background: "rgba(205,191,168,0.35)",
    },

    footer: {
        marginTop: 16,
        paddingTop: 14,
        borderTop: "1px solid rgba(18,18,18,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
    },

    footerRight: {
        display: "flex",
        alignItems: "center",
        gap: 12,
    },

    helper: {
        fontSize: 12,
        color: "var(--muted)",
        lineHeight: 1.35,
    },

    ghost: {
        background: "rgba(255,255,255,0.7)",
        border: "1px solid rgba(18,18,18,0.10)",
    },

    primary: {
        background: "var(--btn)",
        color: "var(--btnText)",
        border: "1px solid rgba(18,18,18,0.12)",
        boxShadow: "0 10px 22px rgba(18,18,18,0.14)",
        padding: "10px 14px",
        borderRadius: 12,
        fontWeight: 500,
    },

    bottomNote: {
        maxWidth: 860,
        margin: "12px auto 0",
        fontSize: 12,
        color: "var(--muted)",
        lineHeight: 1.45,
        padding: "0 6px",
    },
};
