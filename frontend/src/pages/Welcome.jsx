import React, { useEffect } from "react";
import previewImg from "../assets/assessment-preview-horizontal.png";

const BEEHIIV_FORM_URL =
    "https://subscribe-forms.beehiiv.com/9a22dc77-4e7b-4fb7-9151-6033aea1c5c8";

export default function Welcome({ title, subtitle, onStart }) {
    useEffect(() => {
        if (!document.getElementById("beehiiv-embed-js")) {
            const s = document.createElement("script");
            s.id = "beehiiv-embed-js";
            s.async = true;
            s.src = "https://subscribe-forms.beehiiv.com/embed.js";
            document.body.appendChild(s);
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
                    A structured overview of factors associated with longevity and preparedness.
                    Clear, neutral, and designed for responsible planning.
                </p>
            </header>

            <section style={styles.hero}>
                <div style={styles.sectionTitle}>What you will receive</div>

                {/* 🔹 ASSESSMENT PREVIEW */}
                <div style={styles.previewCard}>
                    <img
                        src={previewImg}
                        alt="Sample assessment view"
                        style={styles.previewImg}
                    />
                    <div style={styles.previewCaption}>
                        Sample assessment view
                    </div>
                </div>

                <div style={styles.bullets}>
                    <Bullet
                        title="Short questionnaire"
                        body="Approximately three to five minutes."
                    />
                    <Bullet
                        title="Evidence informed insights"
                        body="Results summarize population patterns and research associations. They do not predict individual outcomes."
                    />
                    <Bullet
                        title="Practical clarity"
                        body="Identify where risk may be reduced and where preparation may be appropriate."
                    />
                </div>

                <div style={styles.actions}>
                    <button onClick={onStart} style={styles.primary}>
                        Start assessment
                    </button>

                    <div style={styles.micro}>
                        Informational only. Not medical advice. Not financial advice.
                    </div>
                </div>

                <div style={styles.schemaLine}>
                    <span style={styles.schemaLabel}>Loaded schema</span>
                    <span style={styles.schemaValue}>
                        {title || "Reflection"} {subtitle ? `• ${subtitle}` : ""}
                    </span>
                </div>
            </section>

            {/* WHAT THIS IS / IS NOT */}
            <section style={styles.tiles}>
                <div style={styles.tile}>
                    <div style={styles.tileLabel}>What this is</div>
                    <div style={styles.tileValue}>
                        A structured assessment informed by public health and behavioral research,
                        presented in plain language.
                    </div>
                </div>

                <div style={styles.tile}>
                    <div style={styles.tileLabel}>What this is not</div>
                    <div style={styles.tileValue}>
                        A prediction tool. Medical advice. Financial advice.
                    </div>
                </div>
            </section>

            {/* NEWSLETTER — BOTTOM, QUIET */}
            <section style={styles.newsletter}>
                <div style={styles.tileLabel}>Monthly research letter</div>

                <div style={styles.newsletterCopy}>
                    One monthly email with new longevity research, clear summaries, and practical habits.
                    Unsubscribe anytime.
                </div>

                <div style={styles.embedShell}>
                    <iframe
                        src={BEEHIIV_FORM_URL}
                        className="beehiiv-embed"
                        title="Decide to Live newsletter signup"
                        frameBorder="0"
                        scrolling="no"
                        style={styles.embedFrame}
                    />
                </div>

                <div style={styles.newsletterFinePrint}>
                    Signup is hosted by Beehiiv for deliverability and unsubscribe compliance.
                </div>
            </section>
        </div>
    );
}

function Bullet({ title, body }) {
    return (
        <div style={styles.bullet}>
            <div style={styles.dot} />
            <div>
                <div style={styles.bulletTitle}>{title}</div>
                <div style={styles.bulletBody}>{body}</div>
            </div>
        </div>
    );
}

const styles = {
    wrap: { paddingTop: 20 },
    header: { marginBottom: 20 },

    brandRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
    },

    badge: {
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid var(--border)",
        background: "rgba(255,255,255,0.6)",
        fontSize: 12,
        color: "var(--muted)",
    },

    brandName: {
        fontSize: 12,
        letterSpacing: 0.6,
        textTransform: "uppercase",
        color: "var(--muted)",
    },

    h1: {
        fontSize: 44,
        margin: "14px 0 8px",
        letterSpacing: -0.8,
    },

    sub: {
        maxWidth: 760,
        fontSize: 16,
        color: "var(--muted)",
        lineHeight: 1.6,
    },

    hero: {
        borderRadius: 18,
        padding: 18,
        border: "1px solid var(--border)",
        background: "var(--panel)",
        boxShadow: "var(--shadow)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
    },

    sectionTitle: {
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: 0.5,
        color: "var(--muted)",
    },

    previewCard: {
        borderRadius: 16,
        border: "1px solid rgba(18,18,18,0.08)",
        background: "rgba(250,249,246,0.65)",
        padding: 14,
    },

    previewImg: {
        width: "100%",
        borderRadius: 12,
        display: "block",
    },

    previewCaption: {
        marginTop: 8,
        fontSize: 12,
        color: "rgba(18,18,18,0.6)",
        textAlign: "center",
    },

    bullets: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
    },

    bullet: {
        display: "flex",
        gap: 10,
        padding: 12,
        borderRadius: 14,
        background: "rgba(250,249,246,0.65)",
        border: "1px solid rgba(18,18,18,0.08)",
    },

    dot: {
        width: 10,
        height: 10,
        borderRadius: 999,
        background: "rgba(205,191,168,1)",
        marginTop: 6,
    },

    bulletTitle: {
        fontSize: 14,
        color: "rgba(18,18,18,0.92)",
    },

    bulletBody: {
        fontSize: 13,
        color: "var(--muted)",
        marginTop: 2,
    },

    actions: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
    },

    primary: {
        background: "var(--btn)",
        color: "var(--btnText)",
        padding: "11px 16px",
        borderRadius: 12,
        border: "1px solid rgba(18,18,18,0.12)",
        boxShadow: "0 10px 22px rgba(18,18,18,0.14)",
    },

    micro: {
        fontSize: 12,
        color: "var(--muted)",
    },

    schemaLine: {
        fontSize: 12,
        color: "var(--muted)",
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

    tiles: {
        marginTop: 16,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 12,
    },

    tile: {
        borderRadius: 16,
        padding: 14,
        border: "1px solid rgba(18,18,18,0.1)",
        background: "rgba(255,255,255,0.55)",
    },

    tileLabel: {
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: 0.4,
        color: "var(--muted)",
        marginBottom: 6,
    },

    tileValue: {
        fontSize: 14,
        lineHeight: 1.5,
    },

    newsletter: {
        marginTop: 18,
        borderRadius: 16,
        padding: 16,
        border: "1px solid rgba(18,18,18,0.1)",
        background: "rgba(255,255,255,0.55)",
    },

    newsletterCopy: {
        fontSize: 14,
        marginBottom: 12,
        color: "rgba(18,18,18,0.8)",
    },

    embedShell: {
        maxWidth: 520,
        margin: "0 auto",
    },

    embedFrame: {
        width: "100%",
        height: 190,
        borderRadius: 16,
        backgroundColor: "transparent",
    },

    newsletterFinePrint: {
        marginTop: 10,
        fontSize: 12,
        color: "rgba(18,18,18,0.6)",
        textAlign: "center",
    },
};
