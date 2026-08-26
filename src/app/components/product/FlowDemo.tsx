"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { stageVisuals } from "../visuals/StageVisuals";
import { flow } from "../../lib/site";

type StageId = (typeof flow)[number]["id"];

/**
 * Five-stage walkthrough of the builder. The step list drives a panel that
 * swaps between decorative stage mock-ups.
 *
 * Deliberately click-driven rather than auto-advancing — this sits mid-page and
 * a panel that changes under the reader while they are reading it is hostile.
 */
export default function FlowDemo() {
  const [active, setActive] = useState<StageId>(flow[0].id);
  const current = flow.find((s) => s.id === active) ?? flow[0];
  const Visual = stageVisuals[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12">
      {/* Steps ---------------------------------------------------------- */}
      <div>
        <ol className="space-y-1" role="tablist" aria-label="Build stages">
          {flow.map((stage) => {
            const isActive = stage.id === active;
            return (
              <li key={stage.id}>
                <button
                  type="button"
                  role="tab"
                  id={`stage-tab-${stage.id}`}
                  aria-selected={isActive}
                  aria-controls="stage-panel"
                  onClick={() => setActive(stage.id)}
                  className={[
                    "flex w-full items-start gap-3.5 rounded-xl border p-4 text-left transition-all duration-200",
                    isActive
                      ? "border-py-blue/40 bg-py-blue/[0.08]"
                      : "border-transparent hover:border-py-blue-text/12 hover:bg-py-blue-text/[0.03]",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold transition-colors",
                      isActive
                        ? "bg-py-orange text-[#1a0d02]"
                        : "border border-py-blue-text/15 bg-py-blue-text/[0.05] text-py-muted",
                    ].join(" ")}
                  >
                    {stage.step}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block text-sm font-semibold ${
                        isActive ? "text-white" : "text-py-text"
                      }`}
                    >
                      {stage.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-py-muted">
                      {stage.lead}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Detail for the selected stage */}
        <div
          key={current.id}
          className="animate-fade-in mt-6 border-t border-py-blue-text/10 pt-6"
        >
          <p className="text-sm leading-relaxed text-py-muted">
            {current.body}
          </p>
          <ul className="mt-4 space-y-2">
            {current.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm">
                <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-py-orange/15 text-[9px] text-py-orange-text">
                  <FaCheck aria-hidden />
                </span>
                <span className="text-py-muted">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Visual --------------------------------------------------------- */}
      <div
        id="stage-panel"
        role="tabpanel"
        aria-labelledby={`stage-tab-${current.id}`}
        className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start"
      >
        <div key={current.id} className="animate-fade-in relative">
          {/* Bleeds vertically only — horizontal bleed pushes past the
              viewport on narrow screens and causes sideways scroll. */}
          <div
            aria-hidden
            className="absolute -inset-y-6 inset-x-0 -z-10 rounded-[2rem] bg-py-blue/8 blur-3xl"
          />
          <Visual />
        </div>
        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-py-subtle">
          Illustrative — the builder is still in development
        </p>
      </div>
    </div>
  );
}
