import React, { useEffect, useState } from "react";
import { fetchSchema, evaluateAnswers } from "./api";

import Welcome from "./pages/Welcome";
import Questionnaire from "./pages/Questionnaire";
import Results from "./pages/Results";

export default function MainApp() {
    const [schema, setSchema] = useState(null);
    const [page, setPage] = useState("welcome");
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSchema().then(setSchema).catch(console.error);
    }, []);

    async function onSubmitQuiz(finalAnswers) {
        setLoading(true);
        try {
            const res = await evaluateAnswers(finalAnswers);
            setResult(res);
            setPage("results");
        } finally {
            setLoading(false);
        }
    }

    if (!schema) {
        return <div style={{ padding: 24 }}>Loading…</div>;
    }

    return (
        <div style={{ padding: 24, maxWidth: 820, margin: "0 auto" }}>
            {page === "welcome" && (
                <Welcome
                    title={schema.app.title}
                    subtitle={schema.app.subtitle}
                    onStart={() => setPage("quiz")}
                />
            )}

            {page === "quiz" && (
                <Questionnaire
                    schema={schema}
                    answers={answers}
                    setAnswers={setAnswers}
                    onBack={() => setPage("welcome")}
                    onSubmit={onSubmitQuiz}
                    loading={loading}
                />
            )}

            {page === "results" && result && (
                <Results
                    result={result}
                    onRestart={() => {
                        setAnswers({});
                        setResult(null);
                        setPage("welcome");
                    }}
                />
            )}
        </div>
    );
}
