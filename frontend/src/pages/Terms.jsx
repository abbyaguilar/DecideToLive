// Terms.jsx
export default function Terms() {
    return (
        <main className="min-h-screen bg-neutral-50 text-neutral-900">
            <div className="mx-auto max-w-3xl px-6 py-14">
                <header className="mb-10">
                    <p className="text-sm text-neutral-500">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                    <h1 className="mt-3 text-4xl font-semibold tracking-tight">
                        Terms of Use
                    </h1>
                    <p className="mt-4 text-neutral-700 leading-relaxed">
                        Decide to Live provides educational content related to health,
                        lifestyle, and longevity. By accessing or using this site, you agree
                        to these Terms of Use.
                    </p>
                </header>

                <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-neutral-200">
                    <h2 className="text-xl font-semibold">Educational purposes only</h2>
                    <p className="mt-3 text-neutral-700 leading-relaxed">
                        All content on this site is provided for informational and
                        educational purposes only. It is not medical advice, does not
                        diagnose conditions, and does not replace consultation with a
                        licensed healthcare professional.
                    </p>
                    <p className="mt-3 text-neutral-700 leading-relaxed">
                        Do not disregard professional medical advice or delay seeking care
                        because of information obtained through this site.
                    </p>

                    <div className="my-8 h-px bg-neutral-200" />

                    <h2 className="text-xl font-semibold">
                        Assessments and research-based content
                    </h2>
                    <p className="mt-3 text-neutral-700 leading-relaxed">
                        Any quizzes, assessments, or descriptions of “healthy” or
                        “unhealthy” habits are based on population-level research and
                        statistical associations. Individual outcomes vary widely, and no
                        result should be interpreted as a prediction or personalized
                        recommendation.
                    </p>
                    <p className="mt-3 text-neutral-700 leading-relaxed">
                        Links to studies or external resources are provided for reference
                        only. We do not control or guarantee the accuracy of third-party
                        content.
                    </p>

                    <div className="my-8 h-px bg-neutral-200" />

                    <h2 className="text-xl font-semibold">No guarantees</h2>
                    <p className="mt-3 text-neutral-700 leading-relaxed">
                        We make no guarantees regarding the accuracy, completeness, or
                        usefulness of any content. Use of the site is at your own risk.
                    </p>

                    <div className="my-8 h-px bg-neutral-200" />

                    <h2 className="text-xl font-semibold">Limitation of liability</h2>
                    <p className="mt-3 text-neutral-700 leading-relaxed">
                        To the fullest extent permitted by law, Decide to Live and its
                        creators are not liable for any direct, indirect, incidental, or
                        consequential damages arising from your use of the site or reliance
                        on its content.
                    </p>

                    <div className="my-8 h-px bg-neutral-200" />

                    <h2 className="text-xl font-semibold">Newsletter</h2>
                    <p className="mt-3 text-neutral-700 leading-relaxed">
                        If you subscribe to our newsletter, you consent to receive emails
                        related to educational content and site updates. Email delivery and
                        subscription management may be handled by a third-party service
                        provider (such as Beehiiv). You may unsubscribe at any time using the
                        link included in each email.
                    </p>

                    <div className="my-8 h-px bg-neutral-200" />

                    <h2 className="text-xl font-semibold">Changes to these terms</h2>
                    <p className="mt-3 text-neutral-700 leading-relaxed">
                        We may update these Terms periodically. Continued use of the site
                        after changes indicates acceptance of the updated Terms.
                    </p>

                    <div className="my-8 h-px bg-neutral-200" />

                    <h2 className="text-xl font-semibold">Contact</h2>
                    <p className="mt-3 text-neutral-700 leading-relaxed">
                        Questions about these Terms may be sent to{" "}
                        <a
                            href="mailto:decidetolive.news@gmail.com"
                            className="underline underline-offset-4"
                        >
                            decidetolive.news@gmail.com
                        </a>
                        .
                    </p>

                    <p className="mt-6 text-sm text-neutral-500">
                        This page is provided for general informational purposes and should
                        be reviewed by legal counsel to ensure compliance with applicable
                        laws.
                    </p>
                </section>

                <footer className="mt-10 text-sm text-neutral-500">
                    © {new Date().getFullYear()} Decide to Live
                </footer>
            </div>
        </main>
    );
}
