const API_BASE =
    import.meta.env.VITE_API_BASE || "http://localhost:5000";

export async function fetchSchema() {
    const res = await fetch(`${API_BASE}/api/schema`);
    if (!res.ok) throw new Error("Failed to load schema");
    return res.json();
}

export async function evaluateAnswers(answers) {
    const res = await fetch(`${API_BASE}/api/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
    });
    if (!res.ok) throw new Error("Failed to evaluate");
    return res.json();
}
