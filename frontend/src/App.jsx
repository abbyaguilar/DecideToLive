import React, { useEffect, useState } from "react";
import { fetchSchema, evaluateAnswers } from "./api.js";

import Welcome from "./pages/Welcome.jsx";
import Questionnaire from "./pages/Questionnaire.jsx";
import Results from "./pages/Results.jsx";

export default function App() {
  const [schema, setSchema] = useState(null);
  const [page, setPage] = useState("welcome"); // welcome | quiz | results
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
    return (
      <div style={{ padding: 24, fontFamily: "system-ui" }}>
        Loading…
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 820, margin: "0 auto", fontFamily: "system-ui" }}>
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
