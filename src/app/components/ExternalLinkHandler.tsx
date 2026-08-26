"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ExternalLink, X } from "lucide-react";
import { Button, Eyebrow } from "./ui";

interface ExternalLinkContextType {
  showWarning: boolean;
  targetUrl: string;
  isProfessional: boolean;
  handleExternalClick: (url: string, isProfessional?: boolean) => void;
  closeWarning: () => void;
}

const ExternalLinkContext = createContext<ExternalLinkContextType | undefined>(
  undefined,
);

/** Best-effort hostname for display; falls back to the raw string. */
function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export const ExternalLinkHandler = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [targetUrl, setTargetUrl] = useState("");
  const [isProfessional, setIsProfessional] = useState(false);

  const handleExternalClick = useCallback(
    (url: string, professional = false) => {
      setTargetUrl(url);
      setIsProfessional(professional);
      setClosing(false);
      setIsVisible(true);
    },
    [],
  );

  const closeWarning = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setIsVisible(false);
      setTargetUrl("");
      setIsProfessional(false);
    }, 180);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    document.body.classList.add("overflow-hidden");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeWarning();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKey);
    };
  }, [isVisible, closeWarning]);

  const value = useMemo(
    () => ({
      showWarning: isVisible,
      targetUrl,
      isProfessional,
      handleExternalClick,
      closeWarning,
    }),
    [isVisible, targetUrl, isProfessional, handleExternalClick, closeWarning],
  );

  return (
    <ExternalLinkContext.Provider value={value}>
      {children}

      {isVisible && (
        <div
          className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeWarning();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="external-link-title"
            className={`relative w-full max-w-md rounded-2xl border border-py-blue-text/12 bg-py-card p-6 shadow-2xl ${
              closing ? "animate-elastic-out" : "animate-elastic-in"
            }`}
          >
            <button
              type="button"
              onClick={closeWarning}
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-lg text-py-subtle transition-colors hover:bg-py-blue-text/10 hover:text-white"
            >
              <X size={16} />
            </button>

            <Eyebrow>Leaving Portfoli-YOU</Eyebrow>
            <h2
              id="external-link-title"
              className="mt-3 text-xl font-bold tracking-tight text-white"
            >
              You&apos;re about to visit an external site
            </h2>

            <div className="mt-4 flex items-center gap-2.5 rounded-lg border border-py-blue-text/10 bg-py-blue-text/[0.05] px-3.5 py-3">
              <ExternalLink
                aria-hidden
                size={15}
                className="shrink-0 text-py-blue-text"
              />
              <span className="min-w-0 flex-1 truncate font-mono text-sm text-py-text">
                {hostOf(targetUrl)}
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-py-muted">
              {isProfessional
                ? "This is a third-party platform hosting Portfoli-YOU content. Its terms, privacy policy and availability are outside our control."
                : "This destination is not operated by Portfoli-YOU. Its content, terms and privacy policy are outside our control."}
            </p>

            <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={closeWarning}
              >
                Stay here
              </Button>
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeWarning}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-py-orange px-5 text-sm font-semibold text-[#1a0d02] shadow-[0_1px_0_0_rgba(255,255,255,0.22)_inset] transition-colors hover:bg-py-orange-soft"
              >
                Continue
                <ExternalLink aria-hidden size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </ExternalLinkContext.Provider>
  );
};

export const useExternalLink = () => {
  const context = useContext(ExternalLinkContext);
  if (!context) {
    throw new Error(
      "useExternalLink must be used within an ExternalLinkHandler",
    );
  }
  return context;
};
