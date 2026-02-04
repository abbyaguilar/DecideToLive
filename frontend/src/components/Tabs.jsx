import React, { useState } from "react";

function badge(color) {
    const bg = color === "green" ? "#e8f7ee" : color === "yellow" ? "#fff6db" : "#fde8e8";
    const br = color === "green" ? "#2f855a" : color === "yellow" ? "#b7791f" : "#c53030";
    return { background: bg, border: `1px solid ${br}` };
}

export default function Tabs({ sections }) {
    const [open, setOpen] = useState(sections?.[0]?.id);

    return (
        <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
            {sections.map((s) => {
                const isOpen = open === s.id;
                return (
                    <div key={s.id} style={{ border: "1px solid #ddd", borderRadius: 14, overflow: "hidden" }}>
                        <button
                            onClick={() => setOpen(isOpen ? null : s.id)}
                            style={{
                                width: "100%",
                                textAlign: "left",
                                padding: 14,
                                background: "white",
                                border: "none",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 12,
                            }}
                        >
                            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                <span style={{ padding: "4px 10px", borderRadius: 999, fontSize: 12, ...badge(s.color) }}>
                                    {s.color.toUpperCase()}
                                </span>
                                <div>
                                    <div style={{ fontWeight: 700, textTransform: "capitalize" }}>{s.id}</div>
                                    <div style={{ fontSize: 13, opacity: 0.75 }}>{s.headline}</div>
                                </div>
                            </div>
                            <span style={{ opacity: 0.6 }}>{isOpen ? "–" : "+"}</span>
                        </button>

                        {isOpen && (
                            <div style={{ padding: 14, paddingTop: 0 }}>
                                {s.insights?.length ? (
                                    <div style={{ display: "grid", gap: 10 }}>
                                        {s.insights.map((ins, idx) => (
                                            <div key={idx} style={{ padding: 12, borderRadius: 12, background: "#fafafa", border: "1px solid #eee" }}>
                                                <div style={{ fontWeight: 700 }}>{ins.topic}</div>
                                                <div style={{ marginTop: 6, lineHeight: 1.5 }}>{ins.fact}</div>
                                                <div style={{ marginTop: 8, fontSize: 13, opacity: 0.8 }}>{ins.note}</div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div style={{ fontSize: 14, opacity: 0.8, paddingTop: 8 }}>
                                        No specific insights for this section yet.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
