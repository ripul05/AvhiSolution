"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  ImageIcon,
  Radio,
  Boxes,
  Building2,
  MapPinned,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Content                                                           */
/* ------------------------------------------------------------------ */

const sectors = [
  "Offices",
  "Hotels",
  "Hospitals",
  "Airports",
  "Malls",
  "Industrial spaces",
];

const pillars = [
  {
    title: "Premium quality",
    description:
      "Durable, carefully finished washroom products that feel refined in every setting.",
  },
  {
    title: "Smart automation",
    description:
      "Touch-free technology reduces contact, improves usability, and supports cleaner commercial environments.",
  },
  {
    title: "Reliable support",
    description:
      "Solutions designed for long-term service, easy maintenance, and dependable performance.",
  },
];

const timeline = [
  {
    year: "2022",
    tag: "Foundation",
    title: "AVHI Solutions starts",
    description:
      "AVHI begins with a narrow thesis: commercial hygiene hardware should feel as precise and considered as the buildings it goes into. The first sensor fittings ship to early clients in offices and hospitality.",
    icon: Sparkles,
    image: "/timeLine/TimeLine2022.webp",
  },
  {
    year: "2023",
    tag: "Range expansion",
    title: "A complete sensor ecosystem",
    description:
      "The catalogue grows from individual fittings into a full ecosystem — sensor taps, flush valves, soap and sanitiser dispensers, and hand dryers — engineered to work together across a single washroom.",
    icon: Boxes,
    image: "/timeLine/TimeLine2023-1.webp", // or TimeLine2023-2.webp
  },
  {
    year: "2024",
    tag: "Commercial integration",
    title: "From supply to full installation",
    description:
      "AVHI moves beyond supplying components to delivering integrated restroom systems — specified, installed, and serviced end to end for hospitality, healthcare, and public-facing buildings.",
    icon: Building2,
    image: "/timeLine/TimeLine2024.webp",
  },
  {
    year: "2025",
    tag: "National footprint",
    title: "Pan-India growth",
    description:
      "Partnerships and service coverage extend across more cities, bringing AVHI systems to a wider range of commercial and industrial facilities nationwide.",
    icon: MapPinned,
    image: "/timeLine/TimeLine2025.webp",
  },
  {
    year: "Next",
    tag: "The Journey Continues",
    title: "Always moving forward",
    description:
      "Our story doesn't end here. AVHI Solutions continues to innovate, expand into new markets, and develop next-generation washroom automation solutions that redefine hygiene, reliability, and user experience.",
    icon: Radio,
    image: "/timeLine/TimeLine2026Beyond.webp",
  },
];

/* ------------------------------------------------------------------ */
/*  Scroll reveal (no external deps)                                  */
/* ------------------------------------------------------------------ */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Image placeholder — swap for next/image once real photos exist   */
/* ------------------------------------------------------------------ */

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-dark/10 bg-[#F7F8FB]"
      style={{
        backgroundImage:
          "radial-gradient(rgba(11,13,16,0.10) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
        <ImageIcon className="h-6 w-6 text-dark/25" strokeWidth={1.5} />
        <p className="max-w-[14rem] text-[0.7rem] font-medium uppercase tracking-[0.14em] text-dark/35">
          {label}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Timeline row                                                      */
/* ------------------------------------------------------------------ */

function TimelineRow({
  item,
  index,
}: {
  item: (typeof timeline)[number];
  index: number;
}) {
  const reversed = index % 2 === 1;
  const Icon = item.icon;

  return (
    <div className="relative">
      {/* Timeline node */}
      <div className="absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 md:block">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-dark/15 bg-white shadow-sm">
          <Icon className="h-4 w-4 text-blue" strokeWidth={1.75} />
        </div>
      </div>

      <div className="grid items-center gap-8 border-t border-dark/10 py-10 sm:py-14 md:grid-cols-2 md:gap-24 md:py-24">
        {/* Image */}
        <div className={reversed ? "md:order-2" : ""}>
          <Reveal delay={80}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-dark/10 bg-[#f7f8fb] shadow-[0_16px_50px_rgba(11,11,11,0.08)]">
              <Image
                src={item.image}
                alt={`${item.year} - ${item.title}`}
                fill
                className="object-contain p-3 transition-transform duration-500 sm:p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>
          </Reveal>
        </div>

        {/* Content */}
        <div className={reversed ? "md:order-1 md:text-right" : ""}>
          <Reveal delay={160}>
            <div
              className={`flex items-center gap-3 md:hidden ${
                reversed ? "justify-end" : ""
              }`}
            >
              <Icon className="h-4 w-4 text-blue" strokeWidth={1.75} />
            </div>

            <p className="font-display text-6xl font-semibold leading-none tracking-[-0.04em] text-dark/12 sm:text-7xl">
              {item.year}
            </p>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue">
              {item.tag}
            </p>

            <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[-0.04em] text-dark sm:text-3xl">
              {item.title}
            </h3>

            <p className="mt-4 max-w-md text-[0.95rem] leading-7 text-dark/60 md:ml-auto">
              {item.description}
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-dark">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-dark/10 px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pt-44">
        <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue">
              About AVHI Solutions — Since 2022
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.8rem,5.4vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
              Washroom automation, engineered with the same precision as the
              spaces it serves.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-dark/60">
              AVHI Solutions designs sensor-based washroom systems for
              commercial buildings — combining touch-free hardware, premium
              finishing, and dependable engineering.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/products">
                  Explore product categories
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/">Back to home</Link>
              </Button>
            </div>
          </Reveal>

          {/* signal graphic — signature motif, echoed again in the timeline spine */}
          <Reveal
            delay={120}
            className="relative flex items-center justify-center"
          >
            <div className="relative aspect-[4/3] w-full max-w-[620px] overflow-hidden rounded-[2rem] border border-dark/10 shadow-[0_40px_120px_rgba(0,0,0,0.12)]">
              <Image
                src="/about/AboutHeroImage.webp"
                alt="AVHI Solutions showroom"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>

        {/* sectors served — factual, not decorative */}
        <Reveal delay={200} className="mx-auto mt-16 max-w-[92rem]">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-dark/10 pt-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-dark/40">
              Where AVHI systems run
            </span>
            {sectors.map((sector) => (
              <span key={sector} className="text-sm text-dark/55">
                {sector}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Pillars */}
      <section className="border-b border-dark/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[92rem]">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue">
              What guides the work
            </p>
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 100}>
                <div className="border-t border-dark/15 pt-6">
                  <h3 className="font-display text-xl font-semibold tracking-[-0.03em]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-dark/55">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-5 py-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[92rem]">
          <Reveal className="pt-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue">
              Timeline
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,3.6vw,2.8rem)] font-semibold leading-[1] tracking-[-0.05em]">
              Four years, one focus.
            </h2>
          </Reveal>

          <div className="mt-4">
            {timeline.map((item, i) => (
              <TimelineRow key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-dark/10 px-5 py-20 sm:px-8 lg:px-12">
        <Reveal className="mx-auto flex max-w-[92rem] flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2 className="max-w-xl font-display text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.05em]">
            Ready to see the current range?
          </h2>
          <Button asChild size="lg">
            <Link href="/products">
              Explore product categories
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </section>
    </main>
  );
}