import { useEffect, useMemo, useRef } from "react";
import FadeIn from "../common/FadeIn";
import OptimizedImage from "../common/OptimizedImage";
import profileImageDefault from "../../assets/profile-image/profile-image.png";
import { useSettings } from "../../context/SettingsContext";

export default function Hero() {
  const { settings, loading } = useSettings();
  const dashes = useMemo(() => Array.from({ length: 16 }, (_, i) => i), []);
  const containerRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  // Show loading state but don't block rendering
  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
    </div>
  );

  const { hero, site, socials } = settings || {};
  const profileImg = site?.profileImage?.startsWith('/') ? site.profileImage : profileImageDefault;

  const resumeLink = site?.resumeLink || "/resume/Dawit_Solomon_Resume.pdf";
  const socialLinks = [
    { href: resumeLink, label: "Resume" },
    { href: socials?.github, label: "GitHub" },
    { href: socials?.linkedin, label: "LinkedIn" },
    { href: socials?.email ? `mailto:${socials.email}` : null, label: "Email" },
  ].filter((s) => s.href);
  const stats = hero?.stats || [];

  return (
    <div ref={containerRef} className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 sm:gap-12 items-center">
          {/* Left - text */}
          <FadeIn variant="fade-up" delay={100}>
            <div className="min-w-0">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-ink/70">
                <span className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
                {hero?.role || "Full Stack Developer"}
              </div>

              <h1 className="display-font text-4xl sm:text-5xl lg:text-6xl leading-tight mt-5">
                <span className="text-ink">{hero?.welcomeText || "Hello I’m"}</span>
                <br />
                <span className="text-gradient">{hero?.name || "Yonatan"}</span>
              </h1>

              <p className="mt-5 max-w-xl text-sm sm:text-base text-ink/80 leading-relaxed">
                {hero?.bio || "I build modern, scalable digital products with intentional UX and sharp performance."}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="btn-premium-interactive btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-black tracking-[0.2em] uppercase"
                >
                  Start a project
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
                <a
                  href={resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium-interactive btn-secondary inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-black tracking-[0.2em] uppercase"
                >
                  View Resume
                </a>
                <a href="#work" className="text-xs font-semibold tracking-[0.25em] text-ink/60 hover:text-ink transition-colors">
                  View Work
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    aria-label={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-premium inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--color-ink),transparent_85%)] text-ink/80"
                  >
                    {s.label === "GitHub" && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M12 .5a12 12 0 00-3.79 23.39c.6.11.82-.26.82-.57 0-.28-.01-1.02-.02-2-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.31-5.47-1.34-5.47-5.98 0-1.32.47-2.4 1.24-3.25-.12-.31-.54-1.57.12-3.27 0 0 1.01-.32 3.3 1.24a11.5 11.5 0 016 0c2.29-1.56 3.3-1.24 3.3-1.24.66 1.7.24 2.96.12 3.27.77.85 1.24 1.93 1.24 3.25 0 4.65-2.81 5.66-5.49 5.97.43.37.81 1.1.81 2.22 0 1.61-.02 2.9-.02 3.3 0 .31.21.68.83.57A12 12 0 0012 .5z" />
                      </svg>
                    )}
                    {s.label === "LinkedIn" && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 8.98h3.96V21H3V8.98zM9.5 8.98H13v1.64h.05c.48-.91 1.66-1.86 3.42-1.86 3.66 0 4.34 2.41 4.34 5.54V21h-3.96v-4.9c0-1.17-.02-2.67-1.63-2.67-1.64 0-1.89 1.28-1.89 2.6V21H9.5V8.98z" />
                      </svg>
                    )}
                    {s.label === "Email" && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    )}
                    {s.label === "Resume" && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M12 16l4-5h-3V4h-2v7H8l4 5z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right - photo with 3D Reactivity */}
          <FadeIn variant="scale-in" delay={300}>
            <div className="relative mx-auto w-64 h-64 sm:w-96 sm:h-96 lg:w-[30rem] lg:h-[30rem] hero-perspective flex items-center justify-center group">
              <div className="ring-orbit" />
              <div className="ring-orbit alt" />
              <div
                className="relative w-full h-full hero-card-reactive flex items-center justify-center z-10"
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (-(y - centerY) / 25).toFixed(2);
                  const rotateY = ((x - centerX) / 25).toFixed(2);
                  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `rotateX(0deg) rotateY(0deg)`;
                }}
              >
                <div className="relative w-[90%] h-[100%] modern-frame animate-blob-morph ring-1 ring-white/10">
                  <OptimizedImage
                    src={profileImg}
                    alt={hero?.name || "Profile"}
                    priority={true}
                    aspectRatio="1/1"
                    className="w-full h-200"
                    fallback={
                      <img
                        src={profileImageDefault}
                        alt={hero?.name || "Profile"}
                        className="w-full h-full object-cover"
                      />
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(46,232,179,0.12)] to-transparent pointer-events-none" />
                </div>
                <div className="hero-halo opacity-0 group-hover:opacity-100" />
                <div className="absolute inset-0 pointer-events-none opacity-30 select-none">
                  {dashes.map((i) => (
                    <span
                      key={i}
                      className="absolute inset-0 border-[1px] border-transparent border-t-[rgba(46,232,179,0.4)]"
                      style={{
                        borderRadius: "38% 62% 63% 37% / 41% 44% 56% 59%",
                        transform: `rotate(${(360 / dashes.length) * i}deg) scale(1.1)`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute inset-6 -z-10 bg-[rgba(46,232,179,0.12)] blur-[120px] rounded-full pointer-events-none animate-glow-pulse" />

              <div className="absolute -left-4 top-10 hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.28em] text-ink/70 animate-float-slow">
                Available
              </div>
              <div className="absolute -right-8 bottom-10 hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.28em] text-ink/70 animate-float-slow [animation-delay:1.2s]">
                MERN / UI
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Stats */}
        <FadeIn variant="blur" delay={600}>
          <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-4 gap-6">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-5 card-neo flex items-center gap-3 sm:gap-4"
              >
                <div className="display-font text-3xl sm:text-4xl text-ink whitespace-nowrap">
                  {s.value}
                </div>
                <div className="text-[11px] sm:text-xs tracking-wide text-ink/80">
                  <span className="inline-block mr-1">{s.label1}</span>
                  <span className="inline-block">{s.label2}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
