import { Link } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import previewImg from "../assets/assessment-preview-horizontal.png";

const BEEHIIV_FORM_URL =
    "https://subscribe-forms.beehiiv.com/9a22dc77-4e7b-4fb7-9151-6033aea1c5c8";

export default function Welcome({ title, subtitle, onStart }) {
    const [menuOpen, setMenuOpen] = useState(false);

    // Simple responsive check for hamburger
    const isMobile = useMemo(() => {
        if (typeof window === "undefined") return false;
        return window.innerWidth <= 820;
    }, []);

    useEffect(() => {
        if (!document.getElementById("beehiiv-embed-js")) {
            const s = document.createElement("script");
            s.id = "beehiiv-embed-js";
            s.async = true;
            s.src = "https://subscribe-forms.beehiiv.com/embed.js";
            document.body.appendChild(s);
        }
    }, []);

    function scrollToId(id) {
        setMenuOpen(false);
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    return (
        <div style={styles.wrap}>
            {/* Top nav */}
            <div style={styles.topNav}>
                <div style={styles.brandLeft} onClick={() => scrollToId("top")} role="button" tabIndex={0}>
                    <div style={styles.brandName}>Decide to Live</div>
                    <div style={styles.badge}>Research informed longevity tool</div>
                </div>

                {/* Desktop nav */}
                {!isMobile && (
                    <nav style={styles.navLinks}>
                        <button type="button" style={styles.navBtn} onClick={() => scrollToId("about")}>
                            About
                        </button>
                        <button type="button" style={styles.navBtn} onClick={() => scrollToId("faq")}>
                            FAQ
                        </button>
                    </nav>
                )}

                {/* Mobile hamburger */}
                {isMobile && (
                    <div style={{ position: "relative" }}>
                        <button
                            type="button"
                            aria-label="Open menu"
                            onClick={() => setMenuOpen((v) => !v)}
                            style={styles.hamburger}
                        >
                            <span style={styles.hLine} />
                            <span style={styles.hLine} />
                            <span style={styles.hLine} />
                        </button>

                        {menuOpen && (
                            <div style={styles.mobileMenu}>
                                <button type="button" style={styles.mobileMenuBtn} onClick={() => scrollToId("about")}>
                                    About
                                </button>
                                <button type="button" style={styles.mobileMenuBtn} onClick={() => scrollToId("faq")}>
                                    FAQ
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div id="top" />

            <header style={styles.header}>
                <h1 style={styles.h1}>Longevity Assessment</h1>

                <p style={styles.sub}>
                    A structured overview of factors associated with longevity and preparedness.
                    Clear, neutral, and designed for responsible planning.
                </p>
            </header>

            <section style={styles.hero}>
                <div style={styles.sectionTitle}>What you will receive</div>

                {/* Assessment preview */}
                <div style={styles.previewCard}>
                    <img src={previewImg} alt="Sample assessment view" style={styles.previewImg} />
                    <div style={styles.previewCaption}>Sample assessment view</div>
                </div>

                <div style={styles.bullets}>
                    <Bullet title="Short questionnaire" body="Approximately three to five minutes." />
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

            {/* What this is / not */}
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
            </section>

            {/* About */}
            <section id="about" style={styles.sectionCard}>
                <div style={styles.tileLabel}>About</div>
                <div style={styles.sectionBody}>
                    Decide to Live is a research informed reflection tool that helps you understand how everyday factors
                    are associated with long term health outcomes at the population level. It is built to make risk
                    literacy practical and to support more responsible planning. This tool does not predict your lifespan
                    and it does not provide medical or financial advice.
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" style={styles.sectionCard}>
                <div style={styles.tileLabel}>FAQ</div>

                <div style={styles.faqItem}>
                    <div style={styles.faqQ}>Is this a life expectancy calculator</div>
                    <div style={styles.faqA}>
                        No. This is an educational assessment that summarizes research associations and highlights where
                        protective or risk associated factors may be present.
                    </div>
                </div>

                <div style={styles.faqItem}>
                    <div style={styles.faqQ}>Is this medical advice</div>
                    <div style={styles.faqA}>
                        No. If you have health concerns or want medical guidance, talk with a licensed clinician.
                    </div>
                </div>

                <div style={styles.faqItem}>
                    <div style={styles.faqQ}>How is the score calculated</div>
                    <div style={styles.faqA}>
                        Your responses map to simple weights based on the direction of evidence in the research. The UI
                        score is a normalized indicator for readability and does not represent a medical outcome.
                    </div>
                </div>

                <div style={styles.faqItem}>
                    <div style={styles.faqQ}>Do you store my answers</div>
                    <div style={styles.faqA}>
                        Not by default. If you later add accounts or saving features, this section should be updated to
                        match your actual data handling.
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section id="newsletter" style={styles.newsletter}>
                <div style={styles.tileLabel}>Monthly research letter</div>

                <div style={styles.newsletterCopy}>
                    One monthly email with new longevity research, clear summaries, and practical habits. Unsubscribe anytime.
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

            {/* Footer */}
            <footer style={styles.footer}>
                <div style={styles.footerLeft}>
                    <div style={styles.footerBrand}>Decide to Live</div>
                    <div style={styles.footerSmall}>
                        Educational tool only. Not medical advice. Not financial advice.
                    </div>
                </div>

                <div style={styles.footerLinks}>
                    <a href="/privacy" style={styles.footerLink}>Privacy Policy</a>
                    <a href="/terms" style={styles.footerLink}>Terms</a>
                    <a href="#" style={styles.footerLink} onClick={(e) => { e.preventDefault(); scrollToId("top"); }}>
                        Back to top
                    </a>
                </div>
            </footer>
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
    wrap: { paddingTop: 14 },

    topNav: {
        position: "sticky",
        top: 0,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "10px 0",
        marginBottom: 10,
        backdropFilter: "blur(10px)",
        background: "rgba(251, 247, 240, 0.72)",
        borderBottom: "1px solid rgba(18,18,18,0.06)",
    },

    brandLeft: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        userSelect: "none",
    },

    brandName: {
        fontSize: 12,
        letterSpacing: 0.6,
        textTransform: "uppercase",
        color: "var(--muted)",
    },

    badge: {
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid var(--border)",
        background: "rgba(255,255,255,0.6)",
        fontSize: 12,
        color: "var(--muted)",
    },

    navLinks: { display: "flex", gap: 6, alignItems: "center" },

    navBtn: {
        background: "transparent",
        border: "1px solid rgba(18,18,18,0.10)",
        padding: "8px 12px",
        borderRadius: 999,
        fontSize: 13,
        color: "rgba(18,18,18,0.82)",
    },

    hamburger: {
        width: 44,
        height: 40,
        borderRadius: 12,
        border: "1px solid rgba(18,18,18,0.10)",
        background: "rgba(255,255,255,0.55)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 5,
        padding: "0 12px",
    },

    hLine: {
        height: 2,
        width: "100%",
        borderRadius: 999,
        background: "rgba(18,18,18,0.70)",
    },

    mobileMenu: {
        position: "absolute",
        right: 0,
        top: 46,
        width: 200,
        borderRadius: 14,
        border: "1px solid rgba(18,18,18,0.10)",
        background: "rgba(255,255,255,0.85)",
        boxShadow: "0 16px 40px rgba(18,18,18,0.10)",
        padding: 8,
    },

    mobileMenuBtn: {
        width: "100%",
        textAlign: "left",
        padding: "10px 12px",
        borderRadius: 12,
        border: "1px solid rgba(18,18,18,0.06)",
        background: "rgba(250,249,246,0.65)",
        marginBottom: 8,
        fontSize: 13.5,
    },

    header: { marginBottom: 18 },

    h1: { fontSize: 44, margin: "14px 0 8px", letterSpacing: -0.8 },

    sub: { maxWidth: 760, fontSize: 16, color: "var(--muted)", lineHeight: 1.6, margin: 0 },

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

    sectionTitle: { fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--muted)" },

    previewCard: {
        borderRadius: 16,
        border: "1px solid rgba(18,18,18,0.08)",
        background: "rgba(250,249,246,0.65)",
        padding: 14,
    },

    previewImg: { width: "100%", borderRadius: 12, display: "block" },

    previewCaption: { marginTop: 8, fontSize: 12, color: "rgba(18,18,18,0.6)", textAlign: "center" },

    bullets: { display: "flex", flexDirection: "column", gap: 12 },

    bullet: {
        display: "flex",
        gap: 10,
        padding: 12,
        borderRadius: 14,
        background: "rgba(250,249,246,0.65)",
        border: "1px solid rgba(18,18,18,0.08)",
    },

    dot: { width: 10, height: 10, borderRadius: 999, background: "rgba(205,191,168,1)", marginTop: 6 },

    bulletTitle: { fontSize: 14, color: "rgba(18,18,18,0.92)" },

    bulletBody: { fontSize: 13, color: "var(--muted)", marginTop: 2, lineHeight: 1.45 },

    actions: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 },

    primary: {
        background: "var(--btn)",
        color: "var(--btnText)",
        padding: "11px 16px",
        borderRadius: 12,
        border: "1px solid rgba(18,18,18,0.12)",
        boxShadow: "0 10px 22px rgba(18,18,18,0.14)",
    },

    micro: { fontSize: 12, color: "var(--muted)" },

    schemaLine: { fontSize: 12, color: "var(--muted)", display: "flex", gap: 8, flexWrap: "wrap" },

    schemaLabel: {
        padding: "4px 8px",
        borderRadius: 999,
        border: "1px solid rgba(18,18,18,0.08)",
        background: "rgba(255,255,255,0.5)",
    },

    schemaValue: { opacity: 0.9 },

    tiles: { marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 },

    tile: { borderRadius: 16, padding: 14, border: "1px solid rgba(18,18,18,0.10)", background: "rgba(255,255,255,0.55)" },

    tileLabel: { fontSize: 12, textTransform: "uppercase", letterSpacing: 0.4, color: "var(--muted)", marginBottom: 6 },

    tileValue: { fontSize: 14, lineHeight: 1.5 },

    sectionCard: {
        marginTop: 16,
        borderRadius: 16,
        padding: 16,
        border: "1px solid rgba(18,18,18,0.10)",
        background: "rgba(255,255,255,0.55)",
    },

    sectionBody: { fontSize: 14, lineHeight: 1.6, color: "rgba(18,18,18,0.86)" },

    faqItem: {
        marginTop: 12,
        paddingTop: 12,
        borderTop: "1px solid rgba(18,18,18,0.08)",
    },

    faqQ: { fontSize: 14, color: "rgba(18,18,18,0.92)" },

    faqA: { marginTop: 6, fontSize: 13.5, lineHeight: 1.55, color: "rgba(18,18,18,0.78)" },

    newsletter: {
        marginTop: 18,
        borderRadius: 16,
        padding: 16,
        border: "1px solid rgba(18,18,18,0.10)",
        background: "rgba(255,255,255,0.55)",
    },

    newsletterCopy: { fontSize: 14, marginBottom: 12, color: "rgba(18,18,18,0.80)" },

    embedShell: { maxWidth: 520, margin: "0 auto" },

    embedFrame: { width: "100%", height: 190, borderRadius: 16, backgroundColor: "transparent", display: "block" },

    newsletterFinePrint: { marginTop: 10, fontSize: 12, color: "rgba(18,18,18,0.6)", textAlign: "center" },

    footer: {
        marginTop: 22,
        padding: "18px 0 26px",
        borderTop: "1px solid rgba(18,18,18,0.08)",
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
        alignItems: "flex-start",
    },

    footerLeft: { maxWidth: 520 },

    footerBrand: { fontSize: 12, letterSpacing: 0.6, textTransform: "uppercase", color: "rgba(18,18,18,0.72)" },

    footerSmall: { marginTop: 6, fontSize: 12, color: "rgba(18,18,18,0.60)", lineHeight: 1.5 },

    footerLinks: { display: "flex", gap: 14, flexWrap: "wrap" },

    footerLink: {
        fontSize: 12,
        color: "rgba(18,18,18,0.70)",
        textDecoration: "underline",
        textDecorationColor: "rgba(18,18,18,0.25)",
        textUnderlineOffset: 4,
    },
};
