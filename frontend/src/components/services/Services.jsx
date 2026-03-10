import { useState, useEffect, useRef } from "react";
import { API_BASE_URL } from "../../config";
import FadeIn from "../common/FadeIn";
import { 
  CommandLineIcon, 
  PaintBrushIcon, 
  ServerIcon, 
  CircleStackIcon, 
  LockClosedIcon, 
  RocketLaunchIcon, 
  WrenchScrewdriverIcon, 
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  BeakerIcon
} from "@heroicons/react/24/outline";

const ICON_MAP = {
  CommandLineIcon,
  PaintBrushIcon,
  ServerIcon,
  CircleStackIcon,
  LockClosedIcon,
  RocketLaunchIcon,
  WrenchScrewdriverIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  BeakerIcon
};

const FALLBACK_SERVICES = [
  {
    title: "Product Design Systems",
    blurb: "Design languages, components, and tokens that scale with your product.",
    details: "I build cohesive UI systems with reusable components, accessibility baked in, and performance-friendly styling.",
    tags: ["Design Systems", "Tokens", "UI Kit", "A11y"],
    iconName: "PaintBrushIcon"
  },
  {
    title: "Modern Web Apps",
    blurb: "High-performance frontends with rich interactions and crisp UX.",
    details: "From landing pages to complex dashboards, I build fast, responsive web apps with polished motion.",
    tags: ["React", "Vite", "Tailwind", "Motion"],
    iconName: "CommandLineIcon"
  },
  {
    title: "API + Backend Systems",
    blurb: "Secure, scalable APIs with clean data models and auth.",
    details: "I architect Node and MongoDB backends with validation, auth, and production-ready structure.",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    iconName: "ServerIcon"
  },
  {
    title: "Growth & Optimization",
    blurb: "Speed, SEO, and conversion-focused improvements.",
    details: "Performance tuning, image pipelines, and UX optimizations that increase engagement.",
    tags: ["Web Vitals", "SEO", "Perf", "UX"],
    iconName: "RocketLaunchIcon"
  },
  {
    title: "Maintenance & Scale",
    blurb: "Keep your product stable while you ship faster.",
    details: "Refactors, upgrades, and safeguards to keep delivery reliable.",
    tags: ["Refactor", "Stability", "QA", "CI/CD"],
    iconName: "WrenchScrewdriverIcon"
  },
  {
    title: "Security & Auth",
    blurb: "Auth flows, roles, and secure data handling.",
    details: "JWT sessions, role-based permissions, and hardened APIs.",
    tags: ["Auth", "RBAC", "Security", "JWT"],
    iconName: "LockClosedIcon"
  }
];

function useInView(ref, options = { threshold: 0.2 }) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setInView(true);
      });
    }, options);
    io.observe(node);
    return () => io.disconnect();
  }, [ref, options]);
  return inView;
}

