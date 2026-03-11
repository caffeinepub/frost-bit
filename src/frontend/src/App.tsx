import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FLAVOURS = [
  {
    id: 1,
    name: "Chocolate Oreo",
    tagline: "Dark. Crunchy. Sinful.",
    image: "/assets/uploads/11-1.png",
    gradient:
      "from-[oklch(0.22_0.06_30)] via-[oklch(0.18_0.04_40)] to-[oklch(0.14_0.02_28)]",
    accentColor: "oklch(0.55 0.08 50)",
    emoji: "🍫",
  },
  {
    id: 2,
    name: "Mango Cream",
    tagline: "Tropical. Lush. Dreamy.",
    image: "/assets/uploads/22-2.png",
    gradient:
      "from-[oklch(0.35_0.12_70)] via-[oklch(0.25_0.08_60)] to-[oklch(0.14_0.02_28)]",
    accentColor: "oklch(0.72 0.18 72)",
    emoji: "🥭",
  },
  {
    id: 3,
    name: "Strawberry Delight",
    tagline: "Sweet. Bold. Blissful.",
    image: "/assets/uploads/44-3.png",
    gradient:
      "from-[oklch(0.45_0.18_15)] via-[oklch(0.28_0.10_20)] to-[oklch(0.14_0.02_28)]",
    accentColor: "oklch(0.68 0.22 15)",
    emoji: "🍓",
  },
  {
    id: 4,
    name: "Cookies & Cream",
    tagline: "Classic. Creamy. Iconic.",
    image: "/assets/uploads/33-4.png",
    gradient:
      "from-[oklch(0.30_0.02_270)] via-[oklch(0.20_0.02_250)] to-[oklch(0.14_0.02_28)]",
    accentColor: "oklch(0.80 0.04 270)",
    emoji: "🍪",
  },
];

const FEATURES = [
  {
    icon: "✦",
    title: "See Every Layer",
    subtitle: "Transparent Can",
    desc: "Our iconic crystal-clear can lets you see every gorgeous swirl, crunch, and drizzle before the first sip. No surprises — just pure, visible indulgence.",
  },
  {
    icon: "◈",
    title: "Crafted in Strata",
    subtitle: "Premium Layers",
    desc: "Each can is hand-layered with artisanal ice cream, signature sauces, and signature toppings. Every layer is a new texture, a new flavour moment.",
  },
  {
    icon: "⬡",
    title: "Made for Everyone",
    subtitle: "Accessible Luxury",
    desc: "Frost Bit is crafted for students, dessert lovers, and anyone who believes good taste is a right, not a privilege.",
  },
];

const GALLERY_IMAGES = [
  {
    src: "/assets/generated/frost-gallery-1.dim_800x600.jpg",
    alt: "Frost Bit collection flat lay",
  },
  {
    src: "/assets/generated/frost-gallery-2.dim_800x600.jpg",
    alt: "Ice cream layers close-up",
  },
  {
    src: "/assets/generated/frost-gallery-3.dim_800x600.jpg",
    alt: "Two cans on marble",
  },
  {
    src: "/assets/generated/frost-gallery-4.dim_800x600.jpg",
    alt: "Holding a Frost Bit can",
  },
  {
    src: "/assets/generated/frost-gallery-5.dim_800x600.jpg",
    alt: "Dessert toppings art",
  },
  {
    src: "/assets/generated/frost-can-chocolate-oreo.dim_600x700.jpg",
    alt: "Chocolate Oreo can",
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrollY;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FrostCan({ rotation }: { rotation: number }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        perspective: "800px",
        width: "260px",
        height: "420px",
      }}
    >
      {/* Can wrapper — rotates on scroll */}
      <div
        style={{
          transform: `rotateY(${rotation}deg) rotateX(4deg)`,
          transition: "transform 0.05s linear",
          transformStyle: "preserve-3d",
          width: "180px",
          height: "380px",
          position: "relative",
        }}
      >
        {/* Hero can image */}
        <img
          src="/assets/uploads/ChatGPT-Image-Mar-10-2026-09_26_38-AM-1.png"
          alt="Frost Bit Ice Cream Can"
          className="w-full h-full object-contain drop-shadow-2xl"
          style={{
            filter:
              "drop-shadow(0 0 40px oklch(0.75 0.14 72 / 0.4)) drop-shadow(0 0 80px oklch(0.65 0.12 218 / 0.25))",
          }}
        />

        {/* Ice glow ring at base */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: "140px",
            height: "24px",
            background: "oklch(0.65 0.12 218 / 0.35)",
            filter: "blur(16px)",
          }}
        />
      </div>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, oklch(0.75 0.14 72 / 0.10) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

