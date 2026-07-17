"use client";

import { useState } from "react";
import Link from "next/link";
import { Droplets, Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";
import ContactModal from "@/components/contact-modal";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
];

const contactDetails = [
  { icon: Mail, label: "avhisolutionsindia@gmail.com", href: "mailto:avhisolutionsindia@gmail.com" },
  { icon: Phone, label: "+91 99993 73885", href: "tel:+919999373885" },
  { icon: MapPin, label: "New Delhi, India", href: undefined },
];

export function SiteFooter() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-black/10 bg-[#f7f8fb] px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[92rem]">

          {/* Top row: brand + CTA */}
          <div className="flex flex-col gap-8 border-b border-black/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-dark text-white">
                  <Droplets className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-display text-xl font-semibold tracking-[-0.04em] text-dark">
                    AVHI Solutions
                  </p>
                  <p className="text-sm text-dark/55">
                    Commercial washroom automation, sensor systems, and premium hygiene solutions.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <p className="text-sm text-dark/60">
                Have a project in mind for your facility?
              </p>
              <button
                onClick={() => setContactOpen(true)}
                className="inline-flex items-center justify-center rounded-full bg-dark px-6 py-3 text-sm font-medium text-white transition hover:bg-dark/85"
              >
                Get in Touch
              </button>
            </div>
          </div>

          {/* Middle row: links + contact details */}
          <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-3">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-dark/40">
                Navigate
              </p>
              <ul className="flex flex-col gap-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-dark/65 transition-colors hover:text-dark"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-dark/40">
                Contact
              </p>
              <ul className="flex flex-col gap-3">
                {contactDetails.map(({ icon: Icon, label, href }) => (
                  <li key={label} className="flex items-center gap-2 text-sm text-dark/65">
                    <Icon className="h-4 w-4 text-dark/40" />
                    {href ? (
                      <a href={href} className="transition-colors hover:text-dark">
                        {label}
                      </a>
                    ) : (
                      <span>{label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-dark/40">
                Follow
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="grid h-9 w-9 place-items-center rounded-full border border-black/10 text-dark/60 transition hover:border-black/20 hover:text-dark"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="grid h-9 w-9 place-items-center rounded-full border border-black/10 text-dark/60 transition hover:border-black/20 hover:text-dark"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col gap-2 border-t border-black/10 pt-6 text-sm text-dark/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} AVHI Solutions. All rights reserved.</p>
            <p>Built for cleaner, smarter washrooms.</p>
          </div>
        </div>
      </footer>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}