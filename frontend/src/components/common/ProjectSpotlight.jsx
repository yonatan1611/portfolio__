import { useEffect, useRef, useState } from "react";
import FadeIn from "./FadeIn";
import { api } from "../../api";
import { defaultProjects } from "../../data/defaults";

function mapProjects(data) {
  return data.map((project) => ({
    title: project.title,
    image: project.image,
    blurb: project.description,
    tags: project.technologies || [],
    demoUrl: project.liveLink,
    githubUrl: project.githubLink,
  }));
}

export default function ProjectSpotlight() {
  const [projects, setProjects] = useState([]);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.getProjects();
        setProjects(mapProjects(data));
      } catch (error) {
        console.error("Error fetching projects, using defaults:", error);
        setProjects(mapProjects(defaultProjects));
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!projects.length) return;
    if (hovered) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % projects.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [projects.length, hovered]);

  const active = projects[index] || null;

  const onMouseMove = (e) => {
    const node = containerRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    node.style.setProperty("--spot-x", `${x}px`);
    node.style.setProperty("--spot-y", `${y}px`);
  };

  if (!projects.length) return null;

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn variant="fade-up">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-accent text-sm font-semibold tracking-widest uppercase">
                  Spotlight
                </p>
                <h2 className="display-font text-3xl sm:text-4xl text-ink">
                  Project Spotlight
                </h2>
                <p className="mt-2 text-sm text-ink/70 max-w-xl">
                  Cinematic previews of the most impactful builds.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <button
                  className="btn-secondary rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]"
                  onClick={() =>
                    setIndex((i) => (i - 1 + projects.length) % projects.length)
                  }
                >
                  Prev
                </button>
                <button
                  className="btn-primary rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]"
                  onClick={() => setIndex((i) => (i + 1) % projects.length)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </FadeIn>

        <div
          ref={containerRef}
          onMouseMove={onMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="spotlight-shell mt-8 relative overflow-hidden rounded-[32px] card-neo"
        >
          <div className="spotlight-glow" />
          <div className="spotlight-stage">
            {projects.map((p, i) => (
              <article
                key={`${p.title}-${i}`}
                className={`spotlight-card ${i === index ? "is-active" : ""}`}
              >
                <div className="spotlight-media">
                  <div className="spotlight-media-inner">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="spotlight-image"
                      loading={i === index ? "eager" : "lazy"}
                    />
                  </div>
                </div>
                <div className="spotlight-content">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-ink/60">
                    {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </div>
                  <h3 className="display-font text-2xl sm:text-3xl text-ink mt-3">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-ink/70 leading-relaxed">
                    {p.blurb}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.slice(0, 5).map((t) => (
                      <span key={t} className="chip px-3 py-1 text-[10px] uppercase tracking-[0.2em]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={p.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary rounded-full px-5 py-2 text-[11px] font-black tracking-[0.2em] uppercase"
                    >
                      Live Preview
                    </a>
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary rounded-full px-5 py-2 text-[11px] font-black tracking-[0.2em] uppercase"
                    >
                      Source Code
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="spotlight-controls sm:hidden">
            <button
              className="btn-secondary rounded-full px-4 py-2 text-[10px] font-black tracking-[0.2em] uppercase"
              onClick={() =>
                setIndex((i) => (i - 1 + projects.length) % projects.length)
              }
            >
              Prev
            </button>
            <button
              className="btn-primary rounded-full px-4 py-2 text-[10px] font-black tracking-[0.2em] uppercase"
              onClick={() => setIndex((i) => (i + 1) % projects.length)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