function FlavourCard({
  flavour,
  index,
  inView,
}: {
  flavour: (typeof FLAVOURS)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      data-ocid={`flavours.item.${index + 1}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      style={{
        border: `1px solid ${hovered ? flavour.accentColor : "oklch(0.28 0.03 40)"}`,
        boxShadow: hovered
          ? `0 0 32px ${flavour.accentColor}55, 0 8px 40px rgba(0,0,0,0.5)`
          : "0 4px 24px rgba(0,0,0,0.4)",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "280px" }}>
        <img
          src={flavour.image}
          alt={flavour.name}
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, oklch(0.12 0.018 30) 0%, transparent 60%)",
          }}
        />
        {/* Emoji badge */}
        <div className="absolute top-4 left-4 text-2xl">{flavour.emoji}</div>
      </div>

      {/* Info */}
      <div className="p-5" style={{ background: "oklch(0.16 0.022 28)" }}>
        <h3
          className="font-display text-xl font-bold mb-1"
          style={{ color: "oklch(0.92 0.03 80)" }}
        >
          {flavour.name}
        </h3>
        <p className="text-sm" style={{ color: "oklch(0.60 0.05 70)" }}>
          {flavour.tagline}
        </p>

        {/* Animated underline */}
        <div
          className="mt-3 h-px"
          style={{
            background: `linear-gradient(90deg, ${flavour.accentColor}, transparent)`,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "all 0.4s ease",
          }}
        />
      </div>
    </motion.div>
  );
}

function SectionHeading({
  label,
  title,
  subtitle,
}: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-16">
      <p
        className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
        style={{ color: "oklch(0.75 0.14 72)" }}
      >
        {label}
      </p>
      <h2
        className="font-display text-4xl md:text-5xl font-bold leading-tight"
        style={{ color: "oklch(0.94 0.02 80)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-4 text-lg max-w-xl mx-auto"
          style={{ color: "oklch(0.60 0.04 60)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Sections ────────────────────────────────────────────────────────────────

function Navbar({ scrollY }: { scrollY: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = scrollY > 60;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "oklch(0.12 0.018 30 / 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(0.28 0.03 40 / 0.6)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="group flex items-center gap-2"
          data-ocid="nav.link"
        >
          <span
            className="font-display text-2xl font-black tracking-tight"
            style={{ color: "oklch(0.75 0.14 72)" }}
          >
            FROST
          </span>
          <span
            className="font-display text-2xl font-black tracking-tight"
            style={{ color: "oklch(0.94 0.02 80)" }}
          >
            BIT
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full mt-1"
            style={{ background: "oklch(0.65 0.12 218)" }}
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {["Flavours", "Experience", "Gallery", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              data-ocid={`nav.${item.toLowerCase()}.link`}
              className="text-sm font-medium tracking-wide transition-colors duration-200"
              style={{ color: "oklch(0.68 0.04 60)" }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "oklch(0.75 0.14 72)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "oklch(0.68 0.04 60)";
              }}
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            data-ocid="nav.order.button"
            className="text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200"
            style={{
              background: "oklch(0.75 0.14 72)",
              color: "oklch(0.12 0.018 30)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background =
                "oklch(0.82 0.16 72)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background =
                "oklch(0.75 0.14 72)";
            }}
          >
            Find a Can →
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: "oklch(0.75 0.14 72)" }}
          aria-label="Menu"
          data-ocid="nav.toggle"
        >
          <div className="w-5 flex flex-col gap-1">
            <span
              className="block h-0.5 rounded transition-all"
              style={{
                background: "currentColor",
                transform: menuOpen
                  ? "rotate(45deg) translate(3px, 3px)"
                  : "none",
              }}
            />
            <span
              className="block h-0.5 rounded transition-all"
              style={{
                background: "currentColor",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-0.5 rounded transition-all"
              style={{
                background: "currentColor",
                transform: menuOpen
                  ? "rotate(-45deg) translate(3px, -3px)"
                  : "none",
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            style={{
              background: "oklch(0.14 0.020 28 / 0.97)",
              borderBottom: "1px solid oklch(0.28 0.03 40)",
            }}
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {["Flavours", "Experience", "Gallery", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  data-ocid={`nav.mobile.${item.toLowerCase()}.link`}
                  className="text-base font-medium py-2 transition-colors"
                  style={{ color: "oklch(0.75 0.08 60)" }}
                >
                  {item}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection({ scrollY }: { scrollY: number }) {
  const canRotation = scrollY * 0.25;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.18 0.03 35) 0%, oklch(0.12 0.018 30) 60%)",
      }}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.28 0.02 40 / 0.08) 1px, transparent 1px), linear-gradient(90deg, oklch(0.28 0.02 40 / 0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Atmospheric glows */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, oklch(0.75 0.14 72 / 0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "20%",
          right: "10%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, oklch(0.65 0.12 218 / 0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <div className="text-center lg:text-left max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs font-semibold tracking-[0.4em] uppercase mb-6"
              style={{ color: "oklch(0.65 0.12 218)" }}
            >
              Premium Desserts · Est. 2024
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display leading-none mb-2"
              style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
            >
              <span
                className="block font-black"
                style={{
                  color: "oklch(0.75 0.14 72)",
                  textShadow: "0 0 60px oklch(0.75 0.14 72 / 0.4)",
                }}
              >
                FROST
              </span>
              <span
                className="block font-black"
                style={{ color: "oklch(0.94 0.02 80)" }}
              >
                BIT
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="font-display text-xl md:text-2xl italic mb-3"
              style={{ color: "oklch(0.68 0.06 65)" }}
            >
              Ice Cream in a Can
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="font-display text-3xl md:text-4xl font-medium mb-10"
              style={{ color: "oklch(0.88 0.04 80)" }}
            >
              "Sip the Chill."
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#flavours"
                data-ocid="hero.primary_button"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300"
                style={{
                  background: "oklch(0.75 0.14 72)",
                  color: "oklch(0.12 0.018 30)",
                  boxShadow: "0 0 32px oklch(0.75 0.14 72 / 0.35)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "oklch(0.82 0.16 72)";
                  el.style.boxShadow = "0 0 48px oklch(0.75 0.14 72 / 0.55)";
                  el.style.transform = "translateY(-2px) scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "oklch(0.75 0.14 72)";
                  el.style.boxShadow = "0 0 32px oklch(0.75 0.14 72 / 0.35)";
                  el.style.transform = "";
                }}
              >
                Explore Flavours
                <span>→</span>
              </a>

              <a
                href="#experience"
                data-ocid="hero.secondary_button"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300"
                style={{
                  border: "1px solid oklch(0.65 0.12 218 / 0.5)",
                  color: "oklch(0.75 0.10 200)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "oklch(0.65 0.12 218)";
                  el.style.background = "oklch(0.65 0.12 218 / 0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "oklch(0.65 0.12 218 / 0.5)";
                  el.style.background = "transparent";
                }}
              >
                Our Story
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex gap-8 mt-12 justify-center lg:justify-start"
            >
              {[
                { num: "4", label: "Flavours" },
                { num: "100%", label: "Premium" },
              ].map(({ num, label }) => (
                <div key={label} className="text-center">
                  <div
                    className="font-display text-2xl font-black"
                    style={{ color: "oklch(0.75 0.14 72)" }}
                  >
                    {num}
                  </div>
                  <div
                    className="text-xs tracking-wider uppercase"
                    style={{ color: "oklch(0.50 0.04 60)" }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Can visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative flex-shrink-0"
          >
            <FrostCan rotation={canRotation} />

            {/* Orbiting flavor dots */}
            {FLAVOURS.map((f, i) => {
              const angle =
                (i * 90 * Math.PI) / 180 + (canRotation * Math.PI) / 360;
              const r = 150;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r * 0.4;
              return (
                <div
                  key={f.id}
                  className="absolute w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{
                    left: `calc(50% + ${x}px - 20px)`,
                    top: `calc(50% + ${y}px - 20px)`,
                    background: "oklch(0.18 0.025 35 / 0.9)",
                    border: `1px solid ${f.accentColor}66`,
                    boxShadow: `0 0 12px ${f.accentColor}33`,
                    backdropFilter: "blur(4px)",
                    transition: "all 0.05s linear",
                    fontSize: "1.2rem",
                  }}
                >
                  {f.emoji}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "oklch(0.45 0.04 60)" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-12"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.75 0.14 72 / 0.6), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}

function FlavoursSection() {
  const { ref, inView } = useInView();

  return (
    <section id="flavours" className="relative py-28 px-6" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, oklch(0.75 0.14 72 / 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading
            label="Our Menu"
            title="The Flavours"
            subtitle="Four iconic combinations, each hand-layered and served ice cold in our signature can."
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FLAVOURS.map((flavour, i) => (
            <FlavourCard
              key={flavour.id}
              flavour={flavour}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const { ref, inView } = useInView();

  return (
    <section id="experience" className="relative py-28 px-6" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(0.65 0.12 218 / 0.04) 0%, transparent 70%)",
        }}
      />

      {/* Decorative divider */}
      <div className="max-w-6xl mx-auto">
        <div
          className="h-px mb-28"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.75 0.14 72 / 0.4), transparent)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading
            label="Why Frost Bit"
            title="The Experience"
            subtitle="We didn't just make ice cream. We reimagined how you see it, taste it, and share it."
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.15, ease: "easeOut" }}
              className="group relative p-8 rounded-2xl overflow-hidden"
              style={{
                background: "oklch(0.16 0.022 28)",
                border: "1px solid oklch(0.26 0.03 40)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(0.75 0.14 72 / 0.5)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 32px oklch(0.75 0.14 72 / 0.10)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(0.26 0.03 40)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Shimmer effect */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.75 0.14 72 / 0.4), transparent)",
                }}
              />

              {/* Icon */}
              <div
                className="text-4xl mb-6 font-mono"
                style={{ color: "oklch(0.75 0.14 72)" }}
              >
                {feat.icon}
              </div>

              <p
                className="text-xs font-semibold tracking-[0.25em] uppercase mb-2"
                style={{ color: "oklch(0.65 0.12 218)" }}
              >
                {feat.subtitle}
              </p>

              <h3
                className="font-display text-xl font-bold mb-4"
                style={{ color: "oklch(0.92 0.03 80)" }}
              >
                {feat.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.58 0.04 60)" }}
              >
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Feature can showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 rounded-2xl overflow-hidden relative"
          style={{
            background: "oklch(0.15 0.025 220 / 0.3)",
            border: "1px solid oklch(0.65 0.12 218 / 0.2)",
          }}
        >
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <img
                src="/assets/generated/frost-gallery-3.dim_800x600.jpg"
                alt="Two Frost Bit cans"
                className="w-full max-w-sm rounded-xl object-cover"
                style={{ height: "240px" }}
              />
            </div>
            <div>
              <p
                className="text-xs font-semibold tracking-[0.3em] uppercase mb-3"
                style={{ color: "oklch(0.65 0.12 218)" }}
              >
                The Concept
              </p>
              <h3
                className="font-display text-2xl md:text-3xl font-bold mb-4"
                style={{ color: "oklch(0.94 0.02 80)" }}
              >
                A window into perfection.
              </h3>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "oklch(0.60 0.04 60)" }}
              >
                Traditional ice cream hides its magic inside a tub. Frost Bit
                puts it on display. Our transparent soda-style can is a theatre
                of texture and colour — and you're always front-row.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Transparent Can", "Hand-Layered", "Fresh Daily"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{
                        background: "oklch(0.65 0.12 218 / 0.12)",
                        border: "1px solid oklch(0.65 0.12 218 / 0.3)",
                        color: "oklch(0.75 0.10 210)",
                      }}
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GallerySection() {
  const { ref, inView } = useInView();

  return (
    <section id="gallery" className="relative py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div
          className="h-px mb-28"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.65 0.12 218 / 0.4), transparent)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading
            label="In the Can"
            title="The Gallery"
            subtitle="Every angle, every layer, every drizzle. Beauty you can taste."
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-xl"
              style={{
                aspectRatio: i === 0 || i === 3 ? "4/5" : "3/4",
                border: "1px solid oklch(0.25 0.03 40)",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.12 0.018 30 / 0.7) 0%, transparent 60%)",
                }}
              />
              {/* Overlay gold border on hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 0 1px oklch(0.75 0.14 72 / 0.4)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { ref, inView } = useInView();

  return (
    <section id="contact" className="relative py-28 px-6" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, oklch(0.75 0.14 72 / 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div
          className="h-px mb-28"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.75 0.14 72 / 0.4), transparent)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-xs font-semibold tracking-[0.4em] uppercase mb-6"
            style={{ color: "oklch(0.65 0.12 218)" }}
          >
            Get in Touch
          </p>
          <h2
            className="font-display text-4xl md:text-6xl font-black mb-6"
            style={{
              color: "oklch(0.94 0.02 80)",
              textShadow: "0 0 60px oklch(0.75 0.14 72 / 0.2)",
            }}
          >
            Find Us Near
            <br />
            <span style={{ color: "oklch(0.75 0.14 72)" }}>Your College</span>
          </h2>

          <p
            className="text-lg mb-12 max-w-lg mx-auto"
            style={{ color: "oklch(0.58 0.04 60)" }}
          >
            We're popping up at campuses across the city. Follow us on Instagram
            to catch us near you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <a
            href="https://www.instagram.com/frostbit.layeredcream/"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="contact.instagram.link"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.22 0), oklch(0.55 0.22 300), oklch(0.65 0.20 50))",
              color: "oklch(0.96 0.01 80)",
              boxShadow: "0 0 24px oklch(0.55 0.22 0 / 0.30)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-2px) scale(1.02)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 40px oklch(0.55 0.22 0 / 0.50)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 24px oklch(0.55 0.22 0 / 0.30)";
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              role="img"
              aria-label="Instagram"
            >
              <title>Instagram</title>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            @frostbit.layeredcream
          </a>

          <a
            href="mailto:frostbit.layeredcream@gmail.com"
            data-ocid="contact.email.link"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300"
            style={{
              border: "1px solid oklch(0.75 0.14 72 / 0.4)",
              color: "oklch(0.75 0.14 72)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "oklch(0.75 0.14 72 / 0.08)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "oklch(0.75 0.14 72 / 0.8)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor =
                "oklch(0.75 0.14 72 / 0.4)";
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              role="img"
              aria-label="Email"
            >
              <title>Email</title>
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            frostbit.layeredcream@gmail.com
          </a>
        </motion.div>

        {/* Decorative can row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex justify-center gap-4 mb-16"
        >
          {FLAVOURS.map((f, i) => (
            <div
              key={f.id}
              className="text-2xl rounded-full p-3 transition-transform hover:scale-110 cursor-default"
              style={{
                background: "oklch(0.18 0.025 35)",
                border: `1px solid ${f.accentColor}44`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {f.emoji}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <footer
        className="max-w-6xl mx-auto pt-12"
        style={{ borderTop: "1px solid oklch(0.22 0.025 40)" }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span
              className="font-display text-lg font-black"
              style={{ color: "oklch(0.75 0.14 72)" }}
            >
              FROST
            </span>
            <span
              className="font-display text-lg font-black"
              style={{ color: "oklch(0.60 0.04 70)" }}
            >
              BIT
            </span>
            <span
              className="w-1 h-1 rounded-full"
              style={{ background: "oklch(0.65 0.12 218)" }}
            />
          </div>
          <p className="text-xs" style={{ color: "oklch(0.40 0.03 50)" }}>
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: "oklch(0.55 0.06 70)" }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "oklch(0.75 0.14 72)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "oklch(0.55 0.06 70)";
              }}
            >
              caffeine.ai
            </a>
          </p>
          <p
            className="text-xs tracking-wider"
            style={{ color: "oklch(0.38 0.03 50)" }}
          >
            Ice Cream in a Can
          </p>
        </div>
      </footer>
    </section>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const scrollY = useScrollY();

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.12 0.018 30)" }}
    >
      <Navbar scrollY={scrollY} />
      <main>
        <HeroSection scrollY={scrollY} />
        <FlavoursSection />
        <ExperienceSection />
        <GallerySection />
        <ContactSection />
      </main>
    </div>
  );
}
