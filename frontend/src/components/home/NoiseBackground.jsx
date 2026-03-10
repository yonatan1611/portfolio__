// A subtle animated noise background using CSS only to add depth
export default function NoiseBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-50">
      <div
        className="aurora-layer"
        style={{
          background:
            "radial-gradient(60% 60% at 15% 10%, rgba(46,232,179,0.35), transparent 60%), radial-gradient(60% 60% at 80% 20%, rgba(90,169,255,0.35), transparent 60%), radial-gradient(70% 70% at 60% 90%, rgba(255,138,61,0.35), transparent 60%)",
        }}
      />
      <div
        className="aurora-layer alt"
        style={{
          background:
            "radial-gradient(70% 70% at 10% 80%, rgba(90,169,255,0.25), transparent 60%), radial-gradient(60% 60% at 90% 70%, rgba(46,232,179,0.25), transparent 60%)",
        }}
      />
      <div className="aurora-grain" />
    </div>
  );
}

