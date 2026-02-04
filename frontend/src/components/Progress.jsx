import React from "react";

export default function Progress({ current, total }) {
    const pct = Math.round((current / total) * 100);
    return (
        <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, opacity: 0.8 }}>
                <span>Step {current} of {total}</span>
                <span>{pct}%</span>
            </div>
            <div style={{ height: 10, background: "#eee", borderRadius: 999, overflow: "hidden", marginTop: 8 }}>
                <div style={{ width: `${pct}%`, height: "100%", background: "#111" }} />
            </div>
        </div>
    );
}
