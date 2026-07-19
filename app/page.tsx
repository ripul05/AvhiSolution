"use client";

import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowUpRight,
  Building2,
  Clock3,
  Factory,
  Gem,
  Hand,
  Hotel,
  Leaf,
  Plane,
  ShieldCheck,
  Sparkles,
  Waves,
  Wrench,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";
import Image from "next/image";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(14px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const environments = [
  { label: "Offices", icon: Building2 },
  { label: "Hotels", icon: Hotel },
  { label: "Hospitals", icon: ShieldCheck },
  { label: "Airports", icon: Plane },
];

const highlights = [
  "Touch-free faucets",
  "Sensor flush systems",
  "Premium dispensers",
  "Commercial hygiene suites",
];

const stats = [
  { label: "Products", value: 50, suffix: "+" },
  { label: "Product Categories", value: 12, suffix: "+" },
  { label: "Commercial Projects", value: 100, suffix: "+" },
  { label: "Customer Satisfaction", value: 100, suffix: "%" },
];

const reasons = [
  {
    icon: Hand,
    title: "Touch Free Technology",
    description:
      "Sensor-led operation reduces contact points and brings a cleaner, more intuitive experience to every restroom.",
  },
  {
    icon: Leaf,
    title: "Energy Efficient",
    description:
      "Smart activation helps control water, power, and consumable usage across high-traffic commercial spaces.",
  },
  {
    icon: Factory,
    title: "Commercial Grade",
    description:
      "Built for offices, hotels, hospitals, malls, airports, and industrial washrooms that work all day.",
  },
  {
    icon: Gem,
    title: "Premium Materials",
    description:
      "Refined finishes, durable surfaces, and clean detailing designed to elevate modern washroom interiors.",
  },
  {
    icon: Clock3,
    title: "Long Service Life",
    description:
      "Reliable components and robust engineering support consistent performance over years of daily use.",
  },
  {
    icon: Wrench,
    title: "Easy Maintenance",
    description:
      "Simple access, practical servicing, and facility-friendly systems keep upkeep smooth and predictable.",
  },
];

const productCategories = [
  {
    name: "Sensor Faucets",
    description:
      "Touch-free faucet systems that bring elegance, durability, and efficient water control to modern spaces.",
    image: "/img/sensorFaucets.webp",
  },
  {
    name: "Urinal Sensors",
    description:
      "Reliable automation solutions designed for cleaner, smarter, and more hygienic commercial washrooms.",
    image: "/img/urinalSensors.webp",
  },
  {
    name: "Automatic Soap Dispensers",
    description:
      "Premium dispensing systems that reduce touchpoints while elevating everyday hand hygiene standards.",
    image: "/img/soapDispensers.webp",
  },
];

const timeline = [
  {
    year: "2022",
    title: "Company Started",
    description:
      "AVHI Solutions began with a focused belief: commercial hygiene products should feel precise, reliable, and beautifully simple.",
  },
  {
    year: "2023",
    title: "Expanded Product Range",
    description:
      "The catalogue grew into a complete sensor and hygiene ecosystem for modern washrooms and high-traffic facilities.",
  },
  {
    year: "2024",
    title: "Commercial Installations",
    description:
      "Projects moved from supply to integrated restroom solutions across offices, hospitality, healthcare, and public spaces.",
  },
  {
    year: "2025",
    title: "Pan India Growth",
    description:
      "A broader national footprint brought AVHI systems to more cities, partners, and commercial environments across India.",
  },
];

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 24, mass: 0.35 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 24, mass: 0.35 });
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.2,
  });
  const heroImageScale = useTransform(scrollYProgress, [0, 0.42], [1, 1.16]);
  const heroImageY = useTransform(scrollYProgress, [0, 0.42], [0, -42]);

  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left - rect.width / 2);
    mouseY.set(event.clientY - rect.top - rect.height / 2);
  }

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-white text-dark"
    >
      <motion.div
        className="fixed left-0 top-0 z-[60] h-0.5 origin-left bg-blue"
        style={{ scaleX: progressScale }}
      />
      <div className="noise" />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ x: smoothX, y: smoothY }}
      >
        <div className="absolute left-[8%] top-[16%] h-72 w-72 rounded-full bg-blue/10 blur-3xl" />
        <div className="absolute right-[7%] top-[12%] h-[30rem] w-[30rem] rounded-full bg-orange/10 blur-3xl" />
        <div className="absolute bottom-[4%] left-[34%] h-[34rem] w-[34rem] rounded-full bg-dark/[0.035] blur-3xl" />
      </motion.div>

      <Header />

      <section className="relative px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:min-h-screen lg:px-12 lg:pb-12">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_8%_20%,rgba(14,79,255,0.13),transparent_28%),radial-gradient(circle_at_86%_8%,rgba(255,138,0,0.13),transparent_30%),linear-gradient(180deg,#FFFFFF_0%,#F7F8FB_55%,#FFFFFF_100%)]" />

        <div className="mx-auto grid min-h-0 max-w-[92rem] items-center gap-10 lg:min-h-[calc(100vh-9rem)] lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
          <HeroCopy />

          <motion.div
            initial={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            className="relative lg:min-h-[44rem]"
          >
            <HeroPlaceholder scale={heroImageScale} y={heroImageY} />
          </motion.div>
        </div>
      </section>

      <StatsCounters />
      <WhyAvhi />
      <EnvironmentStrip />
      <ProductRange />
      <PremiumSystems />
    </main>
  );
}

