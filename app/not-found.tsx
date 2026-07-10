import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-dark">
      <SiteHeader />
      <section className="flex min-h-screen items-center justify-center px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl rounded-[2.4rem] border border-black/8 bg-[linear-gradient(135deg,#FFFFFF,#F7F8FB)] p-10 text-center shadow-[0_24px_100px_rgba(11,11,11,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue">
            Page not found
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,5vw,3.8rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
            The page you’re looking for could not be found.
          </h1>
          <p className="mt-6 text-lg leading-8 text-dark/62">
            It may have moved, or the link you followed is no longer valid.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg">
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
