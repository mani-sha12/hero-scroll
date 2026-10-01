// Side-on top view of a car facing RIGHT, drawn in SVG (no asset needed).
// To use the real photo instead, save it as public/car.png and swap this
// component for <img src="/car.png" /> in Hero.jsx.
export default function CarSvg({ className = "" }) {
  return (
    <svg viewBox="0 0 420 190" className={className} aria-hidden="true">
      <rect x="70" y="2" width="70" height="26" rx="10" fill="#111" />
      <rect x="70" y="162" width="70" height="26" rx="10" fill="#111" />
      <rect x="290" y="2" width="70" height="26" rx="10" fill="#111" />
      <rect x="290" y="162" width="70" height="26" rx="10" fill="#111" />
      <path d="M8 40Q8 20 40 20L300 14Q390 22 414 80Q414 110 414 110Q390 168 300 176L40 170Q8 170 8 150Z" fill="#f58220" />
      <path d="M150 40L250 36Q300 42 312 95Q300 148 250 154L150 150Q125 130 125 95Q125 55 150 40Z" fill="#2a2a2a" />
      <path d="M250 36Q300 42 312 95Q300 148 250 154Z" fill="#555" />
      <path d="M12 52Q4 95 12 138L40 130L40 60Z" fill="#161616" />
    </svg>
  );
}
