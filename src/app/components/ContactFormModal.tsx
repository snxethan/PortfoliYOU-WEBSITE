"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { Loader2, X } from "lucide-react";
import { Button, Eyebrow } from "./ui";
import { useIsClient } from "../lib/hooks";

interface Props {
  onClose: () => void;
}

const fieldClass =
  "w-full rounded-lg border border-py-blue-text/15 bg-py-blue-text/[0.05] px-3.5 py-2.5 text-sm text-py-text " +
  "placeholder:text-py-subtle transition-colors focus:border-py-blue/50 focus:bg-py-blue-text/[0.08] focus:outline-none";

const labelClass = "mb-1.5 block text-xs font-medium text-py-muted";

/** Sends a message to the developer through /api/contact. */
export default function ContactFormModal({ onClose }: Props) {
  const isClient = useIsClient();
  const [closing, setClosing] = useState(false);
  const [sending, setSending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 180);
  }, [onClose]);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKey);
    };
  }, [close]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        toast.success("Message sent.");
        onClose();
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  // createPortal needs document; useIsClient is false on the server render.
  if (!isClient) return null;

  return createPortal(
    <div
      className="animate-fade-in fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        className={`relative w-full max-w-md rounded-2xl border border-py-blue-text/12 bg-py-card p-6 shadow-2xl ${
          closing ? "animate-elastic-out" : "animate-elastic-in"
        }`}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-lg text-py-subtle transition-colors hover:bg-py-blue-text/10 hover:text-white"
        >
          <X size={16} />
        </button>

        <Eyebrow>Contact</Eyebrow>
        <h2
          id="contact-title"
          className="mt-3 text-xl font-bold tracking-tight text-white"
        >
          Send a message
        </h2>
        <p className="mt-2 text-sm text-py-muted">
          Bug reports, feature requests and security disclosures all land in the
          same inbox.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="contact-name" className={labelClass}>
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              className={fieldClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClass}>
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className={fieldClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClass}>
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              placeholder="What would you like to tell me?"
              className={`${fieldClass} resize-y`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" disabled={sending}>
            {sending ? (
              <Loader2 aria-hidden size={16} className="animate-spin" />
            ) : null}
            Send message
          </Button>
        </form>
      </div>
    </div>,
    document.body,
  );
}
