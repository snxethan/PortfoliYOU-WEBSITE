"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Loader2 } from "lucide-react";

interface TooltipWrapperProps {
  label: string;
  children: ReactNode;
  /** When this is a PDF, hovering shows an inline preview instead of a label. */
  url?: string;
  fullWidth?: boolean;
}

const TooltipWrapper = ({
  label,
  children,
  url,
  fullWidth = false,
}: TooltipWrapperProps) => {
  const [visible, setVisible] = useState(false);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHovering = useRef(false);

  const isPdf = useMemo(() => url?.toLowerCase().endsWith(".pdf") ?? false, [url]);

  const open = useCallback(() => {
    setVisible(true);
    if (isPdf) {
      setThumbnailLoading(true);
      setThumbnailError(false);
    }
  }, [isPdf]);

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true;
    timeoutRef.current = setTimeout(() => {
      if (isHovering.current) open();
    }, 400);
  }, [open]);

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
    setThumbnailLoading(false);
  }, []);

  // Clean up a pending open timer if the component unmounts mid-hover.
  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  return (
    <div
      className={`relative ${fullWidth ? "w-full" : "inline-block"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={open}
      onBlurCapture={handleMouseLeave}
    >
      {children}

      {visible &&
        (isPdf ? (
          <div
            role="tooltip"
            aria-label={label}
            className="animate-elastic-in fixed left-1/2 top-1/2 z-50 w-[240px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-py-blue-text/12 bg-py-card p-2.5 shadow-2xl"
          >
            <div className="mb-2 text-center text-xs font-medium text-white">
              {label}
            </div>
            <div className="relative h-[280px] w-full overflow-hidden rounded-lg bg-py-base">
              {thumbnailLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2
                    aria-hidden
                    className="h-5 w-5 animate-spin text-py-subtle"
                  />
                </div>
              )}

              {thumbnailError ? (
                <div className="absolute inset-0 flex items-center justify-center p-3 text-center text-xs text-py-subtle">
                  Unable to generate a preview
                </div>
              ) : (
                <embed
                  src={url}
                  type="application/pdf"
                  className="h-full min-h-[280px] w-full"
                  onLoad={() => setThumbnailLoading(false)}
                  onError={() => {
                    setThumbnailLoading(false);
                    setThumbnailError(true);
                  }}
                />
              )}

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/85 to-transparent px-2.5 py-2 text-[11px] text-white">
                <span className="truncate">PDF document</span>
                <span className="text-py-subtle">Preview</span>
              </div>
            </div>
          </div>
        ) : (
          <div
            role="tooltip"
            className="animate-fade-in pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-py-blue-text/12 bg-py-card px-2.5 py-1.5 text-xs font-medium text-white shadow-xl"
          >
            {label}
            <span
              aria-hidden
              className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-py-blue-text/12 bg-py-card"
            />
          </div>
        ))}
    </div>
  );
};

export default TooltipWrapper;
