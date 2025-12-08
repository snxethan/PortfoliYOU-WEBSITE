"use client";

import { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { SAFE_AREA } from "../constants";

export default function Notice() {
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  return (
    <div
      className="fixed z-50"
      style={{
        top: SAFE_AREA.TOP_OFFSET,
        left: SAFE_AREA.LEFT_OFFSET,
      }}
    >
      <button
        onClick={() => setDisclaimerOpen((v) => !v)}
        aria-expanded={disclaimerOpen}
        aria-controls="py-disclaimer"
        aria-label={disclaimerOpen ? "Hide Portfoli-YOU notice" : "Show Portfoli-YOU notice"}
        className={[
          "group flex transition-all duration-300 overflow-hidden text-left rounded-xl border backdrop-blur-sm",
          disclaimerOpen
            ? "items-start gap-3 w-[min(92vw,28rem)] p-4"
            : "items-center justify-center w-11 h-11 p-4",
          disclaimerOpen ? "shadow-xl" : "shadow-none"
        ].join(" ")}
        style={{
          backgroundColor: 'color-mix(in oklab, var(--accent) 15%, transparent)',
          borderColor: 'color-mix(in oklab, var(--accent) 40%, transparent)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'color-mix(in oklab, var(--accent) 25%, transparent)'
          e.currentTarget.style.borderColor = 'color-mix(in oklab, var(--accent) 60%, transparent)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'color-mix(in oklab, var(--accent) 15%, transparent)'
          e.currentTarget.style.borderColor = 'color-mix(in oklab, var(--accent) 40%, transparent)'
        }}
      >
        <FaExclamationTriangle
          className={[
            "flex-shrink-0 transition-transform duration-300",
            disclaimerOpen ? "text-xl scale-105 mt-0.5" : "text-lg scale-100"
          ].join(" ")}
          style={{ color: 'var(--accent)' }}
        />
        <div
          id="py-disclaimer"
          className={[
            "grid transition-all duration-300 ease-in-out",
            disclaimerOpen ? "grid-rows-[1fr] opacity-100 ml-1" : "grid-rows-[0fr] opacity-0 ml-0"
          ].join(" ")}
        >
          <div className="overflow-hidden">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--fg)' }}>
              <strong style={{ color: 'var(--fg-strong)' }}>Notice:</strong>{" "}
               <br />
               <i> <b>Portfoli-YOU</b> is currently in development: </i>
              <br />
              <br />
              <li>Information may be inaccurate & is subject to change. </li>
              <li><u>The Installer is not yet available.</u></li>
            </p>
            <div className="mt-2 flex items-center gap-3 text-[11px]" style={{ color: 'var(--fg-muted)' }}>
              <span 
                className="inline-flex items-center rounded-md border px-2 py-0.5"
                style={{
                  borderColor: 'color-mix(in oklab, var(--accent) 30%, transparent)',
                  backgroundColor: 'color-mix(in oklab, var(--accent) 10%, transparent)',
                }}
              >
                snxethan  
              </span>
              <span>(September 9th, 2025)</span>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
