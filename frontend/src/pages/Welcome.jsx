// frontend/src/pages/Welcome.jsx

import React, { useEffect, useMemo, useState } from "react";
import previewImg from "../assets/assessment-preview-horizontal.png";
import resultsImg from "../assets/results-preview.png";

const BEEHIIV_FORM_URL =
    "https://subscribe-forms.beehiiv.com/9a22dc77-4e7b-4fb7-9151-6033aea1c5c8";

export default function Welcome({ title, subtitle, onStart }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [legalOpen, setLegalOpen] = useState(false);
    const [legalTab, setLegalTab] = useState("terms"); // "terms" | "privacy"

    // preview carousel
    const [slide, setSlide] = useState(0);

    // Responsive check for hamburger + sizing
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== "undefined" ? window.innerWidth <= 820 : false
    );

    useEffect(() => {
        function onResize() {
            setIsMobile(window.innerWidth <= 820);
        }
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
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

    function openLegal(tab) {
        setLegalTab(tab);
        setLegalOpen(true);
        setTimeout(() => {
            const el = document.getElementById("legal");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 0);
    }

    const slides = useMemo(() => {
        return [
            { src: previewImg, caption: "Assessment questions" },
            { src: resultsImg, caption: "Results analysis" },
        ];
    }, []);

    function nextSlide() {
        setSlide((s) => (s + 1) % slides.length);
    }

    function prevSlide() {
        setSlide((s) => (s - 1 + slides.length) % slides.length);
    }

    return (
        <div style={styles.wrap}>
            {/* Top nav */}
            <div style={styles.topNav}>
                <div
                    style={styles.brandLeft}
                    onClick={() => scrollToId("top")}
                    role="button"
                    tabIndex={0}
                >
                    <div style={styles.brandName}>Decide to Live</div>
                    <div style={styles.badge}>Research informed longevity tool</div>
                </div>

                {/* Desktop nav */}
                {!isMobile && (
                    <nav style={styles.navLinks}>
                        <button
                            type="button"
                            style={styles.navBtn}
                            onClick={() => scrollToId("about")}
                        >
                            About
                        </button>
                        <button
                            type="button"
                            style={styles.navBtn}
                            onClick={() => scrollToId("faq")}
                        >
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
                                <button
                                    type="button"
                                    style={styles.mobileMenuBtn}
                                    onClick={() => scrollToId("about")}
                                >
                                    About
                                </button>
                                <button
                                    type="button"
                                    style={styles.mobileMenuBtn}
                                    onClick={() => scrollToId("faq")}
                                >
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
                    A structured overview of factors associated with longevity and
                    preparedness. Clear, neutral, and designed for responsible planning.
                </p>
            </header>

            <section style={styles.hero}>
                <div style={styles.sectionTitle}>What you will receive</div>

                {/* Preview carousel (tweaked for bigger mobile + subtle V arrows) */}
                <div style={styles.previewCard}>
                    <div style={styles.carouselWrap}>
                        <img
                            src={slides[slide].src}
                            alt={slides[slide].caption}
                            style={{
                                ...styles.previewImg,
                                ...(isMobile ? styles.previewImgMobile : null),
                            }}
                        />

                        <button
                            type="button"
                            aria-label="Previous preview"
                            onClick={prevSlide}
                            style={{ ...styles.arrow, ...styles.arrowLeft }}
                        >
                            <span
                                style={{
                                    ...styles.arrowIcon,
                                    transform: "rotate(135deg)",
                                }}
                            />
                        </button>

                        <button
                            type="button"
                            aria-label="Next preview"
                            onClick={nextSlide}
                            style={{ ...styles.arrow, ...styles.arrowRight }}
                        >
                            <span
                                style={{
                                    ...styles.arrowIcon,
                                    transform: "rotate(-45deg)",
                                }}
                            />
                        </button>
                    </div>

                    <div style={styles.previewCaptionRow}>
                        <div style={styles.previewCaption}>{slides[slide].caption}</div>
                        <div style={styles.dotsRow}>
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setSlide(i)}
                                    aria-label={`Preview ${i + 1}`}
                                    style={{
                                        ...styles.dotBtn,
                                        ...(i === slide ? styles.dotBtnActive : null),
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div style={styles.bullets}>
                    <Bullet
                        title="Short questionnaire"
                        body="Multiple-choice sections. Approximately three to five minutes."
                    />
                    <Bullet
                        title="Results you can explore"
                        body="An overall indicator, a section-by-section breakdown, and key insights in plain language."
                    />
                    <Bullet
                        title="Evidence links included"
                        body="Where available, each section includes references so you can verify and learn more."
                    />
                    <Bullet
                        title="No account or credit card required"
                        body="Your results appear immediately. We do not collect an email address to show results."
                    />
                </div>

                <div style={styles.actions}>
                    <button onClick={onStart} style={styles.primary}>
                        Start assessment
                    </button>

                    <div style={styles.micro}>
                        Educational only. Not medical advice. Not financial advice. Not a
                        prediction.
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
                        A structured assessment informed by public health and behavioral
                        research, presented in plain language.
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
                    Decide to Live is a research informed reflection tool that helps you
                    understand how everyday factors are associated with long term health
                    outcomes at the population level. It is built to make risk literacy
                    practical and to support more responsible planning. This tool does not
                    predict your lifespan and it does not provide medical or financial
                    advice.
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" style={styles.sectionCard}>
                <div style={styles.tileLabel}>FAQ</div>

                <div style={styles.faqItem}>
                    <div style={styles.faqQ}>Is this a life expectancy calculator</div>
                    <div style={styles.faqA}>
                        No. This is an educational assessment that summarizes research
                        associations and highlights where protective or risk associated
                        factors may be present.
                    </div>
                </div>

                <div style={styles.faqItem}>
                    <div style={styles.faqQ}>Is this medical advice</div>
                    <div style={styles.faqA}>
                        No. If you have health concerns or want medical guidance, talk with a
                        licensed clinician.
                    </div>
                </div>

                <div style={styles.faqItem}>
                    <div style={styles.faqQ}>How is the score calculated</div>
                    <div style={styles.faqA}>
                        Your responses map to simple weights based on the direction of
                        evidence in the research. The UI score is a normalized indicator for
                        readability and does not represent a medical outcome.
                    </div>
                </div>

                <div style={styles.faqItem}>
                    <div style={styles.faqQ}>Do you store my answers</div>
                    <div style={styles.faqA}>
                        Not by default. We do not collect an email address to show results.
                        If you choose to subscribe to the newsletter, Beehiiv will collect
                        your email for subscription and unsubscribe compliance.
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section id="newsletter" style={styles.newsletter}>
                <div style={styles.tileLabel}>Monthly research letter</div>

                <div style={styles.newsletterCopy}>
                    One monthly email with new longevity research, clear summaries, and
                    practical habits. Unsubscribe anytime.
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
                    Signup is hosted by Beehiiv for deliverability and unsubscribe
                    compliance.
                </div>
            </section>

            {/* Legal expandable (FULL text) */}
            <section id="legal" style={styles.sectionCard}>
                <div style={styles.legalHeaderRow}>
                    <div>
                        <div style={styles.tileLabel}>Legal</div>
                        <div style={styles.sectionBody}>
                            Expand to view full Terms of Use and Privacy Policy without leaving
                            this page.
                        </div>
                    </div>

                    <button
                        type="button"
                        style={styles.legalToggleBtn}
                        onClick={() => setLegalOpen((v) => !v)}
                        aria-expanded={legalOpen}
                    >
                        {legalOpen ? "Collapse" : "Expand"}
                    </button>
                </div>

                {legalOpen && (
                    <div style={styles.legalBox}>
                        <div style={styles.legalTabs}>
                            <button
                                type="button"
                                onClick={() => setLegalTab("terms")}
                                style={legalTab === "terms" ? styles.legalTabActive : styles.legalTab}
                            >
                                Terms
                            </button>
                            <button
                                type="button"
                                onClick={() => setLegalTab("privacy")}
                                style={legalTab === "privacy" ? styles.legalTabActive : styles.legalTab}
                            >
                                Privacy
                            </button>
                        </div>

                        <div style={styles.legalScroll}>
                            {legalTab === "terms" ? <TermsFull /> : <PrivacyFull />}
                        </div>
                    </div>
                )}
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
                    <button
                        type="button"
                        style={styles.footerLinkBtn}
                        onClick={() => openLegal("terms")}
                    >
                        Terms
                    </button>
                    <button
                        type="button"
                        style={styles.footerLinkBtn}
                        onClick={() => openLegal("privacy")}
                    >
                        Privacy
                    </button>
                    <a
                        href="#"
                        style={styles.footerLink}
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToId("top");
                        }}
                    >
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

/**
 * FULL TEXT (kept here to avoid route/refresh issues).
 * Your Terms.jsx and Privacy.jsx still keep their full content too.
 * This is simply a second place to display them in-page.
 */
function TermsFull() {
    return (
        <div style={styles.legalInner}>
            <div style={styles.legalH1}>Terms of Use</div>
            <div style={styles.legalP}>Last updated: {new Date().toLocaleDateString()}</div>

            <div style={styles.legalP}>
                Decide to Live provides educational content related to health, lifestyle,
                and longevity. By accessing or using this site, you agree to these Terms
                of Use.
            </div>

            <div style={styles.legalH2}>Educational purposes only</div>
            <div style={styles.legalP}>
                All content on this site is provided for informational and educational
                purposes only. It is not medical advice, does not diagnose conditions,
                and does not replace consultation with a licensed healthcare professional.
            </div>
            <div style={styles.legalP}>
                Do not disregard professional medical advice or delay seeking care because
                of information obtained through this site.
            </div>

            <div style={styles.legalDivider} />

            <div style={styles.legalH2}>Assessments and research-based content</div>
            <div style={styles.legalP}>
                Any quizzes, assessments, or descriptions of “healthy” or “unhealthy”
                habits are based on population-level research and statistical
                associations. Individual outcomes vary widely, and no result should be
                interpreted as a prediction or personalized recommendation.
            </div>
            <div style={styles.legalP}>
                Links to studies or external resources are provided for reference only.
                We do not control or guarantee the accuracy of third-party content.
            </div>

            <div style={styles.legalDivider} />

            <div style={styles.legalH2}>No guarantees</div>
            <div style={styles.legalP}>
                We make no guarantees regarding the accuracy, completeness, or usefulness
                of any content. Use of the site is at your own risk.
            </div>

            <div style={styles.legalDivider} />

            <div style={styles.legalH2}>Limitation of liability</div>
            <div style={styles.legalP}>
                To the fullest extent permitted by law, Decide to Live and its creators
                are not liable for any direct, indirect, incidental, or consequential
                damages arising from your use of the site or reliance on its content.
            </div>

            <div style={styles.legalDivider} />

            <div style={styles.legalH2}>Newsletter</div>
            <div style={styles.legalP}>
                If you subscribe to our newsletter, you consent to receive emails related
                to educational content and site updates. Email delivery and subscription
                management may be handled by a third-party service provider (such as
                Beehiiv). You may unsubscribe at any time using the link included in each
                email.
            </div>

            <div style={styles.legalDivider} />

            <div style={styles.legalH2}>Changes to these terms</div>
            <div style={styles.legalP}>
                We may update these Terms periodically. Continued use of the site after
                changes indicates acceptance of the updated Terms.
            </div>

            <div style={styles.legalDivider} />

            <div style={styles.legalH2}>Contact</div>
            <div style={styles.legalP}>
                Questions about these Terms may be sent to{" "}
                <a href="mailto:decidetolive.news@gmail.com" style={styles.legalLink}>
                    decidetolive.news@gmail.com
                </a>
                .
            </div>

            <div style={styles.legalFinePrint}>
                This page is provided for general informational purposes and should be
                reviewed by legal counsel to ensure compliance with applicable laws.
            </div>
        </div>
    );
}

function PrivacyFull() {
    const updated = new Date().toLocaleDateString();

    return (
        <div style={styles.legalInner}>
            <div style={styles.legalH1}>Privacy Policy</div>
            <div style={styles.legalP}>Last updated: {updated}</div>

            <div style={styles.legalP}>
                This Privacy Policy explains how Decide to Live collects, uses, and shares
                information when you use our site. This site provides educational health
                and lifestyle content and does not provide medical advice.
            </div>

            <div style={styles.legalH2}>Information we collect</div>

            <div style={styles.legalH3}>Information you provide</div>
            <div style={styles.legalP}>
                We collect information you choose to provide, such as your email address
                when you subscribe to the newsletter or when you contact us.
            </div>

            <div style={styles.legalH3}>Information collected automatically</div>
            <div style={styles.legalP}>
                When you visit the site or use the API, certain technical information may
                be collected automatically by our infrastructure and service providers,
                such as your IP address, device and browser type, approximate location
                (derived from IP), timestamps, pages visited, referring/exit pages, and
                diagnostic logs. This information is typically used for security,
                performance, and reliability.
            </div>

            <div style={styles.legalDivider} />

            <div style={styles.legalH2}>What we do not collect (quiz answers)</div>
            <div style={styles.legalP}>
                We do not intentionally store your health/lifestyle quiz responses in a
                user profile tied to your identity. However, basic technical logs
                (described above) may still be generated by hosting providers as part of
                normal site operations.
            </div>

            <div style={styles.legalDivider} />

            <div style={styles.legalH2}>How we use information</div>
            <ul style={styles.legalList}>
                <li>To operate, maintain, protect, and improve the site and API</li>
                <li>To send newsletters to subscribers and manage subscriptions</li>
                <li>To respond to messages and support requests</li>
                <li>To monitor for abuse, fraud, or security issues</li>
            </ul>

            <div style={styles.legalDivider} />

            <div style={styles.legalH2}>Third-party services we use</div>
            <div style={styles.legalP}>
                We use third-party services to host and operate our site and
                communications. These providers may process personal information on our
                behalf (as “service providers”/processors) to provide their services:
            </div>

            <ul style={styles.legalList}>
                <li>
                    <span style={styles.legalStrong}>Vercel</span>: may host the front-end
                    site and process request/diagnostic logs and performance data necessary
                    to deliver the website.
                </li>
                <li>
                    <span style={styles.legalStrong}>Render</span>: may host the Flask
                    back-end/API and process server logs and diagnostics necessary to run
                    the API.
                </li>
                <li>
                    <span style={styles.legalStrong}>Beehiiv</span>: may collect and store
                    subscriber email addresses and deliver newsletters (including
                    unsubscribe handling).
                </li>
            </ul>

            <div style={styles.legalP}>
                If you add other tools (analytics, error tracking, payments, ads), you
                should list them here as well and describe what they collect.
            </div>

            <div style={styles.legalDivider} />

            <div style={styles.legalH2}>Sharing of information</div>
            <div style={styles.legalP}>
                We do not sell your personal information. We may share information with
                service providers (like the ones listed above) strictly to operate the
                site and newsletter. We may also share information if required by law, or
                to protect the rights, safety, and integrity of the site.
            </div>

            <div style={styles.legalDivider} />

            <div style={styles.legalH2}>Data retention</div>
            <div style={styles.legalP}>
                We retain personal information only as long as reasonably necessary for
                the purposes described in this Policy, unless a longer period is required
                or permitted by law. Newsletter subscribers can unsubscribe at any time.
                Some operational logs may be retained by infrastructure providers for
                limited periods for security and debugging.
            </div>

            <div style={styles.legalDivider} />

            <div style={styles.legalH2}>Security</div>
            <div style={styles.legalP}>
                We use reasonable safeguards designed to protect information. No system
                is completely secure, and we cannot guarantee absolute security.
            </div>

            <div style={styles.legalDivider} />

            <div style={styles.legalH2}>California privacy rights</div>
            <div style={styles.legalP}>
                If you are a California resident, you may have rights to request access
                to, deletion of, or correction of certain personal information. You may
                also have rights to opt out of certain “sharing” for cross-context
                behavioral advertising when applicable. To submit a request, contact us
                at the email below. We may need to verify your identity before responding.
            </div>
            <div style={styles.legalP}>
                We do not knowingly “sell” personal information. If our practices change,
                we will update this Policy and provide any required opt-out mechanisms.
            </div>

            <div style={styles.legalDivider} />

            <div style={styles.legalH2}>Children’s privacy</div>
            <div style={styles.legalP}>
                The site is not intended for children under 13, and we do not knowingly
                collect personal information from children under 13.
            </div>

            <div style={styles.legalDivider} />

            <div style={styles.legalH2}>Changes to this policy</div>
            <div style={styles.legalP}>
                We may update this Privacy Policy from time to time. We will update the
                “Last updated” date above when changes are made.
            </div>

            <div style={styles.legalDivider} />

            <div style={styles.legalH2}>Contact</div>
            <div style={styles.legalP}>
                For privacy questions or requests, contact{" "}
                <a href="mailto:decidetolive.news@gmail.com" style={styles.legalLink}>
                    decidetolive.news@gmail.com
                </a>
                .
            </div>

            <div style={styles.legalFinePrint}>
                This Privacy Policy is a general template. It should match your actual
                data practices and be reviewed by counsel for compliance with applicable
                laws.
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
        cursor: "pointer",
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
        cursor: "pointer",
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
        width: 220,
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
        cursor: "pointer",
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

    // Carousel frame (keeps image big + crops nicely on mobile)
    carouselWrap: {
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(18,18,18,0.06)",
        background: "rgba(255,255,255,0.55)",
    },

    previewImg: {
        width: "100%",
        height: 360,
        objectFit: "contain",
        display: "block",
    },

    previewImgMobile: {
        height: 320,
        objectFit: "contain",
        background: "transparent",
        transform: "scale(1.35)",
        transformOrigin: "50% 65%",
    },

    previewCaptionRow: {
        marginTop: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        flexWrap: "wrap",
    },

    previewCaption: { fontSize: 12, color: "rgba(18,18,18,0.6)" },

    dotsRow: { display: "flex", gap: 8, alignItems: "center" },

    dotBtn: {
        width: 10,
        height: 10,
        borderRadius: 999,
        border: "1px solid rgba(18,18,18,0.18)",
        background: "rgba(255,255,255,0.7)",
        cursor: "pointer",
        padding: 0,
    },

    dotBtnActive: {
        background: "rgba(18,18,18,0.88)",
        border: "1px solid rgba(18,18,18,0.22)",
    },

    // Subtle V/chevron arrows
    arrow: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 34,
        height: 34,
        borderRadius: 999,
        border: "1px solid rgba(18,18,18,0.10)",
        background: "rgba(18,18,18,0.18)",
        color: "rgba(18,18,18,0.92)",
        backdropFilter: "blur(6px)",
        cursor: "pointer",
        display: "grid",
        placeItems: "center",
        padding: 0,
    },

    arrowLeft: { left: 10 },
    arrowRight: { right: 10 },

    arrowIcon: {
        width: 10,
        height: 10,
        borderRight: "2px solid rgba(18,18,18,0.85)",
        borderBottom: "2px solid rgba(18,18,18,0.85)",
    },

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
        cursor: "pointer",
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

    faqItem: { marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(18,18,18,0.08)" },

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

    legalHeaderRow: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 },

    legalToggleBtn: {
        border: "1px solid rgba(18,18,18,0.10)",
        background: "rgba(255,255,255,0.65)",
        padding: "8px 12px",
        borderRadius: 12,
        fontSize: 13,
        cursor: "pointer",
    },

    legalBox: {
        marginTop: 12,
        borderRadius: 14,
        border: "1px solid rgba(18,18,18,0.10)",
        background: "rgba(255,255,255,0.65)",
        overflow: "hidden",
    },

    legalTabs: { display: "flex", gap: 6, padding: 10, borderBottom: "1px solid rgba(18,18,18,0.08)" },

    legalTab: {
        border: "1px solid rgba(18,18,18,0.10)",
        background: "rgba(250,249,246,0.65)",
        padding: "8px 10px",
        borderRadius: 999,
        fontSize: 12,
        cursor: "pointer",
    },

    legalTabActive: {
        border: "1px solid rgba(18,18,18,0.14)",
        background: "rgba(18,18,18,0.90)",
        color: "white",
        padding: "8px 10px",
        borderRadius: 999,
        fontSize: 12,
        cursor: "pointer",
    },

    legalScroll: { maxHeight: 260, overflow: "auto", padding: 12 },

    legalInner: { fontSize: 12, color: "rgba(18,18,18,0.80)", lineHeight: 1.6 },

    legalH1: { fontSize: 14, fontWeight: 700, marginBottom: 6 },

    legalH2: { fontSize: 13, fontWeight: 700, marginTop: 12, marginBottom: 6 },

    legalH3: { fontSize: 12, fontWeight: 700, marginTop: 10, marginBottom: 4 },

    legalP: { marginBottom: 8 },

    legalDivider: { height: 1, background: "rgba(18,18,18,0.08)", margin: "10px 0" },

    legalList: { paddingLeft: 18, marginBottom: 8 },

    legalStrong: { fontWeight: 700 },

    legalLink: { textDecoration: "underline", textUnderlineOffset: 3, color: "rgba(18,18,18,0.85)" },

    legalFinePrint: { marginTop: 10, fontSize: 11, color: "rgba(18,18,18,0.60)" },

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

    footerLinkBtn: {
        fontSize: 12,
        color: "rgba(18,18,18,0.70)",
        textDecoration: "underline",
        textDecorationColor: "rgba(18,18,18,0.25)",
        textUnderlineOffset: 4,
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
    },
};
