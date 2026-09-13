export default function PremiumBackground() {
  return (
    <div className="premium-background pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="premium-background__wash" />
      <div className="premium-background__grid" />
      <div className="premium-background__beam premium-background__beam--one" />
      <div className="premium-background__beam premium-background__beam--two" />
    </div>
  );
}
