import React from "react";

/**
 * Decorative abstraction of the builder: widget rail on the left, canvas on the
 * right. Pure CSS so it costs nothing to load and recolours with the palette.
 * Purely illustrative — hidden from assistive tech.
 */
export default function BuilderMock() {
  return (
    <div
      aria-hidden
      className="relative select-none overflow-hidden rounded-xl border border-py-blue-text/12 bg-py-surface/80 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-sm"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-py-blue-text/10 bg-py-raised/70 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-py-orange/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-py-blue-text/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-py-blue-text/25" />
        <span className="ml-3 h-4 w-40 rounded bg-py-blue-text/10" />
        <span className="ml-auto h-6 w-16 rounded-md bg-py-orange/80" />
      </div>

      <div className="flex">
        {/* Widget rail */}
        <div className="hidden w-36 shrink-0 flex-col gap-2 border-r border-py-blue-text/10 p-3 sm:flex">
          <span className="mb-1 h-2.5 w-16 rounded bg-py-blue-text/15" />
          {[
            "w-full",
            "w-[85%]",
            "w-[92%]",
            "w-[78%]",
            "w-[88%]",
          ].map((w, i) => (
            <span
              key={w}
              className={`h-7 rounded-md border ${
                i === 1
                  ? "border-py-blue/50 bg-py-blue/15"
                  : "border-py-blue-text/10 bg-py-blue-text/[0.05]"
              } ${w}`}
            />
          ))}
        </div>

        {/* Canvas */}
        <div className="flex-1 space-y-3 p-4">
          {/* Hero block, shown mid-drag */}
          <div className="relative rounded-lg border border-dashed border-py-blue/60 bg-py-blue/[0.07] p-4">
            <span className="absolute -top-2 left-3 rounded bg-py-blue px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#02121f]">
              HERO
            </span>
            <div className="flex items-center gap-3">
              <span className="h-10 w-10 shrink-0 rounded-full bg-py-blue-text/20" />
              <div className="flex-1 space-y-1.5">
                <span className="block h-3 w-32 rounded bg-py-blue-text/30" />
                <span className="block h-2 w-48 rounded bg-py-blue-text/15" />
              </div>
            </div>
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="space-y-2 rounded-lg border border-py-blue-text/10 bg-py-card/70 p-3"
              >
                <span
                  className={`block h-10 rounded ${
                    i === 0 ? "bg-py-orange/25" : "bg-py-blue-text/10"
                  }`}
                />
                <span className="block h-2 w-3/4 rounded bg-py-blue-text/20" />
                <span className="block h-2 w-1/2 rounded bg-py-blue-text/10" />
              </div>
            ))}
          </div>

          <div className="space-y-1.5 pt-1">
            <span className="block h-2 w-full rounded bg-py-blue-text/10" />
            <span className="block h-2 w-4/5 rounded bg-py-blue-text/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