function TiltCard({ item, index, expandedIndex, setExpandedIndex, onScrollTo }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef);
  const [transform, setTransform] = useState(
    "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)"
  );
  const [hovered, setHovered] = useState(false);
  
  const IconComponent = ICON_MAP[item.iconName] || CommandLineIcon;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    let raf = null;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const rx = (-py * 10).toFixed(2);
      const ry = (px * 12).toFixed(2);
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--spot-x", `${localX}px`);
        el.style.setProperty("--spot-y", `${localY}px`);
        setTransform(
          `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${
            hovered ? 1.02 : 1
          })`
        );
      });
    };
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [hovered]);

  const expanded = expandedIndex === index;

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={() => setExpandedIndex(expanded ? null : index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer select-none card-spotlight
        ${
          expanded
            ? "border-[rgba(46,232,179,0.6)] shadow-[0_12px_40px_-12px_rgba(46,232,179,0.35)]"
            : "border-white/10 hover:border-white/20"
        }
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{
        transform,
        transition:
          "transform 180ms ease, box-shadow 300ms ease, border-color 300ms ease, opacity 600ms ease, translate 600ms ease",
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--color-surface), transparent 6%), color-mix(in oklab, var(--color-surface), transparent 0%))",
      }}
    >
      <div className="relative p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl grid place-items-center bg-[rgba(46,232,179,0.15)] text-accent border border-[rgba(46,232,179,0.35)]">
            <IconComponent className="h-6 w-6" />
          </div>
          <h3 className="display-font text-lg sm:text-xl text-ink">
            {item.title}
          </h3>
            <span className="ml-auto text-[10px] px-2 py-1 rounded-full border border-white/10 text-ink/80">
            {expanded ? "Open" : "Tap"}
          </span>
        </div>
        <p className="mt-3 text-sm text-ink/80 leading-relaxed">{item.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-ink border border-white/10"
            >
              {t}
            </span>
          ))}
        </div>

        <div
          className="grid transition-[grid-template-rows] duration-500 ease-out mt-3"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="pt-2 text-sm text-ink/80">
              {item.details}
              <div className="mt-3">
                <a
                  href="#contact"
                  onClick={(e) => onScrollTo(e, 'contact')}
                  className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium text-gray-900 bg-[linear-gradient(120deg,#2ee8b3,#5aa9ff)] transition-colors"
                >
                  Start a project
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/services`);
        const data = await response.json();
        if (data.success) {
          setServices(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  if (loading) return null;

  const servicesToRender = services.length ? services : FALLBACK_SERVICES;
  const showShowcase = services.length === 0;

  return (
    <div className="w-full" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn variant="blur">
          <div className="max-w-2xl">
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
              Services
            </p>
            <h2 className="display-font text-3xl sm:text-4xl lg:text-5xl text-ink">
              What I can do for you
            </h2>
            <p className="mt-4 text-sm sm:text-base text-ink/80 max-w-xl">
              Highly interactive, performance‑minded experiences with tasteful
              motion and a focus on outcomes.
            </p>
          </div>
        </FadeIn>

        {showShowcase && (
          <FadeIn variant="fade-up" delay={150}>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Discovery",
                  text: "Clarify scope, users, and success metrics.",
                  tag: "02-04 days"
                },
                {
                  title: "Design + Build",
                  text: "Iterate quickly with modular UI and stable APIs.",
                  tag: "1-3 weeks"
                },
                {
                  title: "Launch + Scale",
                  text: "Polish, ship, and optimize for real users.",
                  tag: "Ongoing"
                }
              ].map((step) => (
                <div
                  key={step.title}
                  className="card-neo p-6 relative overflow-hidden group"
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[rgba(46,232,179,0.18)] blur-2xl group-hover:scale-110 transition-transform" />
                  <div className="text-[10px] uppercase tracking-[0.3em] text-ink/60">
                    {step.tag}
                  </div>
                  <h3 className="mt-3 display-font text-xl text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink/70 leading-relaxed">
                    {step.text}
                  </p>
                  <div className="mt-6 h-[1px] bg-gradient-to-r from-[rgba(46,232,179,0.6)] to-transparent" />
                </div>
              ))}
            </div>
          </FadeIn>
        )}

        <FadeIn stagger={true} variant="fade-up" delay={200}>
          <div className="mt-10 sm:mt-12 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {servicesToRender.map((item, i) => (
              <TiltCard
                key={item._id || item.title}
                item={item}
                index={i}
                expandedIndex={expandedIndex}
                setExpandedIndex={setExpandedIndex}
                onScrollTo={handleScrollTo}
              />
            ))}
          </div>
        </FadeIn>

        <div className="mt-12 sm:mt-16 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, 'contact')}
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-gray-900 bg-[linear-gradient(120deg,#2ee8b3,#5aa9ff)] transition-colors"
          >
            Let's build something great
          </a>

          <a
            href="#work"
            onClick={(e) => handleScrollTo(e, 'work')}
            className="text-sm text-ink/80 hover:text-ink transition-colors"
          >
            See my work
          </a>
        </div>
      </div>
    </div>
  );
}
