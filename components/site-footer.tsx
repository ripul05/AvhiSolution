import Link from "next/link";
import { Droplets } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-[#f7f8fb] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[92rem] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
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

        <div className="flex flex-col gap-4 text-sm text-dark/60 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex flex-wrap gap-4">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-dark">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-sm text-dark/45">© {new Date().getFullYear()} AVHI Solutions</p>
        </div>
      </div>
    </footer>
  );
}
