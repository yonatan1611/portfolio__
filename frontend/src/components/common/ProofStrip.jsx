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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn variant="fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-6 items-stretch">
            <div className="card-neo p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[rgba(90,169,255,0.15)] blur-3xl" />
              <div className="text-[10px] uppercase tracking-[0.35em] text-ink/60">
                Tooling + Stack
              </div>
              <h3 className="display-font text-2xl sm:text-3xl text-ink mt-2">
                Modern, scalable, and built for speed.
              </h3>
              <p className="mt-2 text-sm text-ink/70 max-w-xl">
                From interaction design to backend architecture, each layer is tuned
                for clarity, performance, and maintainability.
              </p>
              <div className="mt-6 marquee">
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
            </div>
            <div className="grid grid-cols-1 gap-4">
              {HIGHLIGHTS.map((h) => (
                <div key={h.label} className="card-neo p-5">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-ink/60">
                    {h.label}
                  </div>
                  <div className="mt-2 display-font text-2xl text-ink">
                    {h.value}
                  </div>
                  <div className="mt-3 h-[2px] bg-gradient-to-r from-[rgba(46,232,179,0.7)] to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
