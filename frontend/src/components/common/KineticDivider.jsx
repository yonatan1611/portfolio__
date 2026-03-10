export default function KineticDivider() {
  return (
    <div className="w-full py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="divider-shell">
          <div className="divider-line" />
          <div className="divider-pulse left" />
          <div className="divider-pulse center" />
          <div className="divider-pulse right" />
        </div>
      </div>
    </div>
  );
}
