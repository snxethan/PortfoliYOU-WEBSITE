"use client";

import { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Notice() {
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  return (
    <div
      className="fixed z-50"
      style={{
        top: "calc(env(safe-area-inset-top, 0px) + 3.5rem)",
        left: "calc(env(safe-area-inset-left, 0px) + 1rem)",
      }}
    >
      <button
        onClick={() => setDisclaimerOpen((v) => !v)}
        aria-expanded={disclaimerOpen}
        aria-controls="py-disclaimer"
        aria-label={disclaimerOpen ? "Hide Portfoli-YOU notice" : "Show Portfoli-YOU notice"}
        className={[
          "group flex transition-all duration-300 overflow-hidden text-left",
          disclaimerOpen
            ? "items-start gap-3 w-[min(92vw,28rem)] p-4"
            : "items-center justify-center w-11 h-11 p-4",
          "rounded-xl border bg-orange-500/15 border-orange-400/40 backdrop-blur-sm",
          "hover:bg-orange-500/25 hover:border-orange-400/60",
          disclaimerOpen ? "shadow-xl" : "shadow-none"
        ].join(" ")}
      >
        <FaExclamationTriangle
          className={[
            "text-orange-300 flex-shrink-0 transition-transform duration-300",
            disclaimerOpen ? "text-xl scale-105 mt-0.5" : "text-lg scale-100"
          ].join(" ")}
        />
        <div
          id="py-disclaimer"
          className={[
            "grid transition-all duration-300 ease-in-out",
            disclaimerOpen ? "grid-rows-[1fr] opacity-100 ml-1" : "grid-rows-[0fr] opacity-0 ml-0"
          ].join(" ")}
        >
          <div className="overflow-hidden">
            <p className="text-sm leading-relaxed text-orange-100/90">
              <strong className="text-orange-200">Notice:</strong>{" "}
               <br />
               <i> <b>Portfoli-YOU</b> is currently in development: </i>
              <br />
              <br />
              <li>Information may be inaccurate & is subject to change. </li>
              <li><u>The Installer is not yet available.</u></li>
            </p>
            <div className="mt-2 flex items-center gap-3 text-[11px] text-orange-200/70">
              <span className="inline-flex items-center rounded-md border border-orange-300/30 bg-orange-400/10 px-2 py-0.5">
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
