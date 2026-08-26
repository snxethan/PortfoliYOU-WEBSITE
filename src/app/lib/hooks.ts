"use client";

import { useSyncExternalStore } from "react";

/* ---------------------------------------------------------------------------
   Client-only reads, done the way React wants them.

   The obvious version of each of these is `useState(false)` plus an effect that
   immediately calls setState — which is what `react-hooks/set-state-in-effect`
   (new in eslint-plugin-react-hooks 7) correctly rejects: it renders once with
   a placeholder value, then re-renders straight away.

   useSyncExternalStore does the same job in one render, and takes an explicit
   server snapshot so hydration stays honest.
--------------------------------------------------------------------------- */

/** Stable no-op subscribe for values that never change after mount. */
const neverChanges = () => () => {};

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/**
 * False during SSR and the first client render, true afterwards. Use to gate
 * anything that touches `document` — a portal target, for instance.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    neverChanges,
    () => true,
    () => false,
  );
}

/** Whether the window is scrolled past `px`. False on the server. */
export function useScrolledPast(px: number): boolean {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > px,
    () => false,
  );
}

/**
 * Reads a sessionStorage key once on the client.
 *
 * Returns `true` on the server so anything gated on it stays hidden until the
 * real value is known — no flash of a banner the visitor already dismissed.
 * Storage is only written by this app, so no subscription is needed; callers
 * pair this with local state for the dismiss action itself.
 */
export function useSessionFlag(key: string, expected: string): boolean {
  return useSyncExternalStore(
    neverChanges,
    () => {
      try {
        return sessionStorage.getItem(key) === expected;
      } catch {
        return false;
      }
    },
    () => true,
  );
}
