import React, { useEffect } from "react";
import previewImg from "../assets/assessment-preview.png";

const BEEHIIV_FORM_URL =
    "https://subscribe-forms.beehiiv.com/9a22dc77-4e7b-4fb7-9151-6033aea1c5c8";

export default function Welcome({ title, subtitle, onStart }) {
    useEffect(() => {
        // Required for Beehiiv embed sizing/behavior
        if (!document.getElementById("beehiiv-embed-js")) {
            const s = document.createElement("script");
            s.id = "beehiiv-embed-js";
            s.async = true;
            s.src = "https://subscribe-forms.beehiiv.com/embed.js";
            document.body.appendChild(s);
        }

        // Optional: attribution tracking
        if (!document.getElementById("beehiiv-attribution-js")) {
            const s2 = document.createElement("script");
            s2.id = "beehiiv-attribution-js";
            s2.async = true;
            s2.type = "text/javascript";
            s2.src = "https://subscribe-forms.beehiiv.com/attribution.js";
            document.body.appendChild(s2);
        }
    }, []);

    return (
        <div style={styles.wrap}>
            <header style={styles.header}>
                <div style={styles.brandRow}>
                    <div style={styles.badge}>Research informed longevity tool</div>
                    <div style={styles.brandName}>Decide to Live</div>
                </div>

                <h1 style={styles.h1}>Longevity Assessment</h1>

                <p style={styles.sub}>
                    A structured overview of factors associated with longevity and preparedness. Clear, neutral, and designed for
                    responsible planning.
                </p>
            </header>

            <section style={styles.hero}>
                <div style={styles.heroText}>
                    <div style={styles.sectionTitle}>What you will receive</div>

                    <div style={styles.bullets}>
                        <div style={styles.bullet}>
                            <div style={styles.dot} />
                            <div>
                                <div style={styles.bulletTitle}>Short questionnaire</div>
                                <div style={styles.bulletBody}>Approximately three to five minutes.</div>
                            </div>
                        </div>

                        <div style={styles.bullet}>
                            <div style={styles.dot} />
                            <div>
                                <div style={styles.bulletTitle}>Evidence informed insights</div>
                                <div style={styles.bulletBody}>
                                    Results summarize population patterns and research associations. They do not predict individual outcomes.
                                </div>
                            </div>
                        </div>

                        <div style={styles.bullet}>
                            <div style={styles.dot} />
                            <div>
                                <div style={styles.bulletTitle}>Practical clarity</div>
                                <div style={styles.bulletBody}>
                                    Identify where risk may be reduced and where preparation may be appropriate.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.actions}>
                        <button onClick={onStart} style={styles.primary}>
                            Start assessment
                        </button>

                        <div style={styles.micro}>Informational only. Not medical advice. Not financial advice.</div>
                    </div>

                    <div style={styles.schemaLine}>
                        <span style={styles.schemaLabel}>Loaded schema</span>
                        <span style={styles.schemaValue}>
                            {title ? title : "Reflection"} {subtitle ? `• ${subtitle}` : ""}
                        </span>
                    </div>
                </div>

                <div style={styles.heroImageWrap}>
                    <img src={previewImg} alt="Assessment preview" style={styles.heroImage} />
                </div>
            </section>

            <section style={styles.tiles}>
                <div style={styles.tile}>
                    <div style={styles.tileLabel}>What this is</div>
                    <div style={styles.tileValue}>
                        A structured assessment informed by public health and behavioral research, presented in plain language.
                    </div>
                </div>

                <div style={styles.tile}>
                    <div style={styles.tileLabel}>What this is not</div>
                    <div style={styles.tileValue}>
                        A prediction tool. Medical advice. Financial advice.
                    </div>
                </div>

                <div style={styles.newsletterTile}>
                    <div style={styles.tileLabel}>Monthly research letter</div>

                    <div style={styles.newsletterCopy}>
                        One monthly email with new longevity research, clear summaries, and practical habits. Unsubscribe anytime.
                    </div>

                    <div style={styles.embedShell}>
                        <div style={styles.embedCenter}>
                            <iframe
                                src={BEEHIIV_FORM_URL}
                                className="beehiiv-embed"
                                data-test-id="beehiiv-embed"
                                frameBorder="0"
                                scrolling="no"
                                title="Decide to Live newsletter signup"
                                style={styles.embedFrame}
                            />
                        </div>
                    </div>

                    <div style={styles.newsletterFinePrint}>
                        If the form looks slightly different, that is normal. The signup is hosted by Beehiiv for deliverability and
                        unsubscribe compliance.
                    </div>
                </div>
            </section>
        </div>
    );
}

