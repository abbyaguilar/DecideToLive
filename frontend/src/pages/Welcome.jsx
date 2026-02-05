// Terms.jsx
export default function Terms() {
    const updated = new Date().toLocaleDateString();

    return (
        <main className="min-h-screen bg-neutral-50 text-neutral-900">
            <div className="mx-auto max-w-3xl px-6 py-14">
                <header className="mb-10">
                    <p className="text-sm text-neutral-500">Last updated: {updated}</p>
                    <h1 className="mt-3 text-4xl font-semibold tracking-tight">Terms of Use</h1>
                    <p className="mt-4 text-neutral-700 leading-relaxed">
                        Decide to Live provides educational content related to health, lifestyle, and longevity.
                        By accessing or using this site, you agree to these Terms of Use.
                    </p>
                </header>

                <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-neutral-200">
                    <h2 className="text-xl font-semibold">Educational use only (not medical advice)</h2>
                    <p className="mt-3 text-neutral-700 leading-relaxed">
                        The site and any quizzes/assessments are provided for informational and educational purposes only.
                        They are not medical advice, do not diagnose or treat any condition, and do not create a
                        doctor–patient relationship. Always seek guidance from a licensed healthcare professional for
                        medical questions.
                    </p>
                    <p className="mt-3 text-neutral-700 leading-relaxed">
                        If you think you may be experiencing a medical emergency, call local emergency services immediately.
                    </p>

                    <div className="my-8 h-px bg-neutral-200" />

                    <h2 className="text-xl font-semibold">Research summaries and “healthy/unhealthy” labels</h2>
                    <p className="mt-3 text-neutral-700 leading-relaxed">
                        References to “healthy” or “unhealthy” habits and any scoring or assessments reflect population-level
                        research associations and summaries of published studies. Research evolves and may change over time.
                        Individual outcomes vary widely, and nothing on this site is a prediction or personalized recommendation.
                    </p>
                    <p className="mt-3 text-neutral-700 leading-relaxed">
                        Links to third-party studies and resources are provided for convenience. We do not control third-party
                        websites and are not responsible for their content, accuracy, availability, or practices.
                    </p>

                    <div className="my-8 h-px bg-neutral-200" />

                    <h2 className="text-xl font-semibold">No guarantees</h2>
                    <p className="mt-3 text-neutral-700 leading-relaxed">
                        We make no warranties or guarantees about accuracy, completeness, or results. Your use of the site is at
                        your own risk.
                    </p>

                    <div className="my-8 h-px bg-neutral-200" />

                    <h2 className="text-xl font-semibold">Limitation of liability</h2>
                    <p className="mt-3 text-neutral-700 leading-relaxed">
                        To the fullest extent permitted by law, Decide to Live and its owners, contributors, and partners will not
                        be liable for any direct, indirect, incidental, special, or consequential damages arising out of or related
                        to your use of the site, including reliance on any content, results, or linked resources.
                    </p>

                    <div className="my-8 h-px bg-neutral-200" />

                    <h2 className="text-xl font-semibold">Third-party services and infrastructure</h2>
                    <p className="mt-3 text-neutral-700 leading-relaxed">
                        The site may rely on third-party service providers to operate. For example:
                    </p>
                    <ul className="mt-3 space-y-2 text-neutral-700 leading-relaxed list-disc pl-5">
                        <li>
                            <span className="font-medium">Vercel</span> may host the front-end website and may process basic technical
                            data (such as request logs) to deliver the site.
                        </li>
                        <li>
                            <span className="font-medium">Render</span> may host the back-end API (Flask) and may process basic technical
                            data (such as server logs) to provide the service.
                        </li>
                        <li>
                            <span className="font-medium">Beehiiv</span> (or a similar email provider) may process newsletter subscriptions
                            and deliver emails.
                        </li>
                    </ul>
                    <p className="mt-3 text-neutral-700 leading-relaxed">
                        These providers may process information as described in our Privacy Policy. Your use of the site may also be
                        subject to those providers’ terms and policies.
                    </p>

                    <div className="my-8 h-px bg-neutral-200" />

                    <h2 className="text-xl font-semibold">Newsletter</h2>
                    <p className="mt-3 text-neutral-700 leading-relaxed">
                        If you subscribe to the newsletter, you consent to receive emails about educational content and site updates.
                        You can unsubscribe at any time using the link in any newsletter email.
                    </p>

                    <div className="my-8 h-px bg-neutral-200" />

                    <h2 className="text-xl font-semibold">Changes</h2>
                    <p className="mt-3 text-neutral-700 leading-relaxed">
                        We may update these Terms from time to time. Continued use of the site after changes means you accept the
                        updated Terms.
                    </p>

                    <div className="my-8 h-px bg-neutral-200" />

                    <h2 className="text-xl font-semibold">Contact</h2>
                    <p className="mt-3 text-neutral-700 leading-relaxed">
                        Questions about these Terms can be sent to{" "}
                        <a
                            href="mailto:decidetolive.news@gmail.com"
                            className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-600"
                        >
                            decidetolive.news@gmail.com
                        </a>
                        .
                    </p>

                    <p className="mt-6 text-sm text-neutral-500 leading-relaxed">
                        This page is a general template and should be reviewed by legal counsel to ensure compliance with your specific
                        features, data practices, and applicable laws.
                    </p>
                </section>

                <footer className="mt-10 text-sm text-neutral-500">
                    © {new Date().getFullYear()} Decide to Live
                </footer>
            </div>
        </main>
    );
}
