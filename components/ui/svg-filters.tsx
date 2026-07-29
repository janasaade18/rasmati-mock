/**
 * Shared, invisible SVG filter defs used across the design system to make
 * straight edges (buttons, frames, dividers) read as hand-cut / painted
 * rather than machine-perfect rectangles. Rendered once, referenced via
 * `filter: url(#roughen)` in CSS/classNames.
 */
export function SvgFilters() {
  return (
    <svg aria-hidden className="absolute h-0 w-0 overflow-hidden">
      <defs>
        <filter id="roughen" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.09"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="7"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
