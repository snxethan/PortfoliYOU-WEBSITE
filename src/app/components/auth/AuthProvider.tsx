"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/* ---------------------------------------------------------------------------
   Auth scaffold.

   The builder itself already authenticates against Firebase, so the site is
   wired to the same shape rather than inventing a second identity model. What
   lives here is the transport-agnostic contract plus the UI state around it.

   Until `NEXT_PUBLIC_AUTH_ENABLED` is set to "true" and a real adapter is
   installed, every credential call fails with `AuthUnavailableError` and the
   sign-in screens fall back to the early-access waitlist. That keeps the
   screens honest instead of pretending to log people in.

   To switch on real auth:
     1. add the Firebase web SDK + config to this project,
     2. implement `AuthAdapter` against `firebase/auth`,
     3. pass it as `<AuthProvider adapter={firebaseAdapter}>` in layout.tsx,
     4. set NEXT_PUBLIC_AUTH_ENABLED=true.
--------------------------------------------------------------------------- */

export interface AuthUser {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

export type OAuthProvider = "google" | "github";

export interface AuthAdapter {
  /** Resolves the persisted session on boot, or null when signed out. */
  restore(): Promise<AuthUser | null>;
  signIn(email: string, password: string): Promise<AuthUser>;
  signUp(email: string, password: string, displayName: string): Promise<AuthUser>;
  signInWithProvider(provider: OAuthProvider): Promise<AuthUser>;
  signOut(): Promise<void>;
}

export class AuthUnavailableError extends Error {
  constructor() {
    super(
      "Accounts are not open yet. Join the early-access list and you will be emailed as soon as sign-in goes live.",
    );
    this.name = "AuthUnavailableError";
  }
}

/** Placeholder adapter used while accounts are closed. */
const unavailableAdapter: AuthAdapter = {
  async restore() {
    return null;
  },
  async signIn() {
    throw new AuthUnavailableError();
  },
  async signUp() {
    throw new AuthUnavailableError();
  },
  async signInWithProvider() {
    throw new AuthUnavailableError();
  },
  async signOut() {
    /* no session to clear */
  },
};

export const AUTH_ENABLED = process.env.NEXT_PUBLIC_AUTH_ENABLED === "true";

interface AuthContextValue {
  user: AuthUser | null;
  /** True until the initial session restore settles. */
  loading: boolean;
  /** False while accounts are closed — screens render a waitlist instead. */
  enabled: boolean;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signUp: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<AuthUser>;
  signInWithProvider: (provider: OAuthProvider) => Promise<AuthUser>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({
  children,
  adapter = unavailableAdapter,
}: {
  children: React.ReactNode;
  adapter?: AuthAdapter;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    adapter
      .restore()
      .then((restored) => {
        if (!cancelled) setUser(restored);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [adapter]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const next = await adapter.signIn(email, password);
      setUser(next);
      return next;
    },
    [adapter],
  );

  const signUp = useCallback(
    async (email: string, password: string, displayName: string) => {
      const next = await adapter.signUp(email, password, displayName);
      setUser(next);
      return next;
    },
    [adapter],
  );

  const signInWithProvider = useCallback(
    async (provider: OAuthProvider) => {
      const next = await adapter.signInWithProvider(provider);
      setUser(next);
      return next;
    },
    [adapter],
  );

  const signOut = useCallback(async () => {
    await adapter.signOut();
    setUser(null);
  }, [adapter]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      enabled: AUTH_ENABLED,
      signIn,
      signUp,
      signInWithProvider,
      signOut,
    }),
    [user, loading, signIn, signUp, signInWithProvider, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