const styles = {
    wrap: { paddingTop: 18 },

    header: { marginBottom: 16 },

    brandRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
    },

    badge: {
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid var(--border)",
        background: "rgba(255,255,255,0.65)",
        backdropFilter: "blur(8px)",
        fontSize: 12,
        letterSpacing: 0.3,
        color: "var(--muted)",
    },

    brandName: {
        fontSize: 12,
        color: "var(--muted)",
        letterSpacing: 0.6,
        textTransform: "uppercase",
        opacity: 0.8,
    },

    h1: {
        fontSize: 46,
        letterSpacing: -0.9,
        lineHeight: 1.05,
        margin: "14px 0 8px",
        color: "var(--text)",
    },

    sub: {
        margin: 0,
        fontSize: 16,
        color: "var(--muted)",
        maxWidth: 760,
        lineHeight: 1.6,
    },

    hero: {
        marginTop: 18,
        padding: 18,
        borderRadius: 18,
        border: "1px solid var(--border)",
        background: "var(--panel)",
        boxShadow: "var(--shadow)",
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        gap: 16,
    },

    heroText: { minWidth: 0 },

    sectionTitle: {
        fontSize: 12,
        letterSpacing: 0.5,
        textTransform: "uppercase",
        color: "var(--muted)",
        marginBottom: 12,
    },

    bullets: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
    },

    bullet: {
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        padding: 12,
        borderRadius: 14,
        border: "1px solid rgba(18,18,18,0.08)",
        background: "rgba(250, 249, 246, 0.65)",
    },

    dot: {
        width: 10,
        height: 10,
        borderRadius: 999,
        background: "rgba(205,191,168,1)",
        marginTop: 5,
        flex: "0 0 auto",
    },

    bulletTitle: { fontSize: 14, fontWeight: 520, color: "rgba(18,18,18,0.92)" },
    bulletBody: { fontSize: 13, color: "var(--muted)", lineHeight: 1.45, marginTop: 2 },

    actions: {
        marginTop: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
    },

    primary: {
        background: "var(--btn)",
        color: "var(--btnText)",
        border: "1px solid rgba(18,18,18,0.12)",
        boxShadow: "0 10px 22px rgba(18,18,18,0.14)",
        padding: "11px 16px",
        borderRadius: 12,
    },

    micro: {
        fontSize: 12,
        color: "var(--muted)",
        maxWidth: 420,
        lineHeight: 1.45,
    },

    schemaLine: {
        marginTop: 14,
        fontSize: 12,
        color: "var(--muted)",
        opacity: 0.9,
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
    },

    schemaLabel: {
        padding: "4px 8px",
        borderRadius: 999,
        border: "1px solid rgba(18,18,18,0.08)",
        background: "rgba(255,255,255,0.5)",
    },

    schemaValue: { opacity: 0.9 },

    heroImageWrap: {
        borderRadius: 16,
        border: "1px solid rgba(18,18,18,0.08)",
        background: "rgba(250, 249, 246, 0.65)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },

    heroImage: {
        width: "100%",
        height: "auto",
        display: "block",
        borderRadius: 12,
    },

    // FIX: lock to 2 columns on desktop so the two tiles don't shrink unpredictably
    tiles: {
        marginTop: 14,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
    },

    tile: {
        borderRadius: 16,
        border: "1px solid rgba(18, 18, 18, 0.10)",
        background: "rgba(255,255,255,0.55)",
        padding: 14,
    },

    newsletterTile: {
        gridColumn: "1 / -1",
        borderRadius: 16,
        border: "1px solid rgba(18, 18, 18, 0.10)",
        background: "rgba(255,255,255,0.55)",
        padding: 14,
    },

    tileLabel: {
        fontSize: 12,
        letterSpacing: 0.4,
        textTransform: "uppercase",
        color: "var(--muted)",
        marginBottom: 6,
    },

    tileValue: { fontSize: 14, lineHeight: 1.5, color: "rgba(18,18,18,0.90)" },

    newsletterCopy: {
        fontSize: 14,
        lineHeight: 1.5,
        color: "rgba(18,18,18,0.82)",
        marginTop: 6,
    },

    // Make the embed feel centered and intentional
    embedShell: {
        marginTop: 12,
        borderRadius: 14,
        border: "1px solid rgba(18,18,18,0.08)",
        background: "rgba(250, 249, 246, 0.65)",
        padding: 14,
    },

    embedCenter: {
        maxWidth: 460,
        margin: "0 auto",
    },

    embedFrame: {
        width: "100%",
        height: 210,
        margin: 0,
        borderRadius: 12,
        backgroundColor: "transparent",
        boxShadow: "0 0 #0000",
        maxWidth: "100%",
        display: "block",
    },

    newsletterFinePrint: {
        marginTop: 10,
        fontSize: 12,
        color: "rgba(18,18,18,0.62)",
        lineHeight: 1.45,
    },
};
