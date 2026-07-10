"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Droplets } from "lucide-react";

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
    <header className="fixed left-0 right-0 top-0 z-40 px-5 py-5 sm:px-8 lg:px-12">
      <nav className="mx-auto flex max-w-[92rem] items-center justify-between rounded-full border border-black/8 bg-white/72 px-4 py-3 shadow-[0_18px_60px_rgba(11,11,11,0.08)] backdrop-blur-2xl">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-dark text-white">
            <Droplets className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-semibold tracking-[-0.04em]">
            AVHI Solutions
          </span>
        </Link>

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
                className={`transition-colors hover:text-dark ${
                  isActive ? "text-dark font-semibold" : "text-dark/58"
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

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
