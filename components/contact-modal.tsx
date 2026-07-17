"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!open) return null;

  function resetAndClose() {
    setName("");
    setEmail("");
    setMessage("");
    setStatus("idle");
    setErrorMessage("");
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(
          data.error || "Unable to send your message. Please try again."
        );
        return;
      }

      setStatus("success");

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please check your connection and try again."
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={status === "submitting" ? undefined : resetAndClose}
      />

      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-black/10 bg-white p-6 shadow-[0_30px_120px_rgba(11,11,11,0.24)]">

        {/* Header */}

        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-2xl font-semibold">
            Contact AVHI Solutions
          </h3>

          <button
            aria-label="Close"
            onClick={resetAndClose}
            disabled={status === "submitting"}
            className="rounded-full p-2 text-dark/60 transition hover:bg-black/5 disabled:opacity-40"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center py-8 text-center">

            <CheckCircle2
              className="mb-4 h-14 w-14 text-emerald-600"
              strokeWidth={1.5}
            />

            <h4 className="mb-2 text-xl font-semibold">
              Message Sent Successfully
            </h4>

            <p className="mb-6 max-w-sm text-sm leading-6 text-dark/60">
              Thank you, <strong>{name || "there"}</strong>.
              <br />
              We've received your enquiry and someone from our team will get
              back to you shortly.
            </p>

            <Button onClick={resetAndClose}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium text-dark/70">
                Name
              </label>

              <input
                required
                disabled={status === "submitting"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border border-black/10 px-4 py-3 outline-none transition focus:border-black/30 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-dark/70">
                Email
              </label>

              <input
                required
                type="email"
                disabled={status === "submitting"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-black/10 px-4 py-3 outline-none transition focus:border-black/30 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-dark/70">
                Message
              </label>

              <textarea
                required
                disabled={status === "submitting"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help?"
                className="min-h-[140px] w-full rounded-lg border border-black/10 px-4 py-3 outline-none transition focus:border-black/30 disabled:opacity-60"
              />
            </div>

            {status === "error" && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {errorMessage}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">

              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={resetAndClose}
                disabled={status === "submitting"}
              >
                Cancel
              </Button>

            </div>
          </form>
        )}
      </div>
    </div>
  );
}