import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef(null);
  const rafRef = useRef(null);
  const target = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const node = glowRef.current;
    if (!node) return;

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        node.style.setProperty("--x", `${target.current.x}px`);
        node.style.setProperty("--y", `${target.current.y}px`);
        rafRef.current = null;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <div aria-hidden className="cursor-glow" ref={glowRef} />;
}
