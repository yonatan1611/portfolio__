import FadeIn from "./FadeIn";

const TOOL_CHIPS = [
  "React 19",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "MySQL",
  "Docker",
  "Kubernetes",
  "Next.js",
  "MongoDB",
  "Tailwind",
  "Framer Motion",
  "JWT",
  "Vite",
  "Express",
  "Figma"
];

const HIGHLIGHTS = [
  { label: "Avg. performance", value: "95+" },
  { label: "Ship cadence", value: "Weekly" },
  { label: "Delivery focus", value: "Outcome-driven" }
];

export default function ProofStrip() {
  return (
    <div className="w-full">
      <FadeIn variant="fade-up">
        <section className="relative w-full overflow-hidden border-y border-white/10 bg-[radial-gradient(820px_360px_at_10%_-20%,rgba(46,232,179,0.35),transparent_60%),radial-gradient(820px_360px_at_90%_-10%,rgba(90,169,255,0.35),transparent_55%),radial-gradient(680px_260px_at_80%_120%,rgba(255,138,61,0.3),transparent_60%),color-mix(in_oklab,var(--color-surface),transparent_12%)] px-5 sm:px-8 lg:px-12 py-4 sm:py-5">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -left-24 top-[-20%] h-56 w-56 rounded-full bg-[rgba(46,232,179,0.35)] blur-3xl" />
            <div className="absolute right-0 top-[-30%] h-64 w-64 rounded-full bg-[rgba(90,169,255,0.35)] blur-3xl" />
            <div className="absolute -right-16 bottom-[-50%] h-64 w-64 rounded-full bg-[rgba(255,138,61,0.3)] blur-3xl" />
            <div className="absolute inset-0 opacity-45" />
          </div>
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[rgba(46,232,179,1)] to-transparent shadow-[0_0_25px_rgba(46,232,179,0.6)]" />
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[rgba(90,169,255,1)] to-transparent shadow-[0_0_25px_rgba(90,169,255,0.6)]" />

          <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_0.45fr] gap-5 items-center">
            <div className="relative">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] uppercase tracking-[0.45em] text-ink/80">
                
                <span className="h-1.5 w-1.5 rounded-full bg-[rgba(46,232,179,0.8)]" />
                Tooling + Stack
              </div>
              <h3 className="display-font text-xl sm:text-2xl lg:text-3xl text-ink mt-2">
                Modern, scalable, and built for momentum.
              </h3>
              <p className="mt-1.5 text-[13px] sm:text-sm text-ink/70 max-w-2xl">
                From interaction design to backend architecture, each layer is tuned
                for clarity, performance, and maintainability.
              </p>

              <div className="mt-3 relative">
                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[color-mix(in_oklab,var(--color-surface),transparent_5%)] to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[color-mix(in_oklab,var(--color-surface),transparent_5%)] to-transparent pointer-events-none" />
                <div className="marquee">
                  <div className="marquee-track">
                    {[...TOOL_CHIPS, ...TOOL_CHIPS].map((tool, idx) => (
                      <span
                        key={`${tool}-${idx}`}
                        className="chip px-4 py-2 text-[11px] uppercase tracking-[0.2em]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="marquee mt-2 opacity-100">
                  <div
                    className="marquee-track"
                    style={{ animationDirection: "reverse" }}
                  >
                    {[...TOOL_CHIPS, ...TOOL_CHIPS].map((tool, idx) => (
                      <span
                        key={`${tool}-alt-${idx}`}
                        className="chip px-4 py-2 text-[11px] uppercase tracking-[0.2em]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
              {HIGHLIGHTS.map((item) => (
                <div
                  key={item.label}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-[color-mix(in_oklab,var(--color-surface),transparent_4%)] px-4 py-2.5 backdrop-blur-sm"
                >
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[rgba(46,232,179,0.28)] blur-2xl" />
                  <div className="text-[11px] uppercase tracking-[0.3em] text-ink/60">
                    {item.label}
                  </div>
                  <div className="mt-1 text-lg sm:text-xl font-semibold text-ink">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none scale-90">
            <div className="ring-orbit" />
            <div className="ring-orbit alt" />
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
