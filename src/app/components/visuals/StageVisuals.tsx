import React from "react";
import BuilderMock from "./BuilderMock";

/* ---------------------------------------------------------------------------
   One decorative panel per stage of the FlowDemo. All CSS, no assets, all
   aria-hidden — they illustrate the copy beside them rather than carrying
   information of their own.
--------------------------------------------------------------------------- */

const frame =
  "overflow-hidden rounded-xl border border-py-blue-text/12 bg-py-surface/80 " +
  "shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-sm";

function Bar({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-py-blue-text/10 bg-py-raised/70 px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-py-orange/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-py-blue-text/25" />
      <span className="h-2.5 w-2.5 rounded-full bg-py-blue-text/25" />
      <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.16em] text-py-subtle">
        {title}
      </span>
      {action ? (
        <span className="ml-auto rounded-md bg-py-orange px-2 py-1 font-mono text-[9px] font-bold text-[#1a0d02]">
          {action}
        </span>
      ) : null}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-py-subtle">
        {label}
      </span>
      <span className="block rounded-md border border-py-blue-text/12 bg-py-blue-text/[0.04] px-2.5 py-2 text-xs text-py-text">
        {value}
      </span>
    </label>
  );
}

/* -- 01 Create ---------------------------------------------------------- */

export function CreateStage() {
  return (
    <div aria-hidden className={frame}>
      <Bar title="New project" action="Create" />
      <div className="space-y-4 p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Project name" value="ada-lovelace" />
          <Field label="Author" value="Ada Lovelace" />
        </div>

        <div>
          <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.14em] text-py-subtle">
            Site type
          </span>
          <div className="flex flex-wrap gap-2">
            {["Portfolio", "Résumé", "Sandbox", "Landing"].map((t, i) => (
              <span
                key={t}
                className={`rounded-full border px-2.5 py-1 text-[11px] ${
                  i === 0
                    ? "border-py-blue/50 bg-py-blue/15 text-white"
                    : "border-py-blue-text/12 bg-py-blue-text/[0.04] text-py-muted"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.14em] text-py-subtle">
              Favicon pack
            </span>
            <div className="flex items-end gap-2">
              {[
                "h-9 w-9",
                "h-7 w-7",
                "h-5 w-5",
                "h-4 w-4",
              ].map((s) => (
                <span
                  key={s}
                  className={`${s} rounded bg-py-blue-text/20 ring-1 ring-py-blue-text/15`}
                />
              ))}
            </div>
          </div>
          <div>
            <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.14em] text-py-subtle">
              Theme
            </span>
            <div className="flex gap-1.5">
              {[
                "bg-py-blue",
                "bg-py-orange",
                "bg-py-blue-text/40",
                "bg-py-card",
                "bg-white/80",
              ].map((c) => (
                <span
                  key={c}
                  className={`h-6 w-6 rounded-full ${c} ring-1 ring-py-blue-text/15`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-md border border-py-blue-text/10 bg-py-blue-text/[0.03] p-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-py-subtle">
            Metadata
          </span>
          <div className="mt-2 space-y-1.5">
            {[
              "og:title · og:image · twitter:card",
              "robots: index, follow",
              "security contact: ada@example.com",
            ].map((l) => (
              <span
                key={l}
                className="block font-mono text-[10px] text-py-blue-text/70"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -- 02 Pages ----------------------------------------------------------- */

export function PagesStage() {
  const pages = [
    { name: "Home", route: "/", active: true },
    { name: "Projects", route: "/projects", active: false },
    { name: "About", route: "/about", active: false },
    { name: "Contact", route: "/contact", active: false },
  ];
  return (
    <div aria-hidden className={frame}>
      <Bar title="Pages" action="+ Add page" />
      <div className="space-y-2 p-4">
        {pages.map((p) => (
          <div
            key={p.route}
            className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
              p.active
                ? "border-py-blue/45 bg-py-blue/10"
                : "border-py-blue-text/10 bg-py-blue-text/[0.03]"
            }`}
          >
            {/* drag handle */}
            <span className="grid shrink-0 grid-cols-2 gap-[3px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="h-[3px] w-[3px] rounded-full bg-py-subtle"
                />
              ))}
            </span>
            <span className="text-xs font-medium text-white">{p.name}</span>
            <span className="font-mono text-[10px] text-py-subtle">
              {p.route}
            </span>
            <span className="ml-auto flex gap-1.5">
              {["D", "T", "M"].map((b) => (
                <span
                  key={b}
                  className="inline-flex h-5 w-5 items-center justify-center rounded border border-py-blue-text/12 bg-py-blue-text/[0.05] font-mono text-[8px] text-py-muted"
                >
                  {b}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -- 03 Compose --------------------------------------------------------- */

export function ComposeStage() {
  return <BuilderMock />;
}

/* -- 04 Edit ------------------------------------------------------------ */

export function EditStage() {
  return (
    <div aria-hidden className={frame}>
      <Bar title="Text widget" />
      {/* Tabs */}
      <div className="flex gap-1 border-b border-py-blue-text/10 px-3 pt-3">
        {["Settings", "JSON", "Code"].map((t, i) => (
          <span
            key={t}
            className={`rounded-t-md px-3 py-1.5 text-[11px] font-medium ${
              i === 2
                ? "border-b-2 border-py-orange bg-py-blue-text/[0.05] text-white"
                : "text-py-muted"
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Code view */}
      <div className="p-4">
        <pre className="overflow-hidden rounded-lg border border-py-blue-text/10 bg-py-bg/80 p-3 font-mono text-[10.5px] leading-relaxed">
          <code>
            <span className="text-py-subtle">1 </span>
            <span className="text-py-blue-text">.w-hero-title</span>
            <span className="text-py-muted"> {"{"}</span>
            {"\n"}
            <span className="text-py-subtle">2 </span>
            <span className="text-py-muted">{"  "}</span>
            <span className="text-py-orange-text">font-size</span>
            <span className="text-py-muted">: </span>
            <span className="text-white">clamp(2rem, 5vw, 3.5rem)</span>
            <span className="text-py-muted">;</span>
            {"\n"}
            <span className="text-py-subtle">3 </span>
            <span className="text-py-muted">{"  "}</span>
            <span className="text-py-orange-text">letter-spacing</span>
            <span className="text-py-muted">: </span>
            <span className="text-white">-0.02em</span>
            <span className="text-py-muted">;</span>
            {"\n"}
            <span className="text-py-subtle">4 </span>
            <span className="text-py-muted">{"  "}</span>
            <span className="text-py-orange-text">color</span>
            <span className="text-py-muted">: </span>
            <span className="text-white">var(--theme-text)</span>
            <span className="text-py-muted">;</span>
            {"\n"}
            <span className="text-py-subtle">5 </span>
            <span className="text-py-muted">{"}"}</span>
          </code>
        </pre>

        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-md bg-py-orange px-2.5 py-1.5 font-mono text-[9px] font-bold text-[#1a0d02]">
            EJECT WIDGET
          </span>
          <span className="rounded-md border border-py-blue-text/12 bg-py-blue-text/[0.05] px-2.5 py-1.5 font-mono text-[9px] text-py-muted">
            REVERT
          </span>
          <span className="ml-auto font-mono text-[9px] text-py-subtle">
            target: html · css
          </span>
        </div>
      </div>
    </div>
  );
}

/* -- 05 Deploy ---------------------------------------------------------- */

export function DeployStage() {
  const options = [
    { label: "Download .zip", meta: "Free · no account", on: true },
    { label: "GitHub Pages", meta: "your repo", on: false },
    { label: "Vercel / Netlify", meta: "your account", on: false },
    { label: "ada.portfoliyou.dev", meta: "one site free", on: false },
  ];
  return (
    <div aria-hidden className={frame}>
      <Bar title="Deploy" action="Build" />
      <div className="space-y-2.5 p-4">
        {options.map((o) => (
          <div
            key={o.label}
            className={`flex items-center gap-3 rounded-lg border px-3 py-3 ${
              o.on
                ? "border-py-orange/45 bg-py-orange/[0.08]"
                : "border-py-blue-text/10 bg-py-blue-text/[0.03]"
            }`}
          >
            <span
              className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                o.on ? "border-py-orange" : "border-py-blue-text/25"
              }`}
            >
              {o.on ? (
                <span className="h-1.5 w-1.5 rounded-full bg-py-orange" />
              ) : null}
            </span>
            <span className="text-xs font-medium text-white">{o.label}</span>
            <span className="ml-auto font-mono text-[10px] text-py-subtle">
              {o.meta}
            </span>
          </div>
        ))}

        {/* Build log */}
        <div className="mt-3 space-y-1 rounded-lg border border-py-blue-text/10 bg-py-bg/80 p-3 font-mono text-[10px]">
          {[
            ["✓", "compiled 4 pages"],
            ["✓", "12 widgets emitted"],
            ["✓", "assets optimised · 340 kB"],
          ].map(([mark, line]) => (
            <div key={line} className="flex gap-2">
              <span className="text-py-orange-text">{mark}</span>
              <span className="text-py-muted">{line}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const stageVisuals = {
  create: CreateStage,
  pages: PagesStage,
  compose: ComposeStage,
  edit: EditStage,
  deploy: DeployStage,
} as const;
