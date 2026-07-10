import Link from "next/link";
import { ArrowUpRight, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header"; 
import Image from "next/image";

// ---------------------------------------------------------------------------
// DATA
// Each item is now { code, name, image } instead of a plain string, so every
// product card can render its own photo. Point `image` at the real product
// shot; falls back to the category cover image if a specific shot isn't
// ready yet, and to a placeholder icon if neither exists.
// ---------------------------------------------------------------------------

type Product = {
  code: string;
  name: string;
  image?: string;
};

type Category = {
  title: string;
  slug: string;
  coverImage: string;
  description: string;
  items: Product[];
};

const categories: Category[] = [
  {
    title: "Urinal Sensors",
    slug: "urinal-sensors",
    coverImage: "/images/products/urinal-sensors.jpg",
    description:
      "Touch-free urinal flushing systems engineered for commercial washrooms with superior reliability and water efficiency.",
    items: [
      { code: "US-01", name: "Exposed Urinal Sensor", image: "/img/products/us01.png" },
      { code: "US-02", name: "Exposed Urinal Sensor", image: "/img/products/us02.png" },
      { code: "US-03", name: "4x4 Urinal Sensor", image: "/img/products/us03.png" },
      { code: "US-04", name: "Exposed Urinal Sensor", image: "/img/products/us04.png" },
      { code: "US-05", name: "Urinal Sensor Kit", image: "/img/products/us05.png" },
      { code: "US-06", name: "Urinal Sensor Kit", image: "/img/products/us06.png" },
      { code: "US-07", name: "Urinal Sensor Kit", image: "/img/products/us07.png" },
      { code: "US-08", name: "Urinal Sensor Kit", image: "/img/products/us08.png" },
    ],
  },
  {
    title: "Urinal Sensor Eyes",
    slug: "urinal-sensor-eyes",
    coverImage: "/images/products/urinal-eye.jpg",
    description:
      "High-performance infrared sensor eyes compatible with various automatic urinal flushing systems.",
    items: [
      { code: "UE-01", name: "Sensor Eye", image: "/img/products/ue01.png" },
      { code: "UE-02", name: "Sensor Eye", image: "/img/products/ue02.png" },
      { code: "UE-03", name: "Sensor Eye", image: "/img/products/ue03.png" },
      { code: "UE-04", name: "Sensor Eye", image: "/img/products/ue04.png" },
      { code: "UE-05", name: "Sensor Eye", image: "/img/products/ue05.png" },
      { code: "UE-06", name: "Sensor Eye", image: "/img/products/ue06.png" },
      { code: "UE-07", name: "Sensor Eye", image: "/img/products/ue07.png" },
      { code: "UE-08", name: "Sensor Eye", image: "/img/products/ue08.png" },
    ],
  },
  {
    title: "Urinal Valves & Battery Boxes",
    slug: "urinal-valves",
    coverImage: "/images/products/urinal-valves.jpg",
    description:
      "Premium brass valves, battery boxes and accessories designed for long-lasting commercial performance.",
    items: [
      { code: "USV-01", name: "Water Flow Valve", image: "/img/products/ue01.png" },
      { code: "USV-02", name: "Brass Valve" ,image: "/img/products/ue02.png"},
      { code: "USV-03", name: "Black Valve L-Type", image: "/img/products/ue03.png" },
      { code: "USV-04", name: "Valve L-Type", image: "/img/products/ue04.png" },
      { code: "USV-07", name: "Black Valve Straight", image: "/img/products/ue07.png" },
      { code: "", name: "Water Flow Adjuster", image: "/img/products/waterFlowAdjuster.png" },
      { code: "", name: "Urinal Sensor Adapter", image: "/img/products/urinalSensorAdapter.png" },
      { code: "UBB-05", name: "Battery Box", image: "/img/products/ue05.png" },
      { code: "UBB-06", name: "Flat Battery Box", image: "/img/products/ue06.png" },
      { code: "UBB-08", name: "Battery Box", image: "/img/products/ue08.png" },
    ],
  },
  {
    title: "Hand Dryers",
    slug: "hand-dryers",
    coverImage: "/images/products/hand-dryers.jpg",
    description:
      "Fast drying, energy-efficient commercial hand dryers available in ABS and stainless steel finishes.",
    items: [
      { code: "HD-01", name: "High Speed SS", image: "/img/products/hd01.png" },
      { code: "HD-02", name: "Nozzle Dryer", image: "/img/products/hd02.png" },
      { code: "HD-03", name: "ABS Dryer", image: "/img/products/hd03.png" },
      { code: "HD-04", name: "Jet Dryer", image: "/img/products/hd04.png" },
      { code: "HD-05", name: "ABS Dryer", image: "/img/products/hd05.png" },
      { code: "HD-06", name: "High Speed SS", image: "/img/products/hd06.png" },
      { code: "HD-07", name: "High Speed SS", image: "/img/products/hd07.png" },
      { code: "HD-08", name: "Jet Dryer", image: "/img/products/hd08.png" },
      { code: "HD-09", name: "High Speed SS", image: "/img/products/hd09.png" },
    ],
  },
  {
    title: "Hand Dryer Spares",
    slug: "hand-dryer-spares",
    coverImage: "/images/products/dryer-spares.jpg",
    description:
      "Original spare parts and electronic components for maintaining commercial hand dryers.",
    items: [
      { code: "HDS-01", name: "Hand Dryer Circuit", image: "/img/products/hds01.png" },
      { code: "HDS-02", name: "Heating Element" , image: "/img/products/hds02.png"},
    ],
  },
  {
    title: "Sensor Faucets",
    slug: "sensor-faucets",
    coverImage: "/images/products/sensor-faucets.jpg",
    description:
      "Elegant touch-free sensor faucets crafted for hygiene, water conservation and premium aesthetics.",
    items: [
      { code: "SF-01", name: "Sensor Tap", image: "/img/products/sf01.png" },
      { code: "SF-02", name: "Deck Mount", image: "/img/products/sf02.png" },
      { code: "SF-03", name: "Wall Mount", image: "/img/products/sf03.png" },
      { code: "SF-04", name: "Deck Mount", image: "/img/products/sf04.png" },
      { code: "SF-05", name: "Deck Mount", image: "/img/products/sf05.png" },
      { code: "SF-06", name: "Swan Neck", image: "/img/products/sf06.png" },
      { code: "SF-07", name: "Wall Mount", image: "/img/products/sf07.png" },
      { code: "SF-08", name: "Semi Swan", image: "/img/products/sf08.png" },
      { code: "SF-09", name: "Long Neck", image: "/img/products/sf09.png" },
    ],
  },
  {
    title: "Sensor Faucet Spares",
    slug: "sensor-faucet-spares",
    coverImage: "/images/products/faucet-spares.jpg",
    description:
      "Replacement control units, sensor eyes and NRV accessories for sensor faucet installations.",
    items: [
      { code: "SFS-01", name: "IR Eye", image: "/img/products/sfs01.png" },
      { code: "SFS-02", name: "IR Eye" , image: "/img/products/sfs02.png"},
      { code: "SFS-03", name: "Control Box", image: "/img/products/sfs03.png" },
      { code: "SFS-04", name: "Hot/Cold NRV", image: "/img/products/sfs04.png" },
    ],
  },
  {
    title: "Soap Dispensers",
    slug: "soap-dispensers",
    coverImage: "/images/products/soap-dispensers.jpg",
    description:
      "Wall-mounted stainless steel and ABS soap dispensers suitable for commercial and hospitality spaces.",
    items: [
      { code: "SD-01", name: "SS 304", image: "/img/products/sd01.png" },
      { code: "SD-02", name: "SS 304", image: "/img/products/sd02.png" },
      { code: "SD-03", name: "SS 304", image: "/img/products/sd03.png" },
      { code: "SD-04", name: "SS 304", image: "/img/products/sd04.png" },
      { code: "SD-05", name: "ABS", image: "/img/products/sd05.png" },
      { code: "SD-06", name: "ABS", image: "/img/products/sd06.png" },
      { code: "SD-07", name: "Double", image: "/img/products/sd07.png" },
      { code: "SD-08", name: "Double", image: "/img/products/sd08.png" },
      { code: "SD-09", name: "Triple", image: "/img/products/sd09.png" },
      { code: "SD-10", name: "ABS", image: "/img/products/sd10.png" },
      { code: "SD-11", name: "ABS", image: "/img/products/sd11.png" },
    ],
  },
  {
    title: "Automatic Soap Dispensers",
    slug: "automatic-soap-dispensers",
    coverImage: "/images/products/automatic-soap.jpg",
    description:
      "Touch-free automatic soap dispensers designed for modern hygiene-focused environments.",
    items: [
      { code: "ASD-01", name: "500ml", image: "/img/products/asd01.png" },
      { code: "ASD-02", name: "Foam 300ml", image: "/img/products/asd02.png" },
      { code: "ASD-03", name: "1000ml", image: "/img/products/asd03.png" },
      { code: "ASD-04", name: "700ml", image: "/img/products/asd04.png" },
      { code: "ASD-05", name: "SS 1000ml", image: "/img/products/asd05.png" },
    ],
  },
  {
    title: "Shoe Care Solutions",
    slug: "shoe-care",
    coverImage: "/images/products/shoe-care.jpg",
    description:
      "Professional shoe shine and shoe cover machines for offices, hospitals and premium facilities.",
    items: [
      { code: "SC-01", name: "Shoe Lamination Machine", image: "/img/products/sc01.png" },
      { code: "SC-02", name: "Shoe Cover Machine", image: "/img/products/sc02.png" },
      { code: "SC-03", name: "Shoe Shine Machine", image: "/img/products/sc03.png" },
      { code: "SC-04", name: "Shoe Shine Machine with Sole Cleaner", image: "/img/products/sc04.png" },
      { code: "SC-05", name: "ABS Shoe Cover Dispenser", image: "/img/products/sc05.png" },
      { code: "SC-06", name: "Aluminium Shoe Cover Dispenser", image: "/img/products/sc06.png" },
    ],
  },
  {
    title: "Perfume Dispensers",
    slug: "perfume-dispensers",
    coverImage: "/images/products/perfume.jpg",
    description:
      "Automatic aerosol fragrance dispensers for maintaining pleasant environments in commercial spaces.",
    items: [
      { code: "AD-01", name: "LED Perfume Dispenser", image: "/img/products/ad01.png" },
      { code: "AD-02", name: "LED Perfume Dispenser with Remote", image: "/img/products/ad02.png" },
    ],
  },
];

// ---------------------------------------------------------------------------
// PRODUCT CARD
// Image on top (fixed aspect ratio so the grid stays even even before real
// photography is dropped in), code as a small eyebrow, name underneath.
// ---------------------------------------------------------------------------

function ProductCard({ product, fallbackImage }: { product: Product; fallbackImage: string }) {
  const src = product.image ?? fallbackImage;

  return (
    <div className="group overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_8px_30px_rgba(11,11,11,0.05)] transition-shadow hover:shadow-[0_14px_45px_rgba(11,11,11,0.1)]">
      <div className="relative aspect-square w-full overflow-hidden bg-[#F4F6FA]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
            src={src}
            alt={`${product.code} ${product.name}`}
            fill
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="px-4 py-3.5">
        {product.code && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue">
            {product.code}
          </p>
        )}
        <p className="mt-1 text-sm font-medium leading-snug text-dark/80">
          {product.name}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PAGE
// ---------------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white text-dark">
      <SiteHeader />

      {/* Hero */}
      <section className="px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pt-40">
        <div className="mx-auto max-w-[92rem] rounded-[2.5rem] border border-black/8 bg-[linear-gradient(135deg,#F7F8FB_0%,#FFFFFF_100%)] p-8 shadow-[0_24px_100px_rgba(11,11,11,0.08)] sm:p-12 lg:p-16">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-blue">
              Our products
            </p>
            <h1 className="font-display text-[clamp(3rem,6vw,4.8rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
              Categorized product solutions for every commercial washroom need.
            </h1>
            <p className="mt-8 text-lg leading-8 text-dark/62 sm:text-xl">
              Browse our product range by category to quickly find sensor systems,
              premium hygiene equipment, and support accessories for your space.
            </p>
            <div className="mt-10">
              <Button asChild size="lg">
                <Link href="/about">
                  Learn about AVHI
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky category nav — jump straight to a category instead of scrolling */}
      <nav className="sticky top-0 z-30 border-y border-black/8 bg-white/90 px-5 py-3 backdrop-blur sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[92rem] gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => (
            <a
              key={category.slug}
              href={`#${category.slug}`}
              className="whitespace-nowrap rounded-full border border-black/8 px-4 py-2 text-sm font-medium text-dark/70 transition-colors hover:border-blue/40 hover:text-blue"
            >
              {category.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Category sections */}
      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[92rem] flex-col gap-20">
          {categories.map((category) => (
            <div key={category.slug} id={category.slug} className="scroll-mt-24">
              <div className="flex flex-col gap-6 border-b border-black/8 pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <h2 className="font-display text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                    {category.title}
                  </h2>
                  <p className="mt-3 text-base leading-7 text-dark/62">
                    {category.description}
                  </p>
                </div>
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-dark/40">
                  {category.items.length} product{category.items.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {category.items.map((product) => (
                  <ProductCard
                    key={`${category.slug}-${product.code || product.name}`}
                    product={product}
                    fallbackImage={category.coverImage}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}