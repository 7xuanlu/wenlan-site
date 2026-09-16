"use client";

import { useState } from "react";

export function Answer({ label, detail }: { readonly label: string; readonly detail: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="workflow-answer">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
        className="workflow-answer-toggle"
      >
        <strong>{label}</strong>
        <span aria-hidden="true" className="workflow-answer-icon">{expanded ? "–" : "+"}</span>
      </button>
      <p hidden={!expanded}>{detail}</p>
    </div>
  );
}