function Header() {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <SiteHeader />
    </motion.div>
  );
}

function HeroCopy() {
  return (
    <div className="relative z-10 text-center lg:text-left">
      <motion.div
        initial={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-dark/58 shadow-[0_12px_36px_rgba(11,11,11,0.06)] backdrop-blur-xl sm:mb-7 sm:text-xs"
      >
        <Sparkles className="h-3.5 w-3.5 text-blue" />
        Commercial hygiene, re-engineered
      </motion.div>

      <motion.h1
        initial={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        className="mx-auto max-w-5xl font-display text-[clamp(2.6rem,9vw,4.8rem)] font-semibold leading-[0.9] tracking-[-0.06em] sm:leading-[0.82] sm:tracking-[-0.075em] lg:mx-0"
      >
        AVHI Solutions
      </motion.h1>

      <motion.p
        initial={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        className="mx-auto mt-6 max-w-md text-base leading-7 tracking-[-0.02em] text-dark/62 sm:mt-8 sm:max-w-2xl sm:text-xl sm:leading-8 lg:mx-0 lg:text-2xl lg:leading-9"
      >
        Commercial Washroom Automation, Sensor Solutions & Premium Hygiene
        Systems for modern, efficient, and premium washroom environments.
      </motion.p>

      <motion.div
        initial={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row lg:items-start"
      >
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href="/products" className="flex items-center justify-center gap-1.5">
            Explore Products
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
          <Link href="/about" className="flex items-center justify-center">About AVHI</Link>
        </Button>
      </motion.div>
    </div>
  );
}

function HeroPlaceholder({
  scale,
  y,
}: {
  scale: MotionValue<number>;
  y: MotionValue<number>;
}) {
  return (
    <div className="relative mx-auto h-[20rem] max-w-sm overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/50 shadow-[0_30px_100px_rgba(11,11,11,0.14)] backdrop-blur-2xl sm:h-[28rem] sm:max-w-none sm:rounded-[2rem] lg:absolute lg:inset-y-0 lg:left-0 lg:right-[-5vw] lg:h-auto lg:max-w-none lg:rounded-[2.6rem]">
      {/* Background */}
      <motion.div
        style={{ scale, y }}
        className="absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.96),rgba(255,255,255,0.22)_28%,transparent_46%),radial-gradient(circle_at_74%_18%,rgba(14,79,255,0.18),transparent_34%),radial-gradient(circle_at_72%_78%,rgba(255,138,0,0.16),transparent_30%),linear-gradient(145deg,#F8FAFF,#ECEFF5_45%,#FFFFFF)] sm:rounded-[2.6rem]"
      />

      <div className="absolute inset-2 overflow-hidden rounded-[1.4rem] border border-black/8 bg-white/40 sm:inset-4 sm:rounded-[2rem]">
        {/* Hero Image Card */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-2 overflow-hidden rounded-[1.3rem] border border-white/70 bg-white shadow-[0_25px_80px_rgba(11,11,11,0.12)] sm:inset-x-[6%] sm:top-[6%] sm:h-[60%] sm:rounded-[1.75rem] lg:left-[8%] lg:right-auto lg:top-[9%] lg:h-[78%] lg:w-[56%] lg:rounded-[2.4rem]"
        >
          {/* Browser Bar (Desktop only) */}
          <div className="absolute inset-x-0 top-0 z-20 hidden h-10 items-center gap-2 border-b border-black/5 bg-white/80 px-5 backdrop-blur lg:flex">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>

          {/* Single Image for all devices */}
          <Image
            src="/about/AboutHeroImage.webp"
            alt="AVHI Solutions Website"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="
              object-cover
              object-top
              lg:pt-10
            "
          />
        </motion.div>

        {/* Sensor Suite Card */}
        <motion.div
          animate={{ y: [0, 18, 0], rotate: [0, 0.8, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-6 left-1/2 hidden w-[80%] -translate-x-1/2 rounded-[1.6rem] border border-white/10 bg-dark p-5 text-white shadow-[0_38px_120px_rgba(11,11,11,0.3)] sm:block sm:bottom-6 lg:bottom-[10%] lg:left-auto lg:right-[8%] lg:h-[54%] lg:w-[42%] lg:translate-x-0 lg:rounded-[2rem]"
        >
          <div className="mb-4 flex items-center justify-between sm:mb-6">
            <span className="text-xs uppercase tracking-[0.22em] text-white/38">
              Sensor Suite
            </span>

            <Waves className="h-5 w-5 text-orange" />
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {highlights.map((item, index) => (
              <div
                key={item}
                className={cn(
                  "truncate rounded-2xl border border-white/10 px-4 py-2.5 text-sm text-white/70 transition-all",
                  index === 1 && "bg-blue text-white shadow-glass"
                )}
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Blur Effects */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[8%] top-[8%] h-12 w-12 rounded-full bg-blue/15 blur-xl sm:right-[13%] sm:top-[12%] sm:h-24 sm:w-24 sm:blur-2xl"
      />

      <motion.div
        animate={{
          opacity: [0.25, 0.5, 0.25],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[10%] left-[10%] h-14 w-14 rounded-full bg-orange/15 blur-xl sm:bottom-[16%] sm:left-[16%] sm:h-28 sm:w-28 sm:blur-2xl"
      />
    </div>
  );
}
function WhyAvhi() {
  return (
    <section id="solutions" className="relative px-5 py-10 sm:px-8 sm:py-20 lg:px-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(14,79,255,0.08),transparent_28%),radial-gradient(circle_at_88%_72%,rgba(255,138,0,0.08),transparent_30%)]" />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto max-w-[92rem] rounded-[1.75rem] border border-black/8 bg-white/72 p-6 shadow-[0_20px_80px_rgba(11,11,11,0.05)] backdrop-blur-2xl sm:rounded-[2.4rem] sm:p-10 lg:p-12"
      >
        <motion.div variants={fadeUp} className="max-w-3xl text-center sm:text-left">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue sm:mb-5 sm:text-sm">
            About AVHI Solutions
          </p>
          <h2 className="font-display text-[clamp(2rem,7vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.05em] sm:leading-[0.9] sm:tracking-[-0.07em]">
            Premium washroom automation for efficient, modern facilities.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-dark/58 sm:mx-0 sm:mt-6 sm:max-w-none sm:text-lg sm:leading-8">
            We bring together touch-free technology, premium hygiene systems, and
            dependable commercial solutions for cleaner, smarter spaces.
          </p>
          <Button asChild variant="secondary" size="lg" className="mt-7 sm:mt-8">
            <Link href="/about">Read the full story</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

function StatsCounters() {
  return (
    <section className="px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto grid max-w-[92rem] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-black/8 lg:overflow-hidden lg:rounded-[2.4rem] lg:border lg:border-black/8 lg:bg-white/72 lg:shadow-[0_24px_90px_rgba(11,11,11,0.07)] lg:backdrop-blur-2xl"
      >
        {stats.map((stat) => (
          <motion.div
            variants={fadeUp}
            key={stat.label}
            className="group flex flex-col items-center justify-center rounded-[1.4rem] border border-black/8 bg-white/72 p-5 text-center shadow-[0_14px_44px_rgba(11,11,11,0.05)] backdrop-blur-2xl transition-colors duration-500 hover:bg-black/[0.025] sm:rounded-[1.75rem] sm:p-8 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-10 lg:shadow-none"
          >
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              className="font-display text-[clamp(2.4rem,8vw,6.8rem)] font-semibold leading-none tracking-[-0.05em] text-dark sm:tracking-[-0.075em]"
            />
            <p className="mt-3 text-[0.7rem] font-medium uppercase leading-snug tracking-[0.14em] text-dark/42 sm:mt-5 sm:text-sm sm:tracking-[0.18em]">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function AnimatedCounter({
  value,
  suffix,
  className,
}: {
  value: number;
  suffix: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
      {suffix}
    </span>
  );
}

function EnvironmentStrip() {
  return (
    <section className="px-5 py-10 sm:px-8 sm:py-16 lg:px-12">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto grid max-w-[92rem] grid-cols-2 gap-3 lg:grid-cols-4"
      >
        {environments.map((item) => (
          <motion.div
            variants={fadeUp}
            key={item.label}
            className="group flex flex-col items-center gap-4 rounded-[1.4rem] border border-black/8 bg-white/72 p-5 text-center shadow-[0_14px_44px_rgba(11,11,11,0.06)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-premium sm:rounded-[2rem] sm:p-6"
          >
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-dark text-white transition-transform duration-500 group-hover:scale-110 sm:h-12 sm:w-12">
              <item.icon className="h-5 w-5" />
            </div>
            <p className="font-display text-xl font-semibold tracking-[-0.04em] sm:text-3xl sm:tracking-[-0.06em]">
              {item.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function ProductRange() {
  return (
    <section id="products" className="relative px-5 py-12 sm:px-8 sm:py-20 lg:px-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#FFFFFF_0%,#F7F8FB_42%,#FFFFFF_100%)]" />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto max-w-[92rem]"
      >
        <motion.div
          variants={fadeUp}
          className="mb-10 flex flex-col gap-5 sm:mb-16 sm:gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue sm:mb-5 sm:text-sm">
              Featured offerings
            </p>
            <h2 className="font-display text-[clamp(2.2rem,9vw,9rem)] font-semibold leading-[0.92] tracking-[-0.05em] sm:leading-[0.82] sm:tracking-[-0.08em]">
              A focused view of our core solutions.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 tracking-[-0.01em] text-dark/56 sm:text-lg sm:leading-8 sm:tracking-[-0.02em]">
            We showcase a curated selection of key products here, with the full
            catalogue organized by category on our dedicated Products page.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {productCategories.map((category, index) => (
            <ProductCard
              key={category.name}
              category={category}
              index={index}
            />
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-10 flex justify-center sm:justify-start">
          <Button asChild variant="secondary" size="lg">
            <Link href="/products">View all product categories</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProductCard({
  category,
  index,
}: {
  category: { name: string; description: string; image: string };
  index: number;
}) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{
        y: -10,
        rotateX: 2,
        rotateY: -2,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      }}
      className="group [perspective:1200px]"
    >
      <div className="h-full rounded-[1.75rem] bg-[linear-gradient(135deg,rgba(14,79,255,0.32),rgba(255,255,255,0.92)_42%,rgba(255,138,0,0.28))] p-px shadow-[0_24px_86px_rgba(11,11,11,0.08)] transition-shadow duration-500 group-hover:shadow-[0_34px_120px_rgba(11,11,11,0.14)] sm:rounded-[2.1rem]">
        <div className="flex h-full flex-col overflow-hidden rounded-[calc(1.75rem-1px)] border border-white/70 bg-white/74 p-3.5 backdrop-blur-2xl sm:rounded-[calc(2.1rem-1px)] sm:p-4">
          <div className="relative aspect-[1.32] overflow-hidden rounded-[1.35rem] border border-black/8 sm:rounded-[1.65rem]">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-dark backdrop-blur-md sm:left-5 sm:top-5 sm:text-[0.65rem] sm:tracking-[0.18em]">
              {category.name}
            </div>

            <div className="absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-dark text-white shadow-[0_14px_38px_rgba(11,11,11,0.24)] transition-transform duration-500 group-hover:rotate-45 sm:bottom-5 sm:right-5 sm:h-10 sm:w-10">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <div className="flex flex-1 flex-col p-3.5 pt-6 sm:p-5 sm:pt-8">
            <div className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-dark/34 sm:mb-5">
              {String(index + 1).padStart(2, "0")}
            </div>

            <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-dark sm:text-3xl sm:tracking-[-0.06em]">
              {category.name}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-dark/58 sm:mt-4 sm:text-base sm:leading-7">
              {category.description}
            </p>
            <Button asChild variant="secondary" size="sm" className="mt-6 w-fit bg-white/76 sm:mt-8">
              <Link href="/products">
                View Products
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function StoryTimeline() {
  return (
    <section className="relative px-5 py-28 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_12%,rgba(14,79,255,0.07),transparent_28%),radial-gradient(circle_at_86%_52%,rgba(255,138,0,0.07),transparent_30%)]" />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto max-w-[92rem]"
      >
        <motion.div
          variants={fadeUp}
          className="mb-20 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-blue">
              Timeline
            </p>
            <h2 className="font-display text-[clamp(2rem,6vw,4rem)] font-semibold leading-[0.82] tracking-[-0.08em]">
              Our Story
            </h2>
          </div>
          <p className="max-w-lg text-lg leading-8 tracking-[-0.02em] text-dark/56">
            A quiet look at how AVHI Solutions evolved from a focused start
            into a growing commercial hygiene brand.
          </p>
        </motion.div>

        <div className="relative space-y-10 lg:space-y-14">
          <div className="absolute left-5 top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-transparent via-black/12 to-transparent lg:left-1/2 lg:block" />

          {timeline.map((item, index) => {
            const isReverse = index % 2 === 1;

            return (
              <motion.article
                variants={fadeUp}
                key={item.year}
                className="relative grid gap-6 lg:grid-cols-2 lg:gap-14"
              >
                <div
                  className={cn(
                    "flex items-center",
                    isReverse && "lg:order-2",
                  )}
                >
                  <div className="w-full rounded-[2.5rem] bg-[linear-gradient(135deg,rgba(14,79,255,0.28),rgba(255,255,255,0.9)_42%,rgba(255,138,0,0.24))] p-px shadow-[0_30px_100px_rgba(11,11,11,0.08)]">
                    <div className="relative aspect-[1.38] overflow-hidden rounded-[calc(2.5rem-1px)] border border-white/70 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.98),rgba(255,255,255,0.28)_30%,transparent_48%),linear-gradient(145deg,#F8FAFF,#EEF1F6)] backdrop-blur-2xl">
                      <motion.div
                        whileInView={{ scale: 1.06 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.4,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(14,79,255,0.16),transparent_32%),radial-gradient(circle_at_22%_78%,rgba(255,138,0,0.13),transparent_30%)]"
                      />
                      <div className="absolute left-8 top-8 rounded-full border border-black/8 bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-dark/42 backdrop-blur-xl">
                        Image Placeholder
                      </div>
                      <div className="absolute left-1/2 top-1/2 h-[52%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/80 bg-[linear-gradient(150deg,rgba(255,255,255,0.94),rgba(255,255,255,0.34))] shadow-[0_34px_100px_rgba(11,11,11,0.12)]" />
                      <div className="absolute bottom-8 right-8 font-display text-6xl font-semibold tracking-[-0.08em] text-dark/10 sm:text-8xl">
                        {item.year}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={cn(
                    "relative flex items-center",
                    isReverse && "lg:order-1",
                  )}
                >
                  <div className="absolute top-10 hidden h-4 w-4 rounded-full border border-white bg-dark shadow-[0_0_0_10px_rgba(11,11,11,0.05)] lg:block lg:right-[-2.2rem]">
                    {isReverse && (
                      <span className="absolute left-[4.4rem] top-1/2 h-px w-10 -translate-y-1/2 bg-black/10" />
                    )}
                    {!isReverse && (
                      <span className="absolute right-[4.4rem] top-1/2 h-px w-10 -translate-y-1/2 bg-black/10" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-xl",
                      !isReverse && "lg:ml-auto lg:text-right",
                    )}
                  >
                    <p className="font-display text-[clamp(2.8rem,7vw,6rem)] font-semibold leading-none tracking-[-0.08em] text-dark">
                      {item.year}
                    </p>
                    <h3 className="mt-5 font-display text-4xl font-semibold tracking-[-0.06em] text-dark sm:text-5xl">
                      {item.title}
                    </h3>
                    <p className="mt-5 text-lg leading-8 tracking-[-0.02em] text-dark/58">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

function PremiumSystems() {
  return (
    <section className="px-5 pb-6 sm:px-8 sm:pb-8 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-[92rem] rounded-[1.75rem] border border-white/10 bg-dark p-6 text-white shadow-[0_30px_120px_rgba(11,11,11,0.24)] sm:rounded-[2.5rem] sm:p-12 lg:p-16"
      >
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-orange sm:text-xs sm:tracking-[0.22em]">
          Premium hygiene systems
        </p>

        <div className="mt-6 max-w-4xl sm:mt-8">
          <h2 className="font-display text-[clamp(1.9rem,7vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] sm:leading-[1] sm:tracking-[-0.05em]">
            Built for spaces where reliability matters.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/60 sm:mt-6 sm:text-base sm:leading-8">
            Sensor-based washroom solutions engineered for commercial
            environments — combining refined aesthetics, dependable
            performance, and effortless maintenance.
          </p>
        </div>

        <div className="mt-8 h-px w-full bg-white/10 sm:mt-12" />

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/55 sm:mt-8 sm:gap-x-8 sm:gap-y-4 sm:text-sm">
          <span>Touch-free automation</span>
          <span>Premium finishes</span>
          <span>Commercial durability</span>
          <span>Easy maintenance</span>
        </div>
      </motion.div>
    </section>
  );
}