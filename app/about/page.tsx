import { ArrowUpRight, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";

const pillars = [
  {
    title: "Premium quality",
    description:
      "We focus on durable, carefully finished washroom products that feel refined in every setting.",
  },
  {
    title: "Smart automation",
    description:
      "Touch-free technology reduces contact, improves usability, and supports cleaner commercial environments.",
  },
  {
    title: "Reliable support",
    description:
      "Our solutions are designed for long-term service, easy maintenance, and dependable performance.",
  },
];

const journey = [
  {
    title: "Focused beginnings",
    description:
      "AVHI Solutions started with a clear goal: make commercial washrooms smarter, cleaner, and easier to maintain.",
  },
  {
    title: "Broader reach",
    description:
      "Our portfolio expanded into a full ecosystem of premium automation, hygiene, and support products for modern facilities.",
  },
  {
    title: "Trusted by business",
    description:
      "Today, AVHI serves offices, hotels, hospitals, airports, malls, and industrial spaces with dependable solutions.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-dark">
      <SiteHeader />

      <section className="px-5 pb-24 pt-32 sm:px-8 lg:px-12 lg:pt-40">
        <div className="mx-auto max-w-[92rem] rounded-[2.5rem] border border-black/8 bg-[linear-gradient(135deg,#FFFFFF_0%,#F7F8FB_100%)] p-8 shadow-[0_24px_100px_rgba(11,11,11,0.08)] sm:p-12 lg:p-16">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-blue">
              About AVHI Solutions
            </p>
            <h1 className="font-display text-[clamp(3.2rem,6vw,5rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
              Delivering premium washroom automation with clarity and confidence.
            </h1>
            <p className="mt-8 text-lg leading-8 text-dark/62 sm:text-xl">
              AVHI Solutions is focused on modern commercial washroom experiences,
              combining sensor-based automation, premium hygiene systems, and
              dependable engineering for offices, hotels, hospitals, airports,
              malls, and industrial spaces.
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
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-[92rem] gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-black/8 bg-white p-8 shadow-[0_18px_70px_rgba(11,11,11,0.06)]">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-dark text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.06em]">
              Built around modern hygiene expectations
            </h2>
            <p className="mt-5 text-lg leading-8 text-dark/62">
              Every product is selected with one goal in mind: create washroom
              environments that are easier to use, cleaner to maintain, and
              better suited to high-traffic commercial needs.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-[2rem] border border-black/8 bg-[linear-gradient(145deg,#FFFFFF,#F4F6FA)] p-6 shadow-[0_16px_60px_rgba(11,11,11,0.05)]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue/10 text-blue">
                  {pillar.title === "Premium quality" ? (
                    <ShieldCheck className="h-5 w-5" />
                  ) : pillar.title === "Reliable support" ? (
                    <Wrench className="h-5 w-5" />
                  ) : (
                    <Sparkles className="h-5 w-5" />
                  )}
                </div>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.05em]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-dark/62">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-[92rem] rounded-[2rem] border border-black/8 bg-[linear-gradient(145deg,#F7F8FB,#FFFFFF)] p-8 shadow-[0_18px_70px_rgba(11,11,11,0.05)] sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue">
            Our journey
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,4.6vw,3.2rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
            From focused beginnings to trusted commercial support.
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {journey.map((item) => (
              <div key={item.title} className="rounded-[1.6rem] border border-black/8 bg-white/80 p-6">
                <h3 className="font-display text-2xl font-semibold tracking-[-0.05em] text-dark">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-dark/62">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
