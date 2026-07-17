"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Droplets, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import ContactModal from "./contact-modal";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const openedKey = "avhi-contact-modal-opened";
    if (sessionStorage.getItem(openedKey) === "true") return;

    timerRef.current = window.setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(openedKey, "true");
    }, 10000);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-4 py-3 sm:px-8 sm:py-5 lg:px-12">
      <nav className="mx-auto flex max-w-[92rem] items-center justify-between rounded-full border border-black/8 bg-white/72 px-4 py-3 shadow-[0_18px_60px_rgba(11,11,11,0.08)] backdrop-blur-2xl">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-dark text-white">
            <Droplets className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-semibold tracking-[-0.04em]">
            AVHI Solutions
          </span>
        </Link>

        <div className="md:hidden">
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-dark/80 hover:bg-black/5"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-3 py-2 transition-all duration-200 ${
                  isActive
                    ? "bg-dark text-white shadow-sm"
                    : "text-dark/58 hover:bg-dark hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/products">View range</Link>
          </Button>

          <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
            Contact
          </Button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 bg-white border-t border-black/8 shadow-lg md:hidden">
          <div className="mx-auto max-w-[92rem] px-4 py-4">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-dark/80 hover:bg-dark hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
