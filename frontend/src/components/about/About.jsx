import React from 'react';
import FadeIn from "../common/FadeIn";
import { useSettings } from "../../context/SettingsContext";

export default function About() {
  const { settings, loading } = useSettings();

  // Show loading state but don't block rendering
  if (loading) return (
    <div className="w-full flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
    </div>
  );

  const { about } = settings || {};

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-start">
          
          {/* Left: Interactive Code Block / Visual */}
          <FadeIn variant="fade-up">
            <div className="relative group">
              <div className="absolute -inset-4 bg-[rgba(46,232,179,0.08)] rounded-[32px] rotate-2 scale-[0.98] transition-all group-hover:rotate-1 group-hover:bg-[rgba(46,232,179,0.12)]" />
              <div className="absolute -inset-4 bg-[rgba(90,169,255,0.08)] rounded-[32px] -rotate-2 scale-[0.98] transition-all group-hover:-rotate-1 group-hover:bg-[rgba(90,169,255,0.12)]" />
              
              <div className="relative rounded-3xl card-neo p-6 sm:p-8 font-mono text-sm leading-relaxed text-ink/70 overflow-hidden shadow-2xl">
                {/* Code Header */}
                <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                   <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="ml-auto text-xs text-ink/30">about-me.tsx</div>
                </div>

                {/* Code Content */}
                <div className="space-y-4">
                  <div>
                    <span className="text-accent-3">const</span> <span className="text-accent">Developer</span> = {"{"}
                  </div>
                  <div className="pl-6 space-y-2">
                    <div>
                      <span className="text-accent-3">firstName</span>: <span className="text-accent-2">"{about.codeBlock.firstName}"</span>,
                    </div>
                    <div>
                      <span className="text-accent-3">lastName</span>: <span className="text-accent-2">"{about.codeBlock.lastName}"</span>,
                    </div>
                    <div>
                      <span className="text-accent-3">role</span>: <span className="text-accent-2">"{about.codeBlock.role}"</span>,
                    </div>
                    <div>
                      <span className="text-accent-3">traits</span>: [<span className="text-accent-2">"{about.codeBlock.traits.join('", "')}"</span>],
                    </div>
                  </div>
                  <div>{"};"}</div>

                  <div className="pt-2">
                    <span className="text-accent-3">export default function</span> <span className="text-accent-2">Bio</span>() {"{"}
                  </div>
                  <div className="pl-6">
                    <span className="text-accent-3">return</span> (
                    <div className="pl-4 text-ink/50 italic">
                      {about.codeBlock.bioLines.map((line, i) => (
                        <React.Fragment key={i}>
                          // {line} <br/>
                        </React.Fragment>
                      ))}
                    </div>
                    );
                  </div>
                  <div>{"}"}</div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {about.codeBlock.traits.map((trait) => (
                    <span key={trait} className="chip px-3 py-1 text-[10px] uppercase tracking-[0.2em]">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: Text Content */}
          <FadeIn variant="scale-in" delay={200}>
            <div>
              <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">
                About Me
              </p>
              <h2 className="display-font text-3xl sm:text-4xl lg:text-5xl text-ink mb-6">
                {about.title} <br />
                <span className="text-ink/40">{about.subtitle}</span>
              </h2>
              
              <div className="space-y-6 text-sm sm:text-base text-ink/80 leading-relaxed">
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Signature / Decorative End */}
              <div className="mt-8 pt-8 border-t border-ink/5 flex items-center gap-4">
                 <div className="h-px flex-1 bg-gradient-to-r from-[rgba(46,232,179,0.6)] to-transparent" />
                 <span className="display-font text-xl text-ink">{about.codeBlock.firstName}.</span>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </div>
  );
}
