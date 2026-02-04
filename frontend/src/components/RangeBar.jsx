import React from "react";

export default function RangeBar({ dot }) {
    const x = Math.max(0, Math.min(100, dot || 50));

    return (
        <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 6 }}>
                Strong protective ←──────────→ Higher risk
            </div>
            <div style={{ position: "relative", height: 14, background: "#eee", borderRadius: 999 }}>
                <div
                    style={{
                        position: "absolute",
                        left: `${x}%`,
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 16,
                        height: 16,
                        borderRadius: 999,
                        background: "#111",
                        border: "2px solid white",
                    }}
                    title={`dot: ${x}`}
                />
            </div>
        </div>
    );
}
