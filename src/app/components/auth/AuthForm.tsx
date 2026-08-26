"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Check, Loader2, Lock } from "lucide-react";
import { AuthUnavailableError, useAuth, type OAuthProvider } from "./AuthProvider";
import { Button, Card, Eyebrow } from "../ui";
import { site } from "../../lib/site";

type Mode = "signin" | "signup";

const copy = {
  signin: {
    heading: "Welcome back",
    lead: "Sign in to sync your projects and publish your site.",
    submit: "Sign in",
    swapPrompt: "New here?",
    swapLabel: "Create an account",
    swapHref: "/signup",
  },
  signup: {
    heading: "Create your account",
    lead: "Free to start. Your projects work with or without one.",
    submit: "Create account",
    swapPrompt: "Already have an account?",
    swapLabel: "Sign in",
    swapHref: "/login",
  },
} as const;

const inputClass =
  "h-11 w-full rounded-lg border border-py-blue-text/15 bg-py-blue-text/[0.05] px-3.5 text-sm text-py-text " +
  "placeholder:text-py-subtle transition-colors focus:border-py-blue/50 focus:bg-py-blue-text/[0.08] " +
  "focus:outline-none";

const labelClass = "mb-1.5 block text-xs font-medium text-py-muted";

export default function AuthForm({ mode }: { mode: Mode }) {
  const t = copy[mode];
  const { signIn, signUp, signInWithProvider } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* Accounts are closed during the beta. Rather than faking a login, the first
     credential attempt surfaces the early-access panel with the address the
     visitor already typed. */
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistDone, setWaitlistDone] = useState(false);

  const handleAuthError = (err: unknown) => {
    if (err instanceof AuthUnavailableError) {
      setWaitlistOpen(true);
      return;
    }
    toast.error(
      err instanceof Error ? err.message : "Something went wrong. Try again.",
    );
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (mode === "signin") {
        await signIn(email, password);
      } else {
        await signUp(email, password, name);
      }
      toast.success("Signed in.");
    } catch (err) {
      handleAuthError(err);
    } finally {
      setSubmitting(false);
    }
  };

  const onProvider = async (provider: OAuthProvider) => {
    setSubmitting(true);
    try {
      await signInWithProvider(provider);
      toast.success("Signed in.");
    } catch (err) {
      handleAuthError(err);
    } finally {
      setSubmitting(false);
    }
  };

  const onWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Enter an email address first.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || email.split("@")[0],
          email,
          message: `Early-access request for ${site.name} (from /${
            mode === "signin" ? "login" : "signup"
          }).`,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setWaitlistDone(true);
      } else {
        toast.error(data.message || "Could not add you to the list.");
      }
    } catch {
      toast.error("Network error. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-container flex min-h-[calc(100dvh-var(--nav-h))] items-center justify-center py-14">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="mx-auto mb-5 block h-12 w-12 overflow-hidden rounded-xl bg-white ring-1 ring-py-blue-text/15">
            <Image
              src="/images/icon/portfoliyou.png"
              alt=""
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            {t.heading}
          </h1>
          <p className="mt-2 text-sm text-py-muted">{t.lead}</p>
        </div>

        <Card className="p-6 md:p-7">
          {/* OAuth */}
          <div className="grid gap-2.5 sm:grid-cols-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onProvider("google")}
              disabled={submitting}
            >
              <FaGoogle aria-hidden /> Google
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onProvider("github")}
              disabled={submitting}
            >
              <FaGithub aria-hidden /> GitHub
            </Button>
          </div>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-py-blue-text/12" />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-py-subtle">
              or
            </span>
            <span className="h-px flex-1 bg-py-blue-text/12" />
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {mode === "signup" ? (
              <div>
                <label htmlFor="name" className={labelClass}>
                  Display name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className={inputClass}
                />
              </div>
            ) : null}

            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>
                {mode === "signin" ? (
                  <span className="mb-1.5 text-xs text-py-subtle">
                    Reset coming with launch
                  </span>
                ) : null}
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={
                  mode === "signin" ? "current-password" : "new-password"
                }
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "signup" ? "At least 8 characters" : "••••••••"}
                className={inputClass}
              />
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <Loader2 aria-hidden size={16} className="animate-spin" />
              ) : null}
              {t.submit}
            </Button>
          </form>

          {/* Early-access panel */}
          {waitlistOpen ? (
            <div className="animate-fade-in mt-5 rounded-lg border border-py-orange/30 bg-py-orange/[0.07] p-4">
              {waitlistDone ? (
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-py-orange/15 text-py-orange-text">
                    <Check size={12} aria-hidden />
                  </span>
                  <p className="text-sm leading-relaxed text-py-muted">
                    You are on the list. We will email{" "}
                    <span className="font-medium text-white">{email}</span>{" "}
                    as soon as accounts open.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-py-orange/15 text-py-orange-text">
                      <Lock size={11} aria-hidden />
                    </span>
                    <p className="text-sm leading-relaxed text-py-muted">
                      Accounts are not open yet — Portfoli-YOU is still in
                      development. Add your email and you will be the first to
                      know when sign-in goes live.
                    </p>
                  </div>
                  <form onSubmit={onWaitlist} className="mt-3">
                    <Button
                      type="submit"
                      variant="secondary"
                      size="sm"
                      className="w-full"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <Loader2 aria-hidden size={14} className="animate-spin" />
                      ) : null}
                      Join the early-access list
                    </Button>
                  </form>
                </>
              )}
            </div>
          ) : null}
        </Card>

        <p className="mt-6 text-center text-sm text-py-muted">
          {t.swapPrompt}{" "}
          <Link
            href={t.swapHref}
            className="font-semibold text-py-blue-text underline underline-offset-2"
          >
            {t.swapLabel}
          </Link>
        </p>

        <div className="mt-8 text-center">
          <Eyebrow className="justify-center">No account needed</Eyebrow>
          <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-py-subtle">
            The builder works signed out. An account only adds cloud sync and
            one-click publishing.{" "}
            <Link href="/about" className="underline underline-offset-2">
              Read more
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
